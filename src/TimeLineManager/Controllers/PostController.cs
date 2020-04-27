using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TimeLineManager.Data;
using TimeLineManager.Data.Models;

namespace TimeLineManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly DatabaseDbContext _context;
        private readonly ILogger<PostController> _logger;

        public PostController(
            DatabaseDbContext context,
            ILogger<PostController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Post
        // GET: api/Post/?pageIndex=0&pageSize=10
        [HttpGet]
        public async Task<ActionResult<ApiResponse<ApiResult<Post>>>> Get(
                int pageIndex = 0,
                int pageSize = 10)
        {
            var result = new ApiResponse<ApiResult<Post>>(1, null, false, null);
            try
            {
                result.ResultData = await ApiResult<Post>.CreateAsync(
                    _context.Posts,
                    pageIndex,
                    pageSize);
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error when POST GET---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }
        }

        // GET: api/Post/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Post>>> GetPost(int id)
        {
            var result = new ApiResponse<Post>(1, null, false, null);
            try
            {
                var post = await _context.Posts.FindAsync(id);
                if (post == null)
                {
                    result.ResultCode = 0;
                    result.ErrorDisplay = true;
                    result.ErrorMessage = "Post không tồn tại!";
                    return result;
                }

                result.ResultData = post;
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error when POST GET---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }
        }

        // PUT: api/Post/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<ActionResult<ApiResponse<Post>>> PutPost(int id, Post post) {
            var result = new ApiResponse<Post>(1, null, false, null);

            if (id != post.Id)
            {
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Bad request!";
                return result;
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                result.ResultData = post;
            }
            catch (DbUpdateConcurrencyException dbx)
            {
                if (!PostExists(id))
                {
                    result.ResultCode = 0;
                    result.ErrorDisplay = true;
                    result.ErrorMessage = "Not Found!";
                    return result;
                }
                else
                {
                    _logger.LogError("DbUpdateConcurrencyException", dbx);
                    result.ResultCode = 0;
                    result.ErrorDisplay = true;
                    result.ErrorMessage = "Bad request!";
                    return result;
                }
            }

            return result;
        }

        // POST: api/Post
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Post>>> PostPost(Post post)
        {
            var result = new ApiResponse<Post>(1, null, false, null);
            try
            {
                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                result.ResultData = post;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error when POST GET---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }
            return result;
        }

        // DELETE: api/Post/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<Post>>> DeletePost(int id)
        {
            var result = new ApiResponse<Post>(1, null, false, null);
            try
            {
                var post = await _context.Posts.FindAsync(id);
                if (post == null)
                {
                    result.ResultCode = 0;
                    result.ErrorDisplay = true;
                    result.ErrorMessage = "Post không tồn tại!";
                    return result;
                }

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();
                result.ResultData = post;
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogInformation("Error when POST GET---", ex);
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Server đang gặp sự cố, vui lòng thử lại sau!";
                return result;
            }
        }

        private bool PostExists(int id)
        {
            return _context.Posts.Any(e => e.Id == id);
        }
    }
}