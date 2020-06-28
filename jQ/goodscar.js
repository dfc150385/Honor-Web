;$(function(){
    // 回到顶部
    $("#top").click(function(){
        $("body, html").animate({scrollTop:0}, 1000);
        return false;
    });
    // 跳转到购物车的页面
    $("#car").click(function(){
        $(window).attr("location", "goodscar.html")
    });

    // 再去转转
    $("#gowhere").click(function(){
        location.href = "./index.html"
    })

    // 渲染商品到购物车页面
    let products = JSON.parse(localStorage.getItem("proData"));
    let name = JSON.parse(localStorage.getItem("rongyao"))
    // 取出点击以后的数据，目的是找出被点击商品的id，从而从所有本地数据中找到对应的id值进而找到该商品的其他信息
    // let cartData = JSON.parse(localStorage.getItem(name.id));
    let cartData = name ? JSON.parse(localStorage.getItem(name.id)) : {};
    let str = "";
    for(let id in cartData){
        let arr = [];
        for(var key in products){
            for(let i = 0; i < products[key].length; i++){
                if(products[key][i].id == id){
                    arr.push(products[key][i])
                }
            }
        }
        let arr2 = arr[0];
        $("#datacar").append(`
        <div class="data1" data-id="${id}">
            <input type="checkbox" class="check">
            <img src="${arr2.img}" alt="">
            <span>${arr2.instruction}</span>
            <span class="price">¥ <b>${arr2.price}</b></span>
            <span class="minus1">-</span>
            <input type="text" placeholder="1" value="${cartData[id]}" class="num">
            <span class="plus">+</span>
            <span class="smallmoney">¥ <b>${arr2.price * cartData[id]}</b></span>
            <span class="del">删除</span>
        </div>
        `);
        $(".check").add(".checkAll").attr("checked", true);
        getTotal();
    }
    
    // 再去转转 的删除与否
    if(!$("#datacar").find(".data1").length){
        $("#div").css("display","block");
        $(".allcheck").add(".allcheck1").remove();
    }else{
        $("#div").css("display","none")
    }

    let cart = new Cart();
    // 复选框
    $(".checkAll").click(function(){
        if($(this).prop("checked")){
            $(".check").add(".checkAll").prop("checked", true);
            getTotal();
        }else{
            $(".check").add(".checkAll").prop("checked", false);
            getTotal();
        }
    });
    // 单选框
    $(".check").click(function(){
        if($(".check:checked").length === $(".check").length){
            $(".checkAll").prop("checked",true);
            getTotal();
        }else{
            $(".checkAll").prop("checked",false);
            getTotal();
        }
    })

    // 加法
    $(".plus").click(function(){
        let id = $(this).parent().attr("data-id");
        var t = $(this).parent().find(".num");
        t.val(parseInt(t.val())+1)
        $(this).next().find("b").text(Number(t.val()) * Number($(this).parent().find(".price").find("b").html()));
        cart.saveData(id, Number(t.val()), true);
        getTotal();
        scnum();
    })
    // 减法
    $(".minus1").click(function(){
        let id = $(this).parent().attr("data-id");
        var t = $(this).parent().find(".num");
        if(t.val() <= 1){
            t.val(1);
            return;
        }
        t.val(parseInt(t.val()) - 1);
        $(this).parent().find(".smallmoney").find("b").text(Number(t.val()) * Number($(this).prev().find("b").html()));
        cart.saveData(id, Number(t.val()), true);
        scnum();
        getTotal();
    })
    // 修改
    $(".num").change(function(){
        let id = $(this).parent().attr("data-id");
        var t = $(this).parent().find(".num");
        if(t.val() <= 1){
            t.val(1);
            return;
        }
        cart.saveData(id, Number(t.val()), true);
        scnum();
        getTotal();
    })
    
    // 小删除按钮
    $(".del").click(function(){
        $id = $(this).parent().attr("data-id");
        if(confirm("你确定要删除吗？")){
            // localStorage.removeItem(localStorage.getItem("cartData")[id]);
            let name = JSON.parse(localStorage.getItem("rongyao"));
            let $obj = JSON.parse(localStorage.getItem(name.id));
            delete $obj[$id];
            localStorage.setItem(name.id, JSON.stringify($obj));
            $(this).parent().remove();
            scnum();
            getTotal();
        }
        // 再去转转 的删除与否
        if(!$("#datacar").find(".data1").length){
            $("#div").css("display","block");
            $(".allcheck").add(".allcheck1").remove();
        }
    })
    
    // 大删除按钮
    $(".bigdel").click(function(){
        if(confirm("是否确认要删除选中的商品吗？")){
            $(".check:checked").each(function(){
                let i = $(this).parent().index();
                console.log(i)
                $("#datacar").find(".data1").eq(i).remove();
                $id = $(this).parent().attr("data-id");
                let $obj1 = JSON.parse(localStorage.getItem(name.id));
                delete $obj1[$id];
                localStorage.setItem("cartData", JSON.stringify($obj1));
            })
            // 修改复选框状态 总价
            $(".checkAll").prop("checked", false);
            $(".totalmoney").text(0);
        }
        scnum();
        // 再去转转 的删除与否
        if(!$("#datacar").find(".data1").length){
            $("#div").css("display","block");
            $(".allcheck").add(".allcheck1").remove();
        }
    })

    // 计算总价
    function getTotal(){
        let getTotal = 0;
        $(".check").each(function(){
            if($(this).prop("checked")){
                getTotal += Number($(this).parent().find(".smallmoney").find("b").text());
            }
        })
        $(".totalmoney").find("b").text(getTotal);
    }

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

    // 是否登录
    if(name.id){
        $(".login1").css("display","none");
    }

    // 登陆成功
    // let name = JSON.parse(localStorage.getItem("rongyao"));
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
})