// 跳过广告
function jumpAd(params) {
  // $('#play_fir_img').hide();
  if (player) {
    player.play();
  }
}
if (Number(adTime)) {
  temAliAutoVod = false;
}
// 购买影片
function goShopVod(isH5 = false) {
  if (temUserIsLogin) {
    if (chargingMode == 2) {
      // layer.open({
      //     title: 'VIP',
      //     btn: false,
      //     content: `<p>前往<a class='cms_vod_tomem tomem_pc' href="${toMemberHref}"> 开通VIP</a>
      //     <a class='cms_vod_tomem tomem_h5' href="${toMemberHref}/login"> 开通VIP</a><p>`
      // });
      location.href = "/memberUser";
    } else {
      if (temAlipVodIsFull) {
        document.exitFullscreen();
      }
      $(".cms_tem_mask").show();
      $(".cms_tem_pop").show();
    }
  } else {
    if (isH5) {
      location.href = "/memberUser/login";
    } else {
      if (temAlipVodIsFull) {
        document.exitFullscreen();
      }
      temMemberLogin();
    }
    // layer.open({
    //     btn: false,
    //     content: `<p>您还没有登录，<a class='cms_vod_tomem tomem_pc' href="${toMemberHref}">前往登录</a>
    //         <a class='cms_vod_tomem tomem_h5' href="${toMemberHref}/login">前往登录</a><p>`
    // });
  }
}
// 确认购买
function sureShopVod() {
  $http(`/openapi/video_on_demand/buy`, { playLineId: lineId }, "post")
    .then((res) => {
      layer.msg("购买成功", { icon: 1, offset: "50px", time: 1000 });
      checkShop({ shop: true });
      $(".cms_tem_mask").hide();
      $(".cms_tem_pop").hide();
    })
    .catch((error) => {
      layer.msg(error.data.message, { icon: 2, offset: "50px", time: 1000 });
    });
}
// 影片历史
function setHistory(isIfar = false) {
  if (temUserIsLogin) {
    if (isIfar) {
      const params = {
        current: 3,
        duration: 3,
        playLineId: lineId,
        progress: 100,
        videoId: vodId,
        lineId: lineId,
        jumpUrl: location.pathname + location.search,
      };
      $http(`/openapi/browse/record`, params, "post").then((res) => {
        if (res.data) {
          layer.msg(res.data, { icon: 1, offset: "50px", time: 1000 });
        }
      });
    } else {
      try {
        let current = Math.trunc(player.getCurrentTime());
        let duration = Math.trunc(vodLongTime);
        let progress = Math.round(((current * 100) / duration).toFixed(1));
        current < 1 ? (current = 1) : "";
        progress < 1 ? (progress = 1) : "";
        // console.log(current,duration,Math.round((current*100/duration).toFixed(1)))
        if (vodCurrent != current) {
          vodCurrent = current;
          const params = {
            current: current,
            duration: Math.trunc(vodLongTime),
            playLineId: lineId,
            progress: progress,
            videoId: vodId,
            jumpUrl: location.pathname + location.search,
          };
          $http(`/openapi/browse/record`, params, "post")
            .then((res) => {
              if (res.data) {
                layer.msg(res.data, { icon: 1, offset: "50px", time: 1000 });
              }
            })
            .finally(() => {
              setTimeout(() => {
                setHistory();
              }, 3000);
            });
        } else {
          setTimeout(() => {
            setHistory();
          }, 3000);
        }
      } catch (error) {}
    }
  }
}
// 判断解析模式是否使用默认播放器
const temGetVodAddr = async function (vp) {
  let vodType = [
    "video",
    "application/vnd.rn-realmedia-vbr",
    "application/vnd.apple.mpegurl",
    "application/x-shockwave-flash",
    "application/vnd.rn-realmedia",
    "audio/x-pn-realaudio",
  ]; //基本都会包含video,kux无法判断
  let videoIsPlay = false;
  try {
    const controller = new AbortController();
    const timeout = 5000; // 设置超时时间，单位为毫秒
    setTimeout(() => {
      controller.abort(); // 超时时中止请求
    }, timeout);
    await fetch(vp, { signal: controller.signal })
      .then((response) => {
        const contentType = response.headers.get("content-type");
        vodType.forEach((item) => {
          if (contentType.includes(item)) {
            videoIsPlay = true;
            return;
          }
        });
        // console.log(videoIsPlay)
        // console.log(111)
      })
      .catch((error) => {
        // console.log(222)
        if (error.name === "AbortError") {
          layer.msg("请求超时", { icon: 2, offset: "50px", time: 1000 });
        }
      });
  } catch (error) {}
  return videoIsPlay;
};

// 时间格式转换 s -> 00:00
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  // 将分钟和秒数格式化为两位数
  let formattedMinutes = String(minutes).padStart(2, "0");
  let formattedSeconds = String(remainingSeconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

//初始化影片
async function initVod(vp) {
  let has = false;
  let resource = [
    "avi",
    "rmvb",
    "mp4",
    "mkv",
    "h264",
    "m3u8",
    "3gp",
    "wmv",
    "mpeg",
    "mpg",
    "mov",
    "flv",
    "swf",
    "qsv",
    "kux",
    "mpg",
    "rm",
    "ram",
  ];
  if (!temIsJsonPa) {
    let u = new URL(vp);
    let pathname = u.pathname || "";
    let par = pathname.split(".");
    let ext = par[par.length - 1];
    resource.forEach((item) => {
      if (item == ext) has = true;
    });
    if (!has) {
      has = await temGetVodAddr(vp);
    }
  } else if (temIsJsonPa) {
    if (temJsonPlayAddr) {
      vp = temJsonPlayAddr + vp;
    } else {
      has = true;
    }
    // const jsonVodDotIndex = vp.lastIndexOf('.');
    // const JsonVodresult = vp.substring(jsonVodDotIndex + 1);
    // resource.forEach(item => {
    //     if (item == JsonVodresult) {
    //         has = true;
    //     }
    // })
    // if (!has) {
    //     has = await temGetVodAddr(vp);
    // }
    // console.log(vp,has)
  }
  if (has) {
    //播放器
    player = new Aliplayer(
      {
        id: "J_prismPlayer",
        source: vp,
        width: "100%",
        height: "auto",
        autoplay: temAliAutoVod,
        muted: true,
        preload: true,
        controlBarVisibility: "hover",
        useH5Prism: true,
        isLive: temLiveSource,
        skinLayout: [
          {
            name: "bigPlayButton",
            align: "blabs",
            x: 30,
            y: 80,
          },
          {
            name: "H5Loading",
            align: "cc",
          },
          {
            name: "errorDisplay",
            align: "tlabs",
            x: 0,
            y: 0,
          },
          {
            name: "infoDisplay",
          },
          {
            name: "tooltip",
            align: "blabs",
            x: 0,
            y: 56,
          },
          {
            name: "thumbnail",
          },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              {
                name: "progress",
                align: "blabs",
                x: 0,
                y: 44,
              },
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12,
              },
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7,
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 12,
              },
              {
                name: "setting",
                align: "tr",
                x: 15,
                y: 12,
              },
              {
                name: "volume",
                align: "tr",
                x: 5,
                y: 10,
              },
            ],
          },
        ],
        components: temAlipComponents,
        language: "zh-cn",
      },
      function (player) {
        // console.log('播放器创建成功！')
        // $('#play_fir_img').hide()
      }
    );
    player.on("pause", function () {
      // if (Math.trunc(player.getCurrentTime()) < Math.trunc(vodLongTime)) {
      //     $('#play_stop_img').css('display', 'flex')
      // }
    });
    player.on("play", function () {
      // $('#play_fir_img').hide()
      // $('#play_stop_img').hide()
    });
    player.on("ended", function () {
      $("#J_prismPlayer .pause-ad").hide();
      // 视频播放完毕
      if ($("#temAutoVodTitle")?.text() == "开" && !temLiveSource) {
        if (temNextVod != 0) {
          // const href = $('#tem_next_vod').attr('href');
          // location.href = location.origin + href;
          $("#J_prismPlayer .playlist-component .icon-skipnext")?.click();
        }
      }
    });
    // 在这里执行视频加载完成后的操作
    player.on("loadeddata", function () {
      vodLongTime = player.getDuration();
      const curTrailerTime = $("#temTrailerTime").val() || 0;
      noTarLongTime = vodLongTime - curTrailerTime;
      setHistory();
      temCurDanmuComp = player.getComponent("AliplayerDanmuComponent");
      if (temDanmuTimer) {
        clearInterval(temDanmuTimer);
      }
      if (!sessionStorage.getItem("temCloseDanmu") && temBarrage.Open) {
        getBarrage();
        temDanmuTimer = setInterval(function () {
          //添加弹幕计时器
          getBarrage();
        }, temDanmuInterval * 1000);
      }
      $("#J_prismPlayer").css("background-image", `none`);
      // 创建继续播放
      if (temBrowseInfo.duration > 3 && temBrowseInfo.progress < 99) {
        const temLastTime = formatTime(temBrowseInfo.duration);
        var continuePlayEle = $("<div>")
          .html(
            `<p>上次播放到 ${temLastTime} <span id="tem_tolast_play">继续播放</span> <i class="tem_clo_continue"><img src="/iyplayer/default/images/aliplay/closeba.svg"></i><p>`
          )
          .addClass("tem_continue_play");
        $("#J_prismPlayer").append(continuePlayEle);
        setTimeout(() => {
          $("#J_prismPlayer .tem_continue_play").hide();
        }, 10000);
        $(`#J_prismPlayer .tem_continue_play #tem_tolast_play`).click(
          function () {
            player.seek(temBrowseInfo.duration);
            $("#J_prismPlayer .tem_continue_play").hide();
          }
        );
        $(`#J_prismPlayer .tem_continue_play .tem_clo_continue`).click(
          function () {
            $("#J_prismPlayer .tem_continue_play").hide();
          }
        );
      }
    });
    // 视频渲染完成
    player.on("ready", function (params) {
      // 跳片头
      const status =
        $(".tem_title_child ul .current span").text() == "开" ? true : false;
      const times = Number($("#temTitlesTime").val());
      if (status && times && !temTryAndSee.open && !temLiveSource) {
        const currentTime = player.getCurrentTime();
        player.seek(currentTime + times);
      }

      $(document)
        .off("keydown")
        .on("keydown", function (event) {
          if (event.which == 37) {
            // 左方向键按下的处理逻辑
            const currentTime = player.getCurrentTime();
            player.seek(currentTime - 15);
          } else if (event.which == 39) {
            // 右方向键按下的处理逻辑
            const currentTime = player.getCurrentTime();
            player.seek(currentTime + 15);
          } else if (event.which == 32) {
            event.preventDefault();
          }
        });
      // 空格视频暂停/播放
      $(document)
        .off("keyup")
        .on("keyup", function (event) {
          if (event.keyCode === 32) {
            // if (player.paused()) {
            //   player.play();
            // } else {
            //   player.pause();
            // }
            $("#J_prismPlayer .prism-controlbar .prism-play-btn").trigger(
              "click"
            );
          }
        });

      // 设置全屏
      // $('.prism-fullscreen-btn').trigger('click')
      // alert(sessionStorage.getItem('temAlipVodFull') == 'true')
      // if (sessionStorage.getItem('temAlipVodFull') == 'true') {
      //     player.fullscreenService.requestFullScreen();
      // }
    });
    //视频时间更新
    player.on("timeupdate", function (event) {
      // 跳片尾
      const status =
        $(".tem_trailer_child ul .current span").text() == "开" ? true : false;
      if (
        status &&
        Math.trunc(player.getCurrentTime()) == Math.trunc(noTarLongTime) &&
        !temLiveSource
      ) {
        player.seek(vodLongTime);
      }
    });
    player.on("requestFullScreen", function () {
      // 视频进入全屏模式
      temAlipVodIsFull = true;
      //初始化弹幕
      temCurDanmuComp?.CM.init();
    });
    player.on("cancelFullScreen", function () {
      // 视频退出全屏模式
      temAlipVodIsFull = false;
      document.body.style.cursor = "default";
      //初始化弹幕
      temCurDanmuComp?.CM.init();
    });
    // 视频跳转完成
    player.on("seeked", function () {
      // 当视频跳转完成后调用的回调函数
      if (!sessionStorage.getItem("temCloseDanmu") && temBarrage.Open) {
        getBarrage();
      }
    });
    // 自定义按钮
    function aliCustomBtn(params) {
      // 创建快退按钮
      var alipBackwardButton = $("<div>")
        .html(`<img src="/iyplayer/default/images/aliplay/houtui15.svg">`)
        .addClass("alivod_retreat")
        .click(function () {
          const currentTime = player.getCurrentTime();
          player.seek(currentTime - 15);
        });
      // 创建快进按钮
      var alipForwardButton = $("<div>")
        .html('<img src="/iyplayer/default/images/aliplay/kuaijin15.svg">')
        .addClass("alivod_forward")
        .click(function () {
          const currentTime = player.getCurrentTime();
          player.seek(currentTime + 15);
        });
      // // 创建下一集按钮
      // var alipNextVodButton = $('<div>')
      //     .html('下一集').addClass('alivod_nextvod')
      //     .click(function () {
      //         if (temNextVod != 0) {
      //             const href = $('#tem_next_vod').attr('href');
      //             location.href = location.origin + href;
      //         }
      //     });
      // 将按钮添加到播放器容器中
      var playerContainer = $(".prism-controlbar");
      playerContainer.append(alipBackwardButton);
      playerContainer.append(alipForwardButton);
      // if (temNextVod != 0) {
      //     playerContainer.append(alipNextVodButton);
      // }

      // 创建片头按钮
      var temTitlesEle = $("<div>")
        .html(
          `<div id='tem_tlt_to_child' class="setting-content" style="display:flex;justify-content:space-between">
                        <span class="setting-title" style='flex-shrink:0'>跳过片头</span>
                        <span style='width:35%;display:flex;align-items:center'>
                            <input id='temTitlesTime' style='width:100%;height:80%;margin-right:5px;background:#ffffff;padding:0 10px;color:#333' type="number"/> <b>秒</b>
                        </span>
                        <span id='temTitStuTitle' class="current-setting" style='margin-right: -15px;'></span>
                        <span class="array "></span>
                    </div>`
        )
        .addClass("prism-setting-item")
        .click(function (event) {
          // event.stopPropagation();
        });

      var playerSttList = $(".prism-setting-list");
      playerSttList.append(temTitlesEle);
      var temTitlesChilEle = $("<div>")
        .html(
          `
                <div class="header">
                    <div class="left-array"></div>
                    <span>片头</span>
                </div>
                <ul class="selector-list">
                    <li>
                        <span>开</span>
                    </li>
                    <li>
                        <span>关</span>
                    </li>
                </ul>
                `
        )
        .addClass("prism-cc-selector prism-setting-selector tem_title_child")
        .mouseleave(function () {
          $(this).hide();
        });
      var vodplayerSttChil = $("#J_prismPlayer");
      vodplayerSttChil.append(temTitlesChilEle);
      $("#tem_tlt_to_child").click(function (params) {
        $(".tem_title_child").show();
      });
      $(".tem_title_child .header").click(function (params) {
        $(".tem_title_child").hide();
        $(".prism-setting-list").show();
      });
      $("#temTitlesTime").blur(function () {
        const val = $(this).val() || 0;
        const status =
          $(".tem_title_child ul .current span").text() == "开" ? true : false;
        localStorage.setItem(
          "temJumpTitles",
          JSON.stringify({ time: val, status: status })
        );
      });
      $("#temTitlesTime").click(function () {
        event.stopPropagation();
      });
      $(".tem_title_child ul li").click(function (params) {
        const val = $("#temTitlesTime").val() || 0;
        $(".tem_title_child ul li").removeClass();
        $(this).addClass("current");
        const text = $(this).children().text();
        const status = text == "开" ? true : false;
        $("#temTitStuTitle").text(text);
        localStorage.setItem(
          "temJumpTitles",
          JSON.stringify({ time: val, status: status })
        );
      });

      //  创建片尾按钮
      var temTrailerEle = $("<div>")
        .html(
          `<div id='tem_tra_to_child' class="setting-content" style="display:flex;justify-content:space-between">
                        <span class="setting-title" style='flex-shrink:0'>跳过片尾</span>
                        <span style='width:35%;display:flex;align-items:center'>
                            <input id='temTrailerTime' style='width:100%;height:80%;margin-right:5px;background:#ffffff;padding:0 10px;color:#333' type="number"/> <b>秒</b>
                        </span>
                        <span id='temTraStuTitle' class="current-setting" style='margin-right: -15px;'></span>
                        <span class="array "></span>
                    </div>`
        )
        .addClass("prism-setting-item")
        .click(function (event) {
          // event.stopPropagation();
        });

      playerSttList.append(temTrailerEle);
      var temTrailerChilEle = $("<div>")
        .html(
          `
                <div class="header">
                    <div class="left-array"></div>
                    <span>片尾</span>
                </div>
                <ul class="selector-list">
                    <li>
                        <span>开</span>
                    </li>
                    <li>
                        <span>关</span>
                    </li>
                </ul>
                `
        )
        .addClass("prism-cc-selector prism-setting-selector tem_trailer_child")
        .mouseleave(function () {
          $(this).hide();
        });
      vodplayerSttChil.append(temTrailerChilEle);
      $("#tem_tra_to_child").click(function (params) {
        $(".tem_trailer_child").show();
      });
      $(".tem_trailer_child .header").click(function (params) {
        $(".tem_trailer_child").hide();
        $(".prism-setting-list").show();
      });
      $("#temTrailerTime").blur(function () {
        const val = $(this).val() || 0;
        const status =
          $(".tem_trailer_child ul .current span").text() == "开"
            ? true
            : false;
        localStorage.setItem(
          "temJumpTrailer",
          JSON.stringify({ time: val, status: status })
        );
      });
      $("#temTrailerTime").click(function () {
        event.stopPropagation();
      });
      $(".tem_trailer_child ul li").click(function (params) {
        const val = $("#temTrailerTime").val() || 0;
        $(".tem_trailer_child ul li").removeClass();
        $(this).addClass("current");
        const text = $(this).children().text();
        const status = text == "开" ? true : false;
        $("#temTraStuTitle").text(text);
        localStorage.setItem(
          "temJumpTrailer",
          JSON.stringify({ time: val, status: status })
        );
      });

      // 创建自动播放下一集按钮
      var temAutoVodEle = $("<div>")
        .html(
          `<div class="setting-content" >
                        <span class="setting-title" style='flex-shrink:0'>自动播放下一集</span>
                        <span class="array "></span>
                        <span id='temAutoVodTitle' class="current-setting"></span>
                    </div>`
        )
        .addClass("prism-setting-item")
        .click(function (event) {
          $(".tem_autovod_child").show();
        });
      if (!temIsJsonPa) {
        playerSttList.append(temAutoVodEle);
      }
      var temAutoVodChilEle = $("<div>")
        .html(
          `
                <div class="header">
                    <div class="left-array"></div>
                    <span>自动播放下一集</span>
                </div>
                <ul class="selector-list">
                    <li>
                        <span>开</span>
                    </li>
                    <li>
                        <span>关</span>
                    </li>
                </ul>
                `
        )
        .addClass("prism-cc-selector prism-setting-selector tem_autovod_child")
        .mouseleave(function () {
          $(this).hide();
        });
      vodplayerSttChil.append(temAutoVodChilEle);
      $(".tem_autovod_child .header").click(function (params) {
        $(".tem_autovod_child").hide();
        $(".prism-setting-list").show();
      });
      $(".tem_autovod_child ul li").click(function (params) {
        $(".tem_autovod_child ul li").removeClass();
        $(this).addClass("current");
        const text = $(this).children().text();
        const status = text == "开" ? true : false;
        $("#temAutoVodTitle").text(text);
        localStorage.setItem("temAutoVod", status);
      });

      /* 切换集数按钮事件 */
      // 列表集
      $("#J_prismPlayer .playlist-content .list .video-item")?.click(function (
        params
      ) {
        const toIndex = $(this).data("index");
        const toHref = $(".tem_item_eps").eq(toIndex).attr("href");
        temCurVodFile = temLineList[toIndex].source;
        lineId = temLineList[toIndex].id;
        // $('#J_prismPlayer .playlist-content .list .video-item').removeClass('active');
        // $(this).addClass('active')
        checkShop();
        temRefreshTemDom(toHref);
      });
      // 上一集
      $("#J_prismPlayer .playlist-component .icon-skip-previous")?.click(
        function (params) {
          const temCurrentSource = player._options.source;
          const index = temLineList.findIndex(
            (item) => item.source == temCurrentSource
          );
          const toIndex = index - 1;
          // console.log(index, toIndex)
          if (index && index != "0") {
            temCurVodFile = temLineList[toIndex].source;
            lineId = temLineList[toIndex].id;
            checkShop();
            const toHref = $(".tem_item_eps").eq(toIndex).attr("href");
            temRefreshTemDom(toHref);
          }
        }
      );
      // 下一集
      $("#J_prismPlayer .playlist-component .icon-skipnext")?.click(
        async function (event) {
          // if (stopFollowVodClick) {
          // event.stopImmediatePropagation();
          //     await checkShop();
          //     stopFollowVodClick = false;
          //     $('#J_prismPlayer .playlist-component .icon-skipnext').click()
          // }else{
          //     stopFollowVodClick = true
          // }
          const temCurrentSource = player._options.source;
          const index = temLineList.findIndex(
            (item) => item.source == temCurrentSource
          );
          const length = temLineList.length;
          const toIndex = index + 1;
          if (index + 1 != length) {
            temCurVodFile = temLineList[toIndex].source;
            lineId = temLineList[toIndex].id;
            checkShop();
            const toHref = $(".tem_item_eps").eq(toIndex).attr("href");
            temRefreshTemDom(toHref);
          }
        }
      );
      // $('#J_prismPlayer .playlist-component .icon-skipnext').click(function (params) {
      //     console.log("下一集2")
      // })
      // 试看
      $(".vip_limit_close_btn").click(function (params) {
        player.getComponent("PreviewVodComponent").closePreviewLayer();
      });
      // 弹幕
      const danmuBoxEle = $("#J_prismPlayer .ali-danmuku-control");
      $("#J_prismPlayer .ali-danmuku-control .ali-danmu-input-wrap").hide(); //隐藏原本弹幕输入框
      var danmuInpEle = $("<div>")
        .html(
          `
                <div class="tem-cur-danmu-inp"><input type="text" maxlength="30"></div>
                <div class="tem-cur-danmu-btn">发送</div>
                `
        )
        .addClass("tem-cur-danmu-box")
        .keydown(function (e) {
          e.stopPropagation();
        })
        .keyup(function (e) {
          e.stopPropagation();
        });
      var danmuSettBtnEle = $("<div>")
        .html(`<img src="/iyplayer/default//images/icon/danmu_setting.svg" />`)
        .addClass("tem-cur-danmu-setting")
        .click(function (params) {
          if (temViewPortIsPc) {
            const danRigEle = $("#J_prismPlayer .tem-cur-danmu-right-box");
            if (!danRigEle.width()) {
              danRigEle.css({ width: "30%" });
            } else {
              danRigEle.css({ width: "0%" });
            }
          } else {
            const temDanH5Box = $(".tem_h5_danmu_box");
            if (temDanH5Box.css("bottom") == "0px") {
              temDanH5Box.css({ bottom: "-34vh" });
            } else {
              temDanH5Box.css({ bottom: 0 });
            }
          }
        });
      var danmuSettBoxEle = $("<div>")
        .html(
          `<div class="danmu-right-box-cont">
                    <section class="danmu-right-col">
                        <p>弹幕颜色</p>
                        <div class="danmu-right-co-box">
                            <section class="danmu-right-co-active" data-col="ffffff"></section>
                            <section data-col="f80010"></section>
                            <section data-col="fff102"></section>
                            <section data-col="009843"></section>
                            <section data-col="00a0ea"></section>
                            <section data-col="e3017f"></section>
                            <section data-col="90c221"></section>
                            <section data-col="003175"></section>
                            <section data-col="f0ab2a"></section>
                            <section data-col="683a7b"></section>
                            <section data-col="98e4f3"></section>
                            <section data-col="927839"></section>
                        </div>
                    </section>
                </div>`
        )
        .addClass("tem-cur-danmu-right-box");
      danmuBoxEle.prepend(danmuInpEle);
      danmuBoxEle.append(danmuSettBtnEle);
      var danmuHintEle = $("<div>").addClass("tem_danmu_full_hint");
      $("#J_prismPlayer").append(danmuSettBoxEle);
      $("#J_prismPlayer").append(danmuHintEle);
      // 创建h5弹幕盒子
      if (!temViewPortIsPc) {
        var danmuH5BottomBox = $("<div>")
          .html(
            `
                    <div class="tem_h5_danmu_set_col">
                            <div class="tem_h5_danmu_inp_box">
                                <input type="text" maxlength="30" placeholder="输入弹幕">
                                <div class="tem_h5_danmu_btn">发送</div>
                                <div class="tem_h5_danmu_img"><img src="/iyplayer/default/images/icon/bg-close.svg"/></div>
                            </div>
                            <div class="tem_h5_danmu_col">
                                <p>弹幕颜色</p>
                                <div class="tem_h5_danmu_col_box">
                                    <section class="danmu_h5_clo_active" data-col="ffffff"></section>
                                    <section data-col="f80010"></section>
                                    <section data-col="fff102"></section>
                                    <section data-col="009843"></section>
                                    <section data-col="00a0ea"></section>
                                    <section data-col="e3017f"></section>
                                    <section data-col="90c221"></section>
                                    <section data-col="003175"></section>
                                    <section data-col="f0ab2a"></section>
                                    <section data-col="683a7b"></section>
                                    <section data-col="98e4f3"></section>
                                    <section data-col="927839"></section>
                                </div>
                            </div>
                        </div>
                    </div>`
          )
          .addClass("tem_h5_danmu_box");
        danmuH5BottomBox.appendTo("body");
      }

      // 直播模式创建播放暂停按钮
      if (temLiveSource) {
        playerContainer.prepend(
          '<div class="prism-play-btn playing" id="J_prismPlayer_component_5EEFF853-7324-4DCD-87AC-E3818BD43567" style="float: left; margin-left: 15px; margin-top: 12px;"></div>'
        );
        $(".prism-controlbar .prism-play-btn").click(function () {
          if ($(this).hasClass("playing")) {
            $(this).removeClass("playing");
            player.pause();
          } else {
            $(this).addClass("playing");
            player.play();
          }
        });
      }
      // 创建画中画按钮
      var pictureBtn = $("<div>")
        // .html(`<img src="/iyplayer/default/images/icon/picture.svg">`)
        .html(
          `<div class="setting-content" >
                        <span class="setting-title" style='flex-shrink:0'>画中画</span>
                    </div>`
        )
        .addClass("prism-setting-item")
        // .addClass("cus_picture_btn")
        .click(function () {
          const videoElement = document.querySelector("video");
          // 确保浏览器支持画中画
          if (videoElement && "pictureInPictureEnabled" in document) {
            if (videoElement !== document.pictureInPictureElement) {
              videoElement.requestPictureInPicture().catch((error) => {
                // 处理错误
                console.error("画中画模式激活失败：", error);
              });
            } else {
              document.exitPictureInPicture().catch((error) => {
                // 处理错误
                console.error("退出画中画模式失败：", error);
              });
            }
          } else {
            alert("浏览器不支持画中画");
          }
        });
      $(".prism-setting-list").append(pictureBtn);
    }
    aliCustomBtn();
    // 自定义操作赋值
    function aliCustomAss(params) {
      // 片头
      const temTitlesObj =
        JSON.parse(localStorage.getItem("temJumpTitles")) || {};
      if (temTitlesObj) {
        $("#temTitlesTime").val(temTitlesObj.time);
        if (temTitlesObj.status) {
          $(".tem_title_child ul li").eq(0).addClass("current");
          $("#temTitStuTitle").text("开");
        } else {
          $(".tem_title_child ul li").eq(1).addClass("current");
          $("#temTitStuTitle").text("关");
        }
      }
      // 片尾
      const temTrailerObj =
        JSON.parse(localStorage.getItem("temJumpTrailer")) || {};
      if (temTrailerObj) {
        $("#temTrailerTime").val(temTrailerObj.time);
        if (temTrailerObj.status) {
          $(".tem_trailer_child ul li").eq(0).addClass("current");
          $("#temTraStuTitle").text("开");
        } else {
          $(".tem_trailer_child ul li").eq(1).addClass("current");
          $("#temTraStuTitle").text("关");
        }
      }
      // 自动播放下一集
      const temAutoStatu = localStorage.getItem("temAutoVod") || false;
      if (temAutoStatu == "true") {
        $(".tem_autovod_child ul li").eq(0).addClass("current");
        $("#temAutoVodTitle").text("开");
      } else {
        $(".tem_autovod_child ul li").eq(1).addClass("current");
        $("#temAutoVodTitle").text("关");
      }

      // 设置广告跳转方式
      // 播放前
      const temStarAdCloELe = $("<b>")
        .html(
          `
                <img style="width: 14px;margin-top:-2px;cursor:pointer"src="/iyplayer/default/images/aliplay/close.svg" alt="">`
        )
        .click(function (params) {
          $("#J_prismPlayer .start-ad").hide();
          player.play();
        });
      if (temAlipComAdOpt.startAd.close === "1") {
        $("#J_prismPlayer .start-ad .tip").append(temStarAdCloELe);
      }
      $("#J_prismPlayer .start-ad .ad-content").attr(
        "target",
        temAlipComAdOpt.startAd.target
      );
      // 播放暂停
      $("#J_prismPlayer .pause-ad .ad-content").attr(
        "target",
        temAlipComAdOpt.puseAd.target
      );
      if (temAlipComAdOpt.puseAd.close !== "1") {
        $("#J_prismPlayer .pause-ad .btn-close").hide();
      }

      // 视频列表
      const temCurrentSource = player._options.source;
      const curVodPlayindex = temLineList.findIndex(
        (item) => item.source == temCurrentSource
      );
      $("#J_prismPlayer .playlist-content .list .video-item").removeClass(
        "active"
      );
      $("#J_prismPlayer .playlist-content .list .video-item")
        .eq(curVodPlayindex)
        .addClass("active");

      // 监听全屏操作框
      const temVodMoreOptEle = $("#J_prismPlayer .prism-controlbar");
      const temObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          if (mutation.attributeName === "style") {
            // 当样式属性变化时执行的代码
            const displayValue = temVodMoreOptEle.css("display");
            if (temAlipVodIsFull) {
              if (displayValue == "none") {
                document.body.style.cursor = "none";
              } else {
                document.body.style.cursor = "default";
              }
            }
          }
        });
      });
      temObserver.observe(temVodMoreOptEle[0], { attributes: true });
      $("#J_prismPlayer").on("mousemove", function (event) {
        // 处理鼠标移动事件的逻辑
        if (temVodMoreOptEle.css("display") == "none") {
          temVodMoreOptEle.show();
        }
      });
      $("#J_prismPlayer video").on("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      });

      /* 弹幕 */
      $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box input").keydown(
        function (e) {
          if (e.keyCode === 13) {
            const inputEle = $(
              "#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box input"
            );
            const text = inputEle.val();
            if (text && $.trim(text) != "") {
              inputEle.val("");
              sendTt({ text });
            }
          }
        }
      );
      $(
        "#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box .tem-cur-danmu-btn"
      ).click(function (e) {
        const inputEle = $(
          "#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box input"
        );
        const text = inputEle.val();
        if (text && $.trim(text) != "") {
          inputEle.val("");
          sendTt({ text });
        }
      });
      $("#J_prismPlayer .ali-danmuku-control .icon-danmu-open").click(function (
        e
      ) {
        sessionStorage.removeItem("temCloseDanmu");
        if (!temDanmuTimer) {
          getBarrage();
          temDanmuTimer = setInterval(function () {
            //添加弹幕计时器
            getBarrage();
          }, temDanmuInterval * 1000);
        }
        $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box").css({
          display: "flex",
        });
        $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-setting").show();
      });
      $("#J_prismPlayer .ali-danmuku-control .icon-danmu-close").click(
        function (e) {
          sessionStorage.setItem("temCloseDanmu", 1);
          $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box").hide();
          $(
            "#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-setting"
          ).hide();
        }
      );
      if (sessionStorage.getItem("temCloseDanmu")) {
        $("#J_prismPlayer .ali-danmuku-control .icon-danmu-close").hide();
        $("#J_prismPlayer .ali-danmuku-control .icon-danmu-open").show();
        $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-box").hide();
        $("#J_prismPlayer .ali-danmuku-control .tem-cur-danmu-setting").hide();
      }
      // 弹幕-h5
      $(
        ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_inp_box input"
      ).keydown(function (e) {
        e.stopPropagation();
      });
      $(
        ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_inp_box .tem_h5_danmu_btn"
      ).click(function (e) {
        const inputEle = $(
          ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_inp_box input"
        );
        const text = inputEle.val();
        if (text && $.trim(text) != "") {
          inputEle.val("");
          sendTt({ text });
        }
      });
      $(
        ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_inp_box .tem_h5_danmu_img"
      ).click(function (e) {
        const temDanH5Box = $(".tem_h5_danmu_box");
        if (temDanH5Box.css("bottom") == "0px") {
          temDanH5Box.css({ bottom: "-34vh" });
        } else {
          temDanH5Box.css({ bottom: 0 });
        }
      });

      $("#J_prismPlayer .tem-cur-danmu-right-box").mouseleave(function (e) {
        $("#J_prismPlayer .tem-cur-danmu-right-box").css({ width: "0%" });
      });
      const temSetDanMuNum = sessionStorage.getItem("temSetDanMuColor");
      const danMuColItemEle = $(
        "#J_prismPlayer .tem-cur-danmu-right-box .danmu-right-co-box section"
      );
      const danMuColH5ItemEle = $(
        ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_col section"
      ); //h5颜色
      if (temSetDanMuNum) {
        if (temViewPortIsPc) {
          danMuColItemEle.removeClass("danmu-right-co-active");
          danMuColItemEle
            .eq(Number(temSetDanMuNum))
            .addClass("danmu-right-co-active");
        } else {
          danMuColH5ItemEle?.removeClass("danmu_h5_clo_active");
          danMuColH5ItemEle
            ?.eq(Number(temSetDanMuNum))
            .addClass("danmu_h5_clo_active");
        }
      }
      danMuColItemEle.click(function () {
        const index = $(this).index();
        danMuColItemEle.removeClass("danmu-right-co-active");
        $(this).addClass("danmu-right-co-active");
        sessionStorage.setItem("temSetDanMuColor", index);
      });
      danMuColH5ItemEle?.click(function () {
        const index = $(this).index();
        danMuColH5ItemEle?.removeClass("danmu_h5_clo_active");
        $(this).addClass("danmu_h5_clo_active");
        sessionStorage.setItem("temSetDanMuColor", index);
      });
    }
    aliCustomAss();
  } else {
    $("#J_prismPlayer").css("background-image", `none`);
    $("#J_prismPlayer").html(
      `<iframe width="100%" height="100%" src="${vp}" frameborder="0" allowfullscreen></iframe>`
    );
    setHistory(true);
  }
}
// 删除试看
function delTrySee(params) {
  const index = temAlipComponents.findIndex(
    (item) => item.name == "PreviewVodComponent"
  );
  if (index != -1) {
    temAlipComponents.splice(index, 1);
    return true;
  } else {
    return false;
  }
}
// 检查是否购买
function checkShop({ shop = false } = {}) {
  return $http(`/openapi/playline/${lineId}`, "", "get")
    .then((res) => {
      // console.log("播放正常")
      $("#cms_no_shop").hide();
      // const staAdvEle = $('#play_fir_img')
      // if (staAdvEle.length) {
      //     staAdvEle.show()
      //     minus();
      // }
      temCurVodFile = res.data.info.file;
      temLiveSource = res.data.info.liveSource;
      if (shop && temTryAndSee.open) {
        // 使用其他方式添加组件
        delTrySee();
        temAlipComponents.push({
          name: "PreviewVodComponent",
          type: AliPlayerComponent.PreviewVodComponent,
          args: [0, "", ""],
        });
        if (player) {
          player.dispose();
          player = null;
        }
      }
      if (!res.data.buy) {
        const trySeeSta = delTrySee();
        if (player) {
          player.dispose();
          player = null;
        }
        if (temAlipVodIsFull) {
          document.exitFullscreen();
        }
        if (chargingMode == 2) {
          temAlipComponents.push({
            name: "PreviewVodComponent",
            type: AliPlayerComponent.PreviewVodComponent,
            args: [
              temTryAndSee.duration * 60 + temTryAndSee.second,
              `<div style='height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center'>
        <p class="cms_no_shop_btn tem_vip_pc" onclick="goShopVod()" style="margin-bottom:20px">开通VIP</p>
            <p onclick="goShopVod(true)" class="cms_no_shop_btn tem_vip_h5" style="margin-bottom:20px">开通VIP</p>
    <div class="vip_limit_close"><span class="vip_limit_close_btn">x</span></div>
  </div>`,
              `<span class='tem_theme_color tem_vip_h5' onclick="goShopVod(true)">开通VIP</span>
    <span class='tem_theme_color tem_vip_pc' onclick="goShopVod()">开通VIP</span> 观看完整视频`,
            ],
          });
        } else {
          temAlipComponents.push({
            name: "PreviewVodComponent",
            type: AliPlayerComponent.PreviewVodComponent,
            args: [
              temTryAndSee.duration * 60 + temTryAndSee.second,
              `<div style='height:100%;display:flex;flex-direction:column;justify-content:center;align-items:center'>
        <p class="cms_no_shop_btn tem_vip_pc" onclick="goShopVod()" style="margin-bottom:20px">购买本片</p>
        <p class="cms_no_shop_btn tem_vip_h5" onclick="goShopVod(true)" style="margin-bottom:20px">购买本片</p>
        <div class="vip_limit_close"><span class="vip_limit_close_btn">x</span></div>
    </div>`,
              `本片需使用金币点播 <span class='tem_theme_color tem_vip_pc' onclick="goShopVod()">购买本片</span>
    <span class='tem_theme_color tem_vip_h5' onclick="goShopVod(true)">购买本片</span>`,
            ],
          });
        }
      } else {
        const trySeeSta = delTrySee();
        if (trySeeSta && player) {
          temAlipComponents.push({
            name: "PreviewVodComponent",
            type: AliPlayerComponent.PreviewVodComponent,
            args: [0, "", ""],
          });
          player.dispose();
          player = null;
          if (temAlipVodIsFull) {
            document.exitFullscreen();
          }
        }
      }
      if (temPlayParseMode === 1 || temPlayParseMode === 2) {
        console.log("=====", temPlayParseMode, temPlayRenderCode);
        $("#J_prismPlayer").hide();
        $("#custom_player_box").html(temPlayRenderCode).show();
      } else if (!player && temCurVodFile) {
        if (temIsJsonPa) {
          if (res.data.info?.file) {
            initVod(res.data.info.file);
            setVodLoding();
          } else {
            $(".aliplayer-box .tem_no_playfile")?.text(`播放线路为空`).show();
          }
        } else {
          initVod(temCurVodFile);
          setVodLoding();
        }
        $(".aliplayer-box .tem_no_playfile")?.hide();
      } else if (!temCurVodFile) {
        $(".aliplayer-box .tem_no_playfile")
          ?.text(`播放线路为空 ${temCurVodFile}`)
          .show();
      }
    })
    .catch((error) => {
      // console.log('播放错误')
      if (player) {
        player.dispose();
        player = null;
      }
      const { data } = error;
      // console.log(data)
      if (temAlipVodIsFull) {
        document.exitFullscreen();
      }
      $("#cms_no_shop").show();
      if (data?.message == "需要购买本片" || data?.message == "需要VIP") {
      } else if (error.status === 403) {
        temRemoveToken(); //使用的为广告公共中的函数
        checkShop();
      } else {
        layer.msg(data?.message || "错误", {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
        $(".cms_no_shop_other_title").text(
          data?.message || "错误" + temCurVodFile
        );
        if (!data?.message) {
          if (location.protocol === "https:") {
            console.log("可能https 无法访问 http 资源");
          }
        }
      }
    });
}
/* 弹幕事件 */
// 获取弹幕
function getBarrage(starTime) {
  if (!temCurDanmuComp) return;
  temCurDanmuComp.CM.timeline = [];
  const start_time = Math.ceil(player.getCurrentTime());
  const params = {
    video_id: vodId,
    play_line_ids: lineId,
    start_time,
    end_time: start_time + temDanmuInterval,
  };
  return $http(`/openapi/barrage/list`, params, "get").then((res) => {
    const { data } = res;
    data.forEach((item) => {
      temCurDanmuComp.insert({
        mode: 1,
        text: item.content,
        stime: item.relative_time * 1000,
        size: 25,
        dur: temViewPortIsPc ? 8000 : 5000,
        color: item.color,
      });
    });
  });
}
// 发送弹幕
function sendTt(data) {
  const current = Math.trunc(player.getCurrentTime() + 2);
  let danMuColor = null;
  if (temViewPortIsPc) {
    danMuColor = $(
      "#J_prismPlayer .tem-cur-danmu-right-box .danmu-right-co-box .danmu-right-co-active"
    ).attr("data-col");
  } else {
    danMuColor = $(
      ".tem_h5_danmu_box .tem_h5_danmu_set_col .tem_h5_danmu_col .danmu_h5_clo_active"
    ).attr("data-col");
  }
  const params = {
    video_id: vodId, // 视频id
    play_line_id: lineId, // 集数id(第几集)
    relative_time: current, // 弹幕展示时间。90表示是1分30秒处的弹幕
    content: data.text,
    color: danMuColor, // 弹幕颜色
  };
  const danmuFullHitEle = $("#J_prismPlayer .tem_danmu_full_hint");
  const fullDanhintFun = function (text) {
    danmuFullHitEle.text(text);
    if (danmuFullHitEle.css("top") != "0px") {
      danmuFullHitEle.css({ top: 0 });
    } else {
      danmuFullHitEle.css({ top: "-40px" });
    }
  };
  if (temCurDanmuComp) {
    if (temBarrage.NeedLogin && !temUserIsLogin) {
      if (temAlipVodIsFull) {
        fullDanhintFun();
        setTimeout(() => {
          fullDanhintFun("请先登录");
        }, 1000);
      } else {
        layer.msg("请先登录", { icon: 7, offset: "50px", time: 1000 });
      }
    } else {
      temCurDanmuComp.send({
        mode: 1,
        text: data.text,
        size: 25,
        dur: temViewPortIsPc ? 8000 : 5000,
        color: danMuColor,
      });
      return $http(`/openapi/barrage`, params, "post")
        .then((res) => {})
        .catch((error) => {
          if (temAlipVodIsFull) {
            fullDanhintFun(error.data.message);
            setTimeout(() => {
              fullDanhintFun(error.data.message);
            }, 1000);
          } else {
            layer.msg(error.data.message, {
              icon: 2,
              offset: "50px",
              time: 1000,
            });
          }
        });
    }
  }
}
// 设置播放器loding
function setVodLoding(params) {
  if (temViewPortIsPc && temVodPlayerConfig.web.Loading) {
    $("#J_prismPlayer .prism-loading .circle").hide();
    const imgEle = $("<img>")
      .attr("src", temVodPlayerConfig.web.Loading)
      .css({ width: "100%", height: "100%", "object-fit": "contain" });
    $("#J_prismPlayer .prism-loading").append(imgEle);
  } else if (!temViewPortIsPc && temVodPlayerConfig.h5.Loading) {
    $("#J_prismPlayer .prism-loading .circle").hide();
    const imgEle = $("<img>")
      .attr("src", temVodPlayerConfig.h5.Loading)
      .css({ width: "100%", height: "100%", "object-fit": "contain" });
    $("#J_prismPlayer .prism-loading").append(imgEle);
  }
}
// 设置播放器logo
function vodLogPos(dom, pos) {
  if (pos == 1) {
    dom.css({ left: "5px", top: "5px" });
  } else if (pos == 2) {
    dom.css({ right: "5px", top: "5px" });
  } else if (pos == 3) {
    dom.css({ right: "5px", bottom: "5px" });
  } else if (pos == 4) {
    dom.css({ left: "5px", bottom: "5px" });
  }
}
function setVodLogo(params) {
  if (temViewPortIsPc && temVodPlayerConfig.web.Logo) {
    const vodLogoImgEle = $("<img>")
      .attr("src", temVodPlayerConfig.web.Logo)
      .addClass("vod_image");
    vodLogoImgEle.css({
      position: "absolute",
      "max-width": "200px",
      "max-height": "200px",
      "z-index": "0",
    });
    vodLogPos(vodLogoImgEle, temVodPlayerConfig.web.LogoPos);
    $("#J_prismPlayer").append(vodLogoImgEle);
  } else if (!temViewPortIsPc && temVodPlayerConfig.h5.Logo) {
    const vodLogoImgEle = $("<img>")
      .attr("src", temVodPlayerConfig.h5.Logo)
      .addClass("vod_image");
    vodLogoImgEle.css({
      position: "absolute",
      "max-width": "120px",
      "max-height": "120px",
      "z-index": "0",
    });
    vodLogPos(vodLogoImgEle, temVodPlayerConfig.h5.LogoPos);
    $("#J_prismPlayer").append(vodLogoImgEle);
  }
}
// 自定义请求头
function setHeader(params) {
  (function (open) {
    XMLHttpRequest.prototype.open = function (
      method,
      url,
      async,
      user,
      password
    ) {
      this.addEventListener(
        "readystatechange",
        function () {
          if (this.readyState === 1) {
            // OPENED state
            // this.setRequestHeader('token', '12321');
            // this.setRequestHeader('Custom-Header-2', 'CustomValue2');
            if (temViewPortIsPc && temVodPlayerConfig.web.Headers.length) {
              const data = temVodPlayerConfig.web.Headers;
              data.forEach((item) => {
                this.setRequestHeader(item.Key, item.Value);
              });
            }
            if (!temViewPortIsPc && temVodPlayerConfig.h5.Headers.length) {
              const data = temVodPlayerConfig.h5.Headers;
              data.forEach((item) => {
                this.setRequestHeader(item.Key, item.Value);
              });
            }
          }
        },
        false
      );
      open.call(this, method, url, async, user, password);
    };
  })(XMLHttpRequest.prototype.open);
}
$(document).ready(function () {
  setHeader();
  if (temViewPortIsPc && temVodPlayerConfig.web.BackgroundImg) {
    $("#J_prismPlayer").css(
      "background-image",
      `url(${temVodPlayerConfig.web.BackgroundImg})`
    );
  } else if (!temViewPortIsPc && temVodPlayerConfig.h5.BackgroundImg) {
    $("#J_prismPlayer").css(
      "background-image",
      `url(${temVodPlayerConfig.h5.BackgroundImg})`
    );
  }
  setVodLogo();
  if (temBarrage.Open) {
    // console.log('弹幕开启')
    temAlipComponents.push({
      name: "AliplayerDanmuComponent",
      type: AliPlayerComponent.AliplayerDanmuComponent,
      args: [[]],
    });
  }
  checkShop();
  // // 监听路由变化
  // window.addEventListener("popstate", function (event) {
  //     // 在这里可以根据路由变化做相应的操作
  //     console.log("路由发生变化:", location.pathname);
  // });

  // 改变路由
  function changeRoute(route) {
    // 使用 pushState，replaceState 方法改变路由；replaceState不加入历史栈
    history.replaceState(null, null, route);

    // 触发 popstate 事件
    var popStateEvent = new PopStateEvent("popstate", { state: {} });
    dispatchEvent(popStateEvent);
  }
  // 刷新节点
  temRefreshTemDom = function (curHref) {
    // const curHref = $('#tem_next_vod').attr('href');
    changeRoute(curHref);
    $.ajax({
      url: curHref,
      type: "GET",
      dataType: "html",
      success: function (response) {
        const tempDiv = $("<div>").html(response);
        let reqTitle = "";
        try {
          reqTitle = $(response).filter("title").text();
        } catch (error) {
          const temParser = new DOMParser();
          const temHtmlDoc = temParser.parseFromString(response, "text/html");
          reqTitle = temHtmlDoc.querySelector("title").textContent;
        }
        document.title = reqTitle;
        const replacement = tempDiv.find(".tem_ref_dom");
        replacement.each(function (index) {
          // console.log(index)
          $(".tem_ref_dom").eq(index).replaceWith($(this));
        });
      },
      error: function (xhr, status, error) {
        // 在这里处理 AJAX 请求错误
      },
    });
  };
  $(window).on("popstate", function () {
    // 路由变化时执行的逻辑
    if (temViewPortIsPc && temVodPlayerConfig.web.BackgroundImg) {
      $("#J_prismPlayer").css(
        "background-image",
        `url(${temVodPlayerConfig.web.BackgroundImg})`
      );
    } else if (temVodPlayerConfig.h5.BackgroundImg) {
      $("#J_prismPlayer").css(
        "background-image",
        `url(${temVodPlayerConfig.h5.BackgroundImg})`
      );
    }
  });
});
