<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>我的员工</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="../css/light7.min.css">
    <link rel="stylesheet" href="../css/myEmployee.css?v=201825121244">
</head>
<body>
<div class="page">
    <header>
        <h2>我的员工</h2>
        <div class="back" onclick="history.back()"><img style="width: .1rem;margin-left: .05rem" src="../img/top_back.png" alt=""></div>
    </header>
    <ul class="select">
        <li id="onlineLi">下拉<img style="width: .1rem;margin-left: .06rem" src="../img/home_btn_more_grey_export_down.png" alt=""></li>
        <li style="color:#02BD9C">报备</li>
        <li style="color:#2EA9FF">来访</li>
        <li style="color:#FFA100">成交</li>
        <li style="color:#FF7171">佣金(万)</li>
    </ul>
    <div class="content infinite-scroll" data-distance="150">
        <ul id="personLists">
            <!--动态-->
        </ul>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
            <div class="preloader"></div>
        </div>
    </div>
    <div class="personModal">
        <div class="personToast">
            <div>
                <img style="width: .2rem;float: right;margin-top: .16rem;" src="../img/ic_choose@2x.png" alt="">
                <h3>在职</h3>
            </div>
            <div>
                <img style="width: .2rem;float: right;margin-top: .16rem;display: none" src="../img/ic_choose@2x.png" alt="">
                <h3>离职</h3>
            </div>
        </div>
    </div>
</div>
<script src="../js/jquery.min.js"></script>
<script src="../js/light7.min.js"></script>
<script src="../js/rem.js"></script>
<script type="text/javascript" src="../js/myEmployee.js?v=201845121244"></script>
</body>
</html>