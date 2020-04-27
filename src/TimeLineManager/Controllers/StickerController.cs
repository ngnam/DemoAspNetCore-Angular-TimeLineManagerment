using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TimeLineManager.Data;
using TimeLineManager.Data.Models;

namespace TimeLineManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StickerController : ControllerBase
    {
        private readonly DatabaseDbContext _context;
        private readonly ILogger<CouponController> _logger;

        public StickerController(
            DatabaseDbContext context,
            ILogger<CouponController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Sticker
        // GET: api/Sticker/?pageIndex=0&pageSize=10
        [HttpGet]
        public async Task<ActionResult<ApiResponse<ApiResult<Sticker>>>> Get(
                int pageIndex = 0,
                int pageSize = 10)
        {
            var result = new ApiResponse<ApiResult<Sticker>>(1, null, false, null);
            try
            {
                result.ResultData = await ApiResult<Sticker>.CreateAsync(
                    _context.Stickers,
                    pageIndex,
                    pageSize);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error when GET---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }
        }
    }
}