//加分号的目的是为了避免其他开发人员编写代码不规范的情况
;var btns = $("#banner").find("ol li")
var oUl = $("#banner").find("ul")
var timer = null //用于记录定时器返回值
var iNow = 0 //代表当前图片显示的下标

btns.click(function(){
    iNow = $(this).index()
    tab()
})

// //自动循环轮播
timer = setInterval(function(){
    iNow++
    tab()
} ,2000)

//添加移入移出
$("#banner").mouseenter(function(){
    clearInterval(timer)
}).mouseleave(function(){
    timer = setInterval(function(){
        iNow++
        tab()
    } ,2000)
})

//切换，单独封装成函数
function tab(){
    btns.removeClass("active").eq(iNow).addClass("active")

    //如果是最后一张图片显示，它对应的按钮下标是0
    if(iNow === btns.length){
        btns.eq(0).addClass("active")
    }

    oUl.animate({
        top: -550 * iNow
    }, 500, function(){
        //当最后一张图片动画结束的时候，直接切回下标为0的图片
        if(iNow === btns.length){
            iNow = 0
            oUl.css("top", 0)
        }
    })
}

