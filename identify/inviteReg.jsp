<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/init.css?v=20180626">
    <link rel="stylesheet" href="css/newInviteReg.css?v=20180626">
    <script src="https://s13.cnzz.com/z_stat.php?id=1273685482&web_id=1273685482" language="JavaScript"></script>
</head>
<body>
<div id="inviteRegPage"  class="page">
    <header>
        <div class="backImg" onclick="history.back()"><img style="width: .2rem;height: .3rem;" src="img/arrow_back.png" alt=""></div>
        <div class="title">邀您加入易好房</div>
    </header>
    <section>
        <div class="swiper-container swiper-container-vertical">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="img/images_01.png" alt=""></div>
                <div class="swiper-slide"><img src="img/images_02.png" alt=""></div>
                <div class="swiper-slide"><img src="img/images_03.png" alt=""></div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets"></div>
        </div>

         <div id="regOutDiv">
             <div id="regForm">
                 <h2 id="inviteName">陈洪喊你一起卖新房啦！</h2>
                 <div>
                     <input id="regPhoneInput" style="border-right: none" type="text" placeholder="请输入手机号">
                     <button id="regCodeSpan">获取验证码</button>
                 </div>
                 <div style="margin: .1rem 0">
                     <input id="regCodeInput" type="text" placeholder="请输入验证码">
                 </div>
                 <div id="inviteRegBtn">提交</div>
             </div>
         </div>
    </section>
</div>
<!--提示框-->
<div class="modal">
    <div class="toast"></div>
</div>
<!--弹框-->
<div class="tipModal">
    <div id="topDiv">
        <div><img style="width: .44rem;height: .44rem;" src="img/ic_remind@2x.png" alt=""></div>
        <h1>糟糕！提交失败</h1>
        <div id="reSubmit">重新填写</div>
        <div id="closeImg"><img style="width: .37rem;height: .37rem;" src="img/ic_delete@2x.png" alt=""></div>
    </div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/swiper.min.js"></script>
<script type="text/javascript" src="js/setting.js?v=201815081652"></script>
<script type="text/javascript" src="js/newInviteReg.js?v=201845081652"></script>
</body>
</html>