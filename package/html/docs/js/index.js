/**
 * 获取面包屑数据
 * @param {Array} data 原数组
 * @param {String | Number} key 要查找的key
 * @returns {string} 返回节点字符串
 */
function getCrumbDataDom(data, key) {
  let crumbData = [];
  if (key) {
    data.forEach((Item) => {
      if (Item?.Index == key) {
        crumbData.push(Item);
      } else {
        Item?.Child.forEach((item1) => {
          if (item1?.Index == key) {
            crumbData.push(Item, item1);
          } else {
            if (item1?.Child.length > 0) {
              item1?.Child.forEach((item2) => {
                if (item2?.Index == key) {
                  crumbData.push(Item, item1, item2);
                }
              });
            } else {
              if (item1?.Index == key) {
                crumbData.push(Item, item1);
              }
            }
          }
        });
      }
    });
  }

  //拼装面包屑字符串
  let crumbStrDom = "";
  crumbData.forEach((item, index) => {
    if (index == crumbData.length - 1) {
      crumbStrDom += `<a href="?key=${item?.Index}" class="crumb-link active">${item?.Name}</a>`;
    } else {
      crumbStrDom += `<a href="?key=${item?.Index}" class="crumb-link">${item?.Name}</a> / `;
    }
  });
  return crumbStrDom;
}

/**
 * API搜索
 * @param {Array} data 数据数组
 * @param {string} keyword 关键字
 * @returns {string} 搜索结果节点
 */
function searchAPI(data, keyword, keyWord) {
  let searchArr = [];
  let searchAPIDom = "";
  let data1 = {};
  data.forEach((item) => {
    if (item?.Name.indexOf(keyword) > -1 || item?.Name.indexOf(keyWord) > -1) {
      data1[item.Name] = {
        Name: item.Name,
        key: item.Index,
        Child: item.Child,
      };
    }
    if (item?.Child.length > 0) {
      item.Child.forEach((item1) => {
        if (item1?.Child.length > 0) {
          item1.Child.forEach((item2) => {
            if (
              item2.Name.indexOf(keyword) > -1 ||
              item2?.Request?.Url?.Addr.indexOf(keyword) > -1 ||
              item2?.Used.indexOf(keyword) > -1 ||
              item2.Name.indexOf(keyWord) > -1
            ) {
              searchArr.push(item2);
              if (data1[item1.Name]) {
                // data1[item1.Name].Child.push(item2);
              } else {
                data1[item1.Name] = {
                  Name: item1.Name,
                  key: item1.Index,
                  Child: [item2],
                };
              }
            }
          });
        } else {
          if (
            item1.Name.indexOf(keyword) > -1 ||
            item1.Name.indexOf(keyWord) > -1 ||
            item1?.Request?.Url?.Addr.indexOf(keyword) > -1 ||
            item1?.Used.indexOf(keyword) > -1
          ) {
            searchArr.push(item1);
            if (data1[item.Name]) {
              // data1[item.Name].Child.push(item1);
            } else {
              data1[item.Name] = {
                Name: item.Name,
                key: item.Index,
                Child: [item1],
              };
            }
          }
        }
      });
    }
  });
  //   if (searchArr.length > 0) {
  //     searchArr.forEach((item, index) => {
  //       searchAPIDom += `<li class="nav-item">
  //         <a href="?key=${item.Index}" class="nav-link nav-link1">
  //           ${item.Name}
  //         </a>
  //     </li>`;
  //     });
  //   } else {
  //     searchAPIDom = `<li class="nav-item">
  //     <div class="null-search">
  //     无搜索结果
  //     </div>
  // </li>`;
  //   }

  //保留层级
  console.log(data1);
  if (Object.keys(data1).length > 0) {
    let str = {};
    Object.keys(data1).forEach((key, value) => {
      str[key] = "";
      data1[key]?.Child.forEach((item1, index1) => {
        str[
          key
        ] += `<li class="nav-item nav-item-abc" style="margin-left: 20px;">
            <a href="?key=${item1.Index}" class="nav-link nav-link1 search-a">
              ${item1.Name}
            </a>
        </li>`;
      });
      searchAPIDom += `<ul class="nav flex-column menu"> 
      <li class="nav-item">
          <a href="javascript:void(0);" class="nav-link nav-link1 search-a" style="font-size: 16px;">
             ${data1[key].Name}
           </a>
       </li>
      ${str[key]}</ul>`;
    });
  } else {
    searchAPIDom = `<li class="nav-item">
    <div class="null-search">
    ✨无搜索结果✨
    </div>
</li>`;
  }
  return searchAPIDom;
}
// 搜索后续处理
function getSearchDom(data, keyWord, keyWord1) {
  if (keyWord) {
    let abc = searchAPI(data, keyWord, keyWord1);
    $(".pcMenu").hide();
    $(".searchMenu").html(abc);
    $(".searchMenu").show();
  } else {
    $(".pcMenu").show();
    $(".searchMenu").hide();
  }
}
function getSearchH5Dom(data, keyWord, keyWord1) {
  if (keyWord) {
    let abc = searchAPI(data, keyWord, keyWord1);
    $(".pcMenu").hide();
    $(".searchMenu").html(abc);
    $(".searchMenu").show();
    $(".h5-menu").fadeIn(500);
  } else {
    $(".pcMenu").show();
    $(".searchMenu").hide();
    $(".h5-menu").fadeIn(500);
  }
}
/**
 * 打开菜单
 */
function openMenu() {
  if ($(".click-menu")) {
    $(".click-menu").parent().addClass("h-auto");
  }
  if ($(".active-menu")) {
    $(".active-menu").closest(".h40").addClass("h-auto").addClass(".active1");
  }
}

/**
 * h5打开/关闭侧边栏
 */
$(document).ready(() => {
  $(".h5Button").click(() => {
    $(".h5-menu").fadeIn(500);
  });
  $(".closeMenu").click(() => {
    $(".h5-menu").fadeOut(500);
  });
});

/**
 * 防抖函数
 * @param {Function} func 函数
 * @param {number} wait  时间
 * @returns {Function} 返回新的函数
 */
function debounce(func, wait) {
  let timeout;

  return function () {
    const context = this;
    const args = arguments;

    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, wait);
  };
}

//点击下载文件
function download(url, filename) {
  const elelink = document.createElement("a");
  elelink.style.display = "none";
  elelink.target = "_blank";
  elelink.href = url;
  elelink.download = filename;
  document.body.appendChild(elelink);
  elelink.click();
  document.body.removeChild(elelink);
}

/**
 * 替换--为空格
 */
function replaceDash() {
  // cms-api-p
  if ($(".cms-api-p").length > 0) {
    $(".cms-api-p").each((index, element) => {
      $(element).html($(element).html().replaceAll("-", "\u0020"));
    });
  }
}

/**
 * 截取\t
 */
function replaceTab() {
  if ($(".pre1").length > 0) {
    $(".pre1").each((index, element) => {
      let str = element.innerHTML.replace(/^[\s\t]*/g, "");
      element.innerHTML = str;
    });
  }
}

/**
 * 计算API总数
 */
function countApi() {
  let apiCount = $(".nav-abcd").length / 2;
  let Count = $(".nva-bcd").length / 2;
  let text;
  if (location.href.indexOf("api") > -1) {
    text = "API";
  } else {
    text = "模板标签";
  }
  $(".footer-cms").html(`文档总计 ${apiCount} 个${text} , ${Count}组`);
}

/**
 * 文字替换，ture转非必填，false转必填
 */
function replaceText() {
  if ($(".disabled-line").length > 0) {
    $(".disabled-line").each((index, element) => {
      if (element.innerHTML == "true") {
        element.innerHTML = "非必填项";
      } else {
        element.innerHTML = "必填项";
      }
    });
  }
}

/**
 * 搜索内容高亮
 * @param {string} keyword 搜索输入内容
 */
function searchHighlight(keyword, keyWord1) {
  if ($(".search-a").length > 0) {
    $(".search-a").each((index, element) => {
      let text = element.innerHTML;
      if (text.indexOf(keyword) > -1) {
        let replaceText = `<span class="search-highlight">${keyword}</span>`;
        element.innerHTML = text.replaceAll(keyword, replaceText);
      } else if (text.indexOf(keyWord1) > -1) {
        let replaceText = `<span class="search-highlight">${keyWord1}</span>`;
        element.innerHTML = text.replaceAll(keyWord1, replaceText);
      }
    });
  }
}

//搜索高亮防抖
var searchHighlightDebounce = debounce(searchHighlight, 300);
var getSearchDomDebounce = debounce(getSearchDom, 300);
var getSearchH5DomDebounce = debounce(getSearchH5Dom, 300);

/**
 * 滚动条定位
 */
$(document).ready(function () {
  if ($(".scroll-active").length > 0) {
    let top = $(".scroll-active").offset().top;
    if (top > 800) {
      $("#sidebarMenu").animate({ scrollTop: top - 200 }, 500);
    }
  }
});

$(document).ready(() => {
  replaceText();
});
