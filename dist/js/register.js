;$(function(){
    $("#btn").click(function(e){
        e = e || window.event;
        let username = $("#username").val();
        let password = $("#password").val();
        console.log(username, password);
        $.post("http://jx.xuzhixiang.top/ap/api/reg.php", {username, password},
            function (resp) {
                console.log(resp);
                if(resp.code == 1){
                    alert(`${resp.msg},即将跳转登陆页面`);
                    location.replace("./login.html");
                }else{
                    alert(`${resp.msg},请重新输入`);
                }
            },
            "json"
        );

        // 阻止默认行为，让表单不提交
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    })
})