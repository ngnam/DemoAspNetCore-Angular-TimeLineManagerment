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
    public class SurveyController : ControllerBase
    {
        private readonly DatabaseDbContext _context;
        private readonly ILogger<SurveyController> _logger;

        public SurveyController(
            DatabaseDbContext context,
            ILogger<SurveyController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Survey
        // GET: api/Survey/?pageIndex=0&pageSize=10
        [HttpGet]
        public async Task<ActionResult<ApiResponse<ApiResult<Survey>>>> Get(
                int pageIndex = 0,
                int pageSize = 10)
        {
            var result = new ApiResponse<ApiResult<Survey>>(1, null, false, null);
            try
            {
                result.ResultData = await ApiResult<Survey>.CreateAsync(
                    _context.Surveys,
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