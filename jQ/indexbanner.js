;$(function(){
    const len = $("#play #main").find("li").length;
          width = play.offsetWidth;
          img1 = $("#play .main").find("li").eq(0).clone(true);
    let index = 0;
    var isMove = false;//标志位
    var str = "";
    for(let i = 1; i <= len; i++){
        str += "<li></li>";
    };
    $("ol").append($(str)).children().eq(0).addClass("ac");
    // 给ul后面添加第一张图片
    $("#main").append(img1);
    // 计算ul的宽度
    $("#main").css({width: (len + 1) * width + 'px'});
    // 给按钮添加点击事件
    $("ol li").click(function(){
        if(!isMove){
            var i = $(this).index();
            isMove = true;
            // // 修改按钮样式
            $(this).addClass("ac").siblings().removeClass("ac");
            // // 图片移动改变ul的left值
            $("#main").animate({
                left: -i * width + 'px',
            }, () => {
                isMove = false;
            })
        }
    });
    // 向右
    $("#goNext").click(function(){
        if(!isMove){
            isMove = true;
            index++;
            if(index === len){
                // 超出范围返回第一张图片
                index = 0;
                $("#main").animate({
                    left: -len * width,
                }, () => {
                    $("#main").css({left: 0});
                    isMove = false;
                });
            }else{
                $("#main").animate({
                    left: -index * width + 'px',
                }, () => {
                    isMove = false;
                });
            }
            // 修改按钮样式
            $("ol li").eq(index).addClass("ac").siblings().removeClass("ac");
        }
    });
    // 向前
    $("#goPrev").click(function(){
        if(!isMove){
            isMove = true;
            index--;
            if(index === -1){
                index = len - 1;
                $("#main").css({"left": -len * width + "px"})
            }
            $("#main").animate({
                left: -index * width + 'px',
            }, () => {
                isMove = false;
            });
            // 修改按钮样式
            $("ol li").eq(index).addClass("ac").siblings().removeClass("ac");
        }
    })
    // 自动轮播
    var timer = null;
    timer = setInterval(function(){
        $("#goNext").click();
    }, 2000);
    $("#main").hover(function(){
        clearInterval(timer);
    }, function(){
        timer = setInterval(function(){
            $("#goNext").click();
        }, 2000);
    });
})