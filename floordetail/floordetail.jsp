<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>楼盘详情</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="css/swiper.min.css">
    <link rel="stylesheet" href="css/floorDetail.css?v=201825121244">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script src="js/floorDetail.js"></script>
    </head>
    <body>
    <!--loading-->
    <main id="loading" class="loaded">
        <div class="loaders">
            <div class="loader">
                <div class="loader-inner ball-spin-fade-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    </main>
    <!--楼盘详情页-->
    <div id="floorDetail">
    <header>
    <!--头部工具条-->
    <div id="topTool">
    <div class="backImg"  onclick="history.back()"><img src="img/topbar_ic_back_white@2x.png" alt=""></div>
    </div>
    <!--图片-->
    <div class="swiper-container headerImg">
    <ul class="swiper-wrapper">
    </ul>
    </div>
    <!--分页-->
    <div id="topPages">
    <div></div>
    <p></p>
    </div>
    </header>
    <!--向上滑动时头部-->
    <div id="swiperTitle">
    <!--动态-->
    </div>
    <!--向上滑动时导航条-->
    <div class="scrollAuto">
    <ul id="navbars">
    <li class="active commissionInfo"><a href="#commissionInfo">佣金信息</a></li>
    <li class="sellPoints"><a href="#sellPoints">楼盘卖点</a></li>
    <li class="renderings"><a href="#renderings">户型图</a></li>
    <li class="progress"><a href="#progress">请佣流程</a></li>
    <li class="declaration"><a href="#declaration">规则说明</a></li>
    <li class="guess"><a href="#guess">猜你喜欢</a></li>
    </ul>
    </div>
    <!--楼盘信息-->
    <section id="floorInfo">
        <div>
            <div class="nameLeft"><!--动态数据--></div>
            <div class="nameRight"><img src="img/home_ic_more_small@2x.png" alt=""></div>
        </div>
        <div class="attress">
        <!--动态数据-->
        </div>
        <div class="preferential">
            <div class="left">
                <img src="img/ic_coupon.png" alt="\">
                <span>优惠活动</span>
            </div>
            <div class="right">
                <span></span>
                <img src="img/home_ic_more_small@2x.png" alt="">
            </div>
        </div>
        <div id="attention">
            <div id="attentionImg"></div>
            <div id="attentionNum"></div>
        </div>
    </section>
    <div class="gap"></div>
    <!--佣金信息-->
    <section id="commissionInfo">
    <div class="title">
    <h1>佣金信息</h1>
    <div class="more">
    <span>套方案</span><img src="img/home_ic_more_small@2x.png" alt="">
    </div>
    </div>
    <div class="tip"></div>
    <ul style="min-height: .1rem">
    <!--动态数据-->
    </ul>
    <div id="userType">绑定分行码后可查看</div>
    </section>
    <div class="gap"></div>
    <!--楼盘卖点-->
    <section id="sellPoints">
        <div class="title">
            <h1>楼盘卖点</h1>
            <div class="more">
                <span>查看全部</span><img src="img/home_ic_more_small@2x.png" alt="">
            </div>
        </div>
        <div class="iconType">
            <img class="bus" src="img/ic_bus@2x.png" alt="">
            <img class="school" src="img/ic_school@2x.png" alt="">
            <img class="restaurant" src="img/ic_restaurant.png" alt="">
            <img class="shop" src="img/ic_shop.png" alt="">
            <img class="hospital" src="img/ic_hospital@2x.png" alt="">
        </div>
        <div id="sellMap"></div>
        <div id="typeData"></div>
    </section>
    <div class="gap"></div>
    <section id="activeState">
        <div class="title">
            <h1>楼盘动态</h1>
            <div class="more">
                <span id="dtTotal">查看全部</span><img src="img/home_ic_more_small@2x.png" alt="">
            </div>
        </div>
        <div id="homeItem">
            <!--动态-->
        </div>
    </section>
    <div class="gap"></div>
    <!--户型图-->
    <section id="renderings">
    <div class="title">
    <h1>户型图</h1>
    </div>
    <div class="items">
    <!--动态数据-->
    </div>
    </section>
    <div class="gap"></div>
    <!--请佣流程-->
    <section id="progress">
        <div class="title">
        <h1>请佣流程</h1>
        </div>
        <p class="firstP"><span style="margin-right: .2rem">签约审核通过</span><span style="margin-right: .36rem">联动经理审核</span><span>财务审核</span></p>
        <p><img src="img/image_process@2x.png" alt=""></p>
        <p><span>联动发起申佣</span><span style="margin-left: .54rem">法务审核</span><span style="margin-left: .64rem">财务出款</span></p>
    </section>
    <div class="gap"></div>
    <!--规则说明-->
    <section id="declaration">
        <div class="title">
            <h1>规则说明</h1>
        </div>
        <div class="lists">
            <ul>
                <li>
                    <div><img src="img/ic_time_hours@2x.png" alt=""></div>
                    <div>提前一小时报备， 24小时有效。</div>
                </li>
            </ul>
            <ul>
                <li>
                    <div class="secondDiv">
                        <img src="img/ic_note@2x.png" alt="">
                        <img class="page" src="img/Page 1@2x.png" alt="">
                    </div>
                    <div>客户填写来访带看 单，并签字确认。</div>
                </li>
            </ul>
            <ul>
                <li>
                    <div><img src="img/ic_time_days@2x.png" alt=""></div>
                    <div>保护期为30日。超 过则按新渠道确认。 </div>
                </li>
            </ul>
            <ul>
                <li>
                    <div><img src="img/ic_clients@2x.png" alt=""></div>
                    <div>客户界定以协议和 现场判断为准。 </div>
                </li>
            </ul>
        </div>
    </section>
    <div class="gap"></div>
    <!--猜你喜欢-->
    <section id="guess">
    <div class="title">
    <h1>猜你喜欢</h1>
    </div>
    <div class="lists">
    <!--动态数据-->
    </div>
    </section>
    <footer>
    <div>
    <div class="poster">
    <p><img src="img/project_ic_image@2x.png" alt=""></p>
    <p>制作海报</p>
    </div>
    <div class="consult">
    <p><img src="img/project_ic_phone@2x.png" alt=""></p>
    <p>咨询项目</p>
    </div>
    <div class="myReport">
    <p><img src="img/project_ic_note@2x.png" alt=""></p>
    <p>我的报备</p>
    </div>
    <div id="report">立即报备</div>
    </div>
    </footer>
    </div>
    <!--楼盘详情更多-->
    <div id="lpxq">
    <div class="topBar">
    <div class="back"><img src="img/topbar_ic_back_black@2x.png" alt=""></div>
    <div>楼盘详情</div>
    </div>
    <div class="lpxq-group" id="item1">
    <!--动态数据-->
    </div>
    <div class="lpxq-group" id="item2">
    <!--动态数据-->
    </div>
    <div class="lpxq-group" id="item3">
    <!--动态数据-->
    </div>
    </div>
    <!--佣金信息更多-->
    <div id="commissionInfoMore" class="morePage">
    <div>
    <div class="back"><img src="img/topbar_ic_back_black@2x.png" alt=""></div>
    <div>佣金信息</div>
    </div>
    <div class="tip"></div>
    <ul>
    <!--动态数据-->
    </ul>
    </div>
    <!--优惠活动更多-->
    <div id="preferentialMore" class="morePage">
    <div>
       <div class="back"><img src="img/topbar_ic_back_black@2x.png" alt=""></div>
       <div>优惠活动</div>
    </div>
    <div class="tip"></div>
    <ul>
    <!--动态数据-->
    </ul>
    </div>
    <!--暂无更多楼盘信息-->
    <!--<div class="noData">暂无更多楼盘信息</div>-->
    <!--提示框-->
    <div class="modal">
    <div class="toast"></div>
    </div>
    <!--图片展示框-->
    <div class="imgModal">
    <div class="imgToast"></div>
    </div>
    <!--电话弹框-->
    <div class="phoneModal">
    <div class="phoneToast">
    <!--动态-->
    </div>
    </div>
    <!--绑定分行码-->
    <div class="fhmModal">
    <div class="fhmToast">
    <!--动态-->
    </div>
    </div>
    <!--楼盘相册-->
    <div class="swiper-container_warp" id="propertyImg">
    <div class="PropertyImage-nav">
    <div class="back"><img src="img/topbar_ic_back_white@2x.png" height="17" width="9"/></div>
    <div class="PropertyImage-num"></div>
    </div>
    <div class="swiper-container_center">
    <div class="swiper-container swiper-container_PropertyImage">
    <div class="swiper-wrapper" id="PropertyImage"></div>
    </div>
    </div>
    <div class="append-center">
    <p class="append-buttons"></p>
    </div>
    </div>
    <script type="text/javascript" src="js/swiper.min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/api?
    v=3.0&ak=CB2ede775afeb6e413abd40261396a69"></script>
    <script type="text/javascript" src="js/floorDetail.js?v=201815121244"></script>
    </body>
    </html>