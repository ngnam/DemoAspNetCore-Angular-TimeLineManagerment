using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimeLineManager.Data;
using TimeLineManager.Data.Models;

namespace TimeLineManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UrlInfoController : ControllerBase
    {
        [HttpGet("GetInFoLink")]
        public async Task<ActionResult<ApiResponse<Link>>> GetInFoLink(string url)
        {
            var result = new ApiResponse<Link>(1, null, false, null);
            // check URI
            Uri uriResult;
            bool checkUri = Uri.TryCreate(url, UriKind.Absolute, out uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
            if (!checkUri)
            {
                result.ResultCode = 0;
                result.ErrorDisplay = true;
                result.ErrorMessage = "Url Không đúng định dạng.";
                return result;
            }

            HttpClient hc = new HttpClient();
            HttpResponseMessage resultResponse = await hc.GetAsync(url);
            Stream stream = await resultResponse.Content.ReadAsStreamAsync();
            HtmlDocument doc = new HtmlDocument();
            doc.Load(stream);
            string title = (from x in doc.DocumentNode.Descendants()
                            where x.Name.ToLower() == "title"
                            select x.InnerText).FirstOrDefault();

            string desc = (from x in doc.DocumentNode.Descendants()
                           where x.Name.ToLower() == "meta"
                           && x.Attributes["name"] != null
                           && x.Attributes["name"].Value.ToLower() == "description"
                           select x.Attributes["content"].Value).FirstOrDefault();
            // property="og:image"
            string image = (from x in doc.DocumentNode.Descendants()
                            where x.Name.ToLower() == "meta"
                            && x.Attributes["property"] != null
                            && x.Attributes["property"].Value.ToLower() == "og:image"
                            select x.Attributes["content"].Value).FirstOrDefault();
            Link link = new Link { Title = title, Desc = desc, Thumbnail = image, Url = url };
            result.ResultData = link;
            return result;
        }
    }

}