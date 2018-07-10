<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <title>位置</title>
    <link rel="stylesheet" href="css/detailmap.css?v=201805121244">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    
</head>
<body>
<header>
    <div class="backImg"><img class="scale" src="img/topbar_ic_back_black@2x.png" alt=""></div>
    <div class="title">楼盘卖点</div>
</header>
<div id="attrMap"></div>
<footer>
    <div class="traffic">
        <p><img src="img/ic_bus@2x.png" alt=""></p>
        <p>交通</p>
    </div>
    <div class="educate">
        <p><img src="img/ic_school@2x.png" alt=""></p>
        <p>学校</p>
    </div>
    <div class="restaurant">
        <p><img src="img/ic_restaurant.png" alt=""></p>
        <p>餐饮</p>
    </div>
    <div class="shopping">
        <p><img src="img/ic_shop.png" alt=""></p>
        <p>购物</p>
    </div>
    <div class="medical">
        <p><img src="img/ic_hospital@2x.png" alt=""></p>
        <p>医院</p>
    </div>
</footer>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&amp;ak=CB2ede775afeb6e413abd40261396a69"></script>
<script src="js/detailmap.js?v=201805121244"></script>
</body>
</html>