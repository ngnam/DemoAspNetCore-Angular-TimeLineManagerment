using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TimeLineManager.Data
{
    public class ApiResponse<T>
    {
        public ApiResponse(
              int resultCode, // 1: success, 0: failed
              T resultData,
              bool errorDisplay,
              string errorMessage)
        {
            ResultCode = resultCode;
            ResultData = resultData;
            ErrorDisplay = errorDisplay;
            ErrorMessage = errorMessage;
        }

        #region Properties
        /// <summary>
        /// status return 1: success, 0: failed
        /// </summary>
        public int ResultCode { get; set; }
        /// <summary>
        /// T data result to return.
        /// </summary>
        public T ResultData { get; set; }
        /// <summary>
        /// TRUE if has error when execute, FALSE otherwise.
        /// </summary>
        public bool ErrorDisplay { get; set; }
        /// <summary>
        /// Message if has Error
        /// </summary>
        public string ErrorMessage { get; set; }
        #endregion
    }
}
