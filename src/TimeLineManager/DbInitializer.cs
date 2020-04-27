using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TimeLineManager.Data;
using TimeLineManager.Data.Models;

namespace TimeLineManager
{
    public static class DbInitializer
    {
        public static async Task InitializeAsync(IServiceProvider services)
        {
            var databaseDbContext = services.GetRequiredService<DatabaseDbContext>();
            var logger = services.GetRequiredService<ILogger<DatabaseDbContext>>();

            // migration db
            databaseDbContext.Database.EnsureCreated();
           
            if (!databaseDbContext.Surveys.Any())
            {
                DateTime today = DateTime.UtcNow;
                DateTime todayAdd2Hour = DateTime.UtcNow.AddHours(2);
                long unixTime = ((DateTimeOffset)today).ToUnixTimeSeconds();
                long unixTime2Hour = ((DateTimeOffset)todayAdd2Hour).ToUnixTimeSeconds();

                await databaseDbContext.Surveys.AddRangeAsync(new Survey[] {
                    new Survey { Id = 1, StartDate = unixTime, EndDate = unixTime2Hour, Status = SurveyType.ACTIVE, Thumbnail = "/images/survey-image.png", Title = "Các cấp độ của nghề làm Web" },
                    new Survey { Id = 2, StartDate = unixTime, EndDate = unixTime2Hour, Status = SurveyType.ACTIVE, Thumbnail = "/images/survey-image.png", Title = "Cách trở thành Full-Stack Developer" }
                });
                await databaseDbContext.SaveChangesAsync();
                logger.LogInformation("DatabaseDbContext", "---initial data of Surveys success---");
            }

            if (!databaseDbContext.Coupons.Any())
            {
                DateTime today = DateTime.UtcNow;
                DateTime add5Day = DateTime.UtcNow.AddDays(5);
                long unixTime = ((DateTimeOffset)today).ToUnixTimeSeconds();
                long unixTime5Day = ((DateTimeOffset)add5Day).ToUnixTimeSeconds();

                await databaseDbContext.Coupons.AddRangeAsync(new Coupon[] {
                    new Coupon { Id = 1, StartDate = unixTime, EndDate = unixTime5Day, Title = "Giảm giá 60 tất cả sản phẩm dịp 30/4", Thumbnail = "images/coupon-60-percent.jpg" },
                    new Coupon { Id = 2, StartDate = unixTime, EndDate = unixTime5Day, Title = "Giảm giá 25$ tất cả sản phẩm dịp 30/4", Thumbnail = "images/coupon-25-dolla.png" }
                });
                await databaseDbContext.SaveChangesAsync();
                logger.LogInformation("DatabaseDbContext", "---initial data of Coupons success---");
            }

            if (!databaseDbContext.Stickers.Any())
            {
                var stickers = new List<Sticker>();
                for (int i = 18; i <= 38; i++)
                {
                    stickers.Add(new Sticker { Url = $"/sticker/{i}.png" });
                }
                await databaseDbContext.Stickers.AddRangeAsync(stickers);
                await databaseDbContext.SaveChangesAsync();
                logger.LogInformation("DatabaseDbContext", "---initial data of Stickers success---");
            }
        }
    }
}
