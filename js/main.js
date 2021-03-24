console.log("加载成功！0");
/* 
    配置当前项目所用到的模块
    遵从AMD规范  所有.js文件的后缀都可以省略
 */
require.config({
    paths:{
        "jquery": "jquery-3.3.1",
        "jquery-cookie":"jquery.cookie",
        "nav": "nav",
        "slide": "slide",
        "data": "data"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav","slide","data"],function(nav,slide,data){
    nav.download();
    nav.banner();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();

    //商品滚动列表的数据下载和滚动
    slide.download();
    slide.slideTab();

    //主页商品信息
    data.download();
    data.tabMenu();
})