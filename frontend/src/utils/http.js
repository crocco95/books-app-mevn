const httpUtils = {
  paramsToUrlQuery(params) {
    var str = '';
      for (let key in params) {
          if (str != "") {
              str += "&";
          }
          str += key + "=" + params[key];
      }
      return str;
  }
}

export default httpUtils;