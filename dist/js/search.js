var oInput = document.querySelector("input");
    var oUl = document.querySelector("ul");
    oInput.oninput = function(){
        let oScript = document.createElement("script");
        oScript.src = `https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&wd=${oInput.value}&cb=aa`;
        document.body.appendChild(oScript);
        document.body.removeChild(oScript);
    };

function aa(data){
    console.log(data);
    let res = data.g;
    if(!data.g) {
        oUl.innerHTML = "";
        return;
    }
    let str = "";
    res.forEach((item) => {
        str += `<li><a href="https://www.baidu.com/s?wd=${item.q}">${item.q}</a></li>`
    });
    oUl.innerHTML = str;
}