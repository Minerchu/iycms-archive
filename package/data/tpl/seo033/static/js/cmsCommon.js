
$(document).ready(function () {
    //导航栏轮播
    new Swiper(".nav-swiper1", {
        slidesPerView: 'auto',
        on: {
            init: function () {
                var index
                $(this.el).children().children().each(function (item) {
                    if (this.id == 'cms-pcNav-swiper-active') {
                        index = item
                    }
                })
                if (index) {
                    this.slideTo(index);
                }

            }
        }
    });
    
    //list界面筛选框轮播
    new Swiper(".cms-seo33-list-swiper", {
        slidesPerView: 'auto',
        on: {
            init: function () {
                var index
                $(this.el).children().children().each(function (item) {
                    if (this.id == 'cms-seo033-lict-swiper-active') {
                        index = item
                    }
                })
                if (index) {
                    this.slideTo(index - 2);
                }

            }
        }
    });


})
$(document).ready(function () {
    $(".cmslazyload").lazyload({
        effect: "fadeIn",
        data: {
            "diameter": function (index, item) {
                return $(item).data("diameter");
            }
        }
    });
})


//定位滚动条
function positioningScroll() {
    //选集滚动定位
    $(document).ready(function () {
        let yw = $("#cms-active-playId").parent().offset()?.top
        let offset = $("#cms-active-playId").offset()?.top
        if (offset > yw) {
            $("#cms-active-playId").parent().animate({ scrollTop: offset - yw }, 300)
        }
    })
}

//无线路id处理函数
function nullLineID() {
    $(document).ready(function () {
        $(".cms-nav-link").eq(0).click()
        $(".cms-seo033-player-lineid").eq(0).addClass("cms-play-active")
    })
}

var cmsScrollLeft = 0
const maxWidth = $(".cms-nav-play-line")[0]?.scrollWidth || 0
const navWidth = $(".cms-nav-play-line").width() || 0
const divWidth = $('.cms-play-line-width').width() || 0
hideGoButon()

//播放页向左移动线路
function goLeft() {
    $(document).ready(function () {
        if (cmsScrollLeft > 0) {
            cmsScrollLeft = cmsScrollLeft - 150
        } else {
            cmsScrollLeft = 0
        }
        $('.cms-nav-play-line').animate({ scrollLeft: cmsScrollLeft }, 300)
        hideGoButon()
    })
}

//播放器向右移动线路
function goRight() {
    $(document).ready(function () {
        if (cmsScrollLeft + 150 < maxWidth - navWidth) {
            cmsScrollLeft += 150
        } else {
            cmsScrollLeft = maxWidth - navWidth
        }
        $('.cms-nav-play-line').animate({ scrollLeft: cmsScrollLeft }, 300)
        hideGoButon()
    })
}

function hideGoButon() {
    //无滚动条
    if (maxWidth < divWidth) {
        $('.line-go-left').hide()
        $('.line-go-right').hide()
    }
    //位于最左侧
    if (cmsScrollLeft == 0) {
        $('.line-go-left').hide()
    } else {
        $('.line-go-left').show()
    }
    //位于最右侧
    if (cmsScrollLeft + 150 > maxWidth - navWidth) {
        $('.line-go-right').hide()
    } else {
        $('.line-go-right').show()
    }
}

