<%--
  Created by IntelliJ IDEA.
  User: admin
  Date: 2019/9/28
  Time: 16:35
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html class="loginHtml">
<head>
    <meta charset="utf-8">
    <title>注册--随团旅行管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="format-detection" content="telephone=no">
    <link rel="icon" href="${yeqifu}/static/favicon.ico">
    <link rel="stylesheet" href="${yeqifu}/static/layui/css/layui.css" media="all" />
    <link rel="stylesheet" href="${yeqifu}/static/css/public.css" media="all" />

</head>
<body>

<div class="login-main">
    <header class="layui-elip" style="width: 82%">注册页</header>

    <!-- 表单选项 -->
    <form class="layui-form">
        <div class="layui-input-inline">
            <!-- 用户名 -->
            <div class="layui-inline" style="width: 85%">
                <input type="text" id="user" name="loginname" required  lay-verify="required" placeholder="请输入用户名" autocomplete="off" class="layui-input">
            </div>
            <!-- 对号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="ri" style="color: green;font-weight: bolder;" hidden></i>
            </div>
            <!-- 错号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="wr" style="color: red; font-weight: bolder;" hidden>ဆ</i>
            </div>
        </div>
        <!-- 密码 -->
        <div class="layui-input-inline">
            <div class="layui-inline" style="width: 85%">
                <input type="password" id="pwd" name="password" required  lay-verify="required" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
            <!-- 对号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="pri" style="color: green;font-weight: bolder;" hidden></i>
            </div>
            <!-- 错号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="pwr" style="color: red; font-weight: bolder;" hidden>ဆ</i>
            </div>
        </div>
        <!-- 确认密码 -->
<%--        <div class="layui-input-inline">
            <div class="layui-inline" style="width: 85%">
                <input type="password" id="rpwd" name="repassword" required  lay-verify="required" placeholder="请确认密码" autocomplete="off" class="layui-input">
            </div>
            <!-- 对号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="rpri" style="color: green;font-weight: bolder;" hidden></i>
            </div>
            <!-- 错号 -->
            <div class="layui-inline">
                <i class="layui-icon" id="rpwr" style="color: red; font-weight: bolder;" hidden>ဆ</i>
            </div>
        </div>--%>


        <div class="layui-input-inline login-btn" style="width: 85%">
            <button type="submit" lay-submit lay-filter="sub" class="layui-btn">注册</button>
        </div>
        <hr style="width: 85%" />
        <p style="width: 85%"><a href="${yeqifu}/login/toLogin.action"  class="fl">已有账号？立即登录</a></p>
    </form>
</div>

<script src="${yeqifu}/static/layui/layui.js"></script>
<script type="text/javascript">
    layui.use(['form','jquery','layer'], function () {
        var form   = layui.form;
        var $      = layui.jquery;
        var layer  = layui.layer;
        //添加表单失焦事件
        //验证表单
        $('#user').blur(function() {
            var user = $(this).val();
            // alert(user);
            $.ajax({
                url:'${yeqifu}/user/checkUser.action',
                type:'post',
                dataType:'text',
                data:{loginname:user},
                //验证用户名是否可用
                success:function(data){
                    debugger
                    if (data == 0) {
                        $('#ri').removeAttr('hidden');
                        $('#wr').attr('hidden','hidden');
                    } else {
                        $('#wr').removeAttr('hidden');
                        $('#ri').attr('hidden','hidden');
                        layer.msg('当前用户名已被占用! ')
                    }

                }
            })

        });
        // you code ...
        // 为密码添加正则验证
        $('#pwd').blur(function() {
            var reg = /^[\w]{6,12}$/;
            if(!($('#pwd').val().match(reg))){
                //layer.msg('请输入合法密码');
                $('#pwr').removeAttr('hidden');
                $('#pri').attr('hidden','hidden');
                layer.msg('请输入合法密码');
            }else {
                $('#pri').removeAttr('hidden');
                $('#pwr').attr('hidden','hidden');
            }
        });

/*        //验证两次密码是否一致
        $('#rpwd').blur(function() {
            if($('#pwd').val() != $('#rpwd').val()){
                $('#rpwr').removeAttr('hidden');
                $('#rpri').attr('hidden','hidden');
                layer.msg('两次输入密码不一致!');
            }else {
                $('#rpri').removeAttr('hidden');
                $('#rpwr').attr('hidden','hidden');
            };
        });*/

        //
        //添加表单监听事件,提交注册信息
        form.on('submit(sub)', function() {
            $.ajax({
                url:'${yeqifu}/user/addUser2.action',
                type:'post',
                dataType:'text',
                data:{
                    loginname:$('#user').val(),
                    pwd:$('#pwd').val(),
                    available:1,
                },
                success:function(data){
                    if (data == 0) {
                        layer.msg('注册成功');
                    }else {
                        layer.msg('注册失败');
                    }
                }
            })
            //防止页面跳转
            return false;
        });

    });
</script>
<style>
    .layui-header {
        background: none;
    }
body{
    background-image:url("bg.png") ;
background-size: 100%;
}
    .layui-layout-admin .my-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background: #393D49;
        z-index: 2;
    }

    .layui-layout-admin .my-header .my-header-logo {
        display: inline-block;
        width: auto;
        height: 30px;
        color: white;
        font-size: 18px;
        line-height: 30px;
        padding: 15px;
        vertical-align: top;
    }

    .layui-layout-admin .my-header img.my-header-logo {
        width: 150px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        padding: 10px;
        border: none;
    }

    /* index */
    .my-header-btn {
        display: inline-block;
        width: auto;
        height: 100%;
        line-height: 60px;
    }

    .my-header-btn .layui-btn .layui-icon {
        margin-right: 0;
    }

    .my-header-user-nav {
        float: right;
    }

    .my-header-user-nav img {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border: none;
        border-radius: 5px;
    }

    .my-header-user-nav .layui-nav-item a.name {
        padding-left: 5px !important;
    }

    .my-header ul.layui-nav {
        display: inline-block;
        vertical-align: top;
        border-radius: 0;
    }

    .my-header ul.layui-nav li a {
        max-height: 60px;
    }

    .my-side {
        position: fixed;
        top: 60px;
        bottom: 0;
        width: 200px;
        z-index: 2;
        overflow-x: hidden;
    }

    .my-side .layui-nav {
        border-radius: 0;
        min-height: 100%;
    }

    .my-side ul.layui-nav li a i, .layui-nav .layui-nav-child a i, .layui-nav .layui-nav-item a i, .layui-tab-card > .layui-tab-title li span i {
        margin-right: 5px;
    }

    .my-side ul.layui-nav li dl dd a i {
        margin-left: 15px;
    }

    .my-body {
        position: fixed;
        top: 60px;
        bottom: 0;
        left: 200px;
        right: 0;
        z-index: 1;
        overflow: hidden;
    }

    .body {
        padding: 10px;
    }

    .my-body .layui-tab, .my-body .layui-tab .layui-tab-content {
        margin: 0;
        padding: 0;
    }

    .my-body .layui-tab .layui-tab-title li:first-child > i {
        display: none;
    }

    .my-body .layui-tab, .my-body .layui-tab .layui-tab-content, .my-body .layui-tab .layui-tab-item {
        height: 100%;
    }

    .my-body iframe {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
    }

    .layui-layout-admin .my-footer {
        height: 40px;
        padding: 2px 0;
    }

    .layui-layout-admin .my-footer p {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        text-align: center;
    }

    .my-btn-box {
        height: 38px;
        margin-bottom: 10px;
    }

    .my-pay-box > div p {
        text-align: center;
        margin-bottom: 10px;
    }

    /* welcome */
    .my-index-main button.layui-icon {
        width: 100%;
        font-size: 20px;
    }

    .my-index-main .my-nav-btn {
        background: #efefef;
        cursor: pointer;
        border-radius: 2px;
        overflow: hidden;
    }

    .my-index-main .my-nav-text:first-child {
        height: 24px;
        line-height: 25px;
        font-size: 16px;
        font-weight: bold;
    }

    .my-index-main .my-nav-text:last-child {
        height: 20px;
        line-height: 20px;
        font-size: 12px;
    }

    /* login 设置背景图片*/
    .login-body {
        background: url("/pictures/bg.png") repeat fixed;
    }

    .login-box {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 320px;
        height: 241px;
        max-height: 300px;
    }

    .login-body .login-box h3 {
        color: #444;
        font-size: 22px;
        font-weight: 100;
        text-align: center;
    }

    .login-box .layui-input[type='number'] {
        display: inline-block;
        width: 50%;
        vertical-align: top;
    }

    .login-box img {
        display: inline-block;
        width: 46%;
        height: 38px;
        border: none;
        vertical-align: top;
        cursor: pointer;
        margin-left: 4%;
    }

    .login-box button.btn-reset {
        width: 95px;
    }

    .login-box button.btn-submit {
        width: 190px;
    }

    .login-main {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 350px;
        margin: 0 auto;
    }

    .login-main header {
        margin-top: 150px;
        height: 35px;
        line-height: 35px;
        font-size: 30px;
        font-weight: 100;
        text-align: center;
    }

    .login-main header, .login-main form, .login-main form .layui-input-inline {
        margin-bottom: 15px;
    }

    .login-main form .layui-input-inline, .login-main form .layui-input-inline input, .login-main form .layui-input-inline button {
        width: 100%;
    }

    .login-main form .login-btn {
        margin-bottom: 5px;
    }

    /* demo */
    .site-demo-button div {
        margin: 20px 30px 10px;
    }

    .site-demo-button .layui-btn {
        margin: 0 7px 10px 0;
    }

    /* check */
    input[type='checkbox'] {
        vertical-align: middle;
    }

    .my-checkbox {
        -webkit-appearance: none;
        position: relative;
        width: 20px;
        height: 20px;
        background-color: #FFFFFF;
        border: solid 2px #28B779;
        border-radius: 2px;
        background-clip: padding-box;
        display: inline-block;
        cursor: pointer;
    }

    .my-checkbox:checked {
        background-color: #28B779;
        border: solid 0 #28B779;
    }

    .my-checkbox:checked:before {
        position: absolute;
        display: inline-block;
        right: 50%;
        bottom: 50%;
        -webkit-transform: translate(50%, 50%);
        -ms-transform: translate(50%, 50%);
        transform: translate(50%, 50%);
        font-family: "Microsoft Yahei";
        content: "√";
        color: #FFFFFF;
        font-size: 16px;
        font-weight: 600;
    }

    /* dblclick css */
    .dblclick-tab tr td {
        height: 30px;
        line-height: 30px;
        padding: 0 6px;
        border-radius: 2px;
        cursor: pointer;
    }

    .dblclick-tab tr td:hover {
        color: black;
        background: white;
    }

    .dblclick-tab tr td i {
        position: relative;
        top: 2px;
        display: inline-block;
        margin-right: 5px;
    }

    /* tips 404 */
    .my-page-box {
        font-family: "Segoe UI", "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans, Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB", "Hiragino Sans GB W3", FontAwesome, sans-serif;
        text-align: center;
        padding: 20px;
        background-color: white;
    }

    .my-page-box i {
        font-size: 100px;
    }

    .my-page-box h2, .my-page-box h3, .my-page-box h4, .my-page-box h5 {
        font-size: 80px;
    }

    .my-page-box p.msg {
        color: #dce2ec;
        font-size: 20px;
        margin-top: 20px;
    }

    .my-page-box p.text {
        color: #666;
        font-size: 16px;
        margin-top: 20px;
    }

    .my-page-box .my-btn-box {
        margin-top: 20px;
        margin-bottom: 20px;
    }

    /* tree table */
    .my-tree-table-box .tree-table-tree-box {
        width: 20%;
        min-height: 200px;
        display: inline-block;
        vertical-align: top;
        overflow-y: auto;
        overflow-x: auto;
    }

    .my-tree-table-box .tree-table-table-box {
        display: inline-block;
        vertical-align: top;
        width: 79%;
        margin-left: 1%;
    }

    /* skin0 */
    html .skin-0 .dblclick-tips-box .layui-layer-content {
        background-color: #009688;
    }

    html .skin-0 .dblclick-tips-box i.layui-layer-TipsB {
        border-right-color: #009688;
    }

    /* skin1 */
    html .skin-1 .my-header .my-header-logo,
    html .skin-1 .layui-nav .layui-nav-item a,
    html .skin-1 .layui-nav .layui-nav-item a:hover {
        color: #444;
    }

    html .skin-1 .my-header,
    html .skin-1 .layui-nav,
    html .skin-1 .layui-nav-child {
        background: white;
    }

    html .skin-1 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this a {
        color: white;
    }

    html .skin-1 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this,
    html .skin-1 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this > a,
    html .skin-1 .layui-nav-tree .layui-nav-item > a:hover,
    html .skin-1 .layui-nav .layui-nav-item .layui-nav-child dd:hover > a,
    html .skin-1 .layui-tab-title li .layui-tab-close:hover,
    html .skin-1 .dblclick-tips-box .layui-layer-content {
        color: white !important;
        background-color: #666 !important;
    }

    html .skin-1 .dblclick-tips-box i.layui-layer-TipsB {
        border-right-color: #666;
    }

    html .skin-1 .layui-nav .layui-nav-itemed > a {
        background: #444 !important;
    }

    html .skin-1 .layui-nav .layui-nav-more {
        border-color: #444 transparent transparent;
    }

    html .skin-1 .layui-nav .layui-nav-mored {
        border-color: transparent transparent #444;
    }

    /* skin2 */
    html .skin-2 .my-header .my-header-logo,
    html .skin-2 .layui-nav .layui-nav-item a,
    html .skin-2 .layui-nav .layui-nav-item a:hover {
        color: white;
    }

    html .skin-2 .my-header,
    html .skin-2 .layui-nav,
    html .skin-2 .layui-nav-child {
        background-color: #01AAED;
    }

    html .skin-2 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this a {
        color: white;
    }

    html .skin-2 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this,
    html .skin-2 .layui-nav .layui-nav-item .layui-nav-child dd.layui-this > a,
    html .skin-2 .layui-nav-tree .layui-nav-item > a:hover,
    html .skin-2 .layui-nav .layui-nav-item .layui-nav-child dd:hover > a,
    html .skin-2 .layui-tab-title li .layui-tab-close:hover,
    html .skin-2 .dblclick-tips-box .layui-layer-content {
        color: white !important;
        background-color: #00C0F7 !important;
    }

    html .skin-2 .dblclick-tips-box i.layui-layer-TipsB {
        border-right-color: #00C0F7;
    }

    html .skin-2 .layui-nav .layui-nav-itemed > a {
        background-color: #1684af !important;
    }

    /* skin0-2 */
    html .skin-2 .layui-nav .layui-nav-more,
    html .skin-1 .layui-nav-tree .layui-nav-more,
    html .skin-2 .layui-nav-tree .layui-nav-more {
        border-color: white transparent transparent;
    }

    html .skin-2 .layui-nav .layui-nav-mored,
    html .skin-1 .layui-nav-itemed .layui-nav-more,
    html .skin-2 .layui-nav-itemed .layui-nav-more {
        border-color: transparent transparent white;
    }

    /* tools */
    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .none {
        display: none;
    }

    .block {
        display: block;
    }

    .tc {
        text-align: center;
    }

    .max-auto {
        max-height: 450px;
        overflow-y: auto;
    }

    /* layui css cover */
    html body .layui-nav .layui-nav-bar {
        opacity: 0 !important;
        overflow: hidden !important;
    }

    .layui-nav .layui-this:after, .layui-nav-bar, .layui-nav-tree .layui-nav-itemed:after {
        background-color: transparent;
    }

    .my-body .layui-tab-card > .layui-tab-title li {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    .layui-layer-tips .layui-layer-content {
        padding: 5px;
    }

    /* media */
    @media screen and (max-width: 1023px) {
        .my-header ul.layui-nav, .my-header-btn, .my-side, .layui-field-title, .my-btn-box .fr {
            display: none;
        }

        .layui-side-scroll {
            width: 170px;
        }

        body div.my-mobile {
            background: #393D49;
        }

        body div.my-mobile .layui-layer-content {
            overflow-x: hidden;
        }

        .my-header ul.my-header-user-nav {
            display: inline-block;
            padding-left: 0;
            padding-right: 10px;
        }

        .my-header ul.my-header-user-nav a {
            padding: 0 10px;
        }

        .my-header ul.my-header-user-nav:last-child a:first-child {
            padding-right: 20px;
        }

        .my-side, .layui-nav-tree, .my-btn-box input[type='text'] {
            width: 150px;
        }

        .my-body {
            left: 0;
            width: 100%;
            overflow-x: auto;
        }

        .my-body iframe {
            width: 100%;
        }

        select {
            background: white;
        }

        .layui-layout-admin .layui-footer {
            left: 0;
        }
    }
</style>
</body>
</html>