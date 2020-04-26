using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public static class MediaType
    {
        public const string PHOTO = "PHOTO";
        public const string VIDEO = "VIDEO";
    }

    public class Media
    {
        public string Type { get; set; }
        public string Thumb { get; set; }
        public string Original { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public int? Duration { get; set; }
    }
}
