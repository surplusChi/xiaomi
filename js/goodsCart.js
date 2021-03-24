define(["jquery","jquery-cookie"],function($){
    //加载已经加入购物车的商品
    /*
        1.cookie只存储商品id和数量
        2.加载数据，必须使用商品具体信息，数据源
            goodsCarList.json
            gooodsList2.json
        
        new.Promise 处理两次按顺序加载数据（异步串行）
     */
    function loadCartData(){
        //清空数据
        $("#J_cartListBody  .J_cartGoods").html("");

        new Promise(function(resolve, reject){
            $.ajax({
                url: "../../dist/data/goodsCarList.json",
                success: function(obj){
                    resolve(obj.data);
                },
                error: function(msg){
                    reject(msg);
                }
            })
        }).then(function(arr1){
            //下载第二份数据源
            //console.log("then1" + arr1);
            return new Promise(function(resolve, reject){
                $.ajax({
                    url: "../../dist/data/goodsList2.json",
                    success: function(arr2){
                        //将两份数据合并
                        var newArr = arr1.concat(arr2);
                        resolve(newArr);
                    },
                    error: function(msg){
                        reject(msg);
                    }
                })
            })
        }).then(function(arr){
            //console.log(arr);
            //arr 所有商品信息，需要在页面上加载购物车的数据
            //通过已经加入购物车的商品，找出这些数据，那些被加入购物车
            //1.在购物车中将所有的数据拿到
            var cookieStr = $.cookie("goods");
            if(cookieStr){
                var cookieArr = JSON.parse(cookieStr);
                var newArr = [];
                
                for(var i = 0; i < cookieArr.length; i++){
                    for(var j = 0; j < arr.length; j++){
                          //设置商品id  
                        arr[j].id = arr[j].product_id ? arr[j].product_id : arr[j].goodsid;
                        if(cookieArr[i].id == arr[j].id){
                            arr[j].num = cookieArr[i].num;
                            newArr.push(arr[j]);
                        }
                    }
                }
                //console.log(newArr);
                //newArr 中是所有购物车中得到商品信息和数量
                //通过循环将这些数据插到页面上
                for(var i = 0 ; i < newArr.length; i++){
                    var node = $(`<div class="item-row clearfix" id="${newArr[i].id}"> 
                    <div class="col col-check">  
                        <i class="iconfont icon-checkbox icon-checkbox-selected J_itemCheckbox" data-itemid="2192300031_0_buy" data-status="1">√</i>  
                    </div> 
                    <div class="col col-img">  
                        <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                            <img alt="" src="${newArr[i].image}" width="80" height="80"> 
                        </a>  
                    </div> 
                    <div class="col col-name">  
                        <div class="tags">   
                        </div>     
                        <div class="tags">  
                        </div>   
                        <h3 class="name">  
                            <a href="//item.mi.com/${newArr[i].id}.html" target="_blank"> 
                                ${newArr[i].name}
                            </a>  
                        </h3>        
                    </div> 
                    <div class="col col-price"> 
                        ${newArr[i].price}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-num">  
                        <div class="change-goods-num clearfix J_changeGoodsNum"> 
                            <a href="javascript:void(0)" class="J_minus">
                                <i class="iconfont"></i>
                            </a> 
                            <input tyep="text" name="2192300031_0_buy" value="${newArr[i].num}" data-num="1" data-buylimit="20" autocomplete="off" class="goods-num J_goodsNum" "=""> 
                            <a href="javascript:void(0)" class="J_plus"><i class="iconfont"></i></a>   
                        </div>  
                    </div> 
                    <div class="col col-total"> 
                        ${(newArr[i].price * newArr[i].num).toFixed(1)}元 
                        <p class="pre-info">  </p> 
                    </div> 
                    <div class="col col-action"> 
                        <a id="2192300031_0_buy" data-msg="确定删除吗？" href="javascript:void(0);" title="删除" class="del J_delGoods"><i class="iconfont"></i></a> 
                    </div> 
                </div>`);
                    node.appendTo("#J_cartListBody  .J_cartGoods");
                }
                isCheckAll();
            }

        })
    }

    function download(){
        $.ajax({
            url: "../../dist/data/goodsCarList.json",
            success: function(obj){
                //将购买了还想买的商品信息取出来
                var arr = obj.data;
                for(var i = 0 ; i < arr.length; i++){
                    $(`<li class="J_xm-recommend-list span4">    
                    <dl> 
                        <dt> 
                            <a href="//item.mi.com/${arr[i].commodityid}.html"> 
                                <img src="${arr[i].image}" srcset="//i1.mifile.cn/a1/pms_1551867177.2478190!280x280.jpg  2x" alt="小米净水器1A（厨下式）"> 
                            </a> 
                        </dt> 
                        <dd class="xm-recommend-name"> 
                            <a href="//item.mi.com/${arr[i].commodityid}.html"> 
                                ${arr[i].name} 
                            </a> 
                        </dd> 
                        <dd class="xm-recommend-price">${arr[i].price}元</dd> 
                        <dd class="xm-recommend-tips">   ${arr[i].comments}人好评    
                            <a href="javascript:void(0);" class='btn btn-small btn-line-primary J_xm-recommend-btn' style="display: none;" id="${arr[i].goodsid}">加入购物车</a>  
                        </dd> 
                        <dd class="xm-recommend-notice">

                        </dd> 
                    </dl>  
                </li> `).appendTo("#J_miRecommendBox .xm-recommend ul");
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }

    //给还想买的商品添加鼠标移入移出效果
    function cartHover(){
        //事件委托实现
        $("#J_miRecommendBox .xm-recommend ul").on("mouseenter",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","block");
        })
        $("#J_miRecommendBox .xm-recommend ul").on("mouseleave",".J_xm-recommend-list",function(){
            $(this).find(".xm-recommend-tips a").css("display","none");
        })

        //通过事件委托完成加入购物车操作
        $("#J_miRecommendBox .xm-recommend ul").on("click",".xm-recommend-tips .btn",function(){
            var id = this.id;
           
            var first = $.cookie("goods") == null ? true : false;

            //如果是第一次添加
            if(first){
                var cookieArr = [{id: id ,num : 1}];
                $.cookie("goods",JSON.stringify(cookieArr),{
                    expires: 7
                })
            }else{
                var same = false; //假设之前没添加过
                var cookieStr = $.cookie("goods");
                var cookieArr = JSON.parse(cookieStr);
                for(var i = 0 ; i < cookieArr.length; i++){
                    if(cookieArr[i].id == id){
                        //说明之前添加过
                        cookieArr[i].num++;
                        same = true;
                        break;
                    }
                }
                if(!same){
                    //没有添加过
                    var obj = {id: id, num: 1};
                    cookieArr.push(obj);
                }

                //最后将存储数据添加到cookie中
                $.cookie("goods",JSON.stringify(cookieArr),{
                    ecpires: 7
                })
            }
            //alert($.cookie("goods"));
            isCheckAll();
            loadCartData();
            return false;
        })
    }

    //给全选按钮和单选按钮添加点击
    function checkFunc(){
        //全选按钮
        $("#J_cartBox .list-head .col-check").find("i").click(function(){
            //获取每一个单选按钮
            var allChecks = $("#J_cartListBody").find(".item-row .col-check").find("i");

            if($(this).hasClass("icon-checkbox-selected")){
                $(this).add(allChecks).removeClass("icon-checkbox-selected");
            }else{
                $(this).add(allChecks).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })

        //给每一个单选框添加点击
        $("#J_cartListBody .J_cartGoods").on("click",".item-row .col-check i",function(){
            if($(this).hasClass("icon-checkbox-selected")){
                $(this).removeClass("icon-checkbox-selected");
            }else{
                $(this).addClass("icon-checkbox-selected");
            }
            isCheckAll();
        })
    }
    
    //根据选择的商品计算总价和数量以及全选是否选中，
    function isCheckAll(){
        var allChecks = $("#J_cartListBody").find(".item-row");
        var isAll = true;   //假设所有都被选中
        var total = 0;  //计算总数
        var count = 0;  //记录被选中的数量
        var totalCount = 0; //记录总数
        //遍历所有的商品节点
        allChecks.each(function(index,itme){//index 当前遍历下标，itme 当前遍历到的元素节点
            if(!$(itme).find(".col-check i").hasClass("icon-checkbox-selected")){
                //判断这个商品节点的单选框没有被选中
                isAll = false;
            }else{
                //计算所有被选中要购买的商品总价
                total += parseFloat($(itme).find(".col-price").html().trim()) * parseFloat($(this).find(".col-num input").val());
                //被选中的商品数量
                count += parseInt($(this).find(".col-num input").val());
            }
            //计算所有加入购物车的商品一共有多少
            totalCount += parseInt($(this).find(".col-num input").val());
        })
        //设置价格和数量到页面上
        $("#J_selTotalNum").html(count);
        $("#J_cartTotalNum").html(totalCount);
        $("#J_cartTotalPrice").html(total);

        //判断是否全选
        if(isAll){
            $("#J_cartBox .list-head .col-check").find("i").addClass("icon-checkbox-selected");
        }else{
            $("#J_cartBox .list-head .col-check").find("i").removeClass("icon-checkbox-selected");
        }
    }

    //给页面上购物车中商品进行数量增减和删除操作
    function changeCars(){
        //给每一个删除按钮添加点击事件  事件委托
        $("#J_cartListBody .J_cartGoods").on("click",".col-action .J_delGoods",function(){
            //找到当前点击删除按钮的父节点，商品信息和商品id，通过remove方法从页面上删除节点
            var id = $(this).closest(".item-row").remove().attr("id");
            //再在cookie中删除商品信息
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    
                    //找到数据，进行删除
                    cookieArr.splice(i , 1);
                    break;
                }
            }
            //进行判断，cookie中是否还有数据，有就存回去，没有就删除cookie
            cookieArr.length == 0 ? $.cookie("goods",null) : $.cookie("goods",JSON.stringify(cookieArr),{ecpires: 7});

            isCheckAll();
            return false;
        }) 

        //给每一个+ - 添加点击事件
        $("#J_cartListBody .J_cartGoods").on("click",".J_minus , .J_plus",function(){
            //找到所有的商品的id
            var id = $(this).closest(".item-row").attr("id");
            //再在cookie中增减商品数量
            var cookieStr = $.cookie("goods");
            var cookieArr = JSON.parse(cookieStr);
            for(var i = 0; i < cookieArr.length; i++){
                if(cookieArr[i].id == id){
                    //找到要操作的商品了
                    if(this.className == "J_minus"){
                        //数量-1
                        cookieArr[i].num == 1 ? alert("当前商品的数量为1，不能再减少了！") :cookieArr[i].num--;
                    }else{
                        cookieArr[i].num++;
                    }
                    break;
                }
            }

            //更新页面上操作商品数量
            $(this).siblings("input").val(cookieArr[i].num);
            //更新操作的单个商品的总价
            var price = parseFloat($(this).closest(".col-num").siblings(".col-price").html().trim());
            $(this).closest(".col-num").siblings(".col-total").html((price * cookieArr[i].num).toFixed(1));
            //重新计算一次总价
            isCheckAll();

            //最后要更改数据，存储到cookie中
            $.cookie("goods",JSON.stringify(cookieArr),{
                ecpires: 7
            })

            return false;
        })

    }

    return{
        download: download,
        cartHover: cartHover,
        loadCartData: loadCartData,
        checkFunc: checkFunc,
        changeCars: changeCars
    }
})