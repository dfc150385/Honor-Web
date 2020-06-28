;$(function(){
    // 侧边导航栏的显示
    $(".list").mouseenter(function(){
        $(".search").css("visibility", "visible")
    });
    $(".search").mouseleave(function(){
        $(this).css("visibility", "hidden")
    });

    // 搜索框
    $("input").focus(function(){
        $(this).siblings("#exo").css("display", "none")
    });
    $("input").blur(function(){
        $(this).siblings("#exo").css("display", "block")
    });

    // 回到顶部
    $("#top").click(function(){
        $("body, html").animate({scrollTop:0}, 1000);
        return false;
    });
    // 跳转到购物车的页面
    $("#car").click(function(){
        console.log(111)
        $(window).attr("location", "goodscar.html");
        return false;
    });

    // 拿到被点击商品的的id
    let id = location.search.split("=")[1];
    console.log(id);

    //往详情页添加数据
    $.ajax({
        type: "get",
        url: "../data.json",
        dataType: "json",
        success: function (resp) {
            // console.log(resp)
            let arr = [];
            for(var key in resp){
                for(let i = 0; i < resp[key].length; i++){
                    if(resp[key][i].id == id){
                        arr.push(resp[key][i])
                    }
                }
            }
            let arr1 = arr[0];
            $("#detail").html(`
            <div class="small" id="small">
                <img src="${arr1.img}" alt="">
                <div id="mark"></div>
            </div>
            <div class="big" id="big">
                <img src="${arr1.img}" alt="">
            </div>
            <div class="name">${arr1.name}</div>
            <div class="price">￥ ${arr1.price}</div>
            <div class="enter">
                <span class="plus">+</span><input type="tel" placeholder="1" value="1" class="txt"><span class="minus">-</span><button class="in" id="goodscar">加入购物车</button>
            </div>
            `);

            // 放大镜
            $("#small").mouseenter(function(){
                $("#mark,#big").show()
            }).mouseleave(function(){
                $("#mark,#big").hide()
            }).mousemove(function(ev){
                var e = ev || window.event
                var left = e.pageX - $("#small").offset().left - 50
                var top = e.pageY - $("#small").offset().top -50
                if(left <= 0) left = 0
                if(top <= 0) top = 0
                if(left >= 200) left = 200
                if(top >= 200) top = 200

                $("#mark").css({
                    left: left,
                    top: top
                })

                //放大的图片要反向移动对应倍数的距离
                $("#big img").css({
                    left: -2 * left,
                    top: -2 * top 
                })
            })

            // 减号
            let oMinus = document.querySelectorAll(".minus")[0];
            // 加号
            let oPlus = document.querySelectorAll(".plus")[0];
            // 文本框内的数字
            let oTxt = document.querySelectorAll(".txt")[0];
            // 加入购物车按钮
            let oBtn = document.querySelectorAll(".addBtn")[0];
            // 减法
            oMinus.onclick = function(){
                if(oTxt.value == 1){
                    oTxt.value == 1;
                    return;
                }
                oTxt.value--;
            }
            // 加法
            oPlus.onclick = function(){
                oTxt.value++;
            }
            // 修改输入框为正值
            $(".txt").change(function(){
                if($(".txt").val() <= 1){
                    $(".txt").val(1);
                }
            })
            // localStorage.setItem("click",JSON.stringify(arr1));

            let cart = new Cart();
            $("#goodscar").click(function(){
                    let name = JSON.parse(localStorage.getItem("rongyao"));
                    console.log(name)
                if(name){
                    console.log(8888)
                    cart.saveData(id, Number($(".txt").val()), false);
                    location.href = "goodscar.html";
                    let name = JSON.parse(localStorage.getItem("rongyao"));
                    console.log(name.id)
                    let obj2 = JSON.parse(localStorage.getItem("cartData"));
                    let sun = 0;
                    for(let key in obj2){
                        sun += obj2[key]
                    }
                    if(sun >= 1){
                        $(".a").show().text(sun);
                    }else{
                        $(".a").hide();
                    }
                }else{
                    alert("请登录");
                }
            })
        }
    });

    // 登陆成功
    let name = JSON.parse(localStorage.getItem("rongyao"));
    if(name){
        $(".lgre").css("display","none");
        $(".name").css("display","block");
        $(".name").find("b").text(name.username);
    }

    // 点击购物车
    $(".icon-gouwuche").click(function(){
        location.href = "goodscar.html";
    })

    // 退出登录
    $(".out").click(function(){
        $(".lgre").css("display","block");
        $(".name").css("display","none");
        localStorage.removeItem("rongyao");
    })
})