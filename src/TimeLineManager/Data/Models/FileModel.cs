using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data.Models
{
    public class FileModel
    {
        public byte[] Bytes { get; set; }

        public string ContentType { get; set; }

        public string FileName { get; set; }

        public long Length { get; set; }

        public string Name { get; set; }

        public int Width { get; set; }
        public int Height { get; set; }
    }
}
