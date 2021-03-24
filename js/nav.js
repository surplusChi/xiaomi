//处理首页导航栏部分    遵从AMD规范
define(["jquery"],function($){
    function download(){
        //数据下载
        $.ajax({
            type: "get",
            url:"../../dist/data/nav.json",
            success: function(result){
                //alert(result);
                //将数据取出来
                var bannerArr = result.banner;
                //通过循环将数据加载到页面上
                for(var i = 0; i < bannerArr.length; i++){
                    $(`<a href="${bannerArr[i].url}">
                    <img class="swiper-lazy swiper-lazy-loaded" src="../images/banner/${bannerArr[i].img}" alt="">
                </a>`).appendTo("#J_homeSwiper .swiper-slide");

                    var node = $(`<a href="#" class = 'swiper-pagination-bullet '></a>`);
                    if(i == 0){
                        node.addClass("swiper-pagination-bullet-active");
                    }
                    node.appendTo("#J_homeSwiper .swiper-pagination");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
        //在外调用，取出侧边导航栏数据
        leftNavDownload();
        //在外调用，取出顶部导航栏数据
        topNavDownload();
    }

    //实现轮播图的轮播效果
    function banner(){
        var iNow = 0; //记录显示图片的下标
        var aImgs = null; //记录图片
        var aButs = null; //记录小圆圈

        //启动定时器，实现轮播的效果
        var timer = setInterval(function(){
            iNow++;
            tab();
        },2500);

        //封装一个切换函数
        function tab(){
            //找到所有的图片和小圆圈
            if(!aImgs){
                aImgs = $("#J_homeSwiper .swiper-slide").find("a");
            }
            if(!aButs){
                aButs = $("#J_homeSwiper .swiper-pagination").find("a");
            }
            if(iNow == 5){
                iNow = 0;
            }
            //图片切换
            aImgs.hide().css("opacity",0.2).eq(iNow).show().animate({opacity: 1},500);
            //小圆圈按钮切换
            aButs.removeClass("swiper-pagination-bullet-active").eq(iNow).addClass("swiper-pagination-bullet-active");
        }

        //添加鼠标的移入移出，来开关定时器
        $("#J_homeSwiper,.swiper-button-prev,.swiper-button-next").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                tab();
            },2500);
        })

        //点击小圆圈，可以切换到对应图片的实现   使用事件委托来操作
        $("#J_homeSwiper .swiper-pagination").on("click","a",function(){
            //alert($(this).index());
            iNow = $(this).index();
            tab();
            return false; //阻止a链接的默认行为
        })

        //点击上一张和下一张按钮时，切换图片
        $(".swiper-button-prev,.swiper-button-next").click(function(){
            if(this.className == "swiper-button-prev"){
                iNow--;
                if(iNow == -1){
                    iNow = 4;
                }
            }else{
                iNow++;
            }
            tab();
        })
    }

    //侧边导航栏数据的加载
    function leftNavDownload(){
        $.ajax({
            url: "../../dist/data/nav.json",
            success: function(result){
                var sideAll = result.sideNav;
                for(var i = 0 ; i < sideAll.length; i++){
                    var node = $(`<li class = 'category-item'>
                        <a href="/index.html" class = 'title'>
                            ${sideAll[i].title}
                            <em class = 'iconfont-arrow-right-big'></em>
                        </a>
                        <div class="children clearfix">
                            
                        </div>
                    </li>`);
                    node.appendTo("#J_categoryList");
                    
                    //取出当前这个选项对应的子节点
                    var childAll = sideAll[i].child;
                    //计算子节点一共需要多少列
                    var col = Math.ceil(childAll.length / 6);
                    //计算好需要的列数，设置对应的class样式
                    node.find("div.children").addClass("children-col-" + col);
                    //通过循环，创建右侧的每一个数据 
                    for(var j = 0 ; j < childAll.length; j++){
                        if(j % 6 == 0){
                            var newUl = $(`<ul class="children-list children-list-col children-list-col-${parseInt(j / 6)}"> 
                            </ul>`);
                            newUl.appendTo(node.find("div.children"));
                        }
                        $(`<li>
                            <a href="http://www.mi.com/redminote8pro" data-log_code="31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2" class="link clearfix" data-stat-id="d678e8386e9cb0fb" onclick="_msq.push(['trackEvent', '81190ccc4d52f577-d678e8386e9cb0fb', 'http://www.mi.com/redminote8pro', 'pcpid', '31pchomeother001000#t=normal&amp;act=other&amp;page=home&amp;page_id=10530&amp;bid=3476792.2']);">
                                <img src="${childAll[j].img}" width="40" height="40" alt="" class="thumb">
                                <span class="text">${childAll[j].title}</span>
                            </a>
                        </li>`).appendTo(newUl);

                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //给侧边导航栏添加鼠标移入切换的效果
    function leftNavTab(){
        //通过事件委托来实现
        $("#J_categoryList").on("mouseenter",".category-item",function(){
            $(this).addClass("category-item-active");
        })
        $("#J_categoryList").on("mouseleave",".category-item",function(){
            $(this).removeClass("category-item-active");
        })
    }

    //下载顶部导航的数据
    function topNavDownload(){
        $.ajax({
            url: "../../dist/data/nav.json",
            success: function(result){
                //将下载的顶部导航的数据取出来
                var topNavAll = result.topNav;
                topNavAll.push({title: "服务"},{title: "社区"});
                for(var i = 0; i < topNavAll.length; i++){
                    $(`<li data-index="${i}" class="nav-itme">
                    <a href="javascript: void(0);"class="link">
                        <span class="text">${topNavAll[i].title}</span>
                    </a>
                </li>`).appendTo(".site-header .header-nav .nav-list");
                
                    var node = $(`<ul class="children-list clearfix" style="display:${i == 0 ? 'block': 'none'}"></ul>`);
                    node.appendTo("#J_navMenu .container");

                    //取出所有的子菜单
                    if(topNavAll[i].childs){
                        var childAll = topNavAll[i].childs;
                        for(var j = 0 ; j < childAll.length; j++){
                            $(`<li>
                            <a href="#">
                                <div class="figure figure-thumb">
                                    <img src="${childAll[j].img}" alt="">
                                </div>
                                <div class="title">${childAll[j].a}</div>
                                <p class="price">${childAll[j].i}</p>
                            </a>
                        </li>`).appendTo(node);
                        }
                    }
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //给顶部导航添加移入移出效果
    function topNavTab(){
        //事件委托
        $(".header-nav .nav-list").on("mouseenter",".nav-itme",function(){
            $(this).addClass("nav-itme-active");
            //找到当前移入这个a标签的下标，这个下标和下面部分显示的ul的下标一致
            var index = $(this).index() - 1;
            if(index >=0 && index <= 6){
                $("#J_navMenu").css({"display":"block"}).removeClass("slide-up").addClass("slide-down");
                $("#J_navMenu .container").find("ul").eq(index).css({"display":"block"}).siblings("ul").css({"display":"none"});
            }
        })
        $(".header-nav .nav-list").on("mouseleave",".nav-itme",function(){
            $(this).removeClass("nav-itme-active");
        })
        $(".site-header").mouseleave(function(){
            $("#J_navMenu").css({"display":"block"}).removeClass("slide-down").addClass("slide-up");
        })
    }

    //搜索框和下拉列表
    function searchTab(){
        $("#search").focus(function(){
            $("#J_keywordList").removeClass("hide").addClass("show");
        }).blur(function(){
            $("#J_keywordList").removeClass("show").addClass("hide");
        })
    }

    //给商品列表页的侧边导航栏去添加移入移出效果
    function allGoodsTab(){
        $(".header-nav .nav-list").on("mouseenter",".nav-category",function(){
            $(this).addClass("nav-category-active");
            $(this).find(".site-category").css("display","block");
        })

        $(".header-nav .nav-list").on("mouseleave",".nav-category",function(){
            $(this).removeClass("nav-category-active");
            $(this).find(".site-category").css("display","none");
        })
    }

    return{
        download : download,
        banner: banner,
        leftNavTab: leftNavTab,
        topNavTab: topNavTab,
        searchTab: searchTab,
        leftNavDownload: leftNavDownload,
        topNavDownload: topNavDownload,
        allGoodsTab: allGoodsTab
    }
})