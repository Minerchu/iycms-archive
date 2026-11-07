var android = false;
var iphone  = false;
function isMobile() {
    let ua = navigator.userAgent.toLowerCase();
    if (/android/i.test(ua)) {  //判断安卓
        android=true;
        return true
    }
    if (/ipad|iphone|ipod/.test(ua) && !window.MSStream) {  //判断苹果
        iphone=true;
        return true
    }
    return false
}
var mobile  = isMobile();


function showmylist(data){
    data = data || []
    let str = "";
    for(let i=0;i<data.length;i++){
        // let ty = data[i].type || ""
        switch(data[i].type){
            case "float":
                str+= showfloat(data[i]);
                break;
            default:
                str+=getmylist(data[i]);
        }
    }
    return str
}

// function showbottomfloat(arr1){
//     if(mobile) {
//         arr1 = arr1 || []
//         var lc_b = '';
//         for(let i=0;i<arr1.length;i++){
//             var _height = whJudge(arr1[i].height,"auto");
//             lc_b += `<div  style="position:relative;">
//                         <a href="${arr1[i].url}" target="_blank">
//                             <img src="${arr1[i].pic}" border="0" class="float-content-title-left-up" style="max-height:100vh;width:100%;height:${_height}">
//                         </a>
//                         <div onclick="closeTplBtn(this)" style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">
//                             <a href="javascript:;" style="color:white;text-decoration:none;">X</a>
//                         </div>
//                       </div>`;
//         }
//         // document.write(`<div id="bottom_float"  style="z-index:9999; position:fixed;bottom:0px;left:0px;right:0px;">${lc_b}</div>`);
//         return `<div id="bottom_float"  style="z-index:9999; position:fixed;bottom:0px;left:0px;right:0px;">${lc_b}</div>`
//     }
// }

function closeTplBtn(ev){
    ev.parentNode.style.display = 'none'
}
function closeAllff(e){
  $(e).parent("div").css("display","none");
    // $(".affTpllay").remove()
}

function whJudge(val,de){
    val = val || ""
    val = val.replace(/(^\s*)|(\s*$)/g, "");
    if(val.length === 1){
        val = Number(val)
    }
    return val  ? (val + "px"):de;
}

function getmylist(item){
    let tmp = "";
    // let tt  = item["type"] || "";
    // let arr = item.typeParams[tt] || {}
    let tt = item.adsType
    switch(tt){
        case "image":
            // let width  = whJudge(arr.width,"100%");
            // let height = whJudge(arr.height,"auto");
            let width  = whJudge("","100%");
            let height = whJudge("","auto");
            if(mobile){
                height = "auto"
            }
            tmp+=`<a href="${item.link}" target="_bank"><img src="${item.content}" style="width:${width};height:${height};" alt=""></a>`;
            break;
        case "text":
            tmp+= '<p><a href="'+item.link+'" target="_bank" >'+item.content+'</a></p>'
            // tmp+= '<p><a href="'+arr.link+'" target="_bank" style="background-color:'+arr.backgroundColor+';color:'+arr.color+';">'+arr.content+'</a></p>'
            break;
        case "custom":
            tmp+=item.custom+"\n";
            break;
    }
    return tmp;
}

 function getSession  (key){
    let value = window.sessionStorage.getItem(key);
    if (!value) {
      return value;
    } else {
      try {
        if (window.decodeURIComponent(window.atob(value)) == 'true') {
          return true;
        } else if (window.decodeURIComponent(window.atob(value)) == 'false') {
          return false;
        } else {
          return window.decodeURIComponent(window.atob(value));
        }
      } catch (e) {
        return window.decodeURIComponent(window.atob(value));
      }
    }
  }
function getffdata(item){
    let domian = getSession('tpl01Api')
    item = item || {}
    let html = ""
    html += `<div class="affTpllay ${item.position}">`
    html += `    <div style="position: relative;">`
    html += `        <a href="${item.link}" target="_blank">`
    if(item.adsType == 'text'){
      html += `            <div style='color: #000;
      padding:4px 14px 2px 4px;
      display: block;
      font-size:12px;'>${ item.content }</div>`
    }else{
      html += `            <img src="${  domian + item.content}" border="0"  alt=""/>`
    }
    html += `        </a>`
    if(item.close == 1){
      html += `        <div style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;" onclick="closeAllff(this)">`
      html += `            <a href="javascript:;" style="color:white;text-decoration:none;">X</a>`
      html += `        </div>`
    }
    html += `    </div>`
    html += `</div>`
    return html
}
function showfloat(item){
    return getffdata(item)
}

function createTotop() {
    document.writeln('\
        <style type="text/css">\
            .scrolltop {position: fixed;bottom: 70px;right: 65px;z-index: 103;}\
            .scrolltop ul {overflow: hidden;margin-left: 0;padding-left: 0px;margin-bottom: 0px;}\
            .scrolltop ul li {float: none;width: 40px;height: 40px;border-radius: 3px;opacity: 0.9;margin: 2px;background: inherit;border: 1px solid rgba(255,255,255,0.6);text-align: center;line-height: 40px;transform: rotate(-90deg);color: #fff;}\
            .scrolltop .icon {position: absolute;margin-top: 7px;margin-left: 7px;width: 25px;height: 25px;}\
            @media screen and (max-width: 760px){.scrolltop{display:none;}}\
        </style>\
        <div  class="scrolltop">' +
        '<ul  class="scroll-content">' +
        '<li  class="scroll-list"  >' +
        '<a  class="scroll-item" title="回到顶部" href="javascript:doScroll1()" target="_self">' +
        '<b  class="">&#10148</b></a>' +
        '</li>' +
        '</ul>' +
        '</div>')
}
// createTotop();

window.onscroll = function() {
    setShowScoll();
}
window.addEventListener('scroll', setShowScoll)
window.onresize = function(){
    setShowScoll();
}

function phoneClient(){
    let dua = navigator.userAgent.toLowerCase();
    if (/android/i.test(dua)) {  //判断安卓
        return true
    }
    if (/ipad|iphone|ipod/.test(dua) && !window.MSStream) {  //判断苹果
        return true
    }
    return false
}

function hideScoll() {
    if (document.documentElement.clientWidth < 768) {
        $(".scrolltop").hide()
    }
};
hideScoll();

function setShowScoll() {
    let scrollTop = $(window.document).scrollTop();
    if (!iphone){
        if (scrollTop > 0) {
            $(".scrolltop").fadeIn();
        } else {
            $(".scrolltop").fadeOut()
        }
    }

    $(".ads").each(function(e){
        if(phoneClient()){
            if($(this).hasClass("top") || $(this).hasClass("bottom")) {
                $(this).css({"margin-top":0})
                return;
            }
            let atr = $(this).parent().attr("_pc")
            if(atr){
                $(this).css({"margin-top":scrollTop})
                return
            }
            let pof = $(this).parent().offset()
            let oft = scrollTop - pof.top;
            if(oft < 0) oft = 0
            $(this).css({"margin-top":scrollTop})
        } else {
            $(this).css({"margin-top":scrollTop})
        }
    })
}

function doScroll1() {
    $("body,html").animate({scrollTop: 0},480);
}

$(function(){
    if(android){
        $(".applist").show();
    }
    $(".scrolltop").fadeOut();
    $("#ecodema").click(function() {
        $(this).hide();
    })
})

function downandroidapp(apkurl) {
    if(!android){
        alert("经检测，你的系统非安卓系统，不能下载此APP！");
        return false;
    }
    window.open(apkurl,"_blank")
}


function drawPage(domID,totalpage,page,path){
    var html   = '';
    var homep  = "<em>&#171</em><i>首页</i>"
    var firstp = "<em>&#139</em><i>上一页</i>"
    var endp   = "<em>&#187</em><i>尾页</i>"
    var lastp  = "<em>&#155</em><i>下一页</i>"
    if(page>1){
        html+=`<li class="text"><a href="${path}1.html">${homep}</a></li>`
        html+=`<li class="text"><a href="${path}${page-1}.html">${firstp}</a></li>`
    }else{
        html+=`<li class="text"><a>${homep}</a></li>`
        html+=`<li class="text"><a>${firstp}</a></li>`
    }

    var start_page = page - 3
    var end_page   = page + 3
    if(start_page < 1){ start_page = 1}
    if(end_page > totalpage) {end_page = totalpage}
    for(var i=start_page;i<=end_page;i++){
        // 当前页码
        if(i == page){
            html+=`<li class="active"><a>${page}</a></li>` //本页
            continue
        }
        // 显示最少2页
        if(Math.abs(i-page) == 1 || (page==1 && i < 4) || (page == totalpage && (totalpage-i) < 3)){
            html+=`<li class="near"><a href="${path}${i}.html" data="p-${i}">${i}</a></li>`
            continue
        }
        // 其它页码
        html+=`<li><a href="${path}${i}.html" data="p-${i}">${i}</a></li>`
    }

    if(page<totalpage){
        html+=`<li class="text"><a href="${path}${end_page==totalpage ? totalpage:end_page+1}.html">${lastp}</a></li>`;
        html+=`<li class="text"><a href="${path}${totalpage}.html">${endp}</a></li>`;
    }else{
        html+=`<li class="text"><a>${lastp}</a></li>`;
        html+=`<li class="text"><a>${endp}</a></li>`;
    }
    $("#"+domID).html(`<ul class="page">${html}</ul>`)
}


let makeQrcode = false
function showQrcode(){
    if(!makeQrcode){
        makeQrcode = true
        $('#ecodema').qrcode({
            render: "canvas", //也可以替换为table
            width: 130,
            height: 130,
            text: window.location.href
        });
    }
    $('#ecodema').toggle()
}

function reloadLazyLoadBg(){
    $(".lazyload").lazyload({ effect: "fadeIn" });
}
// 广告
window.closeTplAds = function (that) {
  let parent = that.parentNode;
  parent.style.display = "none";
};
