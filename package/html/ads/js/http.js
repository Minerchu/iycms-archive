function temGetCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

// 接口超时时间
axios.defaults.timeout = 15000;
// request拦截器
axios.interceptors.request.use(
  // 配置请求头
  (config) => {
    config.headers = {
      // 'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      "Content-Type": "application/json;charset=UTF-8", //传参方式JSON
      // token: token ? `Basic ${token}` : "", //自定义配置token
      Authorization: temGetCookie("Token") || "",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  },
  (error) => {
    const { response } = error;
    if (error.code === "ERR_NETWORK") {
      // layer.msg('网络连接异常', {
      //   icon: 2,
      //   offset: "50px",
      //   time: 1000,
      // });
      return Promise.reject();
    }
    if (
      typeof error.message === "string" &&
      error.message.includes("timeout")
    ) {
      layer.msg('请求超时，请稍候重试...', {
        icon: 2,
        offset: "50px",
        time: 1000,
      });
      return Promise.reject();
    }
    if (response) {
      // 请求已发出，但是不在2XX的范围
      return Promise.reject(response);
    } else {
      // ElMessage.warning("网络连接异常，请稍候再试！");
      // alert('网络连接异常，请稍候再试')
      // console.log("网络连接异常");
    }
  }
);
var baseUrl = location.origin;
//封装GET POST 请求并导出
function $http(url = "", params = {}, type = "POST") {
  //设置url params type 的默认值
  return new Promise((resolve, reject) => {
    let promis;
    if (type.toUpperCase() === "GET") {
      promis = axios({
        method: "GET",
        url: baseUrl + url,
        params,
      });
    } else if (type.toUpperCase() === "POST") {
      promis = axios({
        method: "POST",
        url: baseUrl + url,
        data: params,
      });
    } else if (type.toUpperCase() === "XLSX") {
      promis = axios({
        method: "POST",
        url: baseUrl + url,
        data: params,
        responseType: "blob",
      });
    }
    //处理返回
    promis
      .then((res) => {
        if (res) {
          resolve(res);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
