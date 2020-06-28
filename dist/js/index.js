;$(function(){
    // 回到顶部
    $("#top").click(function(){
        $("body, html").animate({scrollTop:0}, 1000);
        return false;
    });
    // 跳转到购物车的页面
    $("#car").click(function(){
        console.log(111)
        $(window).attr("location", "goodscar.html")
    });

    // 搜索框
    $("input").focus(function(){
        $(this).siblings("#exo").css("display", "none")
    })
    $("input").blur(function(){
        $(this).siblings("#exo").css("display", "block")
    })
    
    //遍历数据
    $.ajax({
        type: "get",
        url: "../data.json",
        dataType: "json",
        success: function (resp) {
            console.log(resp);
            localStorage.setItem("proData", JSON.stringify(resp));
            let proData = JSON.parse(localStorage.getItem("proData"));
            let data3 = proData.data3;
            var str = "";
            for(let i = 0; i < data3.length; i++){
                str += `
                <div>
                    <a href="goodsdetail.html?id=${data3[i].id}"><img src="${data3[i].img}" alt=""></a>
                    <p>${data3[i].name}</p>
                    <p>${data3[i].instruction}</p>
                    <p>¥${data3[i].price}</p>
                </div>
                `;
            }
            $("#blist5").append(str)
            $("#blist6").append(str)
            $("#blist7").append(str)
            $("#blist8").append(str)
            $("#blist9").append(str)
            $("#blist10").append(str)
        }
    });

    // 登陆成功
    let name = JSON.parse(localStorage.getItem("rongyao"));
    if(name){
        $(".lgre").css("display","none");
        $(".name").css("display","block");
        $(".name").find("b").text(name.username);
    }
    // 退出登录
    $(".out").click(function(){
        $(".lgre").css("display","block");
        $(".name").css("display","none");
        localStorage.removeItem("rongyao");
    })

    // 购物车数量
    scnum();
    function scnum(){
        let name = JSON.parse(localStorage.getItem("rongyao"));
        console.log(name)
        let obj2 = JSON.parse(localStorage.getItem(name.id));
        let sun = 0;
        for(let key in obj2){
            sun += obj2[key]
        }
        if(sun >= 1){
            $(".a").show().text(sun);
        }else{
            $(".a").hide();
        }
    }

    // 点击购物车
    $(".icon-gouwuche").click(function(){
        location.href = "goodscar.html";
    })
})