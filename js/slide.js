define(["jquery"],function($){
    //下载数据的函数
    function download(){
        $.ajax({
            url: "../../dist/data/slide.json",
            success: function(result){
                //alert(result);
                var slideAll = result.data.list.list;
                for(var i = 0 ; i < slideAll.length; i++){
                    $(`<li class = 'swiper-slide rainbow-item-3' style = 'width: 234px; margin-right: 14px;'>
                    <a href="#" target = "_blank">
                        <div class = 'content'>
                            <div class = 'thumb'>
                                <img width="160" height="160" src="${slideAll[i].pc_img}?thumb=1&w=200&h=200&f=webp&q=90" alt=""/>
                            </div>
                            <h3 class = 'title'>${slideAll[i].goods_name}</h3>
                            <p class = 'desc'>${slideAll[i].desc}</p>
                            <p class = 'price'>
                                <span>${slideAll[i].seckill_Price}</span>元
                                <del>${slideAll[i].goods_price}元</del>
                            </p>
                        </div>
                    </a>
                </li>`).appendTo("#J_flashSaleList ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //商品列表的滚动
    function slideTab(){
        //获取页面上的左右按钮
        var aSpans = $(".swiper-controls").find("span");
        var iNow = 0 //显示第一组图片，默认从下标0开始，每四个图片为一组
        var count = Math.ceil(26 / 4 ) - 1;

        //启动定时器，让图片自己滚动
        var timer = setInterval(function(){
            iNow++;
            if(iNow == count+1){
                iNow = 0;
            }
            tab();
        },6000);
        
        //封装一个图片切换的函数
        function tab(){
            //通过图片的下标来判断左右按钮是否禁用
            iNow == 0 ? aSpans.eq(0).addClass("swiper-button-disabled") : aSpans.eq(0).removeClass("swiper-button-disabled");
            iNow == count ? aSpans.eq(1).addClass("swiper-button-disabled") : aSpans.eq(1).removeClass("swiper-button-disabled");
            
            //计算要运动的目的值
            var iTarget = iNow == count ? iNow * -992 + 496 : iNow * - 992 ;
            $("#J_flashSaleList ul").css({
                transform: `translate3d(${iTarget}px, 0px, 0px)`,
                transitionDuration: "1000ms"
            })
        }

        //实现左右按钮切换图片
        aSpans.click(function(){
            if($(this).index() == 0){
                //左键
                iNow--;
                iNow = Math.max(0 , iNow);
            }else{
                iNow++;
                iNow = Math.min(count,iNow);
            }
            tab(); 
        })

        //添加鼠标的移入和移出
        $(".row").mouseenter(function(){
            clearInterval(timer);
        }).mouseleave(function(){
            timer = setInterval(function(){
                iNow++;
                if(iNow == count+1){
                    iNow = 0;
                }
                tab();
            },6000);
        })
    }

    return{
        download: download,
        slideTab: slideTab
    }
})