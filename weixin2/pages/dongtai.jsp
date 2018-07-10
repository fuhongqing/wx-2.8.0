<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="description" content="">
		<meta name="keywords" content="">
		<meta name="author" content="">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">		
		<title>楼盘动态</title>
		<link rel="stylesheet" type="text/css" href="../css/common.css?v=2017690511"/>
		<link rel="stylesheet" type="text/css" href="../css/details.css?v=2017290511"/>
		<style type="text/css">
			body,html{background:#fff;    padding-top: 1.2rem;    padding-bottom: 2.56rem;}
			.buildNews1 dl{ padding:.8rem;border-bottom: 1px solid #eee;position: relative;}
			
			.buildNews1 dl dt img{width:100%;}
			.buildNews1 dl dt{overflow:hidden;height:4rem;width:4.5rem;margin-left: 10px;}
			.buildNews1 dl dd:nth-child(2){font-size: 16px;color:#333;font-weight:600;height: 75px;overflow: hidden;}
			.buildNews1 dl dd:nth-child(3){color:#ACACAC;font-size: 12px;width:10rem;}
			.buildNews1 dl dd span{float: right;}
		</style>
	</head>
	<body>
		<div class="top" onclick="history.back()">
			<img src="../img/top_back.png" alt="">
			<span>楼盘动态</span>
		</div>

		<li class="buildNews1 clearfix">

		</li>
		<ul id="footer-item">
			<li>
				<p><img src="../img/tabbar_ic_mine_dis@2x.png" alt=""></p>
				<p>项目</p>
			</li>
			<li>
				<p><img src="../img/tabbar_ic_client_dis@2x.png" alt=""></p>
				<p>客户</p>
			</li>
			<li style="height: 2.56rem;">
				<img style="width:2.56rem;margin-top: .02rem;" src="../img/add-client.png" alt="">
			</li>
			<li>
				<p><img src="../img/tabbar_ic_trend_s@2x.png" alt=""></p>
				<p style="color: #42C29D">动态</p>
			</li>
			<li>
				<p><img src="../img/myself_n.png" alt=""></p>
				<p>我的</p>
			</li>
		</ul>

		<script src="../js/jquery.min.js" type="text/javascript" ></script>
		<script src="../js/rem.js?v=201814291356" type="text/javascript" ></script>
		<script src="../js/fastclick.js" type="text/javascript"></script>
		<script src="../js/dongtai.js?v=201844291356" type="text/javascript"></script>
		<%@ include file="trafficStatistic.jsp"%>
		
	</body>
</html>
