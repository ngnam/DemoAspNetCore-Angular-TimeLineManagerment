using Microsoft.AspNetCore.Http;
using System.Drawing;
using System.IO;
using TimeLineManager.Data.Models;

namespace TimeLineManager.Extensions
{
    public static class HttpRequestExtensions
    {
        /// <summary>
        /// single file
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public static FileModel File(this HttpRequest request)
        {
            IFormFile formFile = request.Form.Files[0];
            if  (formFile == null) return null;

            var file = new FileModel() {
                ContentType = formFile.ContentType,
                FileName = formFile.FileName,
                Length = formFile.Length,
                Name = formFile.Name
            };
            using (var ms = new MemoryStream())
            {
                formFile.CopyTo(ms);
                file.Bytes = ms.ToArray();
            }
            if (file.Name == MediaType.PHOTO.ToLower()) { 
                using (var image = Image.FromStream(formFile.OpenReadStream()))
                {
                    // use image.Width and image.Height
                    file.Width = image.Width;
                    file.Height = image.Height;
                }
            } else // otherwise is video not implement
            {
                file.Width = 200;
                file.Height = 200;
            }

            return file;
        }
    }
}
