<?php
    header('content-type:text/html;charset="utf-8"');
     //var_dump($_POST);
    //定义一个统一的返回格式 200 ok 404 not found
    $responseData = array("code" => 0 , "message" => "");

    //将通过post提交的数据全部取出来
    $username = $_POST["username"];
    $password = $_POST["password"];

    //对后台接收到的数据，进行一个判断
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        //将数据按照统一的返回格式返回
        echo json_encode($responseData);
        exit;
    }

    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        //将数据按照统一的返回格式返回
        echo json_encode($responseData);
        exit;
    }

    //链接数据库，验证用户名和密码是否正确和存在， 八个步骤
    //1.链接数据库
    $link = mysql_connect("localhost","root","123456");

    //2.判断数据库是否链接成功
    if(!$link){
        $responseData["code"] = 3;
        $responseData["message"] = "服务器忙";
        //将数据按照统一的返回格式返回
        echo json_encode($responseData);
        exit;
    }

    //3.设置字符集
    mysql_set_charset("utf-8");

    //4.选择数据库
    mysql_select_db("xiaomi");

    //5.准备sql语句验证是否注册过
    //密码加密
    $str = md5(md5(md5($password)."hunan")."zhonggou");

    $sql = "SELECT * FROM users WHERE username = '{$username}' AND password = '{$str}'";

    //6.发送sql语句
    $res = mysql_query($sql);

    //var_dump($res);

    //7.取出一行数据
    $row = mysql_fetch_assoc($res);

    if(!$row){//注册失败
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误！";
        //将数据按照统一的返回格式返回
        echo json_encode($responseData);
        exit;
    }else{
        $responseData["message"] = "登陆成功";
        //将数据按照统一的返回格式返回
        echo json_encode($responseData);
    }

    //8.关闭数据库
    mysql_close($link);
?>