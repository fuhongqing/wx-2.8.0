<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>客户详情</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="stylesheet" href="css/init.css?v=201815121244">
    <link rel="stylesheet" href="css/customerDetail.css?v=201825121244">
    <script src="http://code.jquery.com/jquery-3.3.1.min.js"></script>
</head>
<body>
<div id="cusDetailPage" class="page">
    <header>
        <h2>客户详情</h2>
        <div class="back"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
    </header>
    <section id="progress">
        <h2 style="color: #999999;margin-bottom: .15rem" id="propertyNum"></h2>
        <div class="contacts">
            <!--动态-->
        </div>
        <h2 style="color: #999999;margin-bottom: .1rem;">进度</h2>
        <div id="reportCard" class="card">
            <!--动态-->
        </div>
        <!--二访-->
        <div id="visitedCard" class="card">

        </div>
        <div class="visitPro secPro">

        </div>
        <!--大定-->
        <div id="dealCard" class="card">
            <!--动态-->
        </div>
        <div class="visitPro dealPro" >

            <div class="reportDetail" id="beforeDaDing">
                <div class="relativeDiv">
                    <span class="circle"></span><span style="color: #02BD9C;font-size: 16px">报备</span>
                </div>
                <div class="progressTime" id="deaRepTime"></div>
            </div>
        </div>
        <!--签约-->
        <div id="signCard" class="card">

        </div>
        <div class="visitPro signPro">
            <div class="dealDetail" id="afterSign">
                <div class="relativeDiv">
                    <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;">大定</span>
                </div>
                <div class="progressTime" id="signDeaTime"></div>
            </div>

            <div class="reportDetail">
                <div class="relativeDiv">
                    <span class="circle"></span><span style="color: #02BD9C;font-size: 16px">报备</span>
                </div>
                <div class="progressTime" id="signRepTime"></div>
            </div>
        </div>
        <!--发佣-->
        <div id="commissionCard" class="card">

        </div>
        <div class="visitPro commissionPro">
            <div class="signDetail">
                <div class="relativeDiv">
                    <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;">签约</span>
                </div>
                <div class="progressTime" id="comSigTime"></div>
            </div>
            <div  class="dealDetail" id="afterDealPro">
                <div class="relativeDiv">
                    <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;">大定</span>
                </div>
                <div class="progressTime" id="comDeaTime"></div>
            </div>
            <div class="reportDetail">
                <div class="relativeDiv">
                    <span class="circle"></span><span style="color: #02BD9C;font-size: 16px">报备</span>
                </div>
                <div class="progressTime" id="comRepTime"></div>
            </div>
        </div>
    </section>
    <div class="gap"></div>
    <section id="follow">
        <div>
            <div id="folllowNum" style="float: right;margin-top: .2rem;">全部跟进</div>
            <h2>跟进</h2>
        </div>
        <div id="follow-lists">
            <!--动态-->
        </div>
    </section>
    <footer>
        <div id="editeFollow">写跟进</div>
        <div id="contactCase"></div>
    </footer>
</div>
<div id="proDetailPage" class="page">
    <header>
        <h2>报备详情</h2>
        <div class="back"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
    </header>
    <h2>报备</h2>
    <section id="reportSec">

    </section>
    <section id="visitedSec">

    </section>
    <section id="dealSec">

    </section>
    <section id="signSec">

    </section>
    <section id="commissionSec">

    </section>
    <div class="commissionPro">
        <h2>进度</h2>
        <div id="commProDiv">
            <!--动态-->
        </div>
    </div>
</div>
<div id="followEditePage" class="page">
    <header>
        <h2>添加跟进</h2>
        <div class="back"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
    </header>
    <section>
        <img style="width:.18rem" src="img/ic_write@2x.png" alt="">
        <textarea name="" id="edit" placeholder="输入跟进内容"></textarea>
        <div id="subFollow">提交</div>
    </section>
</div>
<div id="customAnaPage" class="page">
    <header>
        <h2>客户分析</h2>
        <div class="back"><img style="width: .1rem;" src="img/topbar_btn_back_black@2x.png" alt=""></div>
    </header>
    <div class="gap"></div>
    <section>
        <!--动态-->
    </section>
</div>
<!--提示框-->
<div class="modal">
    <div class="toast"></div>
</div>
<!--图片展示框-->
<div class="imgModal">
    <div class="imgToast"></div>
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
<script  src="js/setting.js?v=201815121244"></script>
<script type="text/javascript" src="js/customerDetail.js?v=201825121244"></script>
</body>
</html>