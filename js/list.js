console.log("加载成功");

//引入当前页面所需要的的模块
require.config({
    paths:{
        "jquery": "jquery-3.3.1",

        //需要用到首页导航部分的js模块
        "nav": "nav",
        "goodsList": "goodsList"
    }
})

require(["nav","goodsList"],function(nav,goodsList){
    nav.leftNavDownload();
    nav.topNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();

    //加载商品列表信息
    goodsList.download();
    goodsList.banner();
})

