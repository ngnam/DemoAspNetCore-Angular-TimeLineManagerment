using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public static class PostType
    {
        public const string IMAGE = "IMAGE";
        public const string VIDEO = "VIDEO";
        public const string STICKER = "STICKER";
        public const string COUPON = "COUPON";
        public const string LINK = "LINK";
        public const string SURVEY = "SURVEY";
    }
    public class Post
    {
        public int Id { get; set; } // column int
        public string Type { get; set; } // column string
        public string Status { get; set; } // column string
        public long? ScheduledTime { get; set; } // column double
        public string Images { get; set; }  // column JSON_VALUE("thumb") image.thumb
        public string Video { get; set; }  // column JSON_VALUE
        public string Sticker { get; set; } // column JSON_VALUE
        public string Coupon { get; set; }  // column JSON_VALUE
        public string Link { get; set; }  // column JSON_VALUE
        public string Survey { get; set; }  // column JSON_VALUE
        public long? CreatedAt { get; set; } // column double
        public long? UpdatedAt { get; set; } // column double
    }
}
