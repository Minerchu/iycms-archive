// 用户信息
var temUserInfo = {
  isLogin: false,
};
// 用户弹框
var temlog; //用户弹窗索引
var accountOptType = 1; //1账号登录//2账号注册
var temRouteObj = {};

// 代理弹框
var temAgentPop = {
  agePopIndex: null,
  resData: {},
  close: function () {
    layer.close(temAgentPop.agePopIndex);
  },
  joinAge: function (item) {
    const { resData } = temAgentPop;
    // 1.账号 2.手机 3.邮箱
    if (resData.resType === 1) {
      memberPop.accRes(resData, true);
    } else if (resData.resType === 2) {
      memberPop.iphRes(resData, true);
    } else if (resData.resType === 3) {
      memberPop.emaRes(resData, true);
    }
  },
};

$(document).ready(() => {
  setTimeout(() => {
    $("#meme_pc_login").click(function (params) {
      // 定位第一个盒子
      temMemberLogin();
    });
  }, 300);
  // 代理下级注册
  temRouteObj = getRouteParams();
  if (temRouteObj.r && !temUserInfo.isLogin) {
    temMemberLogin();
  }
});
// 按钮加载效果
function layBtnLoad(ele, text, type = true) {
  if (type) {
    $(`${ele}`).addClass("layuicms-btn-loading").attr("disabled", true);
    $(`${ele} i`).show();
    text ? $(`${ele} span`).text(text) : "";
  } else {
    $(`${ele}`).removeClass("layuicms-btn-loading").attr("disabled", false);
    $(`${ele} i`).hide();
    text ? $(`${ele} span`).text(text) : "";
  }
}
// 登录弹框
function temMemberLogin(params) {
  $("#tem_log_res_tit li").removeClass("layuicms-this");
  $("#tem_log_res_cont div").removeClass("layuicms-show");
  $("#tem_log_res_tit li:first").addClass("layuicms-this");
  $("#tem_log_res_cont div:first").addClass("layuicms-show");
  temlog = layer.open({
    type: 1,
    skin: "layCmsLogin",
    closeBtn: false,
    title: false,
    content: $("#cmstem_login"), //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
  });
  // 监听手机号码框
  $("#temMemIphone").on("input", function (e) {
    if (/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(e.delegateTarget.value)) {
      $("#temMemIphoneCode")
        .removeClass("layuicms-btn-disabled")
        .attr("disabled", false);
    } else {
      $("#temMemIphoneCode")
        .addClass("layuicms-btn-disabled")
        .attr("disabled", true);
    }
  });
  // 监听邮箱号码框
  $("#temMemEmail").on("input", function (e) {
    if (
      /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(
        e.delegateTarget.value
      )
    ) {
      $("#temMemEmailCode")
        .removeClass("layuicms-btn-disabled")
        .attr("disabled", false);
    } else {
      $("#temMemEmailCode")
        .addClass("layuicms-btn-disabled")
        .attr("disabled", true);
    }
  });
}
/* 会员弹框 */
var memberPop = {
  // 账号登录
  accLog: function (item, mess = true) {
    layBtnLoad(".tem_login_btn");
    const loginParams = {
      captcha: "test",
      userName: item.userName,
      password: md5(item.password),
      confirmPassword: md5(item.password),
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 3, //游客注册标识
      id: "9", //验证码Id，此字段暂无实际作用
    };
    $http(`/openapi/member/login`, loginParams, "post").then((res) => {
        const { data } = res;
        if (data.token) {
          temSetToken(data.token);
        }
        storage.setSession("tplUserInfo", data.userInfo);
        mess
          ? layer.msg("登录成功", { icon: 1, offset: "50px", time: 1000 })
          : "";
        setTimeout(() => {
          location.href = location.origin + "/memberUser";
        }, 500);
      }).catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 账号注册
  accRes: async function (item, agent = false) {
    layBtnLoad(".tem_login_btn");
    const resParams = {
      userName: item.userName,
      password: md5(item.password),
      confirmPassword: md5(item.confirmPassword),
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 1,
    };
    if (temRouteObj.r) {
      resParams.inviteCode = temRouteObj.r;
    }
    if (item.inviteCode && !agent) {
      temAgentPop.resData = { ...item, resType: 1 };
      memberPop.invitationVali();
      return;
    } else if (item.inviteCode) {
      resParams.inviteCode = item.inviteCode;
    }
    $http(`/openapi/member/register`, resParams, "post")
      .then((res) => {
        layer.msg("注册成功", { icon: 1, offset: "50px", time: 1000 });
        memberPop.accLog(item, false);
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 手机登录
  iphLog: function (item, mess = true) {
    layBtnLoad(".tem_login_btn");
    const loginParams = {
      code: item.code,
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 3, //游客登录标识
      verifyType: 1,
      userName: item.phone,
    };
    $http(`/openapi/member/verify/login`, loginParams, "post")
      .then((res) => {
        const { data } = res;
        if (data.token) {
          temSetToken(data.token);
        }
        storage.setSession("tplUserInfo", data.userInfo);
        mess
          ? layer.msg("登录成功", { icon: 1, offset: "50px", time: 1000 })
          : "";
        setTimeout(() => {
          location.href = location.origin + "/memberUser";
        }, 500);
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 手机注册
  iphRes: function (item, agent = false) {
    layBtnLoad(".tem_login_btn");
    const resParams = {
      code: item.code,
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 1, //游客注册标识
      verifyType: 1,
      userName: item.phone,
    };
    if (temRouteObj.r) {
      resParams.inviteCode = temRouteObj.r;
    }
    if (item.inviteCode && !agent) {
      temAgentPop.resData = { ...item, resType: 2 };
      memberPop.invitationVali();
      return;
    } else if (item.inviteCode) {
      resParams.inviteCode = item.inviteCode;
    }
    $http(`/openapi/member/verify/register`, resParams, "post")
      .then((res) => {
        const { data } = res;
        if (data.token) {
          temSetToken(data.token);
        }
        storage.setSession("tplUserInfo", data.userInfo);
        layer.msg("注册成功", { icon: 1, offset: "50px", time: 1000 });
        setTimeout(() => {
          location.href = location.origin + "/memberUser";
        }, 500);
        // memberPop.iphLog(item, false);
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 邮箱登录
  emaLog: function (item, mess = true) {
    layBtnLoad(".tem_login_btn");
    const loginParams = {
      code: item.code,
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 3, //游客登录标识
      verifyType: 2,
      userName: item.email,
    };
    $http(`/openapi/member/verify/login`, loginParams, "post")
      .then((res) => {
        const { data } = res;
        if (data.token) {
          temSetToken(data.token);
        }
        storage.setSession("tplUserInfo", data.userInfo);
        mess
          ? layer.msg("登录成功", { icon: 1, offset: "50px", time: 1000 })
          : "";
        setTimeout(() => {
          location.href = location.origin + "/memberUser";
        }, 500);
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 邮箱注册
  emaRes: function (item, agent = false) {
    layBtnLoad(".tem_login_btn");
    const resParams = {
      code: item.code,
      resolving: `${window.screen.width}*${window.screen.height}`,
      from: 1, //游客注册标识
      verifyType: 2,
      userName: item.email,
    };
    if (temRouteObj.r) {
      resParams.inviteCode = temRouteObj.r;
    }
    if (item.inviteCode && !agent) {
      temAgentPop.resData = { ...item, resType: 1 };
      memberPop.invitationVali();
      return;
    } else if (item.inviteCode) {
      resParams.inviteCode = item.inviteCode;
    }
    item.inviteCode ? (resParams.inviteCode = item.inviteCode) : "";
    $http(`/openapi/member/verify/register`, resParams, "post")
      .then((res) => {
        const { data } = res;
        if (data.token) {
          temSetToken(data.token);
        }
        storage.setSession("tplUserInfo", data.userInfo);
        layer.msg("注册成功", { icon: 1, offset: "50px", time: 1000 });
        setTimeout(() => {
          location.href = location.origin + "/memberUser";
        }, 500);

        // memberPop.emaLog(item, false);
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad(".tem_login_btn", "", false);
      });
  },
  // 邀请码验证
  invitationVali: function () {
    // 8i4vyRhd
    const { resData } = temAgentPop;
    return $http(
      `/openapi/member/agent/findInfoByCode`,
      { inviteCode: resData.inviteCode },
      "get"
    )
      .then((res) => {
        if (res.data) {
          temAgentPop.agePopIndex = layer.open({
            type: 1,
            title: false,
            closeBtn: false,
            skin: "tem_agent_conf",
            content: `<div class="tem_agent_cont">
                  <div class="tem_age_invinfo">
                    <img src="${res.data.avatar}">
                    <p class="name">${res.data.memberUsername}</p>
                    <p class="grade">${res.data.agentLevelName}</p>
                  </div>
                  <img src="data:image/png;base64,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">
                  <div class="tem_age_invite_code">8iFWf5oF</div>
                  <p class="tem_age_butns" onclick="temAgentPop.joinAge()">加入其团队</p>
                  
              </div>
              <div class="age_close" onclick="temAgentPop.close()">
                    <svg style="width:12px;height:12px;fill:#000000;" aria-hidden="true">
                        <use xlink:href="#icon-icon_close"></use>
                    </svg>
              </div>
              `,
          });
        } else {
          layer.msg("邀请码错误", {
            icon: 2,
            offset: "50px",
            time: 1000,
          });
        }
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      });
  },
  // 确认加入代理
};
var memberBoxOpt = {
  // 同意协议
  temCheckAllAgr: function (params) {
    $(`input[type='radio'][name="agreement"]`).prop("checked", true);
  },
  // 发送手机验证码
  sendIphoneCode: function () {
    const phone = $("#temMemIphone").val();
    layBtnLoad("#temMemIphone", "发送中");
    $http(`/openapi/sms/send_sms`, { phone }, "post")
      .then((res) => {
        layer.msg("短信发送成功", { icon: 1, offset: "50px", time: 1000 });
        $("#temMemIphoneCode").hide();
        memberBoxOpt.iphoneCode(60);
        $("#temMemIphoneCodeSend").show();
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad("#temMemIphone", "发送验证码", false);
      });
  },
  //手机失效时间
  iphoneCode: function (time) {
    if (time) {
      $("#temMemIphoneCodeSec").text(time);
      setTimeout(() => {
        memberBoxOpt.iphoneCode(time - 1);
      }, 1000);
    } else {
      $("#temMemIphoneCode").show();
      $("#temMemIphoneCodeSend").hide();
    }
  },
  // 发送邮箱验证码
  sendEmailCode: function () {
    const email = $("#temMemEmail").val();
    layBtnLoad("#temMemEmailCode", "发送中");
    $http(`/openapi/sms/send_email`, { email }, "post")
      .then((res) => {
        layer.msg("邮箱发送成功", { icon: 1, offset: "50px", time: 1000 });
        $("#temMemEmailCode").hide();
        memberBoxOpt.emailCode(60);
        $("#temMemEmailCodeSend").show();
      })
      .catch((error) => {
        layer.msg(error.data.message, {
          icon: 2,
          offset: "50px",
          time: 1000,
        });
      })
      .finally(() => {
        layBtnLoad("#temMemEmailCode", "发送验证码", false);
      });
  },
  //邮箱失效时间
  emailCode: function (time) {
    if (time) {
      $("#temMemEmailCodeSec").text(time);
      setTimeout(() => {
        memberBoxOpt.emailCode(time - 1);
      }, 1000);
    } else {
      $("#temMemEmailCode").show();
      $("#temMemEmailCodeSend").hide();
    }
  },
};
// 提交登录
layuicms.use("form", function () {
  var form = layuicms.form;
  var formAccBox = form.render(null, "formAccBox");
  //监听提交--账号
  formAccBox.on("submit(temLoginformAcc)", function (data) {
    // return false
    if (data.field.agreement) {
      if (accountOptType === 1) {
        // 账号登录
        memberPop.accLog(data.field);
      } else if (accountOptType === 2) {
        if (data.field.confirmPassword !== data.field.password) {
          layer.msg("两次密码不一致");
          return false;
        } else {
          memberPop.accRes(data.field);
        }
        // 账号注册
      }
    } else {
      layer.msg("未勾选用户协议");
    }
    return false;
  });
  // 监听单选
  formAccBox.on("radio(temCheckAgree)", function (data) {
    memberBoxOpt.temCheckAllAgr();
    form.render();
  });
  formAccBox.verify({
    username: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!value) {
        return "账号不能为空";
      }
      if (!/^[a-zA-Z0-9]{3,24}$/.test(value)) {
        return "账号必须由3~24位数字,字符组成!";
      }
    },
    password: function (value, item) {
      //value：表单的值、item：表单的DOM对象
      if (!value) {
        return "密码不能为空";
      }
      if (value.length < 6 || value.length > 20) {
        return "密码长度为6~20个字符组成";
      }
    },
  });
  //监听提交--手机
  formAccBox.on("submit(temLoginformIph)", function (data) {
    // return false
    if (data.field.agreement) {
      if (accountOptType === 1) {
        // 手机登录
        memberPop.iphLog(data.field);
      } else if (accountOptType === 2) {
        // 手机注册
        memberPop.iphRes(data.field);
      }
    } else {
      layer.msg("未勾选用户协议");
    }
    return false;
  });
  //监听提交--邮箱
  formAccBox.on("submit(temLoginformEma)", function (data) {
    // console.log(data.field);
    // return false
    if (data.field.agreement) {
      if (accountOptType === 1) {
        // 邮箱登录
        memberPop.emaLog(data.field);
      } else if (accountOptType === 2) {
        // 邮箱注册
        memberPop.emaRes(data.field);
      }
    } else {
      layer.msg("未勾选用户协议");
    }
    return false;
  });
  // 邀请码
  $(".tem_res_agent_code input").blur(function () {
    // 在输入框失焦时执行的代码
    const value = $(this).val();
    $(".tem_res_agent_code input").val(value);
  });
});

// 关闭弹框
function closeTemLogin(params) {
  layer.close(temlog);
}
// 去注册
function temGoRes(params) {
  accountOptType = 2;
  $(".cmstem_acc_log").hide();
  $(".cmstem_acc_res").show();
  $(".cmstem_acc_res_firpass").append(`<div class="layuicms-form-item ">
    <div class="layuicms-input-block">
        <input type="password" name="confirmPassword" required placeholder="请二次确认密码"
            lay-verify="required" lay-reqText="请确认密码" lay-verType="tips" autocomplete="off"
            class="layuicms-input">
        <i class="cmstem_inp_requ">*</i>
        <img class="tem_inp_icon" src="/libs/commIcon/pass.svg" alt="">
    </div>
  </div>`);
  temRouteObj.r ? "" : $(".tem_res_agent_code")?.show();
}
// 去登录
function temGoLog(params) {
  accountOptType = 1;
  $(".cmstem_acc_log").show();
  $(".cmstem_acc_res").hide();
  $(".cmstem_acc_res_firpass").empty();
  $(".tem_res_agent_code")?.hide();
}
// //去除字符串前后空格
// function deleteBlank(event) {
//   event.value = event.value.trim()
// }
// //节流函数
// function throttle(func, delay) {
//   let timeout;
//   return function (...args) {
//     const context = this;
//     const argsList = [...args];
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(context, argsList), delay);
//   };
// }
// //节流后函数
// const cmsRemoveKeywordspace = throttle(deleteBlank, 0);

//from表单空格处理
$(".cmsMyForm").submit(function (event) {
  event.target.querySelector("input").value = event.target
    .querySelector("input")
    .value.trim();
});

// 会员菜单
$(document).ready(function () {
  var temHeadMenuobj = [];
  // 头部菜单
  $(".tem_head_meun a").each(function () {
    const text = $(this).text().trim();
    const target = $(this).attr("target");
    const href = $(this).attr("href");
    const isChild = $(this).hasClass("tem_is_child_menu");
    const noShow = $(this).hasClass("tem_is_no_show");
    if (href && !noShow) {
      temHeadMenuobj.push({ text, target, href, isChild });
    }
  });
  sessionStorage.setItem("temHeadMenu", JSON.stringify(temHeadMenuobj));

  // 存在子级头部菜单
  var temHeadChildMenuobj = [];
  var temParentIndex = 0;
  // 头部菜单 —— 一级分类没有地址时必须要加href="javaScript:void(0)"
  $(".tem_head_child_meun a").each(function (index) {
    const text = $(this).text().trim();
    const target = $(this).attr("target");
    const href = $(this).attr("href");
    const isChild = $(this).hasClass("tem_is_child_menu");
    href
      ? temHeadChildMenuobj.push({ text, target, href, isChild, children: [] })
      : "";
  });
  const _temHeadChildMenuobj = JSON.parse(JSON.stringify(temHeadChildMenuobj));
  temHeadChildMenuobj.forEach((item, index) => {
    if (!item.isChild) {
      temParentIndex = index;
    } else {
      _temHeadChildMenuobj[temParentIndex].children.push(item);
    }
  });
  const resultChildMenu = _temHeadChildMenuobj.filter((item) => !item.isChild);
  if (resultChildMenu.length) {
    sessionStorage.setItem("temHeadChildMenu", JSON.stringify(resultChildMenu));
  } else {
    sessionStorage.removeItem("temHeadChildMenu");
  }
});

// // 会员中心下拉
// layuicms.use("dropdown", function () {
//   var dropdown = layuicms.dropdown;
//   dropdown.render({
//     elem: "#tem_hover_member", //可绑定在任意元素中，此处以上述按钮为例
//     trigger: "click",
//     className: "tem_member_dropdown",
//     data: [
//       {
//         title: "个人中心",
//         id: 1,
//         href: "/memberUser",
//       },
//       {
//         title: "退出登录",
//         id: 2,
//       },
//     ],
//     id: "demo1",
//     //菜单被点击的事件
//     click: function (obj) {
//       console.log(obj);
//       // layer.msg("回调返回的参数已显示再控制台");
//     },
//   });
// });
