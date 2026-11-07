(function (name, context, definition) {
  "use strict";
  if (
    typeof window !== "undefined" &&
    typeof define === "function" &&
    define.amd
  ) {
    define(definition);
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = definition();
  } else if (context.exports) {
    context.exports = definition();
  } else {
    context[name] = definition();
  }
})("MemberCenter", this, function userValidate() {
  var MemberCenter = function (params) {}; //初始化MemberCenter
  var curDomain = ""; // 域名地址
  var curUserLoginStatrus = false; //是否登录
  var curUserInfo = {}; //用户信息

  //   请求
  const xhr = new XMLHttpRequest();
  var xhrRequset = (api, type = "GET", params = {}) => {
    //2.初始化 设置请求方法和url
    const url = curDomain + api;
    const cuReq = new Promise((resolve, reject) => {
      xhr.timeout = 15000;
      xhr.open(type, url, true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      //3.发送
      if (type === "POST") {
        xhr.send(JSON.stringify(params));
      } else {
        xhr.send();
      }
      //4.事件绑定 处理服务端返回的结果
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          //判断响应状态码

          if (xhr.status >= 200 && xhr.status <= 300) {
            //   console.log(xhr.status); //状态码

            //   console.log(xhr.statusText); //状态字符串

            //   console.log(xhr.getAllResponseHeaders()); //所有响应头

            // console.log(xhr.response); //响应体

            resolve(JSON.parse(xhr.response));
          }
        }
      };
    });
    return cuReq;
  };

  //初始化
  MemberCenter.init = function (params) {
    //params {}
    params ? (curDomain = params.domain) : "";
    return new Promise((resolve, reject) => {
      //   MemberCenter.ValidateLogin()
      // .then(async (res) => {
      //   // console.log(res)
      //   const sta = await res;
      //   resolve(sta);
      // })
      // .catch(() => {
      //   reject(false);
      // });
      resolve(true);
    });
  };

  //   验证登录
  MemberCenter.ValidateLogin = function (params) {
    // console.log(curUserCode)
    return new Promise((resolve, reject) => {
      xhrRequset(`/api/v1/sso/web/validate/${curUserCode}`)
        .then((res) => {
          if (res.data.user.code === 200) {
            curUserLoginStatrus = true;
            resolve(true); //登录
          } else {
            resolve(false); //未登录
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //   判断是否登录
  MemberCenter.IsLogin = function () {
    return new Promise((resolve, reject) => {
      resolve(curUserLoginStatrus);
    });
  };

  //   读取用户信息
  MemberCenter.UInfo = function () {
    // console.log("读取用户信息===");
    return new Promise((resolve, reject) => {
      resolve({});
    });
  };
  //   注销登录
  MemberCenter.Logout = function (params) {
    return new Promise((resolve, reject) => {
      xhrRequset("/api/v1/sso/web/logout", "POST", {})
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  //   跳转登录
  MemberCenter.ToLogin = (url) => {
    console.log("跳转登录===");
    location.href = `${curDomain}/login?callbackUrl=${
      url ? encodeURIComponent(url) : encodeURIComponent(location.href)
    }`;
  };
  return MemberCenter;
});
