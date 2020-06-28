// 定义类
class Cart {
    constructor(){
        // let name = JSON.parse(localStorage.getItem("rongyao"));
        // console.log(name)
        // 判断本地存储中是否有name.id,如果没有赋值为空对象，如果有，转换成对象格式赋值给cartData
        this.cartData = localStorage.getItem(name.id) ? JSON.parse(localStorage.getItem(name.id)) : {};
    }
    //保存数据
    saveData(id, num, terminal){ // terminal 判断是否是终值
        console.log(this.cartData)
        let name = JSON.parse(localStorage.getItem("rongyao"));
        if(name){
           if(!this.cartData[id] || terminal){ //this.cartData指的是上面存储信息
            this.cartData[id] = num;
            }else{
                // num表示点击添加购物车之前已经存在的数值
                this.cartData[id] += num;
            }
            localStorage.setItem(name.id, JSON.stringify(this.cartData)); 
        }else{
            alert("请登录");
        }
    }
}