define(["jquery"],function($){
    function loginSend(){
        $("#login-button").click(function(){
            $.ajax({
                type: "post",
                url:  "../../../xiaomi/dist/php/login.php",
                data:{
                    username: $(".item_account").eq(0).val(),
                    password: $(".item_account").eq(1).val(),
                },
                success: function(result){
                    //console.log(result);
                    //解析后台返回的数据
                    var obj = JSON.parse(result);
                    if(obj.code){
                        $(".err_tip").find("em").attr("class","icon_error");
                        
                    }else{
                        $(".err_tip").find("em").attr("class","icon_select icon_true");
                        $(".err_tip").find("span").css("color","green");
                    }
                    $(".err_tip").show().find("span").html(obj.message);

                },
                error: function(msg){
                    console.log(msg);
                }
            })
        })
    }

    return {
        loginSend: loginSend
    }
})