﻿<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>认证公司</title>
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
    <meta name="format-detection" content="telephone=no"/>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="stylesheet" href="css/init.css?v=20180626">
    <link rel="stylesheet" href="css/identifyAdd.css?v=20180626">
    <link rel="stylesheet" href="css/identifyDetail.css?v=20180626">
</head>
<body>
<div id="detailPage">
    <header>
        <div class="backImg" onclick="history.back()"><img style="width: .09rem;height: .17rem;" src="img/back.png" alt=""></div>
        <div class="title">认证公司</div>
        <div class="backOut"><img style="width: .18rem;height: .18rem;" src="img/ic_quit@2x.png" alt=""></div>
    </header>
    <section>
        <img class="waitSignImg" src="img/waitSign.png" alt="">
        <img class="passSignImg" src="img/passSign.png" alt="">
        <img class="rejectSignImg" src="img/rejectSign.png" alt="">
        <div class="foldTile">
            <div class="foldBtn">收起</div>
            <div>公司信息</div>
        </div>
        <ul id="detailUl" class="inputUl">
            <!--动态-->
        </ul>
        <div id="companyInfo">
            <div class="comName"></div>
            <div>公司全称</div>
        </div>
        <div id="licenceLi">
            <span class="key">营业执照</span>
            <!--动态-->
        </div>
        <div class="foldTile">
            <div></div>
            <div>分行</div>
        </div>
        <div id="branchDet">
            <span style="float: right" class="branchNum"></span><span class="branchName"></span>
        </div>
        <div class="step step1">
            <span id="submitTime"></span><span class="point"></span><span>提交</span>
        </div>
        <div class="line"><span></span></div>
        <!--通过-->
        <div class="step step2 passDiv">
            <!--动态-->
        </div>
        <!--驳回-->
        <div class="step step2 rejectDiv">
            <!--动态-->
        </div>
    </section>
    <footer>
        <div id="modifyBtn">修改</div>
    </footer>
</div>
<div id="modifyPage">
    <header>
        <div class="backImg"><img class="scale" src="img/back.png" alt=""></div>
        <div class="title">修改</div>
    </header>
    <section>
        <ul class="inputUl">
            <li><span class="label">公司全称：</span><input id="companyName" type="text"></li>
            <li>
                <span class="label">公司地址：</span>
                <input id="companyAttr" readonly type="text">
                <div id="getAttr"><img class="scale" src="img/position.png" alt=""><span>定位</span></div>
            </li>
            <li><span class="label">负责人姓名：</span><input id="userName" type="text"></li>
            <li><span class="label">负责人电话：</span><input id="userPhone" type="text"></li>
        </ul>
        <div id="upLoad" class="uploadDiv">
            <span>营业执照</span>
            <!--动态-->
            <img class="upLoadImg" src="img/upload.png" alt="">
            <input type="file" id="btn-file" accept="*/*"/>
        </div>
        <div class="submitModify" id="submitBtn">提交</div>
    </section>
</div>
<div id="mapPage">
    <header>
        <div class="backImg"><img class="scale" src="img/back.png" alt=""></div>
        <div class="title">定位</div>
    </header>
    <div id="attrMap"></div>
    <section>
        <div id="imgDiv">
            <img src="img/curPosition.png" alt=""><span></span>
        </div>
        <div id="inputDiv"><input type="text"></div>
        <div id="mapSubmit">提交</div>
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
<div class="outModal">
    <div class="outToast">
        <div>退出本公司后，您的客户数据 将被清空，是否继续？</div>
        <div>
            <div id="outModSure">确定</div>
            <div id="outModCancle">取消</div>
        </div>
    </div>
</div>
<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="js/setting.js?v=201815081652"></script>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=3.0&amp;ak=CB2ede775afeb6e413abd40261396a69"></script>
<script type="text/javascript" src="js/identifyDetail.js?v=201815081652"></script>
<script type="text/javascript" src="js/identifyAdd.js?v=201805081652"></script>
</body>
</html>