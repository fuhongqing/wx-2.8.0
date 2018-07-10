<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>邀请有礼</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="css/init.css?v=20180626">
    <link rel="stylesheet" href="css/newInvite.css?v=20180626">
    <script src="https://s13.cnzz.com/z_stat.php?id=1273685482&web_id=1273685482" language="JavaScript"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
</head>
<body>
<div id="invitePage" class="page">
    <header>
        <div class="backImg" onclick="history.back()"><img style="width: .2rem;height: .3rem;" src="img/arrow_back.png" alt=""></div>
        <div class="title">邀请有礼</div>
    </header>
    <section>
         <div id="inviteBg">
             <div><img style="width: 3.35rem;height: 1.44rem;" src="img/invite_title.png" alt=""></div>
             <div class="imgPerson"><img style="width: 2.65rem;height: 1.33rem;" src="img/image_person.png" alt=""></div>
             <div class="redBack"><img style="width: 3.22rem;height: 2.54rem;" src="img/red_pack.png" alt=""></div>
             <div class="activity"><img style="width: 3.3rem;height: 2.08rem;" src="img/image_activity.png" alt=""></div>
             <div id="myInvite">
                 <!--动态-->
                 <ul>
                     <li class="title">我的邀请</li>
                 </ul>
                 <ul id="inviteLists">
                     <!--动态-->
                 </ul>
             </div>
         </div>
    </section>
    <footer>
        <div id="inviteBtn">立即邀请</div>
    </footer>
</div>
<!--提示框-->
<div class="inviteModal">
    <div class="inviteToast"></div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/setting.js?v=201815081652"></script>
<script type="text/javascript" src="js/newInvite.js?v=201815081652"></script>
</body>
</html>