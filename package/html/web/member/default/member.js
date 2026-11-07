class IyMember {
  static domain = String;
  constructor() {
    this.domain = '';
    // this.address = 'http://192.168.2.129:56438';
    this.address = location.origin + '/memberUser/';
  }
  Init(cfg) {
    this.domain = cfg?.domain ? cfg.domain : location.origin;
    console.log(this.domain, '=====初始化');
  }
  IsLogin() {
    return new Promise((s, j) => {
      let token = cookie.get();
      if (token) {
        xhrRequset(this.domain + `/openapi/member/info`, 'GET', {}, token)
          .then(() => {
            s(true);
          })
          .catch(() => {
            s(false);
          });
      } else {
        s(false);
      }
    });
  }
  GetLoginInfo() {
    return new Promise((s, j) => {
      let token = cookie.get();
      if (token) {
        xhrRequset(this.domain + `/openapi/member/info`, 'GET', {}, token)
          .then(res => {
            s(res);
          })
          .catch(() => {
            s(null);
          });
      } else {
        s(null);
      }
    });
  }
  LoginOut() {
    return new Promise((s, j) => {
      if (cookie.get()) {
        cookie.del();
        s(true);
      } else {
        s(true);
      }
    });
  }
  ToLogin(target = '_self', callbackUrl, immediately = false) {
    this.IsLogin().then(res => {
      let params = [
        { key: 'type', value: 1 },
        { key: 'back', value: immediately },
        { key: 'callbackUrl', value: window.btoa(callbackUrl) },
        { key: 'login', value: res },
      ];
      let url = setParams('', params, this.address);
      window.open(url, target);
    });
  }
  ToRegiseter(target = '_self', callbackUrl, immediately = false) {
    this.IsLogin().then(res => {
      let params = [
        { key: 'type', value: 2 },
        { key: 'back', value: immediately },
        { key: 'callbackUrl', value: window.btoa(callbackUrl) },
        { key: 'login', value: res },
      ];
      let url = setParams('', params, this.address);
      window.open(url, target);
    });
  }
  ToMember(target = '_self', callbackUrl) {
    window.open(this.address, target);
  }
  ShowKefu() {
    return new Promise((s, j) => {
      let token = cookie.get();
      this.GetLoginInfo().then(res => {
        if (res) {
          xhrRequset(
            this.domain + `/openapi/template/customer`,
            'GET',
            {},
            token
          )
            .then(data => {
              let dom = document.createElement('div');
              dom.innerHTML = data.js;
              // dom.innerHTML = `<script src="http://192.168.2.70/api/v1/assets/layer/ai_service_diy_1.js?v=1692344177" charset="UTF-8"> </script>`
              Array.prototype.forEach.call(dom.children, ele => {
                const tag = document.createElement(ele.tagName.toLowerCase());
                tag.innerHTML = ele.innerHTML;
                Array.prototype.forEach.call(ele.attributes, attr => {
                  tag.setAttribute(attr.name, attr.value);
                });
                document.body.appendChild(tag);
              });
              setTimeout(() => {
                if (res?.id && window.serCtr) {
                  serCtr.open(res.id);
                }
              }, 500);
              s(true);
            })
            .catch(() => {
              s('客服系统尚未开启');
            });
        } else {
          // this.ToLogin('_self', location.origin, true)
          let params = [
            { key: 'type', value: 1 },
            { key: 'back', value: true },
            { key: 'callbackUrl', value: window.btoa(location.href) },
            { key: 'login', value: false },
          ];
          let url = setParams('', params, this.address);
          window.open(url, '_self');
        }
      });
    });
  }
}

function xhrRequset(api, type = 'GET', params = {}, token) {
  const xhr = new XMLHttpRequest();
  //2.初始化 设置请求方法和url
  const url = api;
  // debugger
  const cuReq = new Promise((resolve, reject) => {
    xhr.timeout = 15000;
    xhr.open(type, url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (token) xhr.setRequestHeader('Authorization', token);
    //3.发送
    if (type === 'POST') {
      xhr.send(JSON.stringify(params));
    } else {
      xhr.send();
    }
    //4.事件绑定 处理服务端返回的结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断响应状态码
        if (xhr.status >= 200 && xhr.status <= 300) {
          // console.log(xhr.status); //状态码
          // console.log(xhr.statusText); //状态字符串
          // console.log(xhr.getAllResponseHeaders()); //所有响应头
          // console.log(xhr.response); //响应体
          resolve(JSON.parse(xhr.response));
        } else {
          reject();
        }
        // console.log(xhr);
      }
    };
  });
  return cuReq;
}
function setParams(name, value, url = '') {
  const params = new URLSearchParams(location.search);
  if (value instanceof Array) {
    value.forEach(({ key, value }) => {
      params.set(key, value);
    });
  } else {
    params.set(name, value);
  }

  if (url) {
    return url + '?' + params.toString();
  } else {
    return params.toString();
  }
}
const cookie = {
  tokenKey: 'Token',
  set(val) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie =
      cookie.tokenKey +
      '=' +
      escape(val) +
      ';expires=' +
      exp.toGMTString() +
      ';path=/';
  },
  get() {
    var arr,
      reg = new RegExp('(^| )' + cookie.tokenKey + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  del() {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookie.get(cookie.tokenKey);
    if (cval != null)
      document.cookie =
        cookie.tokenKey +
        '=' +
        cval +
        ';expires=' +
        exp.toGMTString() +
        ';path=/';
  },
};
// cookie.set(
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg5MDg4NWNhLTFiODUtNDE1MS04MjQ1LTJhMDhmNGIxYWEzZSIsIlVzZXJBZ2VudCI6Ik1vemlsbGEvNS4wIChYMTE7IExpbnV4IHg4Nl82NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzEwNC4wLjAuMCBTYWZhcmkvNTM3LjM2IiwiaXAiOiIxOTIuMTY4LjIuMTI5IiwiU2FsdCI6ImQ1OWE3NTZmOTRlNTM1NmQzYzFkZTM2Y2ZhYjI3ZTJhIiwiZXhwIjoxNjkyMjEyNzgxLCJpYXQiOjE2OTIxODM5ODEsIm5iZiI6MTY5MjE4Mzk4MX0.OvAAxvINsYq6KOBDBkJCwlVEZUc3rYfCTTilDrA-6Jo'
// );
// let ts = new IyMember();
// ts.Init();
// ts.IsLogin();
