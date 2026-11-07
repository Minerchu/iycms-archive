// 是否弹出公告
var morpop = false;

//弹窗公告数组
var noticeUpDomArr = [];

//普通公告数组
var noticeDomArr = [];

//是否存在弹窗类公告
var cmsNoticeUpExist = false;

//索引，初始为0，下一页+1，上一页-1,普通公告中用于获取点击的是第几条公告
var index = 0;

//点击类型,当点击普通轮播公告是修改为true，用于替换dom内容
var clickType = false;

//轮播类公告
var cmsNoticeExist = false;

// 初始化
$(document).ready(() => {
  //渲染轮播公告
  showNotice();

  /* ============生成轮播============= */
  if (cmsNoticeExist) {
    new Swiper(".cms_swiper_notice_box", {
      loop: true,
      direction: "vertical",
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  //判断是否存在弹窗公告和是否已经阅读过公告
  if (morpop && cmsNoticeUpExist) {
    $("#cms_notice_popUp_box").show();
    $("#cms_notice_notification").show();
  } else {
    $("#cms_notice_popUp_box").hide();
    $("#cms_notice_notification").hide();
  }

  //判断是否为只有一条
  if (index + 1 == noticeUpDomArr.length) {
    $(".cms_notice_up_footer_button_down")[0].innerHTML = "关闭";
  }
  /* ========================= */
  // 判断是否需要公告和是否有公告
  if (cmsNoticeExist) {
    $("#cms_notice_ordinary_box").show();
    if ($(".cms_notice_ordinary_icon")[0]) {
      $(
        ".cms_notice_ordinary_icon"
      )[0].innerHTML = `<img src="/libs/commIcon/gonggao.svg" alt="" >`;
    }
  } else {
    $("#cms_notice_ordinary_box").hide();
  }

  // 初始化渲染
  renderNoticeDom(noticeUpDomArr);

  bindEven()
});

// 渲染函数
function renderNoticeDom(noticeDomArr) {
  // 判断当前是否为第一条和节点是否存在 第一条不显示上一条按钮
  if (index === 0 && $(".cms_notice_up_footer_button_up")[0]) {
    $(".cms_notice_up_footer_button_up").hide();
  } else {
    $(".cms_notice_up_footer_button_up").show();
  }
  //判断当前是否为最后一条
  if (
    index < noticeDomArr.length - 1 &&
    $(".cms_notice_up_footer_button_down")[0]
  ) {
    $(".cms_notice_up_footer_button_down")[0].innerHTML = "下一条";
  } else {
    $(".cms_notice_up_footer_button_down")[0].innerHTML = "关闭";
  }
  // 判断当前数组数据是否存在
  if (noticeDomArr[index]) {
    //判断当前公告有无url控制显示是否拥有查看详情按钮
    if (noticeDomArr[index].url != "" && noticeDomArr[index].url != undefined) {
      $(".cms_notice_Up_content_box_a").show();
      cmsNoticeUrlDom = `<a href="${noticeDomArr[index].url}" target="_blank" class='cms_notice_more_a' style="width:100%"> 查看详情 </a><img src='/libs/commIcon/right.svg' class="cms_notice_more_icon">`;
    } else {
      //无url情况innerHTML避免切换导致的残留
      $(".cms_notice_Up_content_box_a")[0].innerHTML = "";
      $(".cms_notice_Up_content_box_a").hide();
    }
    //判断当前节点是否存在,存在修改内容，不存在不操作避免报错
    if ($("#cms_notice_Up_content_box")[0]) {
      $(".cms_notice_Up_content_box_name")[0].innerHTML =
        noticeDomArr[index].name;
      $(".cms_notice_Up_content_box_main")[0].innerHTML =
        noticeDomArr[index].content;

      if (
        $(".cms_notice_Up_content_box_a")[0] &&
        noticeDomArr[index].url != "" &&
        noticeDomArr[index].url != undefined
      ) {
        $(".cms_notice_Up_content_box_a")[0].innerHTML = cmsNoticeUrlDom;
      }
    }
  }
}

// 绑定事件
function bindEven(params) {
  //下一条点击事件
  $(".cms_notice_up_footer_button_down").click(function () {
    // 判断当前下标修改显示内容
    if ($(".cms_notice_up_footer_button_down")[0].innerHTML == "关闭") {
      $("#cms_notice_popUp_box").hide();
      $("#cms_notice_notification").hide();
      index = 0;
      var oneArr = JSON.parse(sessionStorage.getItem("cms_notic_oneArr")) || [];
      noticeUpDomArr.forEach((item) => {
        if (item.state == "2") {
          oneArr.push(item.id);
        }
      });

      sessionStorage.setItem("cms_notic_oneArr", JSON.stringify(oneArr));
      sessionStorage.setItem("cms_notic", 1);

      return;
    }

    if (!clickType) {
      if (index < noticeUpDomArr.length - 1) {
        index++;
        renderNoticeDom(noticeUpDomArr);
      }
    } else {
      if (index < noticeDomArr.length - 1) {
        index++;
        renderNoticeDom(noticeDomArr);
      }
    }

    if ($(".cms_notice_up_footer_button_down")[0]) {
      if (!clickType) {
        if (index + 1 == noticeUpDomArr.length) {
          $(".cms_notice_up_footer_button_down")[0].innerHTML = "关闭";
        }
      } else {
        if (index + 1 == noticeDomArr.length) {
          $(".cms_notice_up_footer_button_down")[0].innerHTML = "关闭";
        }
      }
    }
  });

  // 上一条点击事件
  $(".cms_notice_up_footer_button_up").click(function () {
    if (index - 1 >= 0) {
      index--;
      if (!clickType) {
        renderNoticeDom(noticeUpDomArr);
      } else {
        renderNoticeDom(noticeDomArr);
      }
    }
    if (index + 1 < noticeUpDomArr.length) {
      $(".cms_notice_up_footer_button_down")[0].innerHTML = "下一条";
    }
  });

  //点击关闭公告栏
  $(".cms_notice_close").click(function () {
    $("#cms_notice_popUp_box").hide();
    $("#cms_notice_notification").hide();
    index = 0;
    var oneArr = JSON.parse(sessionStorage.getItem("cms_notic_oneArr")) || [];
    noticeUpDomArr.forEach((item) => {
      if (item.state == "2") {
        oneArr.push(item.id);
      }
    });

    sessionStorage.setItem("cms_notic_oneArr", JSON.stringify(oneArr));
    sessionStorage.setItem("cms_notic", 1);
  });
}

//普通公告点击事件
function noticeClick(clickIndex) {
  index = clickIndex;
  clickType = true;
  $("#cms_notice_popUp_box").show();
  $("#cms_notice_notification").show();
  renderNoticeDom(noticeDomArr);
}
// 生成轮播
function showNotice() {
  if ($(".cms_notice_swiper")[0]) {
    noticeDomArr.forEach((item, index) => {
      var oldNoticeHTML = $(".cms_notice_swiper")[0].innerHTML;
      $(".cms_notice_swiper")[0].innerHTML =
        oldNoticeHTML +
        `<div  class="swiper-slide cms_swiper_slide_notice " onclick="noticeClick(${index})" >${item.name}</div>`;
    });
  }
}
