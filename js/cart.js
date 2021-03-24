console.log("加载成功");
/* 
    配置当前项目所用到的模块
    遵从AMD规范  所有.js文件的后缀都可以省略
 */
require.config({
    paths:{
        "jquery": "jquery-3.3.1",
        "jquery-cookie":"jquery.cookie",
        "goodsCart": "goodsCart"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["goodsCart"],function(goodsCart){
    goodsCart.download();
    goodsCart.cartHover();
    goodsCart.loadCartData();
    goodsCart.checkFunc();
    goodsCart.changeCars();
})