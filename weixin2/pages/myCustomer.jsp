<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>全部客户</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="../css/light7.min.css">
    <link rel="stylesheet" href="../css/myCustomer.css?v=201825121244">
</head>
<body>
<div class="page">
    <header>
        <h2>全部客户</h2>
        <div class="back" onclick="history.back()"><img style="width: .1rem;margin-left: .05rem" src="../img/top_back.png" alt=""></div>
    </header>
    <ul id="filter">
        <li class="no-look">报备</li>
        <li>来访</li>
        <li>成交</li>
        <li>佣金</li>
    </ul>
    <section  id="cusSec"  class="content infinite-scroll" data-distance="100">
        <div id="cus-lists">
            <!--动态-->
        </div>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
            <div class="preloader"></div>
        </div>
    </section>
</div>
<script src="../js/jquery.min.js"></script>
<script src="../js/light7.min.js"></script>
<script src="../js/rem.js"></script>
<script type="text/javascript" src="../js/myCustomer.js?v=201815121244"></script>
</body>
</html>