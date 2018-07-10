<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的</title>
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="../css/person.css?v=201825121244">
</head>
<body>
<div class="page">
    <div id="personInfo">
        <div class="avator">
            <img id="personImg" style="width: .8rem;height: .8rem;" src="../img/profile_img_head_man@2x.png" alt="">
            <ul>
                <li><span id="userName"></span><img style="width: .4rem;" src="../img/me_ic_level@2x.png" alt=""></li>
                <li id="userTitle"></li>
            </ul>
        </div>
    </div>
    <div id="activities">
        <div id="qiandao">
            <p><img src="../img/me_ic_sign in@2x.png" alt=""></p>
            <p>签到有礼</p>
        </div>
        <div id="level">
            <p><img style="width: .2rem;height: .25rem;" src="../img/me_ic_rights@2x.png" alt=""></p>
            <p>等级权益</p>
        </div>
        <div id="jifen">
            <p><img src="../img/me_ic_credits@2x.png" alt=""></p>
            <p>积分礼通</p>
        </div>
        <div id="guanzhu">
            <p><img src="../img/me_ic_love@2x.png" alt=""></p>
            <p>我的关注</p>
        </div>
    </div>
    <div class="gap"></div>
    <div id="poster"><img style="width: 3.35rem;" src="../img/me_banner_invite@2x.png" alt=""></div>
    <div class="gap"></div>
    <ul id="func-lists">
        <li id="inviteLi">
            <p><img src="../img/me_btn_invite@2x.png" alt=""></p>
            <p>邀请好友</p>
        </li>
        <li id="reward">
            <p><img src="../img/me_btn_award@2x.png" alt=""></p>
            <p>领奖记录</p>
        </li>
        <li id="persontop">
            <p><img src="../img/me_btn_result@2x.png" alt=""></p>
            <p>我的业绩</p>
        </li>
        <li id="personal">
            <p><img src="../img/me_btn_datum@2x.png" alt=""></p>
            <p>个人资料</p>
        </li>
        <li id="helpLi">
            <p><img src="../img/me_btn_help@2x.png" alt=""></p>
            <p>帮助反馈</p>
        </li>
        <li id="identifyCom">
            <p><img src="../img/me_btn_attestation@2x.png" alt=""></p>
            <p>认证公司</p>
        </li>
        <li id="hotLineLi">
            <p><img src="../img/me_btn_phone@2x.png" alt=""></p>
            <p>客户热线</p>
            <a href="tel:18621696821">18621696821</a>
        </li>
        <li id="myEmployee">
            <p><img src="../img/ic_staff@2x.png" alt=""></p>
            <p>我的员工</p>
        </li>
        <li id="myCustomer">
            <p><img src="../img/ic_clients@2x.png" alt=""></p>
            <p>我的客户</p>
        </li>
    </ul>
    <ul id="footer-item">
        <li>
            <p><img src="../img/tabbar_ic_mine_dis@2x.png" alt=""></p>
            <p>项目</p>
        </li>
        <li>
            <p><img src="../img/tabbar_ic_client_dis@2x.png" alt=""></p>
            <p>客户</p>
        </li>
        <li>
            <img style="width:.6rem" src="../img/add-client.png" alt="">
        </li>
        <li>
            <p><img src="../img/tabbar_ic_trend_dis@2x.png" alt=""></p>
            <p>动态</p>
        </li>
        <li>
            <p><img src="../img/myself.png" alt=""></p>
            <p>我的</p>
        </li>
    </ul>
</div>
<div class="outModal">
    <div class="outToast">
        <div>您还未加入任何渠道公司，无法进行 更多内容查看哦。</div>
        <div>
            <div id="outModSure">添加认证</div>
            <div id="outModCancle">绑定分行码</div>
        </div>
    </div>
</div>
<script src="../js/jquery.min.js"></script>
<script src="../js/rem.js?v=201845121244"></script>
<script type="text/javascript" src="../js/person.js?v=201845121244"></script>
<script>
</script>
</body>
</html>