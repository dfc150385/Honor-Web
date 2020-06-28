;$(function(){
    // 回到顶部
    $("#top").click(function(){
        $("body, html").animate({scrollTop:0}, 1000);
        return false;
    });
    $(".a-list7").find("a").eq(1).click(function(){
        $("body, html").animate({scrollTop:0}, 1000);
        return false;
    })
    // 跳转到购物车的页面
    $("#car").click(function(){
        console.log(111)
        $(window).attr("location", "goodscar.html")
    });
    //导航栏定位
    // $(window).scroll(function(){
    //     var top = $(document).scrollTop();
    //     if(top >= 610){
    //         $(".daoh").css({
    //             "position":"fixed",
    //             "height":0
    //         }, 1000)
    //         console.log(111)
    //     }
    // })

    //商品信息
    let proData = JSON.parse(localStorage.getItem("proData"));
    console.log(proData);
    let data1 = proData.data1;
    let data2 = proData.data2;
    let data3 = proData.data3;
    var str1 = "";
    for(let i = 0; i < data2.length; i++){
        str1 += `
        <div class="list-1">
            <a href="goodsdetail.html?id=${data2[i].id}"><img src="${data2[i].img}" alt=""></a>
            <span class="list-12">${data2[i].period}</span>
            <div class="list-13">${data2[i].name}</div>
            <div class="list-14">${data2[i].instruction}</div>
            <div class="list-15">￥ <font style="font-size: 20px;font-weight: bold;">${data2[i].price}</font> 起</div>
        </div>
        `;
    }
    // 12个数据
    $("#blist1").append(str1);
    var str2 = "";
    for(let i = 0; i < data3.length; i++){
        str2 += `
        <div class="list-1">
            <a href="goodsdetail.html?id=${data3[i].id}"><img src="${data3[i].img}" alt=""></a>  
            <span class="list-12">${data3[i].period}</span>
            <div class="list-13">${data3[i].name}</div>
            <div class="list-14">${data3[i].instruction}</div>
            <div class="list-15">￥ <font style="font-size: 20px;font-weight: bold;">${data3[i].price}</font> 起</div>
        </div>
        `;
    }
    // 4个数据
    $("#blist2").append(str2);
    $("#blist3").append(str2);

    var str3 = "";
    for(let i = 0; i < data1.length; i++){
        str3 += `
        <div class="list-1">
            <a href="goodsdetail.html?id=${data1[i].id}"><img src="${data1[i].img}" alt=""></a> 
            <span class="list-12">${data1[i].period}</span>
            <div class="list-13">${data1[i].name}</div>
            <div class="list-14">${data1[i].instruction}</div>
            <div class="list-15">￥ <font style="font-size: 20px;font-weight: bold;">${data1[i].price}</font> 起</div>
        </div>
        `;
    }
    // 8个数据
    $("#blist4").append(str3);
})