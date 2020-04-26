using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public class Coupon
    {
        public int Id { get; set; }
        public double startDate { get; set; }
        public double endDate { get; set; }
        public string status { get; set; }
        public string title { get; set; }
        public string thumbnail { get; set; }
    }
}
