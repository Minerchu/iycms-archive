function phoneClient() {
  let dua = navigator.userAgent.toLowerCase();
  if (/android/i.test(dua)) {
    //判断安卓
    return true;
  }
  if (/ipad|iphone|ipod/.test(dua) && !window.MSStream) {
    //判断苹果
    return true;
  }
  return false;
}

function setShowScoll() {
  let scrollTop = $(document).scrollTop();
  $(".affTpllay").each(function (e) {
    if (phoneClient()) {
      if ($(this).hasClass("t") || $(this).hasClass("b")) {
        $(this).css({ "margin-top": 0 });
        return;
      }
      let atr = $(this).parent().attr("_pc");
      if (atr) {
        $(this).css({ "margin-top": scrollTop });
        return;
      }
      let pof = $(this).parent().offset();
      let oft = scrollTop - pof.top;
      if (oft < 0) oft = 0;
      $(this).css({ "margin-top": oft });
    } else {
      $(this).css({ "margin-top": scrollTop });
    }
  });
}

function getHtml(htmStr) {
  let divDom = document.createElement("div");
  divDom.innerHTML = htmStr;
  return divDom.innerHTML;
}

function closeTplBtn(that) {
  let parent = $(that).parent();
  parent.detach();
}

// window.onscroll = function () {
//   setShowScoll();
// };
// window.onresize = function () {
//   setShowScoll();
// };

window.renderData =
  window.renderData ||
  function renderData(arr, id) {
    if (!id) return;
    let htm = "";
    arr = arr || [];
    arr.forEach((item) => {
      // if (item.state != 1) return;
      let cfg = item.config || {};
      let clo = "";
      let sty = "";
      let animation =
        cfg.second && cfg.second > 0 && cfg.close != 1
          ? `animation-duration:${cfg.second}s;animation-name: hide`
          : "";

      if (!animation && cfg.close == 1) {
        clo = `<div onclick="closeTplBtn(this)" style="position:absolute;top:0px;right:0px;margin:1px;width:15px;height:15px;line-height:16px;background:#000;font-size:11px;text-align:center;">
                        <a href="javascript:;" style="color:white;text-decoration:none;">X</a>
                    </div>`;
      }
      switch (item.adsType) {
        case "text":
          if (cfg.html) {
            cfg.html = getHtml(cfg.html);
          }
          if (cfg.bgColor) sty += `background-color:${cfg.bgColor};`;
          htm += `<div class="p" style="${animation}">
							<a href="${cfg.href}" target="_bank" style="${sty}">${cfg.html}</a>
							${clo}
						</div>`;
          break;

        case "image":
          if (cfg.width > 0) sty += `width:${cfg.width}vw;`;
          else sty += "width:100%;";
          if (cfg.height > 0) sty = `height:${cfg.height}px;`;
          let src = 'http://192.168.2.70/data/uploadFile/61A19584-0ACB-4608-AB52-C21A3F663D34.jpeg'

          htm += `<div class="affTpllay lb"  style="${cfg.second}">
	            		<a href="${cfg.href}" target="_bank">
	            			<img src="${src}" style="${sty}">
	            		</a>
	            		${clo}
	            	  </div>`;
          break;

        case "float":
          // if(cfg.width > 0) sty += `width:${cfg.width}%;`

          htm += `<div class='affTpllay ${cfg.position}'>
			    		    <div class="p" style="${animation}">
			    		        <a href="${cfg.href}" target="_blank">
			    		            <img src="${cfg.src}" border="0" style="${sty}" />
			    		        </a>
			    		        ${clo}
			    		    </div>
			    		</div>`;
          break;

        case "custom":
          htm += item.custom;
          break;
      }
      // console.log(item,'--')
    });
    let parent = $("#" + id).parent();
    console.log(parent,'-----------', htm)
    if (parent.length > 0) {
      let index = parent.find("#" + id).index();
      parent.children().eq(index).replaceWith(htm);
    }
  };
