using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Linq;
using TimeLineManager.Data;
using TimeLineManager.Data.Models;
using TimeLineManager.Extensions;

namespace TimeLineManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UploadMediaController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        private readonly ILogger<UploadMediaController> _logger;

        public UploadMediaController(
            IWebHostEnvironment env,
            ILogger<UploadMediaController> logger)
        {
            _env = env;
            _logger = logger;
        }

        [HttpPost("uploadfile")]
        [DisableRequestSizeLimit]
        public ActionResult<ApiResponse<Media>> UploadFile()
        {
            var result = new ApiResponse<Media>(1, null, false, null);
            try
            {
                // Get file Upload from HttpRequest FormData
                FileModel postedFile = Request.File();
                // Check has file
                if (postedFile == null)
                {
                    result.ErrorDisplay = true;
                    result.ResultCode = 0;
                    result.ErrorMessage = "File không tồn tại, Vui lòng chọn lại file!";
                    return result;
                }
                // validate File upload
                // FileSize, Extension, Duration: Video
                if (postedFile.Name == MediaType.PHOTO.ToLower())
                {
                    // Extention JPG, JPGE, PNG
                    if (postedFile.ContentType.ToLower() != "image/jpeg" &&
                    postedFile.ContentType.ToLower() != "image/jpg" &&
                    postedFile.ContentType.ToLower() != "image/png")
                    {
                        result.ResultCode = 0;
                        result.ErrorDisplay = true;
                        result.ErrorMessage = "File không hỗ trợ định dạng này!";
                        return result;
                    }
                    // Photo FileSize Upto 10 MB
                    if (postedFile.Length > 10 * 1024 * 1024)
                    {
                        result.ResultCode = 0;
                        result.ErrorDisplay = true;
                        result.ErrorMessage = "Dung lượng file ảnh không được vượt quá 10 MB!";
                        return result;
                    }
                }
                if (postedFile.Name == MediaType.VIDEO.ToLower())
                {
                    // Extension MP4, M4V, MOV, AVI, WMV
                    string ext = Path.GetExtension(postedFile.FileName).ToLower();
                    if (Equals(ext, "mp4") && Equals(ext, "m4v") && Equals(ext, "mov") && Equals(ext, "avi") && Equals(ext, "wmv"))
                    {
                        result.ResultCode = 0;
                        result.ErrorDisplay = true;
                        result.ErrorMessage = "File không hỗ trợ định dạng này!";
                        return result;
                    }
                    // Video FileSize Upto 20 MB
                    if (postedFile.Length > 20 * 1024 * 1024)
                    {
                        result.ResultCode = 0;
                        result.ErrorDisplay = true;
                        result.ErrorMessage = "Dung lượng file Video không được vượt quá 20 MB!";
                        return result;
                    }
                    // Duration
                }

                // Get Directory Upload File
                string Directory = Path.Combine(_env.WebRootPath, postedFile.Name);

                // Save postedFile
                FileModel fileUploaded = Save(Directory, postedFile);
                // mapping to MEDIA file
                Media media = new Media()
                {
                    Type = fileUploaded.Name.ToUpper(),
                    Duration = 0,
                    Thumb = fileUploaded.FileName,
                    Original = fileUploaded.FileName,
                    Width = fileUploaded.Width,
                    Height = fileUploaded.Height
                };

                return new ApiResponse<Media>(1, media, false, null);

            }
            catch (Exception ex)
            {
                _logger.LogError("UploadFile---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }

        }

        private FileModel Save(string directory, FileModel file)
        {
            Directory.CreateDirectory(directory);
            string fileName = null;
            fileName = new String(Path.GetFileNameWithoutExtension(file.FileName).Take(10).ToArray()).Replace(" ", "-");
            fileName = fileName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(file.FileName);

            using (var fs = new FileStream(GetFilePath(directory, fileName), FileMode.Create))
            {
                fs.Write(file.Bytes);
            }

            file.FileName = fileName;
            file.Bytes = null;

            return file;
        }

        private string GetFilePath(string directory, string fileName)
        {
            return Path.Combine(directory, fileName);
        }
    }
}
