<%@ page pageEncoding="utf-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <link href="http://www.ehaofang.com/img/ef.ico" type="image/x-icon" rel="icon">
    <link href="http://www.ehaofang.com/img/ef.ico" type="image/x-icon" rel="shortcut icon">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <meta http-equiv="Expires" content="0">
    <link rel="stylesheet" href="../../home/less/index.css?v=201835121244">
    <link rel="stylesheet" href="../../home/static/swiper.min.css?v=201825121244">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="../../home/js/setting.js?v=201815251108"></script>
</head>
<body>
<div class="page_index" id="page_index">
    <div id="poster"><img src="../../home/img/home_imgae_banner@2x.png" style="height: 12.5rem;width: 100%;" alt=""></div>
    <div class="search" id="search_top">
        <div class="search_box">
            <img src="../../home/img/ic_search@2x.png"/>
            <input type="search" placeholder="项目名称" disabled/>
        </div>
    </div>
    <div class="container" style=" padding: .5rem 2rem;">
        <div class="nav">
            <div id="to_loupan">
                <img src="../../home/img/home_ic_building_export@2x.png"/>
                <p>全部楼盘</p>
            </div>
            <div id="to_map"><img src="../../home/img/home_ic_map_new@2x.png"/>
                <p>地图看盘</p>
            </div>
            <a href="../../home/loan.jsp"><img src="../../home/img/home_ic_calculator_new@2x.png"/>
                <p>房贷计算</p></a>
            <div id="to_yeji">
                <img src="../../home/img/home_ic_performance@2x.png"/>
                <p>我的业绩</p></div>
            <div id="to_zhaopin"><img src="../../home/img/home_ic_offer_new@2x.png"/>
                <p>易招聘</p></div>
        </div>
    </div>
    <div class="container" style="display: flex;justify-content: space-between;align-items: center;">
        <div class="swiper-container swiper-container_xibao">
            <div class="swiper-wrapper" id="xibao"></div>
        </div>
        <img src="../../home/img/home_tags_report@2x.png" style="margin-left: .3rem;width: 1.7rem;vertical-align: middle;"/>
    </div>
    <div class="container" style="padding-right: 0;padding-left: 0">
        <div class="h2">
            附近优推
        </div>
        <div class="swiper-container swiper-container_recommend">
            <div class="swiper-wrapper" id="recommend">
            </div>
        </div>
        <div class="no_item no_item1">
            <div>暂无更多楼盘</div>
        </div>
    </div>
    <div style="width: 17rem;height: 6rem;border-radius: 4px" class="swiper-container swiper-container_image">
        <div class="swiper-wrapper" id="image">
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="container" style="padding-right: 0;padding-left: 0">
        <div class="h2">
            即将上线
        </div>
        <div class="swiper-container swiper-container_continued">
            <div class="swiper-wrapper" id="continued">
            </div>
        </div>
        <div class="no_item no_item2">
            <div>暂无更多楼盘</div>
        </div>
    </div>
    <div class="container logo" style="text-align: center;padding-right: 0;padding-left: 0">
        <span class="line"></span>
        <img src="../../home/img/home_ic_image_yihaofang@2x.png" style="top: .25rem;position: relative;margin:0 1.3rem ;width: 1.85rem;vertical-align: middle;">
        <span class="line"></span>
    </div>
    <ul id="footer-item">
        <li>
            <p><img src="../img/tabbar_ic_mine_home@2x.png" alt=""></p>
            <p style="color: #42C29D">项目</p>
        </li>
        <li>
            <p><img src="../img/tabbar_ic_client_dis@2x.png" alt=""></p>
            <p>客户</p>
        </li>
        <li style="height: 3rem;">
            <img style="width:3rem" src="../img/add-client.png" alt="">
        </li>
        <li>
            <p><img src="../img/tabbar_ic_trend_dis@2x.png" alt=""></p>
            <p>动态</p>
        </li>
        <li>
            <p><img src="../img/myself_n.png" alt=""></p>
            <p>我的</p>
        </li>
    </ul>
</div>
<div class="page_search" id="page_search" style="display: none">
    <div class="search search_only">
        <div class="search_box">
            <img src="../../home/img/ic_search@2x.png"/>
            <input type="search" placeholder="项目名称"/>
            <span id="search_cancel">取消</span>
        </div>
    </div>
    <div style="text-align: center;margin-top: 4rem;font-size:.7rem;color:#bcbcbc;display: none" id="for_search_none">
        <img src="../../home/img/ic_no_list.png" style="width: 3rem;margin-bottom: 2rem"/>
        <p>没有找到匹配的楼盘，换个条件试试吧</p>
    </div>
    <div style="text-align: center;margin-top: 4rem" id="for_search">
        <img src="../../home/img/ic_for_search.png" style="width: 5.5rem"/>
    </div>
    <div id="property_list" class="property_list"></div>
</div>
<script src="../../home/static/swiper.min.js?v=201807161332"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script src="../../home/static/fastclick.min.js?v=201807161332"></script>
<script type="text/javascript" src="../../home/js/getMemer.js?v=201857161332"></script>
</body>
</html>