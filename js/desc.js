console.log("加载成功");
/* 
    配置当前项目所用到的模块
    遵从AMD规范  所有.js文件的后缀都可以省略
 */
require.config({
    paths:{
        "jquery": "jquery-3.3.1",
        "jquery-cookie":"jquery.cookie",
        "nav": "nav",
        "goodsDesc": "goodsDesc"
    },
    shim:{
        //设置依赖关系
        "jquery-cookie":["jquery"]
    }
})

require(["nav","goodsDesc"],function(nav,goodsDesc){
    nav.leftNavDownload();
    nav.topNavDownload();
    nav.leftNavTab();
    nav.topNavTab();
    nav.searchTab();
    nav.allGoodsTab();
    
    goodsDesc.download();
    goodsDesc.banner();
})