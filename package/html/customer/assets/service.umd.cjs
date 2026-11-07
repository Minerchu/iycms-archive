(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  var _db, _name, _store, store_fn;
  "use strict";var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

  class Db {
    constructor(tableName) {
      __privateAdd(this, _store);
      __privateAdd(this, _db, void 0);
      //私有属性，只有实例本身可以调用
      __privateAdd(this, _name, "messageList");
      if (!window.indexedDB) {
        throw new Error("当前浏览器不支持indexedDB");
      } else {
        let req = window.indexedDB.open(tableName, 1);
        req.onerror = (event) => console.error(event);
        req.onsuccess = (event) => {
          __privateSet(this, _db, req.result);
        };
        req.onupgradeneeded = (event) => {
          var _a;
          __privateSet(this, _db, req.result);
          if (!((_a = __privateGet(this, _db)) == null ? void 0 : _a.objectStoreNames.hasOwnProperty(__privateGet(this, _name)))) {
            let store = __privateGet(this, _db).createObjectStore(__privateGet(this, _name), {
              keyPath: "mid"
            });
            store.createIndex("mid", "mid", { unique: true });
            store.createIndex("type", "type", { unique: false });
            store.createIndex("content", "content", { unique: false });
            store.createIndex("category", "category", { unique: false });
            store.createIndex("time", "time", { unique: false });
            store.createIndex("prevMid", "prevMid", { unique: false });
          }
        };
      }
    }
    get() {
      return new Promise((resolve, reject) => {
        var _a;
        let getter = (_a = __privateMethod(this, _store, store_fn).call(this, "readonly")) == null ? void 0 : _a.getAll();
        if (getter) {
          getter.onsuccess = () => {
            resolve((getter == null ? void 0 : getter.result) || []);
          };
        } else {
          resolve([]);
        }
      });
    }
    set(obj, prevMid) {
      var _a;
      (_a = __privateMethod(this, _store, store_fn).call(this, "readwrite")) == null ? void 0 : _a.add({
        mid: obj.mid,
        type: obj.type,
        content: obj.content,
        category: obj.category,
        time: obj.attach.time,
        prevMid
      });
    }
  }
  _db = new WeakMap();
  _name = new WeakMap();
  _store = new WeakSet();
  store_fn = function(t) {
    var _a;
    return (_a = __privateGet(this, _db)) == null ? void 0 : _a.transaction(__privateGet(this, _name), t).objectStore(__privateGet(this, _name));
  };
  const styleText = `
@media screen and (max-width: 600px) {
  .cmskefu_service_container {
      width:300px
  }
}
@media screen and (min-width: 601px) {
  .cmskefu_service_container {
      width:400px
  }
}
.cmskefu_service_container *{
  box-sizing: initial;
  position:relative;
  }
  .cmskefu_service_container input:-internal-autofill-previewed, .cmskefu_service_container input:-internal-autofill-selected {
    transition: background-color 5000s ease-in-out 0s !important;
  }
  .cmskefu_service_container .cmskefu_login-box{
    background-image: linear-gradient(180deg, #5FA6FF 0%, #84C1FF 100%);
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    z-index:2;
    padding:30px;
    display:none;
    box-sizing: border-box;
  }
  .cmskefu_service_container .cmskefu_login-box button{
    line-height: 40px;
    background: #5B8FF9;
    border-radius: 4px;
    background-color:#5B8FF9;
    width:100%;
    border:0;
    font-size: 14px;
    color: #FFFFFF;
    margin-bottom:24px;
  }
  .cmskefu_service_container .cmskefu_login-box .service-sign-up{
    font-size: 14px;
    color: #5B8FF9;
    cursor: pointer;
  }
  .cmskefu_service_container .cmskefu_login-box .service-welcome{
    font-size: 18px;
    color: #333333;
    font-weight: 700;
    display:flex;
    align-items:center;
    gap:8px;
    margin:0;
    margin-bottom:10px;
  }
  .cmskefu_service_container .cmskefu_login-box form{
    width:100%;
    height:100%;
    background: #FFFFFF;
    padding:32px 40px;
    box-sizing: border-box;
  }
  .cmskefu_service_container .cmskefu_login-box form input{
    font-size: 14px;
    color: #666666;
    outline: none;
    border: none;
    width:100%;
    background-color: inherit;
  }
  .cmskefu_service_container .cmskefu_login-box form .service-form-input-box svg{
    width:16px;
  }
  .service-form-input-box{
    display:flex;
    height:40px;
    align-items:center;
    margin-bottom:24px;
    margin-top:10px;
    gap:8px;
    padding:0 8px;
    background: #F1F1F1;
    border-radius: 4px;
  }
  .cmskefu_service_container .cmskefu_login-box form .service-label{
    font-size: 14px;
    color: #666666;
    margin:0;
    white-space: nowrap;
  }
  .cmskefu_service_container .loading-box{
    background-color: rgba(122, 122, 122, 0.2);
    position: absolute;
    flex-wrap:wrap;
    width:100%;
    height:100%;
    align-content: center;
    display:flex;
    align-items:center;
    justify-content:center;
    left:0;
    top:0;
    // height:341px;
    z-index:10
  }
  .cmskefu_service_container .loading-box .loading-dia {
    width: 70px;
    height: 35px;
    overflow: hidden;
  }
  .cmskefu_service_container .loading-box > p{
    font-size:14px;
    color:#5B8FF9
  }
  .cmskefu_service_container .service-loader {
    width: 70px;
    height: 70px;
    border-style: solid;
    border-top-color: #5B8FF9;
    border-right-color: #5B8FF9;
    border-left-color: transparent;
    border-bottom-color: transparent;
    border-radius: 50%;
    box-sizing: border-box;
    animation: rotate 3s ease-in-out infinite;
    transform: rotate(-200deg)
  }
  @keyframes rotate {
    0% { border-width: 10px; }
    25% { border-width: 3px; }
    50% { 
      transform: rotate(115deg); 
      border-width: 10px;
    }
    75% { border-width: 3px;}
    100% { border-width: 10px;}
  }
  .cmskefu_service_container .sys-notice {
    color: #d8d8d8;
    text-align: center;
    width: 100%;
    font-size: 12px;
    display:flex;
    justify-content: center;
  }
  .cmskefu_service_container .sys-notice > .line{
    display: inline-block;
    flex:1;
    border-top:1px solid;
    height:0;
    align-self: center;
    max-width: 80px;
  }
  .cmskefu_service_container a{
    color: -webkit-link;
    text-decoration: underline;
  }
  .cmskefu_service_container .order .title {
  font-size: 14px;
  padding-top: 6px;
  color: #444444;
  }
  #servic-labels{
    scrollbar-width: none;
    -ms-overflow-style:none;
    overflow:auto;
    height:31px;
    box-sizing:border-box
  }
  #servic-labels::-webkit-scrollbar{display:none}
  .cmskefu_service_container .order .type {
  background-image: linear-gradient(135deg, #fefdf9 0%, #fdf1d9 100%);
  border: 1px solid rgba(251, 226, 185, 1);
  border-radius: 4px;
  gap: 8px;
  display: flex;
  align-items: center;
  padding:0 10px;
  }
  .cmskefu_service_container .order .type .icon {
  width: 24px;
  height: 24px;
  }
  .cmskefu_service_container .order .type .info {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #88542d;
  padding: 13px 0;
  gap: 8px;
  }
  .cmskefu_service_container .order .time,
  .cmskefu_service_container .order .num {
  font-size: 12px;
  color: #666666;
  }
  .cmskefu_service_container .order .btn {
  padding-top: 18px;
  padding-bottom: 7px;
  margin-top: 8px;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  color: #ff8d19;
  position: relative;
  }
  .cmskefu_service_container .order .btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ededed;
  }
  .cmskefu_service_container .order {
  // background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  gap: 16px;
  line-height: 1;
  //width: 250px;
  }
  
  .cmskefu_service_container{
    font-size:1vw;
  position: fixed;
  display:flex;
  flex-direction: column;
  bottom:0;
  right:0;
  color:white;
  z-index:9999;
  border-radius: 4px 4px 0 0;
  overflow:hidden;
  display:none;
  box-shadow:0px 3px 13px 6px rgba(94,94,94,0.1);
  font-family:"Microsoft Yahei";
  }
  .cmskefu_service_container .cmskefu_header{
  height:60px;
  background-color: #5B8FF9;
  display:flex;
  align-items: center;
  padding:0 16px;
  }
  .cmskefu_service_container .cmskefu_message{
  background-color: #f5f5f5;
  color:#333333;
  font-size:12px;
  padding: 16px;
  overflow:auto;
  position:relative;
  box-sizing: border-box;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_content img{
  width: max-content;
  max-width:12vw !important;
  height:auto !important;
  width: max-content;
  }
  .cmskefu_service_container .cmskefu_message p{
  margin:0
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item{
  display:flex;
  gap:8px;
  margin-bottom:16px;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item .time{
    color:#999999 !important;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item.cmskefu_post{
  flex-direction: row-reverse;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item.cmskefu_post .cmskefu_content{
    margin-left: auto;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item.cmskefu_post .time{
  text-align:right
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item .cmskefu_content{
  background:white;
  padding:12px 10px;
  border-radius: 4px;
  position:relative;
  display: block;
  word-break:break-all;
  width: fit-content;
  max-width: calc(100% - 50px);
  // overflow:hidden;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item .cmskefu_content .read{
  position:absolute;
  color:#c5c5c5;
  right:-32px;
  bottom:0;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item .cmskefu_content .noread{
  position:absolute;                  
  color: #fa8c16;
  right:-32px;
  bottom:0;
  }
  .cmskefu_service_container .cmskefu_item.cmskefu_post .read,
  .cmskefu_service_container .cmskefu_item.cmskefu_post .noread{
  left:-32px;
  }
  
  .cmskefu_service_container .cmskefu_message .cmskefu_item .cmskefu_content .err{
  position: absolute;
  bottom: 12px;
  right: -18px;
  display: block;
  width: 12px;
  line-height: 12px;
  text-align: center;
  color: white;
  background: #f56c6c;
  border-radius: 50%;
  font-weight: bold;
  }
  .cmskefu_service_container .cmskefu_message .cmskefu_item.cmskefu_post .cmskefu_content .err{
  left: -18px;
  }
  .cmskefu_service_container .cmskefu_bottom{
  height:131px;
  background-color: white;
  color:#BABABA;
  box-shadow: 0px 4px 8px 0px rgba(94,94,94,0.1);
  padding:16px;
  border-top: 1px solid #E1E1E1;
  box-sizing: border-box;
  }
  .cmskefu_service_container .cmskefu_bottom .icons {
  display:flex;
  gap:24px;
  }
  .cmskefu_service_container .cmskefu_bottom .icons svg{
  width:20px;
  height:20px;
  cursor: pointer;
  }
  .cmskefu_service_container .cmskefu_header .cmskefu_service-avatar{
  width:40px;
  margin-right: 7px;
  height:40px;
  object-fit: cover;
  }
  .cmskefu_service_container .cmskefu_service-avatar{
  border-radius: 50%;
  width:36px;
  height:36px;
  object-fit: cover;
  }
  .cmskefu_service_container .cmskefu_service-name{
  font-size: 16px;
  color: #FFFFFF;
  }
  .cmskefu_service_container .cmskefu_none{
  box-sizing: initial;
  margin-left: auto;
  width:16px;
  height:2px;
  background-color: white;
  cursor: pointer;
  padding: 10px;
  background-clip: content-box;
  }
  .cmskefu_service_container .cmskefu_close{
  position:relative;
  padding:12px;
  cursor: pointer;
  }
  .cmskefu_service_container .cmskefu_close::before{
    position: absolute;
    content: '';
    width: 16px;
    height: 2px;
    transform: rotate(45deg);
    left: 4px;
    top: 12px;
    background: white;
  }
  .cmskefu_service_container .cmskefu_close::after{
    position: absolute;
    content: '';
    width: 16px;
    height: 2px;
    transform: rotate(135deg);
    left: 4px;
    top: 12px;
    background: white;
  }
  .cmskefu_service_container .open{
    width:8px;
    height:8px;
    background-color: initial;
    border: 2px solid white;
    padding: 0;
  }
  .cmskefu_service_container textarea{
  width: 100%;
  border: 0;
  box-shadow: none;
  outline: none;
  font-size: 12px;
  resize:none;
  color: initial;
  text-align:left;
  padding:0px;
  float:none;
  }
  .cmskefu_service_container .cmskefu_message p.time{
  color: #999999 !important;
  margin-bottom: 8px;
  }
  .cmskefu_service_container .cmskefu_bottom .send{
  border: 1px solid rgba(196,196,196,1);
  border-radius: 4px;
  color:#BABABA;
  font-size: 12px;
  text-align: center;
  width:50px;
  line-height: 24px;
  margin:0px;
  margin-left: auto;
  cursor: not-allowed;
  }
  
  #cmskefu_showKefuIcon{
    width:50px;
    height:50px;
    display:flex;
    justify-content:center;
    align-items:center;
    position:fixed;
    bottom:5vh;
    right:2vh;
    border-radius: 50%;
  }
  #cmskefu_showKefuIcon img{
    cursor:pointer;
    width:100%;
    height:100%
  }
  #cmskefu_new_mes_num{
      background-color: #f25a5a;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 20px;
      border-radius: 50%;
      font-size: 14px;
      color: white;
      position: absolute;
      right: -2px;
      top: -2px;
      display:none;
  }
  .cmskefu_kefu_comp{
    font-size:14px;
    position: absolute;
    left: 50%;
    width: 100px;
    margin:0px;
    padding:0px;
    margin-left: -50px;
    text-align: center;
  }
  .cmskefu_login_close{
    position:absolute !important;
    right:2px;
    top:7px;
  }
  `;
  const serviceIcon = window.serviceIcon = {
    userDefAvatar: `data:image/png;base64,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`,
    defaultServiceAvatar: `data:image/png;base64,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`,
    videoSvg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="ser_uploadVideo" class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z"  /><path fill="#333333" d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z"  /><path fill="#333333" d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z"  /></svg>`,
    imgSvg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg id="ser_uploadImg" class="icon" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path fill="#333333" d="M938.666667 553.92V768c0 64.8-52.533333 117.333333-117.333334 117.333333H202.666667c-64.8 0-117.333333-52.533333-117.333334-117.333333V256c0-64.8 52.533333-117.333333 117.333334-117.333333h618.666666c64.8 0 117.333333 52.533333 117.333334 117.333333v297.92z m-64-74.624V256a53.333333 53.333333 0 0 0-53.333334-53.333333H202.666667a53.333333 53.333333 0 0 0-53.333334 53.333333v344.48A290.090667 290.090667 0 0 1 192 597.333333a286.88 286.88 0 0 1 183.296 65.845334C427.029333 528.384 556.906667 437.333333 704 437.333333c65.706667 0 126.997333 16.778667 170.666667 41.962667z m0 82.24c-5.333333-8.32-21.130667-21.653333-43.648-32.917333C796.768 511.488 753.045333 501.333333 704 501.333333c-121.770667 0-229.130667 76.266667-270.432 188.693334-2.730667 7.445333-7.402667 20.32-13.994667 38.581333-7.68 21.301333-34.453333 28.106667-51.370666 13.056-16.437333-14.634667-28.554667-25.066667-36.138667-31.146667A222.890667 222.890667 0 0 0 192 661.333333c-14.464 0-28.725333 1.365333-42.666667 4.053334V768a53.333333 53.333333 0 0 0 53.333334 53.333333h618.666666a53.333333 53.333333 0 0 0 53.333334-53.333333V561.525333zM320 480a96 96 0 1 1 0-192 96 96 0 0 1 0 192z m0-64a32 32 0 1 0 0-64 32 32 0 0 0 0 64z" /></svg>`,
    huangguan: `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>皇冠</title><defs><linearGradient x1="26.3468951%" y1="26.0201785%" x2="87.2684154%" y2="90.1749147%" id="linearGradient-1"><stop stop-color="#FFEABE" offset="0%"></stop><stop stop-color="#FFBE70" offset="100%"></stop></linearGradient><linearGradient x1="9.41799524%" y1="7.4411239%" x2="69.4543709%" y2="66.2159836%" id="linearGradient-2"><stop stop-color="#FFAC4B" offset="0%"></stop><stop stop-color="#DA6215" offset="100%"></stop></linearGradient></defs><g id="客服工作台" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="客服-充值记录" transform="translate(-1176.000000, -229.000000)"><g id="编组-9" transform="translate(1166.000000, 211.000000)"><g id="皇冠" transform="translate(10.000000, 18.000000)"><polygon id="路径" points="0 0 24 0 24 24 0 24"></polygon><path d="M11.3468132,3.70956756 C11.9153697,3.5 12.0669707,3.57806058 12.1609558,3.70976736 L12.1609558,3.70976736 L16.6283549,9.9636992 L21.2307725,6.89542049 C21.311913,6.84143683 21.4050408,6.81348974 21.4986457,6.81178842 C21.5922505,6.81008711 21.6863324,6.83463157 21.769381,6.88563102 C21.8524296,6.93663046 21.9168746,7.00943611 21.9576965,7.09368776 C21.9985183,7.1779394 22.0157169,7.27363705 22.0042371,7.37072069 L22.0042371,7.37072069 L20.3612472,21.3376351 C20.3464167,21.4635212 20.2856566,21.5739076 20.1969135,21.6528201 C20.1082031,21.7317036 19.9915252,21.7791351 19.8648132,21.7791351 L19.8648132,21.7791351 L3.64281317,21.7791351 C3.51610119,21.7791351 3.3994232,21.7317036 3.31071285,21.6528201 C3.2219697,21.5739076 3.16120965,21.4635212 3.14638969,21.3377248 L3.14638969,21.3377248 L1.50341764,7.36996296 C1.49208554,7.27322303 1.50936217,7.17759607 1.55022795,7.09342135 C1.59109373,7.00924662 1.65554865,6.93652413 1.73857313,6.88559315 C1.82159762,6.83466216 1.91563284,6.81015961 2.00918739,6.8118748 C2.10274194,6.81359 2.19581583,6.84152294 2.27646307,6.89516027 L2.27646307,6.89516027 L6.87927144,9.96369919 Z" id="形状" stroke="#D6A942" fill="url(#linearGradient-1)" fill-rule="nonzero"></path><g id="V" transform="translate(7.526855, 11.625977)" fill="url(#linearGradient-2)" fill-rule="nonzero"><polygon id="路径" points="0 0 2.54589844 0 4.31835938 5.66650391 6.06396484 0 8.53466797 0 5.61279297 7.87402344 2.97558594 7.87402344"></polygon></g></g></g></g></g></svg>`,
    password: `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>密码</title>
      <g id="用户聊天留言" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="第三方客服登录" transform="translate(-1598.000000, -853.000000)" fill="#C3C3C3" fill-rule="nonzero">
              <g id="密码" transform="translate(1598.000000, 853.000000)">
                  <rect id="矩形" opacity="0" x="0" y="0" width="16" height="16"></rect>
                  <path d="M4.834375,3.8265625 C5.1875,3.8265625 5.475,4.1125 5.475,4.4671875 L5.475,7.1359375 C5.475,7.4890625 5.1890625,7.7765625 4.834375,7.7765625 C4.48125,7.7765625 4.19375,7.490625 4.19375,7.1359375 L4.19375,4.4671875 C4.1953125,4.1140625 4.48125,3.8265625 4.834375,3.8265625 Z M11.1484375,3.7640625 C11.5015625,3.7640625 11.7890625,4.05 11.7890625,4.4046875 L11.7890625,4.7703125 C11.7890625,5.1234375 11.503125,5.4109375 11.1484375,5.4109375 C10.7953125,5.4109375 10.5078125,5.125 10.5078125,4.7703125 L10.5078125,4.4046875 C10.509375,4.0515625 10.7953125,3.7640625 11.1484375,3.7640625 L11.1484375,3.7640625 Z" id="形状"></path>
                  <path d="M7.9921875,1.8890625 C9.3828125,1.8890625 10.509375,3.015625 10.509375,4.40625 L11.7890625,4.40625 C11.7890625,2.309375 10.0890625,0.609375 7.9921875,0.609375 C5.8953125,0.609375 4.1953125,2.309375 4.1953125,4.40625 L5.475,4.40625 C5.475,3.015625 6.6015625,1.8890625 7.9921875,1.8890625 Z M13.709375,14.571875 L13.709375,7.45 C13.65625,6.928125 13.225,6.5171875 12.6953125,6.496875 L3.3234375,6.496875 C2.7375,6.496875 2.2609375,6.971875 2.259375,7.5578125 L2.259375,14.5 C2.321875,14.971875 2.69375,15.346875 3.1640625,15.4140625 L12.875,15.4140625 C13.296875,15.328125 13.628125,14.9953125 13.709375,14.571875 Z" id="形状"></path>
                  <path d="M6.8265625,10.9546875 C6.8265625,10.6015625 7.1125,10.3140625 7.4671875,10.3140625 L8.5015625,10.3140625 C8.8546875,10.3140625 9.1421875,10.6 9.1421875,10.9546875 C9.1421875,11.3078125 8.85625,11.5953125 8.5015625,11.5953125 L7.4671875,11.5953125 C7.1140625,11.59375 6.8265625,11.3078125 6.8265625,10.9546875 L6.8265625,10.9546875 Z" id="路径"></path>
              </g>
          </g>
      </g>
  </svg>`,
    username: `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>账号</title>
      <g id="用户聊天留言" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="第三方客服登录" transform="translate(-1598.000000, -761.000000)" fill="#C3C3C3" fill-rule="nonzero">
              <g id="账号" transform="translate(1598.000000, 761.000000)">
                  <rect id="矩形" opacity="0" x="0" y="0" width="16" height="16"></rect>
                  <path d="M6.36890625,9.04484375 C3.64296875,9.04484375 1.6075,10.8110937 1.6075,13.3760937 L1.6075,13.6525 C1.6075,14.9932812 3.78875,14.9932812 6.55078125,14.9932812 L9.4840625,14.9932812 C12.1364063,14.9932812 14.4273438,14.9932812 14.4273438,13.6525 L14.4273438,13.3760937 C14.4273438,10.8110937 12.3917188,9.04484375 9.6659375,9.04484375 L6.36890625,9.04484375 Z M7.87046875,8.36984375 C10.0296875,8.36984375 11.7865625,6.7165625 11.7865625,4.68328125 C11.7865625,2.65109375 10.0296875,0.99796875 7.87046875,0.99796875 C5.7125,0.99796875 3.95546875,2.65125 3.95546875,4.68328125 C3.95546875,6.7165625 5.7125,8.36984375 7.87046875,8.36984375 Z" id="形状"></path>
              </g>
          </g>
      </g>
  </svg>`,
    welcome: `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>庆祝</title>
      <g id="用户聊天留言" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="第三方客服登录" transform="translate(-1590.000000, -642.000000)" fill="#5B8FF9" fill-rule="nonzero">
              <g id="庆祝" transform="translate(1590.000000, 642.000000)">
                  <rect id="矩形" opacity="0" x="0" y="0" width="24" height="24"></rect>
                  <path d="M2.85,21.3 L15.45,17.475 L6.675,8.625 L2.85,21.3 Z M10.275,9.45 C10.05,9.45 9.9,9.375 9.75,9.225 C9.45,8.925 9.45,8.475 9.75,8.175 C10.5,7.425 10.5,7.425 9.75,6.75 C9.45,6.45 9.45,6 9.75,5.7 C10.05,5.4 10.5,5.4 10.8,5.7 C12.15,7.05 12.15,7.95 10.8,9.3 C10.725,9.375 10.5,9.45 10.275,9.45 L10.275,9.45 Z M15.45,14.625 C15.225,14.625 15.075,14.55 14.925,14.4 C14.625,14.1 14.625,13.65 14.925,13.35 L15.15,13.125 C15.825,12.45 16.275,12 16.875,12 C17.55,12 18,12.525 18.75,13.2 C19.05,13.5 19.05,13.95 18.75,14.25 C18.45,14.55 18,14.55 17.7,14.25 C17.475,14.025 17.1,13.65 16.875,13.5 C16.725,13.575 16.425,13.875 16.2,14.175 L15.975,14.4 C15.825,14.55 15.675,14.625 15.45,14.625 L15.45,14.625 Z M12,11.175 C11.775,11.175 11.625,11.1 11.475,10.95 C11.175,10.65 11.175,10.2 11.475,9.9 L12.975,8.4 C14.325,7.05 14.325,5.4 12.975,4.05 L12.15,3.225 C11.85,2.925 11.85,2.475 12.15,2.175 C12.45,1.875 12.9,1.875 13.2,2.175 L14.025,3 C15.9,4.875 15.9,7.575 14.025,9.45 L12.525,10.95 C12.45,11.1 12.225,11.175 12,11.175 Z M13.8,12.9 C13.575,12.9 13.425,12.825 13.275,12.675 C12.975,12.375 12.975,11.925 13.275,11.625 L16.425,8.475 C18.825,6.075 20.025,6.975 21.75,8.7 C22.05,9 22.05,9.45 21.75,9.75 C21.45,10.05 21,10.05 20.7,9.75 C19.125,8.175 18.975,8.025 17.475,9.525 L14.325,12.675 C14.175,12.825 13.95,12.9 13.8,12.9 L13.8,12.9 Z" id="形状"></path>
              </g>
          </g>
      </g>
  </svg>`
    // icon: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18px" height="18px" viewBox="0 0 18 18" version="1.1"><title>联系客服</title><g id="首页" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-1891.000000, -2296.000000)" fill="#999999" fill-rule="nonzero" id="联系客服"><g transform="translate(1891.000000, 2296.000000)"><rect id="矩形" opacity="0" x="0" y="0" width="18" height="18"/><path d="M11.8773821,16.0596879 C11.8440519,16.5161987 11.5328575,16.9084643 11.0880203,17.054457 L9.70441514,17.4563514 C9.13144192,17.5944382 8.55196367,17.2529889 8.41044726,16.6937825 C8.40537326,16.6732847 8.40078838,16.6526689 8.39669654,16.6319526 C8.23078629,16.0390779 8.55711615,15.421117 9.14828413,15.2088343 L10.5318893,14.8076323 C10.8969774,14.7028667 11.2899969,14.8110664 11.5500217,15.0879279 C12.6166331,14.6124669 13.4960783,13.797637 14.0513956,12.7703369 L13.6993033,12.7703369 C12.5873955,12.7109061 11.7337886,11.7858567 11.7894516,10.7007418 L11.7894516,8.62910186 C11.7344809,7.54434126 12.5877336,6.61962993 13.6993033,6.56021527 L14.1764241,6.56021527 C14.2447751,6.56021527 14.3131261,6.56398302 14.3808009,6.57188887 C13.6100042,3.69610591 10.5957963,1.97483541 7.64890892,2.72709926 C5.71981587,3.21932327 4.21322716,4.68950639 3.70862108,6.57188887 C3.77635055,6.56404822 3.84447799,6.56014508 3.91265976,6.56019916 L4.39011867,6.56019916 C5.50065784,6.62066045 6.35289613,7.54501752 6.29792549,8.62910186 L6.29792549,10.6979885 C6.35321817,11.7831194 5.49996547,12.7081528 4.38805768,12.7675835 L3.91059877,12.7675835 C2.80039774,12.7071222 1.94819164,11.7837957 2.00245382,10.7000656 L2.00245382,8.62910186 C2.00245382,8.57551594 2.00245382,8.52193002 2.00796055,8.46903647 C2.00441358,8.43640432 2.00257549,8.40360901 2.00245382,8.37078488 C2.00245382,4.29345686 5.16128573,1 9.04384955,1 C12.9267676,1 16.085725,4.29347296 16.085725,8.37080098 C16.085725,8.40343879 16.0835385,8.43641474 16.0797547,8.46905257 C16.0797547,8.52194613 16.085725,8.57553204 16.085725,8.62911796 L16.085725,10.6980046 C16.0926752,11.3498714 15.800183,11.9689245 15.2921157,12.377395 C14.7156968,14.0069189 13.4822063,15.3362619 11.8773821,16.0576108 L11.8773821,16.0596718 L11.8773821,16.0596879 Z" id="路径"/></g></g></g><head xmlns=""/><script xmlns=""/></svg>`,
  };
  (function(window2) {
    const service_script = document.querySelector("#service_js") || null;
    const currentUrl = (service_script == null ? void 0 : service_script.getAttribute("src")) || location.href;
    const _location = currentUrl.includes("http") ? new URL(currentUrl) : new URL(location.href);
    var db = new Db("sss");
    function init() {
      var _a, _b;
      if (!window2.serCtr) {
        let changeBtnType = function() {
          if (serviceInput.value && (window2 == null ? void 0 : window2.serCtr.status) === "connecting") {
            sendBtn == null ? void 0 : sendBtn.setAttribute(
              "style",
              "cursor: pointer;color: #5B8FF9;border-color: #5B8FF9;"
            );
          } else {
            sendBtn == null ? void 0 : sendBtn.removeAttribute("style");
          }
        }, appUpload = function(t) {
          var _a2;
          if (window2.nativeObject) {
            loading(true, "文件上传中...");
            window2.uploadCallback = {
              success: (path) => {
                serCtr.send(path, (fileInput == null ? void 0 : fileInput.dataset._t) === "image" ? 2 : 3, {
                  uploadFn: Promise.resolve()
                });
                loading(false);
              },
              fail: (err) => {
                loading(false);
                err && alert(err);
              }
            };
            (_a2 = window2.nativeObject) == null ? void 0 : _a2.callPhoto(t);
          }
        }, createStyletag = function() {
          var _a2;
          if (document.querySelector("#serviceStyle")) {
            return;
          }
          const style = document.createElement("style");
          style.id = "serviceStyle";
          style.innerText = styleText;
          (_a2 = document.querySelector("head")) == null ? void 0 : _a2.appendChild(style);
        }, createContainer = function() {
          var _a2, _b2;
          let div = document.querySelector("#serviceContainer");
          let div2 = document.querySelector("#cmskefu_showKefuIcon");
          if (div) {
            return div;
          }
          const t = new URLSearchParams(location.search).get("token");
          div = document.createElement("div");
          div.className = "cmskefu_service_container";
          div.id = "serviceContainer";
          if (t) {
            div.style.width = "100%";
            div.style.height = "100%";
          }
          div.innerHTML = `
                          <div class="cmskefu_header">
                              <img src="${serCtr.adicon || serviceIcon.defaultServiceAvatar}" alt="" class="cmskefu_service-avatar" id="serviceAvatar" >
                              <p class="cmskefu_service-name" id="serviceName">客服小助手</p>
                              <p class='cmskefu_kefu_comp'>${serCtr.title}</p>
                              ${t ? "" : `<span class="cmskefu_none" id="closeService"></span>
                              <span onclick="window.serCtr.close()" class='cmskefu_close'></span>`}
                              
                          </div>
                          
                          <div class="cmskefu_message" id="serviceMessage" style="height:${t ? "calc(100% - 222px)" : "309px"}">
                          </div>
                          <div style="background-color: #f5f5f5;color:#5B8FF9;padding:6px 8px;font-size:12px;white-space: nowrap;user-select: none;" id="servic-labels"></div>
                          <div class="loading-box">
                            <div class="loading-dia">
                              <div class="service-loader"></div>
                            </div>
                            <p style="width:100%;text-align:center" class="loading-text">您好,小助手正在努力赶来,请稍候...</p>
                          </div>
                          <div class="cmskefu_login-box">
                          <span onclick="window.serCtr.close()" class='cmskefu_close cmskefu_login_close'></span>
                            <form class="form" id="serviceForm">
                              <p class="service-welcome">${serviceIcon.welcome} 欢迎！</p>
                              <p class="service-label" style="margin-bottom:24px">您正在登录第三方客服系统</p>
                              <p class="service-label">登录账号</p>
                              <div class="service-form-input-box">
                                ${serviceIcon.username}
                                <div style="flex:1 1 0"><input type="text" placeholder="请输入登录账号" name="userName" required></div>
                              </div>
                              <p class="service-label">登录密码</p>
                              <div class="service-form-input-box">
                                ${serviceIcon.password}
                                <div  style="flex:1 1 0"><input type="password" placeholder="请输入登录密码" name="password" required></div>
                              </div>
                              <button type="submit">登录</button>
                              <p class="service-label" style="text-align:center">还没有账号？<span class="service-sign-up" onclick="window.open('${serCtr.location.protocol + "//" + serCtr.location.hostname}')">点击注册</span> </p>
                            </form>
                          </div>
                          <div class="cmskefu_bottom">
                              <div class="icons" id="serviceSelectFileBtns">
                              ${serviceIcon.imgSvg}${serviceIcon.videoSvg}
                              </div>
                              <textarea style="height:48px"  id="serviceInput" placeholder="很高兴为您服务，请描述您的问题"></textarea>
                              <div class="send" id="serviceMessSend">发送</div>
                          </div>
                          <input type="file"  accept=".jpg, .jpeg, .png" id="serviceFile" style="display:none !important">
                      `;
          let eveElement = null;
          if (serCtr.eventid) {
            eveElement = document.getElementById(serCtr.eventid);
            if (eveElement) {
              eveElement.onclick = () => serCtr.open();
              const span = document.createElement("span");
              span.setAttribute("id", "cmskefu_new_mes_num");
              eveElement.appendChild(span);
            }
          }
          if (!serCtr.eventid && (!serCtr.differentSource || serCtr.source === 3)) {
            div2 = document.createElement("div");
            div2.id = "cmskefu_showKefuIcon";
            div2.innerHTML = `<img onclick="window.serCtr.open()" src="${serCtr.adicon || serviceIcon.defaultServiceAvatar}"><span id="cmskefu_new_mes_num"></span>`;
            (_a2 = document.querySelector("body")) == null ? void 0 : _a2.appendChild(div2);
          }
          (_b2 = document.querySelector("body")) == null ? void 0 : _b2.appendChild(div);
          return div;
        }, addMess = function(data, isAfter = true) {
          let content = "";
          switch (data.category) {
            case 1:
              content = serCtr.differentSource ? data.content : data.content.replaceAll('src="', `src="${_location.origin}`);
              break;
            case 7:
              content = data.content;
              break;
            case 2:
              content = `<img src="${serCtr.differentSource ? data.content : _location.origin + data.content}" alt="" style="max-width: 100%">`;
              break;
            case 3:
              content = `<video  webkit-playsinline="" playsinline="" x-webkit-airplay="" x5-playsinline="" src="${data.content}" alt="" style="max-width: 100%" controls></video>`;
              break;
            case 4:
              content = `<video  webkit-playsinline="" playsinline="" x-webkit-airplay="" x5-playsinline="" src="${data.content}" alt="" style="max-width: 100%" controls></video>`;
              break;
            case 5:
              content = `<video  webkit-playsinline="" playsinline="" x-webkit-airplay="" x5-playsinline="" src="${data.content}" alt="" style="max-width: 100%" controls></video>`;
              break;
            case 6:
              let json = {
                title: "",
                amount: 0,
                orderNo: "",
                payAt: "",
                payStatus: 0
              };
              try {
                json = JSON.parse(data.content);
              } catch {
              }
              if (json.type === "withdrawChangeStatus") {
                content = `<div
                style="font-size: 14px; padding: 0 16px;color:#444444"
              >
                <p>
                  亲，您于${parseTime(json.statusAt, "{y}-{m}-{d} {h}:{i}:{s}") || "-"}发起的
                  <span style="color: #4b82fa"> ${json.amount} </span
                  >元 提现状态已更改为
                </p>
                ${json.status === 300 || json.status === 400 ? `<p
                style="margin: 8px 0"
                  >
                  ${json.status === 300 ? `<span style="color: #52c41a">完成</span>` : ""}
                  ${json.status === 400 ? `<span v-if="getJSON(item.content).status === 400"style="color: #ff4d4f">关闭</span>` : ""}
                    
                  </p>` : ""} 
                ${(json.status === 400 || json.status === 300) && json.because ? `<div style="display:flex;line-height:1">
                    <span style="flex-shrink:0">${json.status === 400 ? "关闭原因" : "摘要"}</span>：<div>${json.because}</div>
                  </div>` : ""}
    
              </div>`;
              } else if (json.type === "withdraw") {
                content = `<div
                class="order"
              >
                <p class="title">${data.receiver_role === 2 ? "" : "亲，请核对"}提现信息</p>
                <p class="num">提现金额：￥${json.amount || 0}</p>
                <p class="num">提现状态：
                ${json.status === 100 ? '<span style="color:#f7ad1e">待受理</span>' : ""}
                ${json.status === 200 ? '<span style="color:#4e83f7">处理中</span>' : ""}
                ${json.status === 300 ? '<span style="color:#55c31f">已完成</span>' : ""}
                ${json.status === 400 ? '<span style="color:#d9d9d9">已关闭</span>' : ""}
    
                </p>
                <p class="num">手续费：${json.handleFee || "-"}</p>
                <p class="num">提现地址：${json.address || "-"}</p>
                <p class="order-time">
                  创建时间：${parseTime(json.statusAt, "{y}-{m}-{d} {h}:{i}:{s}") || "-"}
                </p>
                <!-- <div class="btn">查看订单</div> -->
              </div>`;
              } else if (json.type === "commission") {
                content = `<div
                class="order"
              >
                <p class="title">${data.receiver_role === 2 ? "" : "亲，请核对"}佣金信息</p>
                <p class="num">订单号：${json.orderNo || "-"}</p>
                <p class="num">充值账号：${json.rechargeUsername || "-"}</p>
                <p class="num">获得佣金：￥${json.amount || 0}</p>
                <p class="order-time">
                  提成时间：${parseTime(json.timeAt, "{y}-{m}-{d} {h}:{i}:{s}") || "-"}
                </p>
              </div>`;
              } else {
                content = `
              <div class="order">
                <p class="title">${data.receiver_role === 2 ? "" : "亲，请核对"}订单信息</p>
                <div class="type">
                  <div class="serviceIcon">
                  ${serviceIcon.huangguan}
                  </div>
                  <div class="info">
                    <p>
                    ${json.title}
                    ${json.payStatus === 1 ? '<span style="color: #faad14;font-size: 12px;margin-left:12px;">待付款</span>' : json.payStatus === 2 ? '<span style="color: #52c41a;font-size: 12px;margin-left:12px;" >成功</span>' : json.payStatus === 3 ? '<span style="color: #ff4d4f;font-size: 12px;margin-left:12px;" >失败</span>' : ""}                      
                    </p>
                    <p>合计：￥${json.amount}</p>
                  </div>
                </div>
                <p class="num">订单号：${json.orderNo}</p>
                <p class="time">创建时间：${parseTime(json.payAt, "{y}-{m}-{d} {h}:{i}:{s}") || "-"}</p>
              </div>
            `;
              }
              break;
          }
          let div;
          if (data.mid) {
            div = document.querySelector(`[data-mes="${data.mid}"]`);
          }
          let needAppend = !div;
          div || (div = document.createElement("div"));
          div.className = data.receiver_role === 2 ? "cmskefu_item cmskefu_post" : "cmskefu_item";
          if (data.mid) {
            div.dataset.mes = `${data.mid}`;
          }
          if (data.category === 7) {
            div.innerHTML = `<div class="sys-notice">
          <span class="line"></span><span
            style="vertical-align: middle; color: #666666;max-width: 60%;"
            
          >${content}</span
          ><span class="line"></span>
        </div>`;
          } else {
            div.innerHTML = ` <img src="${data.receiver_role === 1 ? data.slaveHeadImg || serCtr.adicon || serviceIcon.defaultServiceAvatar : serCtr.userInfo.masterAvatar || serviceIcon.userDefAvatar}" alt="" srcset="" class="cmskefu_service-avatar" onerror="this.src=${data.receiver_role === 1 ? "window.serviceIcon.defaultServiceAvatar" : "window.serviceIcon.userDefAvatar"}">
                                    <div style="flex: 1;position:relative;">
                                        <p class="time">${data.receiver_role === 1 ? data.slaveUserName || "客服小助手" : ""}  ${`<span class="date">${data.attach.time ? parseTime(data.attach.time) : ""}</span>`}</p>
                                    <div class="cmskefu_content">
                                        ${data.sendStatus === "fail" ? `
                                          <span class="err" onclick="window.serCtr.send()" style="display:none">!</span>
                                        ` : data.read === 1 ? `<span class="read" data-v-1f3424e4="">已读</span>` : data.read === 0 ? `<span class="noread" data-v-1f3424e4="">未读</span>` : ""}
                                        ${content}
                                        </div>
                                    </div>`;
            if (data.sendStatus === "fail") {
              const errSpan = div.querySelector(".err");
              errSpan.style.display = "block";
            }
          }
          if (needAppend) {
            if (isAfter) {
              serviceMessage == null ? void 0 : serviceMessage.appendChild(div);
            } else {
              serviceMessage.insertBefore(div, serviceMessage.childNodes[0]);
            }
          }
          let preMes = isAfter ? serCtr.data[serCtr.data.findIndex((v) => v.mid === data.mid) - 1] : serCtr.data[1];
          if (preMes && data.attach && preMes.attach && (isAfter ? data.attach.time - preMes.attach.time < serCtr.timeGap : preMes.attach.time - data.attach.time < serCtr.timeGap)) {
            let preDiv = document.querySelector(
              `[data-mes="${preMes.mid}"]`
            );
            let t = isAfter ? div : preDiv;
            if (t == null ? void 0 : t.querySelector(".time .date")) {
              (t == null ? void 0 : t.querySelector(".time .date")).style.display = "none";
            }
          }
          let box = div;
          setTimeout(() => {
            if (box) {
              let date = box.querySelector(".time .date");
              if (date && date.style.display != "none") {
                if (box.className.includes("post")) {
                  date.style.paddingLeft = "44px";
                } else {
                  date.style.paddingRight = "44px";
                }
                box.style.paddingTop = "30px";
                date.style.position = "absolute";
                date.style.top = "-22px";
                date.style.textAlign = "center";
                date.style.display = "block";
                date.style.width = "100%";
                date.style.boxSizing = "border-box";
              }
            }
          }, 0);
        }, setMyNotice = function() {
          var _a2, _b2, _c;
          if (window2.serCtr) {
            (_a2 = serCtr.events).message || (_a2.message = function(mes, num, display) {
              if (display === "none") {
                serCtr.myMesNotice = num;
                const textNode = document.getElementById("cmskefu_new_mes_num");
                textNode ? textNode.style.display = "block" : "";
                textNode ? textNode.innerHTML = `${num}` : "";
              } else {
                serCtr.myMesNotice = 0;
                const textNode = document.getElementById("cmskefu_new_mes_num");
                textNode ? textNode.style.display = "none" : "";
                textNode ? textNode.innerHTML = `${serCtr.myMesNotice}` : "";
              }
            });
            (_b2 = serCtr.events).opened || (_b2.opened = function() {
              serCtr.myMesNotice = 0;
              const textNode = document.getElementById("cmskefu_new_mes_num");
              textNode ? textNode.style.display = "none" : "";
              textNode ? textNode.innerHTML = `${serCtr.myMesNotice}` : "";
            });
            (_c = serCtr.events).narrow || (_c.narrow = function() {
              serCtr.myMesNotice = 0;
            });
          }
        };
        const serCtr = {
          data: [],
          host: _location == null ? void 0 : _location.host,
          location: _location,
          container: void 0,
          socket: void 0,
          // 是否同源
          differentSource: _location.hostname === location.hostname,
          id: "",
          userInfo: {},
          roomId: "",
          events: {},
          status: "ready",
          _narrow: false,
          intersectionObserver: void 0,
          page: 1,
          source: service_script ? Number(service_script == null ? void 0 : service_script.dataset.source) || 1 : 1,
          eventid: service_script ? (service_script == null ? void 0 : service_script.dataset.eventid) || "" : "",
          title: service_script ? (service_script == null ? void 0 : service_script.dataset.title) || "" : "",
          adicon: service_script ? (service_script == null ? void 0 : service_script.dataset.adicon) || "" : "",
          newMesNumber: 0,
          myMesNotice: 0,
          timeGap: 180 * 1e3,
          messageEvents: /* @__PURE__ */ new Map(),
          login() {
            serCtr.container.style.display = "block";
            loading(false);
            const loginBox = window2.serCtr.container.querySelector(
              ".cmskefu_login-box"
            );
            loginBox.style.display = "block";
            const form = document.querySelector("#serviceForm");
            form.onsubmit = (e) => {
              const data = {};
              new FormData(e.target).forEach(
                (v, k) => {
                  data[k] = v;
                }
              );
              const oReq = new XMLHttpRequest();
              oReq.addEventListener("loadend", function(e2) {
                let res;
                try {
                  res = JSON.parse(this.responseText);
                } catch {
                }
                const httpReq = e2.target;
                if (httpReq.status !== 200) {
                  alert(res.message || "请求错误");
                } else {
                  const id = res.userInfo.id;
                  localStorage.setItem("servicePartyId", id);
                  serCtr.open();
                  loginBox.style.display = "none";
                }
                loading(false);
              });
              oReq.open(
                "post",
                serCtr.location.origin + "/openapi/member/login/provide"
              );
              oReq.setRequestHeader("Content-Type", "application/json");
              loading(true, "登录中...");
              oReq.send(JSON.stringify(data));
              return false;
            };
          },
          // 建立链接并打开弹窗//host参数暂时废弃
          open: async function(userId, display = true) {
            if (serCtr._narrow === true && display) {
              serCtr.container.style.display = "block";
              serCtr._narrow = false;
              setTimeout(() => {
                if (serCtr.events.opened)
                  serCtr.events.opened();
                serviceMessage.scrollTop = serviceMessage.scrollHeight;
              }, 100);
              return;
            }
            let servicePartyId = localStorage.getItem("servicePartyId");
            if (serCtr.location.hostname !== location.hostname || serCtr.source === 3) {
              if (!servicePartyId) {
                await fetch(
                  `${serCtr.location.protocol}//${serCtr.host}/openapi/member/tourists/register`,
                  {
                    method: "post"
                  }
                ).then(
                  (res) => {
                    if (res.status == 200) {
                      return res.json();
                    } else {
                      serCtr.login();
                      return;
                    }
                  }
                ).then((json) => {
                  if (json.userInfo) {
                    userId = json.userInfo.id;
                    localStorage.setItem("servicePartyId", json.userInfo.id);
                  }
                });
              } else {
                userId = servicePartyId;
              }
            }
            serCtr.id = userId ? userId : serCtr.id;
            const switchUser = serCtr.id && userId && userId !== serCtr.id;
            if (!serCtr.id && !userId) {
              alert("请登录");
              return;
            }
            if (switchUser) {
              if (serCtr.socket) {
                serCtr.socket.close();
              }
              serCtr.status = "reconnecting";
              serCtr.open();
              return;
            }
            if (serCtr.status === "ready" || serCtr.status === "error" || serCtr.status === "reconnecting") {
              serCtr.data = [];
              serviceMessage.innerHTML = "";
              serCtr.status = "binding";
              serCtr.socket = new WebSocket(
                `${serCtr.location.protocol === "https:" ? "wss" : "ws"}://${serCtr.host}/api/v1/customer/ws`
              );
              loading(true);
              document.onvisibilitychange = function() {
                if (document.visibilityState === "hidden") {
                  if (serCtr.status != "connecting")
                    return;
                  window2.servicesHeartbeats = setInterval(() => {
                    var _a2;
                    if (serCtr.status != "connecting") {
                      clearInterval(window2.servicesHeartbeats);
                    }
                    (_a2 = serCtr.socket) == null ? void 0 : _a2.send(
                      JSON.stringify({
                        attach: {
                          time: new Date().getTime()
                        },
                        content: "心跳",
                        mid: uuid(),
                        type: 999
                      })
                    );
                  }, 1e3 * 60);
                } else {
                  clearInterval(window2.servicesHeartbeats);
                }
              };
            } else if (serCtr.status === "connecting" || serCtr.status === "binding") {
              serviceInput == null ? void 0 : serviceInput.focus();
              if (serCtr.events.opened)
                serCtr.events.opened();
              setTimeout(
                () => serviceMessage.scrollTop = serviceMessage.scrollHeight,
                100
              );
            }
            changeNewMesNum();
            if (display) {
              serCtr.container.style.display = "block";
            }
            if (!serCtr.socket || serCtr.status !== "binding")
              return;
            serCtr.socket.addEventListener("open", function binduser() {
              var _a2;
              let id = uuid();
              serCtr.messageEvents.set(id, {
                res: (res) => {
                  loading(false);
                  serviceInput == null ? void 0 : serviceInput.focus();
                  serCtr.status = "connecting";
                  changeBtnType();
                },
                rej: (res) => {
                  alert("用户绑定失败");
                  localStorage.removeItem("servicePartyId");
                  serCtr.close();
                  serCtr.status = "error";
                }
              });
              (_a2 = serCtr.socket) == null ? void 0 : _a2.send(
                JSON.stringify({
                  account_id: userId,
                  attach: {},
                  bind_role: 1,
                  mid: id,
                  type: 1
                })
              );
            });
            serCtr.socket.addEventListener("message", (event) => {
              var _a2, _b2, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m;
              const res = JSON.parse(event.data);
              switch (res.type) {
                case 1:
                  serCtr.status = "binding";
                  if (res.code === 0) {
                    serCtr.page = 1;
                    serCtr.loadHistory();
                    (_a2 = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _a2.res(res);
                  } else {
                    (_b2 = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _b2.rej(res);
                  }
                  break;
                case 2:
                  if (serCtr.messageEvents.get(res.mid)) {
                    if (res.code === 0) {
                      (_c = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _c.res(res);
                    } else {
                      (_d = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _d.rej(res);
                    }
                  } else {
                    const getMes = {
                      attach: {
                        time: ((_e = res.attach) == null ? void 0 : _e.time) || res.sendAt || new Date().getTime()
                        //消息发送时间
                      },
                      category: res.category,
                      slaveHeadImg: res.slaveHeadImg || serCtr.userInfo.slaveAvatar,
                      mid: res.mid || uuid(),
                      // 消息id
                      content: res.content,
                      // 消息内容
                      msg_id: res.msg_id,
                      //服务端唯一识别号
                      receiver_id: res.receiver_id,
                      //消息接收账户id
                      sender_id: res.sender_id,
                      //发送者ID
                      receiver_role: 1,
                      //1客户2客服
                      type: 2,
                      read: res.mid ? 0 : 1,
                      sendStatus: "success",
                      slaveUserName: serCtr.userInfo.slaveUserName || serCtr.userInfo.slaveUsername
                    };
                    serCtr.data.push(getMes);
                    addMess(getMes, true);
                    if (getMes.read === 0) {
                      const node = document.querySelector(
                        `[data-mes="${getMes.mid}"]`
                      );
                      node && ((_f = this.intersectionObserver) == null ? void 0 : _f.observe(node));
                    }
                    if (serCtr.status === "binding") {
                      serCtr.status = "connecting";
                    }
                    if (getMes.category !== 7) {
                      changeNewMesNum();
                      if (serCtr.events.message && serCtr.container) {
                        serCtr.events.message(
                          res,
                          serCtr.newMesNumber,
                          serCtr.container.style.display
                        );
                      }
                    }
                  }
                  if (serviceMessage.scrollTop + serviceMessage.clientHeight + 8e3 > serviceMessage.scrollHeight) {
                    setTimeout(() => {
                      serviceMessage.scrollTop = serviceMessage.scrollHeight;
                    }, 100);
                  }
                  break;
                case 703:
                  let readMes = serCtr.data.find((v) => v.mid === res.mid);
                  if (readMes) {
                    readMes.read = 1;
                    addMess(readMes, true);
                  }
                  break;
                case 702:
                  (_g = serCtr.userInfo) == null ? void 0 : _g.slaveId;
                  serCtr.userInfo = res;
                  setTimeout(() => {
                    if (serCtr.events.opened)
                      serCtr.events.opened();
                  }, 0);
                  const d = document.querySelector("#servic-labels");
                  scrollX(d);
                  d.innerHTML = ((_i = (_h = serCtr.userInfo) == null ? void 0 : _h.slaveLabel) == null ? void 0 : _i.map(
                    (v, index) => `<span style="padding:2px 8px;background:white;margin-right:8px;border-radius:4px">${v}</span>`
                  ).join("")) || "";
                  document.querySelector("#serviceName").innerText = res.slaveNickname || res.slaveUsername;
                  break;
                case 706:
                  serCtr.userInfo = res;
                  document.querySelector("#serviceName").innerText = res.slaveNickname || res.slaveUsername;
                  break;
                case 708:
                  serCtr.userInfo.slaveAvatar = "";
                  serCtr.userInfo.slaveId = "";
                  serCtr.userInfo.slaveNickname = "";
                  serCtr.userInfo.slaveUsername = "";
                  break;
                case 710:
                  let that = this;
                  const notRead = that.data.filter((v) => v.read != 1);
                  let id = uuid();
                  let ids = notRead.map((v) => String(v.msg_id)).filter((v) => v);
                  if (ids.length > 0) {
                    (_j = serCtr.socket) == null ? void 0 : _j.send(
                      JSON.stringify({
                        attach: {},
                        mid: id,
                        msg_id: ids,
                        type: 3
                      })
                    );
                    serCtr.messageEvents.set(id, {
                      res(res2) {
                        var _a3;
                        notRead.forEach((item) => {
                          var _a4;
                          item.read = 1;
                          let node = document.querySelector(
                            `[data-mes="${item.mid}"]`
                          );
                          node && ((_a4 = serCtr.intersectionObserver) == null ? void 0 : _a4.unobserve(node));
                          addMess(item, true);
                        });
                        serCtr.status = "ready";
                        (_a3 = that.socket) == null ? void 0 : _a3.close(1e3, "正常关闭");
                        that.socket = void 0;
                        changeBtnType();
                      },
                      rej(res2) {
                      }
                    });
                  } else {
                    serCtr.status = "ready";
                    (_k = that.socket) == null ? void 0 : _k.close(1e3, "正常关闭");
                    that.socket = void 0;
                    changeBtnType();
                  }
                default: {
                  if (res.code === 0) {
                    (_l = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _l.res(res);
                  } else {
                    (_m = serCtr.messageEvents.get(res.mid)) == null ? void 0 : _m.rej(res);
                  }
                  break;
                }
              }
              serCtr.messageEvents.delete(res.mid);
            });
            serCtr.socket.addEventListener("error", (event) => {
              serCtr.container.style.display = "none";
              serCtr.socket = void 0;
              if (serCtr.events.error)
                serCtr.events.error(event);
              serCtr.status = "error";
              loading(false);
              alert("客服连接错误");
            });
            serCtr.socket.addEventListener("close", (event) => {
              if (serCtr.events.closed)
                serCtr.events.closed();
            });
            this.intersectionObserver = new IntersectionObserver(
              function(entries) {
                var _a2;
                const entriesTimes = entries.filter((ele) => ele.isIntersecting).map((ele) => {
                  return ele.target.dataset.mes;
                });
                const idsItem = serCtr.data.filter(
                  (v) => entriesTimes.includes(v.mid)
                );
                if (idsItem.length <= 0)
                  return;
                let id = uuid();
                (_a2 = serCtr.socket) == null ? void 0 : _a2.send(
                  JSON.stringify({
                    attach: {},
                    mid: id,
                    msg_id: idsItem.map((v) => String(v.msg_id)).filter((v) => v),
                    type: 3
                  })
                );
                serCtr.messageEvents.set(id, {
                  res(res) {
                    idsItem.forEach((item) => {
                      var _a3;
                      item.read = 1;
                      let node = document.querySelector(`[data-mes="${item.mid}"]`);
                      node && ((_a3 = serCtr.intersectionObserver) == null ? void 0 : _a3.unobserve(node));
                      addMess(item, true);
                    });
                  },
                  rej(res) {
                  }
                });
              },
              { root: serviceMessage }
            );
            function changeNewMesNum() {
              if (getComputedStyle(container).display !== "none") {
                serCtr.newMesNumber = 0;
              } else {
                serCtr.newMesNumber += 1;
              }
            }
          },
          // 发送
          send: function(v, type, other = {}) {
            var _a2, _b2;
            if (!v)
              return;
            let { uploadFn, message } = other;
            let mes;
            let id = uuid();
            if (message === void 0) {
              mes = {
                attach: {
                  time: new Date().getTime()
                },
                slaveHeadImg: serCtr.userInfo.slaveAvatar,
                receiver_id: serCtr.userInfo.slaveId,
                content: v,
                category: type,
                mid: id,
                receiver_role: 2,
                sender_id: serCtr.id,
                type: 2,
                read: 0,
                sendStatus: "pending",
                slaveUserName: serCtr.userInfo.slaveUserName || serCtr.userInfo.slaveUsername
              };
              if (serCtr.events.send) {
                if (serCtr.events.send(mes) === false)
                  return;
              }
              serCtr.data.push(mes);
            } else {
              mes = message;
            }
            if (serCtr.events.send) {
              if (serCtr.events.send(mes) === false)
                return;
            }
            if (type !== 2 && type !== 3) {
              (_a2 = serCtr.socket) == null ? void 0 : _a2.send(JSON.stringify(mes));
            } else {
              (_b2 = uploadFn == null ? void 0 : uploadFn.then((res) => {
                var _a3;
                if (res) {
                  res.json().then((r) => {
                    var _a4;
                    const url = r.data;
                    mes.content = url;
                    (_a4 = serCtr.socket) == null ? void 0 : _a4.send(JSON.stringify(mes));
                    addMess(mes, true);
                  });
                } else {
                  mes.content = v;
                  (_a3 = serCtr.socket) == null ? void 0 : _a3.send(JSON.stringify(mes));
                  addMess(mes, true);
                }
              })) == null ? void 0 : _b2.catch(() => {
                var _a3;
                mes.sendStatus = "fail";
                addMess(mes, true);
                db.set(mes, ((_a3 = serCtr.data.at(-2)) == null ? void 0 : _a3.mid) || "");
              });
            }
            addMess(mes, true);
            serCtr.messageEvents.set(id, {
              res: (res) => {
                mes.sendStatus = "success";
              },
              rej: (res) => {
                var _a3;
                mes.sendStatus = "fail";
                db.set(mes, ((_a3 = serCtr.data.at(-2)) == null ? void 0 : _a3.mid) || "");
              }
            });
          },
          close: function() {
            var _a2, _b2;
            serCtr.newMesNumber = 0;
            if (serCtr.events.message && serCtr.container) {
              serCtr.events.message(
                void 0,
                serCtr.newMesNumber,
                serCtr.container.style.display
              );
            }
            (_a2 = window2.event) == null ? void 0 : _a2.stopPropagation();
            if (serCtr.events.close) {
              if (serCtr.events.close() === false)
                return;
            }
            serCtr.container.style.display = "none";
            serCtr.status = "ready";
            serCtr.data = [];
            serviceMessage.innerHTML = "";
            (_b2 = this.socket) == null ? void 0 : _b2.close(1e3, "正常关闭");
            this.socket = void 0;
          },
          loadHistory: function() {
            var _a2;
            if (serCtr.page === 0 && serCtr.status !== "binding")
              return;
            let id = uuid();
            (_a2 = serCtr.socket) == null ? void 0 : _a2.send(
              JSON.stringify({
                attach: {},
                limit: 30,
                mid: id,
                page: serCtr.page++,
                type: 8
              })
            );
            serCtr.messageEvents.set(id, {
              res: async (res) => {
                var _a3, _b2;
                let btn = document.querySelector("#nextPage");
                let localMes = await db.get();
                if (res.data.list && res.data.list.length > 0) {
                  if (res.data.list.length >= 30) {
                    if (!btn) {
                      let p = document.createElement("p");
                      p.setAttribute(
                        "style",
                        "text-align:center;color:#666666;font-size:12px;line-height:50px;width:calc(100% - 32px);top:0;position:absolute;cursor: pointer;"
                      );
                      p.setAttribute("id", "nextPage");
                      p.innerText = "查看更多历史消息";
                      p.onclick = () => serCtr.loadHistory();
                      serviceMessage.appendChild(p);
                      serviceMessage.style.paddingTop = "50px";
                    }
                  } else {
                    serCtr.page = 0;
                    serviceMessage.style.paddingTop = "16px";
                    if (btn) {
                      (_a3 = btn.parentElement) == null ? void 0 : _a3.removeChild(btn);
                    }
                  }
                  localMes.forEach((item) => {
                    let index = res.data.list.findIndex(
                      (i) => i.mid === item.prevMid
                    );
                    if (index > -1) {
                      res.data.list.splice(index, 0, {
                        mid: item.mid,
                        content: item.content,
                        senderRole: 1,
                        read: 0,
                        category: item.category,
                        sendStatus: "fail",
                        sendAt: item.time,
                        attach: {
                          time: item.time
                        }
                      });
                    }
                  });
                  let lastId = res.data.list[0].mid;
                  res.data.list.forEach((item) => {
                    var _a4;
                    if (item.msgId && serCtr.data.find((v) => v.msg_id == item.msgId))
                      return;
                    if (item.senderRole === -1 && item.receiverRole && item.receiverRole !== 1)
                      return;
                    const getMes = {
                      attach: {
                        time: item.sendAt
                      },
                      category: item.category,
                      mid: item.mid || uuid(),
                      // 消息id
                      content: item.content,
                      // 消息内容
                      msg_id: item.msgId,
                      //服务端唯一识别号
                      receiver_id: item.receiverId,
                      //消息接收账户id
                      sender_id: item.senderId,
                      //发送者ID
                      receiver_role: item.senderRole !== 1 ? 1 : 2,
                      //1客户2客服
                      type: 2,
                      slaveHeadImg: item.slaveHeadImg,
                      read: item.read,
                      sendStatus: item.sendStatus || "success",
                      slaveUserName: item.slaveUserName || item.slaveUsername
                    };
                    serCtr.data.unshift(getMes);
                    addMess(getMes, false);
                    if (getMes.read === 0 && getMes.receiver_role === 1) {
                      const node = document.querySelector(
                        `[data-mes="${getMes.mid}"]`
                      );
                      node && ((_a4 = this.intersectionObserver) == null ? void 0 : _a4.observe(node));
                    }
                  });
                  if (lastId) {
                    const node = document.querySelector(`[data-mes="${lastId}"]`);
                    console.log(node);
                    node == null ? void 0 : node.scrollIntoView();
                  }
                  if (serCtr.page <= 2) {
                    setTimeout(() => {
                      serviceMessage.scrollTop = serviceMessage.scrollHeight;
                    }, 100);
                  }
                } else {
                  serCtr.page = 0;
                  serviceMessage.style.paddingTop = "16px";
                  if (btn) {
                    (_b2 = btn.parentElement) == null ? void 0 : _b2.removeChild(btn);
                  }
                }
              },
              rej: (res) => {
                serCtr.page = serCtr.page <= 1 ? 1 : serCtr.page--;
              }
            });
          },
          narrow: function() {
            if (serCtr.events.narrow) {
              if (serCtr.events.narrow() === false) {
                return;
              }
            }
            serCtr.newMesNumber = 0;
            serCtr.container.style.display = "none";
            serCtr._narrow = true;
          }
        };
        window2.serCtr = serCtr;
        createStyletag();
        const container = serCtr.container = createContainer();
        const sendBtn = document.querySelector("#serviceMessSend");
        const serviceMessage = document.querySelector(
          "#serviceMessage"
        );
        serviceMessage.addEventListener("touchmove", (event) => {
          event.stopPropagation();
        });
        serviceMessage.addEventListener("scroll", (event) => {
          event.stopPropagation();
        });
        const serviceInput = document.querySelector(
          "#serviceInput"
        );
        const fileInput = document.querySelector(
          "#serviceFile"
        );
        const closeBtn = document.querySelector("#closeService");
        serviceInput == null ? void 0 : serviceInput.addEventListener("input", changeBtnType);
        let keys = /* @__PURE__ */ new Set();
        serviceInput.addEventListener("keyup", function(e) {
          keys.clear();
        });
        serviceInput.addEventListener("keydown", function(e) {
          keys.add(e.key);
          keys.delete("Unidentified");
          if (!keys.has("Shift") && e.key === "Enter") {
            e.stopPropagation();
            e.preventDefault();
            sendBtn == null ? void 0 : sendBtn.click();
          }
        });
        fileInput == null ? void 0 : fileInput.addEventListener("change", (event) => {
          if (!(fileInput == null ? void 0 : fileInput.files))
            return;
          const accept = fileInput == null ? void 0 : fileInput.accept.split(",").map((v) => v.substring(v.indexOf("/") + 1));
          console.log(accept);
          for (let i = 0; i < (fileInput == null ? void 0 : fileInput.files.length); i++) {
            let file = fileInput.files[i];
            console.log(file);
            if (!accept.some((v) => file.type.includes(v))) {
              alert("文件格式错误,请正确选择文件");
              return;
            }
            if (file.size > 1073741824) {
              alert("文件不能大于10M");
            }
            const fd = new FormData();
            fd.append("file", file);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
              serCtr.send(
                this.result,
                (fileInput == null ? void 0 : fileInput.dataset._t) === "image" ? 2 : 3,
                {
                  uploadFn: fetch(
                    `${serCtr.location.protocol}//${serCtr.host}/api/v1/customer/upload/img`,
                    {
                      method: "post",
                      body: fd
                    }
                  ).then((res) => {
                    if (res.status !== 200) {
                      return Promise.reject("文件上传失败");
                    }
                    return res;
                  })
                  // uploadFn: new Promise((resolve, reject) => {
                  //   var reader = new FileReader();
                  //   reader.readAsDataURL(file);
                  //   reader.onload = function (e) {
                  //     resolve(reader.result);
                  //   };
                  // }),
                }
              );
            };
          }
          fileInput.value = "";
        });
        sendBtn == null ? void 0 : sendBtn.addEventListener("click", () => {
          if (sendBtn.getAttribute("style")) {
            serCtr.send(serviceInput.value, 1);
            serviceInput.value = "";
            changeBtnType();
          }
        });
        closeBtn == null ? void 0 : closeBtn.addEventListener("click", () => {
          serCtr.narrow();
        });
        serviceMessage == null ? void 0 : serviceMessage.addEventListener("click", function(e) {
          if (e.target.tagName === "IMG") {
            let div = document.createElement("div");
            div.setAttribute(
              "style",
              "position:fixed;width:100vw !important;height:100vh !important;top:0;left:0;z-index:99999999;max-width:none !important;object-fit: contain;background-color:rgb(36 36 36 / 50%);padding:15vh 15vw;box-sizing: border-box;display:flex;flex-direction:column;justify-content:center;text-align:right;align-items: center;"
            );
            div.onclick = function(e2) {
              e2.stopPropagation();
              return false;
            };
            let span = document.createElement("span");
            span.innerText = "×";
            span.setAttribute(
              "style",
              "color: white;font-size: 32px;position: fixed;top: 32px;right: 32px;cursor: pointer;padding: 8px;"
            );
            span.addEventListener("click", (e2) => {
              var _a2;
              (_a2 = div.parentNode) == null ? void 0 : _a2.removeChild(div);
            });
            div.appendChild(span);
            let img = document.createElement("img");
            img.src = e.target.src;
            img.setAttribute(
              "style",
              "object-fit: contain;max-width: 70vw !important;max-height: 70vh;"
            );
            div.appendChild(img);
            document.body.appendChild(div);
          }
        });
        (_a = document.querySelector("#ser_uploadVideo")) == null ? void 0 : _a.addEventListener("click", () => {
          var _a2;
          if (serCtr.status === "connecting") {
            fileInput.dataset._t = "video";
            if ((_a2 = window2.nativeObject) == null ? void 0 : _a2.callPhoto) {
              appUpload("video");
              return;
            }
            fileInput.setAttribute("accept", "video/mp4,video/quicktime");
            fileInput.click();
          }
        });
        (_b = document.querySelector("#ser_uploadImg")) == null ? void 0 : _b.addEventListener("click", () => {
          var _a2;
          if (serCtr.status === "connecting") {
            fileInput.dataset._t = "image";
            if ((_a2 = window2.nativeObject) == null ? void 0 : _a2.callPhoto) {
              appUpload("image");
              return;
            }
            fileInput.setAttribute(
              "accept",
              "image/png,image/jpg,image/jpeg,image/gif"
            );
            fileInput.click();
          }
        });
        if (!serCtr.differentSource || serCtr.source === 3) {
          setMyNotice();
          const textNode = document.getElementById("cmskefu_new_mes_num");
          textNode ? textNode.style.display = "none" : "";
          textNode ? textNode.innerHTML = `${serCtr.myMesNotice}` : "";
        }
      }
    }
    if (_location.hostname !== location.hostname || Number(service_script == null ? void 0 : service_script.dataset.source) === 3) {
      window2.onload = () => {
        init();
      };
    } else {
      init();
    }
    function parseTime(time, cFormat = "{y}-{m}-{d} {h}:{i}:{s}") {
      if (arguments.length === 0 || !time) {
        return null;
      }
      const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
      let date;
      if (typeof time === "object") {
        date = time;
      } else {
        if (typeof time === "string") {
          if (/^[0-9]+$/.test(time)) {
            time = parseInt(time);
          } else {
            time = time.replace(new RegExp(/-/gm), "/");
          }
        }
        if (typeof time === "number" && time.toString().length <= 10) {
          time = time * 1e3;
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
        a: date.getDay()
      };
      const time_str = format.replace(
        /{([ymdhisa])+}/g,
        (result, key) => {
          const value = formatObj[key];
          if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
          }
          return value.toString().padStart(2, "0");
        }
      );
      return time_str;
    }
    function uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === "x" ? r : r & 3 | 8;
        return v.toString(16);
      });
    }
    function loading(bool, txt = "您好,小助手正在努力赶来,请稍候...") {
      let dom = window2.serCtr.container.querySelector(
        ".loading-box"
      );
      const p = dom.querySelector(".loading-text");
      if (bool) {
        if (dom) {
          dom.style.display = "block";
          dom.style.display = "flex";
        }
        if (txt && p) {
          p.innerText = txt;
        }
      } else {
        dom && (dom.style.display = "none");
      }
    }
    function scrollX(d) {
      let start = 0;
      d.onmousedown = function() {
        var _a;
        start = d.scrollLeft;
        window2.addEventListener("mousemove", mousemove);
        (_a = window2.event) == null ? void 0 : _a.stopPropagation();
      };
      window2.addEventListener("mouseup", remove);
      window2.addEventListener("mousedown", remove);
      window2.addEventListener("mouseleave", remove);
      function remove() {
        window2.removeEventListener("mousemove", mousemove);
      }
      function mousemove(event) {
        start += event.movementX;
        d.scrollLeft = start;
      }
    }
  })(window);
});
