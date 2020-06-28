;$(function(){
    $("#btn").click(function(e){
        e = e || window.event;
        let username = $("#username").val();
        let password = $("#password").val();
        console.log(username, password);
        $.post("http://jx.xuzhixiang.top/ap/api/login.php", {username, password},
            function (resp) {
                console.log(resp);
                // console.log(resp.data.id)
                let username = resp.data.username;
                let id = resp.data.id;
                if(resp.code == 1){
                    localStorage.setItem("rongyao", JSON.stringify({id, username}));
                    alert(`${resp.msg},即将返回首页`);
                    location.href = `./index.html`;
                }else{
                    alert(resp.msg);
                }
            },
            "json"
        );

        if (e.preventDefault) {
            e.preventDefault();
        } else {
            return false;
        }
    })
})