<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="css/init.css">
    <link rel="stylesheet" href="css/downLoad.css">
</head>
<body>
<header>
    <div class="backImg" onclick="history.back()"><img style="width: .1rem;height: .18rem;" src="img/login_btn_top_back@2x.png" alt=""></div>
    <div class="title">邀请你加入易好房</div>
</header>
<section>
    <img style="width: 100%;height: 6rem;" src="img/image_bg_white@2x.png" alt="">
    <div id="resultTip">
        <img style="width: .25rem;height: .25rem;" src="img/ic_finish@2x.png" alt="">
        <span>提交成功！</span>
    </div>
    <div id="downloadBtn">
        <div>下载APP</div>
        <p>下载易好房经纪APP，瓜分10亿佣金</p>
    </div>
    <div id="divide"></div>
    <div id="attention">
        <div><img style="width: .8rem;height: .8rem;" src="img/slice.png" alt=""></div>
        <p>关注“易好房公众号”，获取更多资讯！</p>
    </div>
</section>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/setting.js?v=201815081652"></script>
<script type="text/javascript">
    $('#downloadBtn').on('click','div',function () {
        if(isIPhone){
            $(location).attr('href','https://itunes.apple.com/cn/app/id1220729430');
        }
        if(isAndroid){
            $(location).attr('href','http://www.ehaofang.com/apk/member/app-release.apk');
        }
    });
</script>
</body>
</html>