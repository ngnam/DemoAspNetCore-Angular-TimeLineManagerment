using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace TimeLineManager.Data
{
    /// <summary>
    /// Private constructor called by the CreateAsync method.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class ApiResult<T>
    {
        #region Private constructor 
        private ApiResult(
                List<T> list,
                int count,
                int pageIndex,
                int pageSize)
        {
            List = list;
            Page = pageIndex;
            PageSize = pageSize;
            Total = (int)Math.Ceiling(count / (double)pageSize);
        }
        #endregion

        #region Methods
        /// <summary>
        /// Pages a IQueryable source.
        /// </summary>
        /// <param name="source">An IQueryable source of generic type</param>
        /// <param name="pageIndex">Zero-based current page index (0 = first page)</param>
        /// <param name="pageSize">The actual size of each page</param>
        /// <returns>
        /// A object containing the IQueryable paged/sorted/filtered result 
        /// and all the relevant paging/sorting/filtering navigation info.
        /// </returns>
        public static async Task<ApiResult<T>> CreateAsync(
            IQueryable<T> source,
            int pageIndex,
            int pageSize)
        {
            var count = await source.CountAsync();

            source = source
                .Skip(pageIndex * pageSize)
                .Take(pageSize);

            var data = await source.ToListAsync();

            return new ApiResult<T>(
                data,
                count,
                pageIndex,
                pageSize
            );
        }

        /// <summary>
        /// Checks if the given property name exists
        /// to protect against SQL injection attacks
        /// </summary>
        public static bool IsValidProperty(
            string propertyName,
            bool throwExceptionIfNotFound = true)
        {
            var prop = typeof(T).GetProperty(
                propertyName,
                BindingFlags.IgnoreCase |
                BindingFlags.Public |
                BindingFlags.Static |
                BindingFlags.Instance);
            if (prop == null && throwExceptionIfNotFound)
                throw new NotSupportedException(
                    String.Format(
                        "ERROR: Property '{0}' does not exist.",
                        propertyName)
                    );
            return prop != null;
        }
        #endregion

        #region Properties
        /// <summary>
        /// IQueryable data result to return.
        /// </summary>
        public List<T> List { get; private set; }

        /// <summary>
        /// Zero-based index of current page.
        /// </summary>
        public int Page { get; private set; }

        /// <summary>
        /// Number of items contained in each page.
        /// </summary>
        public int PageSize { get; private set; }

        /// <summary>
        /// Total items count
        /// </summary>
        public int Total { get; private set; }

        #endregion

    }
}
