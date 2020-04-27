using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public double? StartDate { get; set; }
        public double? EndDate { get; set; }
        public string Status { get; set; }
        public string Title { get; set; }
        public string Thumbnail { get; set; }
    }
}
