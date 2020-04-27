using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public static class SurveyType
    {
        public const string ACTIVE = "ACTIVE";
        public const string INACTIVE = "INACTIVE";
    }

    public class Survey
    {
        public int Id { get; set; }
        public long StartDate { get; set; }
        public long EndDate { get; set; }
        public string Status { get; set; }
        public string Title { get; set; }
        public string Thumbnail { get; set; }
    }
}

