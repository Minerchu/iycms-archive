// .reply_box .mac_msg_l .msg_list .msg_reply:after {
// 	content: '';
// 	width: 0px;
// 	height: 0px;
// 	border-color: transparent #f5fbff #f5fbff transparent;
// 	border-style: solid;
// 	border-width: 7px;
// 	position: absolute;
// 	top: 8px;
// 	border-radius: 3px;
// 	left: -12px;
// 	right: auto;
// }
// .reply_box .mac_msg_l .msg_list .msg_reply:before {
// 	content: '';
// 	width: 0px;
// 	height: 0px;
// 	border-color: transparent #d3e9fb #d3e9fb transparent;
// 	border-style: solid;
// 	border-width: 7px;
// 	position: absolute;
// 	top: 9px;
// 	border-radius: 3px;
// 	left: -14px;
// 	right: auto;
// }
var _styleText = `
div{ box-sizing: border-box; }
.reply_box .mac_msg_l{padding:10px 0;width:100%;margin-left: 6px;padding-right: 12px;}
.reply_box .mac_msg_l .mac_msg_item{width: 100%;padding: 0;}
.reply_box .mac_msg_l .msg_tag{float:left;width: 60px;margin-right:2%;margin-bottom:5px;border-radius: 5px;overflow: hidden;}
.reply_box .mac_msg_l .count_bg{width:60px;height:5px;background: linear-gradient(90deg, #f25f4d 30%, #59b84b 20%, #30a1d9 65%, #fdcd34 10%);}
.reply_box .mac_msg_l .msg_count{
	padding:8px 0;color: #fff;text-align: center;font-size: 13px;
	background: -moz-linear-gradient(top, #444444 0%, #222222 100%);
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#444444), color-stop(100%,#222222));
	background: -webkit-linear-gradient(top, #444444 0%,#222222 100%);
	background: -o-linear-gradient(top, #444444 0%,#222222 100%);
	background: -ms-linear-gradient(top, #444444 0%,#222222 100%);
	background: linear-gradient(to bottom, #444444 0%,#222222 100%);
}
.reply_box .mac_msg_l .msg_count strong{display: block;}
.reply_box .mac_msg_l  .msg_list{width: 100%;margin-bottom: 10px;overflow: hidden;}
.reply_box .mac_msg_l .msg_list .msg_title{text-align:left;font-size:14px;border-bottom: 1px #d3e9fb dotted;padding-bottom: 12px;margin: 6px 0 10px 0;}
.reply_box .mac_msg_l .msg_list .msg_title span.time{float: right;font-size: 12px;}
.reply_box .mac_msg_l .msg_list .msg_reply{color: #666;}
.reply_box .mac_msg_l .msg_list .reply_answer{color: red;}
.reply_box .mac_msg_l .msg_list .reply_answer .msg_title{font-size: 14px;}
.reply_box .mac_msg_l .msg_list .msg_cont{padding: 0 0 4px;font-size: 12px;}
.reply_box .mac_msg_l .msg_list .msg_reply,.reply_box .mac_msg_l .msg_list .reply_answer {
	position: relative;
	margin: 0 0 10px;
	padding: 6px 10px 8px;
	border: 1px solid #d3e9fb;
	// border-radius: 0.2rem;
	background-color: #f5fbff;
}
.reply_box .mac_msg_l .msg_list .reply_answer:after {
	content: '';
	width: 0px;
	height: 0px;
	border-color:  transparent transparent #f5fbff transparent ;
	border-style: solid;
	border-width: 6px;
	position: absolute;
	top: -11px;
	border-radius: 3px;
	left: 18px;
	right: auto;
}
.reply_box .mac_msg_l .msg_list .reply_answer:before {
	content: '';
	width: 0px;
	height: 0px;
	border-color: transparent transparent #d3e9fb transparent;
	border-style: solid;
	border-width: 7px;
	position: absolute;
	top: -14px;
	border-radius: 3px;
	left: 17px;
	right: auto;
}
.gbook_content:focus{
  border: 1px solid rgba(235,64,8);
  outline: none;
}
.gbook_content::-webkit-scrollbar,.mac_msg_l::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
.gbook_content::-webkit-scrollbar-thumb,.mac_msg_l::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(204, 204, 204, 0.50);
}
.reply_box .mac_msg_r{margin: 0 5px;}
.reply_box .mac_msg_r .submit_btn{width: 100%;border-radius: 3px;}
 .mac_msg_r{border: 1px solid #ddd;border-radius: 5px;color: #666;}
.mac_msg_r .msg_tit{background: #f1f1f1;padding: 10px;}
.mac_msg_r .gbook_form{padding: 15px;border-top: 1px solid #ddd;}
.mac_msg_r .gbook_form .msg_cue{margin-bottom: 8px;}
 .mac_msg_r .gbook_form textarea{
  width:100%;height: 106px !important;padding: 10px;overflow-y: auto;
  border: 1px solid #ddd !important;text-align: left !important;
  box-sizing: border-box;resize: none;}
 .mac_msg_r .msg_code{margin: 10px 0;display: flex;justify-content: space-between;align-items: center;height: 30px;font-size:14px;}
.mac_msg_r .msg_code input{border: 1px solid #ddd;padding: 4px;width: 65px;}
.mac_msg_r .msg_code .remaining-w {margin: 0 0 -4px 8px;width: 60px;text-align: right;}
 .mac_msg_r .msg_code .mac_verify_img{height: 26px;vertical-align: top;cursor: pointer;margin-left:4px;display:none;
  position: absolute;
  top: -3px;
  left: -4px;
  background: #fff;}
.mac_msg_r .submit_btn{width: 100px;height: 42px;background: rgba(235,64,8);color: #fff;border: 1px solid rgba(235,64,8);margin:20px auto
	0;display: block;cursor: pointer;}
.gbook_remaining{ font-family: sans-serif;font-size: 16px;}
.mac_msg_page-number{ padding:2px 4px;font-size: 12px;border: 1px solid #ddd; min-width: 16px;line-height: 16px;text-align: center;color:#333;}
.mac_msg_page-number:hover{ color:red;cursor: pointer; }
.mac_msg_page-number.selected{ border-color: red; color: red; }
.mac_msg_page-number.disabled{ cursor: not-allowed;color:#999; }
.mac_msg_page-number.disabled:hover{ color:#999; }
#toggle_jh{ display: none; }
.svg svg{ width: 12px; height: 12px; vertical-align: baseline !important;}
.fiexd_jh #toggle_jh,#close_jh{ display: block; }
.fiexd_jh .mac_msg_l{overflow: auto;max-height: 50vh;}
.fiexd_jh .reply_box .mac_msg_l{ padding-right: 8px; }
.fiexd_jh{position: fixed;width:420px;right:24px;bottom:24px;min-width: 320px;}`;
(function (_window) {
  let xhrRequset = function (url, type = 'GET', params = {}) {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.timeout = 6000;
      if (type == 'GET') {
        const p = new URLSearchParams();
        for (let i in params) {
          p.set(i, params[i]);
        }
        url = url + '?' + p.toString();
      }
      xhr.open(type, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      if (leave.token) xhr.setRequestHeader('Authorization', leave.token);
      if (type === 'POST') {
        xhr.send(JSON.stringify(params));
      } else {
        xhr.send();
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status <= 300) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(JSON.parse(xhr.response));
          }
        }
      };
    });
  };
  let parseTime = function (time, cFormat = '{y}-{m}-{d} {h}:{i}:{s}') {
    if (arguments.length === 0 || !time) {
      return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
      date = time;
    } else {
      if (typeof time === 'string') {
        if (/^[0-9]+$/.test(time)) {
          time = parseInt(time);
        } else {
          time = time.replace(new RegExp(/-/gm), '/');
        }
      }
      if (typeof time === 'number' && time.toString().length <= 10) {
        time = time * 1000;
      }
      date = new Date(time);
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    };
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
      const value = formatObj[key];
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value];
      }
      return value.toString().padStart(2, '0');
    });
    return time_str;
  };
  let createContainer = function (node = 'body') {
    var _a2;
    let div = document.querySelector('#leaveContainer');
    if (div) {
      return div;
    }
    div = document.createElement('div');
    div.className = 'leave-container';
    div.id = 'leaveContainer';
    if (node != 'body') {
      div.style.width = '100%';
      div.style.height = '100%';
    } else {
      div.className += ' fiexd_jh';
    }
    div.innerHTML = `
      <section class="reply_box clearfix">
        <div class="mac_msg_r">
          <div class="msg_tit">我要留言
            <div id="toggle_jh" style="position: absolute;top: 12px;right: 56px;margin: 1px;
              width: 20px;height: 20px;line-height: 24px;background: #000;font-size: 11px;text-align: center;border-radius: 50%;">
              <a href="javascript:;" class="svg" style="color:white;text-decoration:none;">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg>
              </a>
            </div>
            <div id="close_jh" style="position: absolute;top: 12px;right: 24px;margin: 1px;
              width: 20px;height: 20px;line-height: 26px;background: #000;font-size: 11px;text-align: center;border-radius: 50%;">
              <a href="javascript:;" style="color:white;text-decoration:none;">
                ${svg_close}
              </a>
            </div>
          </div>
          <div class="gbook_form" style="background: ${leave.color};" id="jh_content">
            <textarea class="gbook_content" id="leaveInput" name="gbook_content" placeholder="请带上豆瓣ID,方便整理去重"></textarea>
            <div class="msg_code">
              <div style="display: flex;align-items: center;">
                <span>验证码：</span>
                <input type="text" autocomplete="off" name="verify" class="captcha_Input" style="outline: none;">
                <div style="margin-left: 8px;cursor: pointer;position: relative;" id="captchaBox">
                  获取验证码
                  <img src="" id="captchaImage" class="mac_verify_img" />
                </div>
              </div>
              <div class="remaining-w fr"><span class="gbook_remaining remaining" id="residue">0</span>/200</div>
            </div>
            <input type="button" class="gbook_submit submit_btn" id="leave_js_submit" value="提交留言">
          </div>
        </div>
      </section>
      <section class="reply_box clearfix" style="position: relative;padding-bottom: 12px;" id="leaveContent">
        <div style="position: absolute;width: calc(100% - 12px);height: 100%;
          background: ${leave.color};z-index: -1;left: 6px;"></div>
        <div class="mac_msg_l" id="leaveMsg">
        </div>
      </section>
      `;
    (_a2 = document.querySelector(node)) == null
      ? void 0
      : _a2.appendChild(div);
    return div;
  };
  let createMsgContainer = function (_info) {
    let _msg = document.querySelector('#leaveMsg');
    div = document.createElement('div');
    div.className = 'mac_msg_item';
    div.innerHTML = `
      <div class="msg_list" >
        <div class="msg_reply">
          <p class="msg_title">
            <strong>
              <a class="name" href="javascript:;">${
                _info.username || '默认用户'
              }</a>
            </strong>
            <span class="time">${parseTime(_info.createAt)}</span>
          </p>
          <div class="msg_cont">${_info.content || '暂无'}</div>
        </div>
        <div class="reply_answer" style="display:${
          _info.reply ? 'block' : 'none'
        };">
          <p class="msg_title">
            <strong>站长回复：</strong>
            <span class="time">${parseTime(_info.replyTime) || '-'}</span>
          </p>
          <div class="msg_cont">${_info.reply || '-'}</div>
        </div>
      </div>`;
    _msg.appendChild(div);
  };
  let createPagination = function (total, page) {
    if (total == 0) {
      document.querySelector('#leaveContent').style.display = 'none';
      return;
    }
    if (total <= 10) return;
    var _a2;
    let div = document.querySelector('#leavePagination');
    if (div) {
      document.querySelector('#pageList').innerHTML = '';
      let num = Math.ceil(total / 10);
      pagefn(page, num);
      // document.querySelector('#leavePagination').innerHTML = '';
      // return div;
    } else {
      div = document.createElement('div');
      div.className = 'leave-pagination';
      div.id = 'leavePagination';
      div.innerHTML = `<div style="margin:12px 0 0 0;">
      <div style="display: flex;justify-content: center;gap:0 8px;" class="container1 common-style home-page">
        <div class="mac_msg_page-number last-btn" id="start_jh">
          <a class="home-page-change-a">首页</a>
        </div>
        <div class="mac_msg_page-number" id="last_jh">
          <a class="home-page-change-a">上一页</a>
        </div>
        <div id="pageList" style="display: flex;gap:0 8px;" class="home-page"></div>
        <div class="mac_msg_page-number" id="next_jh">
          <a class="home-page-change-a">下一页</a>
        </div>
        <div class="mac_msg_page-number last-btn" id="end_jh">
          <a class="home-page-change-a">尾页</a>
        </div>
      </div>`;
      (_a2 = document.querySelector('#leaveContent')) == null
        ? void 0
        : _a2.appendChild(div);
      setTimeout(() => {
        let num = Math.ceil(total / 10);
        pagefn(page, num);
      }, 100);
    }
  };
  let pagefn = function (page, num) {
    // console.log(page, num, '====')
    const parent = document.querySelector('#pageList');
    function createli(start, end) {
      for (let a = start; a <= end; a++) {
        let li = document.createElement('a');
        li.innerHTML = a;
        li.className = 'mac_msg_page-number';
        if (page === a) {
          li.className += ' selected';
        }
        li.onclick = () => {
          leave.fetch(a);
        };
        parent.appendChild(li);
      }
    }
    if (num > 5) {
      if (page <= 3) {
        createli(1, 5);
      } else if (page >= num - 2) {
        createli(num - 4, num);
      } else {
        createli(page - 2, page + 2);
      }
    } else {
      createli(1, num);
    }
    var last_jh = document.querySelector('#last_jh');
    var next_jh = document.querySelector('#next_jh');
    var end_jh = document.querySelector('#end_jh');
    var start_jh = document.querySelector('#start_jh');
    start_jh.onclick = function () {
      if (page == 1) return false;
      leave.fetch(1);
      console.log('start_jh');
      return;
    };
    end_jh.onclick = function () {
      if (page == num) return false;
      console.log('end_jh');
      leave.fetch(num);
      return;
    };
    if (page > 1) {
      last_jh.className = 'mac_msg_page-number';
      last_jh.onclick = () => {
        leave.fetch(page - 1);
        console.log('last_jh');
      };
    } else {
      last_jh.className += ' disabled';
      last_jh.onclick = () => {};
    }
    if (num === page) {
      next_jh.className += ' disabled';
      next_jh.onclick = () => {};
    } else {
      next_jh.className = 'mac_msg_page-number';
      next_jh.onclick = () => {
        leave.fetch(page + 1);
        console.log('next_jh');
      };
    }
  };
  let createStyletag = function () {
    var _a2;
    if (document.querySelector('#leaveStyle')) {
      return;
    }
    const style = document.createElement('style');
    style.id = 'leaveStyle';
    style.innerText = _styleText;
    (_a2 = document.querySelector('head')) == null
      ? void 0
      : _a2.appendChild(style);
  };
  let toast = function (msg, duration) {
    duration = isNaN(duration) ? 2000 : duration;
    let prompt = document.createElement('div');
    prompt.innerHTML = msg;
    prompt.style.cssText =
      'font-size:14px;color:Snow;background-color:rgba(0, 0, 0, 0.6);padding: 8px 20px;border-radius: 4px;position: fixed;top: 50%;left: 50%;text-align: center;';
    document.body.appendChild(prompt);
    setTimeout(function () {
      document.body.removeChild(prompt);
    }, duration);
  };
  let svg_close = `<svg t="1682240810163" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9189" width="14" height="14">
      <path d="M601.376 512l191.52-191.52c28.096-28.096 30.976-71.168 6.4-95.744s-67.68-21.696-95.744 6.4l-191.52 191.52-191.52-191.52c-28.096-28.096-71.168-30.976-95.744-6.368s-21.696 67.68 6.4 95.744l191.52 191.52-191.52 191.52c-28.096 28.096-30.976 71.168-6.368 95.744s67.68 21.696 95.744-6.4l191.52-191.52 191.52 191.52c28.096 28.096 71.168 30.976 95.744 6.4s21.696-67.68-6.4-95.744l-191.52-191.52z" fill="#fff" p-id="9190">
      </path>
    </svg>`;
  let svg_down =
    '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8 316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496z"></path></svg>';
  let svg_up = `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728=""><path fill="currentColor" d="M104.704 685.248a64 64 0 0 0 90.496 0l316.8-316.8 316.8 316.8a64 64 0 0 0 90.496-90.496L557.248 232.704a64 64 0 0 0-90.496 0L104.704 594.752a64 64 0 0 0 0 90.496z"></path></svg>`;
  const service_script = document.querySelector('#leave_js');
  // console.log(service_script);
  const _location = service_script.getAttribute('src').includes('http')
    ? new URL(
        (service_script == null
          ? void 0
          : service_script.getAttribute('src')) || location.href
      )
    : location.href;
  // console.log(_location);
  const leave = {
    position: 'fiexd',
    container: '',
    // host: 'http://192.168.2.71',
    host: _location == null ? void 0 : _location.origin,
    captchaId: '',
    token: '',
    color: '',
    fold: false,
    open: function (_dom, color, token) {
      leave.token = token;
      leave.color = color;
      let div = document.querySelector('#leaveContainer');
      if (div) return false
      xhrRequset(leave.host + '/openapi/messageBoard/open', 'GET')
        .then(() => {
          leave.container = createContainer(_dom ? _dom : 'body');
          document
            .querySelector('#leaveInput')
            .addEventListener('keydown', function (event) {
              let _val = document.querySelector('#leaveInput').value;
              // document.querySelector('#leaveInput').value = _val.slice(0, 19)
              document.querySelector('#residue').innerText = (_val.length + 1)
                // 200 - (_val.length + 1);
              // if (event.keyCode === 13) {
              //   leave.add();
              //   console.log('触发按钮！', _val);
              // }
            });
          //关闭
          document
            .querySelector('#close_jh')
            .addEventListener('click', function () {
              // document.querySelector('#leaveContainer').style.display = 'none';
              // document.querySelector('#leaveContainer').innerHTML = '';
              document.body.removeChild(document.querySelector('#leaveContainer'))
            });
          //折叠
          document
            .querySelector('#toggle_jh')
            .addEventListener('click', function () {
              if (leave.fold) {
                document.querySelector('#toggle_jh .svg').innerHTML = svg_down;
                document.querySelector('#jh_content').style.display = 'block';
                document.querySelector('#leaveContent').style.display = 'block';
              } else {
                document.querySelector('#toggle_jh .svg').innerHTML = svg_up;
                document.querySelector('#jh_content').style.display = 'none';
                document.querySelector('#leaveContent').style.display = 'none';
              }
              leave.fold = !leave.fold;
            });
          //获取焦点
          document
            .querySelector('.captcha_Input')
            .addEventListener('focus', function () {
              if (leave.captchaId) return;
              leave.captcha();
            });
          //获取验证码
          document
            .querySelector('#captchaBox')
            .addEventListener('click', function () {
              // if (leave.captchaId) return;
              leave.captcha();
            });
          //提交按钮
          document
            .querySelector('#leave_js_submit')
            .addEventListener('click', function () {
              leave.add();
            });
          leave.fetch();
        })
        .catch(err => {
          // console.log(err, '===')
          toast(err.message);
        });
    },
    add: function () {
      let _val = document
        .querySelector('#leaveInput')
        .value.replace(/^\n+|\n+$/g, '');
      let captcha = document.querySelector('.captcha_Input').value;
      if (!_val) {
        toast('内容不能为空！');
        return;
      }
      if (!captcha) {
        toast('验证码不能为空！');
        return;
      }
      if (_val.length > 200) {
        toast('留言内容长度不能超过200个字符！');
        return;
      }
      xhrRequset(leave.host + '/openapi/messageBoard/add', 'POST', {
        content: _val,
        id: leave.captchaId,
        captcha: captcha,
      })
        .then(res => {
          toast(res, 1500);
          document.querySelector('#captchaImage').style.display = 'none';
          document.querySelector('.captcha_Input').value = '';
          document.querySelector('#leaveInput').value = '';
          leave.captchaId = '';
          document.querySelector('#residue').innerText = 200;
          leave.fetch();
          console.log(res, '===提交===');
        })
        .catch(err => {
          if (err.message == '验证码不正确') {
            document.querySelector('.captcha_Input').value = '';
            toast(err.message);
            leave.captcha();
          }
        });
    },
    captcha: function () {
      xhrRequset(leave.host + '/openapi/captcha', 'GET').then(res => {
        document.querySelector('#captchaImage').style.display = 'block';
        leave.captchaId = res.id;
        document.querySelector('#captchaImage').src = res.img;
      });
    },
    fetch: function (page = 1) {
      xhrRequset(leave.host + '/openapi/messageBoard/list', 'GET', {
        limit: 10,
        page: page,
      }).then(async res => {
        createPagination(res.total, page);
        document.querySelector('#leaveMsg').innerHTML = '';
        let list = res.list;
        for (let i in list) {
          await createMsgContainer(list[i]);
        }
        // console.log(res, '==');
      });
    },
  };
  _window.leaveMag = leave;
  createStyletag();
})(window);

// console.log(window.leaveMag, '===');
