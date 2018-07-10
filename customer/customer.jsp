<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户列表</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>

    <link rel="stylesheet" href="css/light7.min.css">
    <link rel="stylesheet" href="css/init.css?v=201815121244">
    <link rel="stylesheet" href="css/customer.css?v=201815121244">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="js/light7.min.js"></script>
</head>
<body>
<div id="customPage" class="page">
    <header>
        <div class="top">
            <h2>客户列表</h2>
            <div class="back" onclick="history.back()"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
        </div>
        <div id="search">
            <input type="text" placeholder="客户名称/项目名称">
            <img style="width: .15rem;" src="img/searchActive.png" alt="">
        </div>
        <ul id="filter">

        </ul>
    </header>
    <section  id="cusListSec" class="content infinite-scroll" data-distance="100">
        <div  id="cus-lists">
            <!--动态-->
        </div>
        <!-- 加载提示符 -->
        <div class="infinite-scroll-preloader">
            <div class="preloader"></div>
        </div>
    </section>
</div>
<div id="searchPage"  class="page">
    <header>
        <div class="back"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
        <h2>搜索</h2>
    </header>
    <section>
        <div id="cus-search">
            <input type="text" placeholder="客户名称/项目名称">
            <img style="width: .15rem;" src="img/searchActive.png" alt="">
            <button>搜索</button>
        </div>
        <div style="top: 1rem;" class="content infinite-scroll" data-distance="100">
            <div id="history-lists">
                <!--动态-->
            </div>
            <!-- 加载提示符 -->
            <div class="infinite-scroll-preloader">
                <div class="preloader"></div>
            </div>
        </div>
    </section>
</div>
<ul id="footer-item">
    <li>
        <p><img src="img/tabbar_ic_mine_dis@2x.png" alt=""></p>
        <p>项目</p>
    </li>
    <li>
        <p><img src="img/tabbar_ic_client_dis@2x.png" alt=""></p>
        <p style="color: #42C29D;">客户</p>
    </li>
    <li>
        <img style="width:.6rem" src="img/Group 8@2x.png" alt="">
    </li>
    <li>
        <p><img src="img/tabbar_ic_trend_dis@2x.png" alt=""></p>
        <p>动态</p>
    </li>
    <li>
        <p><img src="img/myself.png" alt=""></p>
        <p>我的</p>
    </li>
</ul>
<script type="text/javascript" src="js/setting.js"></script>
<script type="text/javascript" src="js/customer.js?v=201815121244"></script>
</body>
</html>