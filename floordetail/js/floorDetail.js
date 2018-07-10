$(function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';

    function showTips(text) {
        $('.modal').fadeIn();
        $('.toast').html(text);
        setTimeout(function () {
            $('.modal').fadeOut();
        }, 1000);
    }

    function showBigImg(imgSrc) {
        $('.imgModal').fadeIn();
        $('.imgToast').html(imgSrc);
    }

    function contactToolbar(curId) {
        var top = document.getElementById(curId).getBoundingClientRect().top;
        if (top < 180 && top > 150) {
            $('#navbars>li.' + curId).addClass('active').siblings().removeClass('active');
        }
    }

    var idArr = ['commissionInfo', 'sellPoints', 'renderings', 'progress', 'declaration', 'guess'];
    $('#navbars').on('click', 'li', function () {
        $('#floorDetail').css({'top': '0'});
        $(this).addClass('active').siblings().removeClass('active');
        switch ($(this).index()) {
            case 5:
                $('#floorDetail').animate({'top': '0rem'}, 50);
                break;
            default:
                $('#floorDetail').animate({'top': '1rem'}, 50);
                break;
        }
    });
    $('#floorInfo>div:first-child').click(function () {
        $('#floorDetail').hide();
        $('#lpxq').show();
    });
    $('#lpxq').on('click', '.back', function () {
        $('#floorDetail').show();
        $('#lpxq').hide();
    });
    $('#commissionInfo>div').on('click', '.more', function () {
        if (userType == 2) {
            $('#floorDetail').hide();
            $('#commissionInfoMore').show();
        } else {
            $('.fhmModal').fadeIn();
            var consultHtml = "\n                    <div>您还没有绑定分行码</div>\n                    <div>\n                        <div class=\"cancel\">算了</div>\n                        <div class=\"call\">立即绑定</div>\n                    </div>\n                    ";
            $('.fhmToast').html(consultHtml);
            $('.cancel').on('click', function () {
                $('.fhmModal').fadeOut();
            });
            $('.call').on('click', function () {
                $(location).attr('href', '../login/login.jsp?member=1');
            });
        }
    });
    $('#commissionInfoMore').on('click', '.back', function () {
        $('#floorDetail').show();
        $('#commissionInfoMore').hide();
    });
    $('#floorInfo>.preferential').on('click', '.right', function () {
        $('#floorDetail').hide();
        $('#preferentialMore').show();
    });
    $('#preferentialMore').on('click', '.back', function () {
        $('#floorDetail').show();
        $('#preferentialMore').hide();
    });
    $('#propertyImg').on('click', '.back', function () {
        $('#floorDetail').show();
        $('#propertyImg').hide();
    });
    $(document).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop) {
            $('#swiperTitle').css('visibility', 'visible');
            $('.scrollAuto').css('visibility', 'visible');
        } else {
            $('#floorDetail').css({'top': '0'});
            $('#floorDetail>header').show();
            $('#swiperTitle').css('visibility', 'hidden');
            $('.scrollAuto').css('visibility', 'hidden');
        }
        contactToolbar(idArr[0]);
        contactToolbar(idArr[1]);
        contactToolbar(idArr[2]);
        contactToolbar(idArr[3]);
        contactToolbar(idArr[4]);
        contactToolbar(idArr[5]);
        contactToolbar(idArr[6]);
    });
    var searchArr = location.search.slice(1).split('&');
    var floorUrl = 'http://agentapi.ehaofang.net/',//'http://jjrtest.ehaofang.com/',//'http://agentapi.ehaofang.com/'
        weixinUrl = 'http://weixintest.ehaofang.com/efangnet/',//'http://weixin.ehaofang.com/efangnet/',//'http://weixintest.ehaofang.com/efangnet/'
        wxAppId = 'wx9cbe0adb2edc523f',//'wx54409552def47f3f',
        imgUrl = "http://images.ehaofang.com/",
        propertyId =searchArr[0].split('=')[1],// 1,//
        memberId =searchArr[1].split('=')[1],// 217669,//
        sign = searchArr[2].split('=')[1],//1,//
        userType = searchArr[3].split('=')[1],//"2",//
        isShangXian =searchArr[4].split('=')[1],//"1",//
        propertyName = '',
        hasConsult = true;
    if (isShangXian == 0) {
        $('#floorDetail>footer').hide();
    }
    var noDataHtml = "<div class=\"noData\">暂无更多楼盘信息</div>";
    var initImg = 'img/all_bg_wait_best@2x.png';
    var shareImgUrl = '';

    function weixin(data) {
        wx.config({
            debug: false,
            appId: wxAppId,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: ['getLocation', 'onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function () {
            wx.getLocation({
                type: 'wgs84',
                success: function (res) {
                    getFloorDetail(res);
                }
            });
        });
        wx.error(function (res) {
            console.log(res);
        });
    }

    function getDistance(itemPoint, pointOrigin) {
        var map = new BMap.Map('');
        var pointB = new BMap.Point(itemPoint.Longitude, itemPoint.Latitude);
        var distance = ~~(map.getDistance(pointOrigin, pointB));
        return distance;
    }

    PostData('post', weixinUrl + "weixin/member/demo.html", {url: window.location.href}, weixin);

    function sellState(t) {
        switch (t) {
            case 1:
                return t = "预售";
                break;
            case 2:
                return t = "待开盘";
                break;
            case 3:
                return t = "在售";
                break;
            case 4:
                return t = "撤场";
                break;
            case 5:
                return t = "售罄";
                break;
            default:
                return t = "其他";
                break;
        }
    }

    function buildingType(n) {
        var arr = n.split(",");
        var arrHtml = [];
        for (var i = 0,
                 l = arr.length; i < l; i++) {
            switch (arr[i]) {
                case "1":
                    arrHtml.push("别墅");
                    break;
                case "2":
                    arrHtml.push("住宅");
                    break;
                case "3":
                    arrHtml.push("商铺");
                    break;
                case "4":
                    arrHtml.push("商住");
                    break;
                case "5":
                    arrHtml.push("其他");
                    break;
                default:
                    break;
            }
        }
        return arrHtml.join("；");
    }

    function PostData(type, url, data, callback) {
        $.ajax({
            type: type,
            url: url,
            data: data,
            async: false,
            success: function (data) {
                callback(data);
            },
            error: function () {
                showTips('请求失败');
            }
        });
    }

    function fmtDate(obj) {
        var date = new Date(obj);
        var y = 1900 + date.getYear();
        var m = "0" + (date.getMonth() + 1);
        var d = "0" + date.getDate();
        return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
    }
    //顶部轮播图
    function floorImage() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/v1/propert/propertyImage/2',
            data: {propertyId: propertyId},
            async: false,
            success: function (data) {
                var propertyImageData = data.data;
                var effectImage = propertyImageData.effectImage.length,
                    trafficImage = propertyImageData.trafficImage.length,
                    realSceneImage = propertyImageData.realSceneImage.length,
                    sampleImage = propertyImageData.sampleImage.length;
                var all = effectImage + trafficImage + realSceneImage + sampleImage;
                var list = [];
                // $('#propertyImg .append-buttons').html('');
                if (propertyImageData.effectImage && effectImage) {
                    for (var i = 0, l = effectImage; i < l; i++) {
                        list.push("<li class='swiper-slide'><img data-src='" + propertyImageData.effectImage[i]["imageUrl"] + "' class='swiper-lazy'></li>");
                    }
                    $('#propertyImg .append-buttons').append("<span class='active effectImage'>效果图（"+effectImage+"）</span>");
                }
                if (propertyImageData.trafficImage && trafficImage) {
                    for (var i = 0, l = trafficImage; i < l; i++) {
                        list.push("<li class='swiper-slide'><img data-src='" + propertyImageData.trafficImage[i]["imageUrl"] + "' class='swiper-lazy'></li>");
                    }
                    $('#propertyImg .append-buttons').append("<span class='trafficImage'>交通图（"+trafficImage+"）</span>");
                }
                if (propertyImageData.realSceneImage && realSceneImage) {
                    for (var i = 0, l = realSceneImage; i < l; i++) {
                        list.push("<li class='swiper-slide'><img data-src='" + propertyImageData.realSceneImage[i]["imageUrl"] + "' class='swiper-lazy'></li>");
                    }
                    $('#propertyImg .append-buttons').append("<span class='realSceneImage'>实景图（"+realSceneImage+"）</span>");
                }
                if (propertyImageData.sampleImage && sampleImage) {
                    for (var i = 0, l = sampleImage; i < l; i++) {
                        list.push("<li class='swiper-slide'><img data-src='" + propertyImageData.sampleImage[i]["imageUrl"] + "' class='swiper-lazy'></li>");
                    }
                    $('#propertyImg .append-buttons').append("<span class='sampleImage'>样板图（"+sampleImage+"）</span>");
                }
                $("#propertyImg .append-buttons").on("click",'.effectImage', function () {
                    propertyImg.slideTo(0, 1000, false);
                    $(this).addClass("active").siblings().removeClass("active")
                })
                    .on("click",'.trafficImage', function () {
                    propertyImg.slideTo(effectImage, 1000, false);
                    $(this).addClass("active").siblings().removeClass("active")
                })
                    .on("click",'.realSceneImage', function () {
                    propertyImg.slideTo(trafficImage + effectImage, 1000, false);
                    $(this).addClass("active").siblings().removeClass("active")
                })
                    .on("click",'.sampleImage', function () {
                    propertyImg.slideTo(realSceneImage + effectImage + trafficImage, 1000, false);
                    $(this).addClass("active").siblings().removeClass("active");
                });
                $('#topPages p').html("楼盘相册" + all);
                $('#floorDetail .swiper-wrapper').html(list);
                $('#propertyImg .swiper-wrapper').html(list);
                var headerImg = new Swiper('.headerImg', {
                    direction: 'horizontal',
                    zoom: true,
                    lazy: {loadPrevNext: true},
                    observer: true,
                    observeParents: true
                });
                var propertyImg = new Swiper('.swiper-container_PropertyImage', {
                    direction: 'horizontal',
                    zoom: true,
                    lazy: {loadPrevNext: true},
                    observer: true,
                    observeParents: true,
                    on: {
                        slideChangeTransitionEnd: function () {
                            if (effectImage > this.activeIndex && this.activeIndex >= 0) {
                                $("#propertyImg .append-buttons .effectImage").addClass("active").siblings().removeClass("active");
                            }
                            if ((effectImage + trafficImage) > this.activeIndex && this.activeIndex >= effectImage) {
                                $("#propertyImg .append-buttons .trafficImage").addClass("active").siblings().removeClass("active")
                            }
                            if ((effectImage + trafficImage + realSceneImage) > this.activeIndex && this.activeIndex >= (effectImage + trafficImage)) {
                                $("#propertyImg .append-buttons .realSceneImage").addClass("active").siblings().removeClass("active")
                            }
                            if (this.activeIndex >= (effectImage + trafficImage + realSceneImage)) {
                                $("#propertyImg .append-buttons .sampleImage").addClass("active").siblings().removeClass("active")
                            }
                        },
                    },
                });
            },
            error: function () {
                showTips('服务器内部错误');
            }
        });
    }

    floorImage();
    $('#floorDetail .swiper-wrapper,#topPages p').on('click', function () {
        $('#propertyImg .append-buttons').html('');
        $('#floorDetail').hide();
        $('#propertyImg').show();
        floorImage();
    });
    function consult() {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/v1/propert/saleUserPhone',
            data: {propertyId: propertyId},
            async: false,
            success: function (data) {
                if (data.code == '200') {
                    var anChangTuiJian = data.data.saleUserPhone.split(':');
                    if (!anChangTuiJian[0]) {
                        anChangTuiJian[0] = '';
                        hasConsult = false;
                    }
                    if (!anChangTuiJian[1]) {
                        anChangTuiJian[1] = '';
                        hasConsult = false;
                    }
                    var consultHtml = ("\n                <div>" + (anChangTuiJian[0] + ' ' + anChangTuiJian[1]) + "</div>\n                <div>\n                    <div id=\"cancel\">取消</div>\n                    <div id=\"call\"><a href=\"tel:" + anChangTuiJian[1] + "\">呼叫</a></div>\n                </div>\n                ");
                    $('.phoneToast').html(consultHtml);
                    $('#cancel').on('click', function () {
                        $('.phoneModal').fadeOut();
                    });
                } else {
                    hasConsult = false;
                }
            },
            error: function () {
                showTips('服务器内部错误');
            }
        });
    }

    consult();
    var map = new BMap.Map("sellMap", {
        minZoom: 16,
        maxZoom: 20,
        enableMapClick: false
    });
    var sellPoint1 = 0;

    //附近周边搜索服务
    function getSquareBounds(centerPoi, r) {
        var a = Math.sqrt(2) * r; //正方形边长
        var mPoi = getMecator(centerPoi);
        var x0 = mPoi.x, y0 = mPoi.y;
        var x1 = x0 + a / 2, y1 = y0 + a / 2;//东北点
        var x2 = x0 - a / 2, y2 = y0 - a / 2;//西南点
        var ne = getPoi(new BMap.Pixel(x1, y1)), sw = getPoi(new BMap.Pixel(x2, y2));
        return new BMap.Bounds(sw, ne);
    }

    //根据球面坐标获得平面坐标。
    function getMecator(poi) {
        return map.getMapType().getProjection().lngLatToPoint(poi);
    }

    //根据平面坐标获得球面坐标。
    function getPoi(mecator) {
        return map.getMapType().getProjection().pointToLngLat(mecator);
    }

    function Search(search, mPoint) {
        map.clearOverlays();
        var circle = new BMap.Circle(mPoint, 2500, {
            stroke: "white",
            strokeWeight: 1,
            fillOpacity: 0.3,
            strokeOpacity: 0.3
        });
        map.addOverlay(circle);
        var local = new BMap.LocalSearch(map, {
            // renderOptions: {map: map, autoViewport: false}
            onSearchComplete: function (results) {
                var resultData = results.tr;
                var myIcon, typeData = [];
                switch (sellPoint1) {
                    case 1:
                        myIcon = new BMap.Icon("img/ic_bus@2x.png", new BMap.Size(60, 60));
                        break;
                    case 2:
                        myIcon = new BMap.Icon("img/ic_school@2x.png", new BMap.Size(60, 60));
                        break;
                    case 3:
                        myIcon = new BMap.Icon("img/ic_restaurant.png", new BMap.Size(60, 60));
                        break;
                    case 4:
                        myIcon = new BMap.Icon("img/ic_shop.png", new BMap.Size(60, 60));
                        break;
                    case 5:
                        myIcon = new BMap.Icon("img/ic_hospital@2x.png", new BMap.Size(60, 60));
                        break;
                    default:
                        break;
                }
                $.each(resultData, function (i) {
                    var point = new BMap.Point(resultData[i].point.lng, resultData[i].point.lat);
                    var marker = new BMap.Marker(point, {icon: myIcon});
                    map.addOverlay(marker);
                    typeData.push(resultData[i].address);
                });
                $('#typeData').html(typeData.join(';')?typeData.join(';'):'暂无');
            }
        });
        var bounds = getSquareBounds(circle.getCenter(), circle.getRadius());
        local.searchInBounds(search, bounds);
    }
    //关注列表
    $.ajax({
        type: 'get',
        url: floorUrl + 'api/v1/mine/getPropertyAttention',
        data: {
            propertyId:propertyId,//是	Long	楼盘ID
            pageNo:1,//否	int	页码(默认第1页)
            pageSize:20//否	int	页长(默认20行)
        },
        success: function (data) {
            if(data.code==200){
                var memberNum=data.data;
                if(memberNum.length>0&&memberNum.length<6){
                    var memberImg=memberNum.slice(0,5);
                    var memberImgHtml='';
                    $.each(memberImg,function (i) {
                        memberImgHtml+=`
                    <img style="width: .3rem;height: .3rem;border-radius: 50%" src="${memberImg[i].picture}"/>
                    `;
                    });
                    $('#attentionImg').html(memberImgHtml);
                    $('#attentionNum').html('…等'+memberNum.length+'位经纪人都在关注');
                }else if(memberNum.length>=6){
                    var memberImg=memberNum.slice(0,5);
                    var memberImgHtml='';
                    $.each(memberImg,function (i) {
                        memberImgHtml+=`
                    <img style="width: .3rem;height: .3rem;border-radius: 50%" src="${memberImg[i].picture}"/>
                    `;
                    });
                    $('#attentionImg').html(memberImgHtml+'<img style="width: .27rem;" src="img/ic_more@2x.png"/>');
                    $('#attentionNum').html('…等'+memberNum.length+'位经纪人都在关注');
                }else{
                    $('#attention').hide();
                }
            }else{
                showTips(data.msg||'获取关注人数出错');
            }
        },
        error:function () {
            showTips('网络出错了');
        }
    });
    function getFloorDetail(res) {
        $.ajax({
            type: 'get',
            url: floorUrl + 'api/v1/propert/propertyDeatil',
            data: {propertyId: propertyId},
            success: function (data) {
                $('#loading').hide();
                var floorDetailData = data.data.propertyDeatil;
                var propertyCommissionData = data.data.propertyCommission;
                var propertyActivityData = data.data.propertyactivityList;
                var propertyRemarkData = data.data.propertyRemark;
                var guessLikeData = data.data.guessYouLikePropertyList;
                var houseTypeListData = data.data.houseTypeList;
                if (guessLikeData.length) {
                    var guessLikeDataHtml = '';
                    $.each(guessLikeData, function (i) {
                        var thisPrice = guessLikeData[i].commissionMoney;
                        if (!guessLikeData[i].name) {
                            guessLikeData[i].name = '';
                        }
                        if (guessLikeData[i].minPrice == null) {
                            guessLikeData[i].minPrice = '';
                        }
                        if (!guessLikeData[i].cityName) {
                            guessLikeData[i].cityName = '';
                        }
                        if (!guessLikeData[i].boroughName) {
                            guessLikeData[i].boroughName = '';
                        }
                        if (thisPrice == null) {
                            thisPrice = '';
                        }
                        if (thisPrice.indexOf('%') > 0) {
                            thisPrice = thisPrice + '/套';
                        }
                        guessLikeDataHtml += ("\n                        <ul id=\"" + guessLikeData[i].id + "\" class=\"" + guessLikeData[i].isSign + "\">\n                           <li>\n                               <img class='guessImg' src=\"" + (!guessLikeData[i].imageUrl ? initImg : guessLikeData[i].imageUrl) + "\" alt=\"\"/>\n                               <p>" + guessLikeData[i].name + "</p>\n                           </li>\n                           <li>" + guessLikeData[i].minPrice + "元/㎡·" + (guessLikeData[i].cityName + guessLikeData[i].boroughName) + "</li>\n                            <li class=\"useType\"><img class='commitImg' src='img/home_ic_wage@2x.png'/>佣金:" + thisPrice + "</li>\n                        </ul>\n                        ");
                    });
                    $('#guess>.lists').html(guessLikeDataHtml);
                    if (userType != 2) {
                        $('#guess .useType').hide();
                    }
                    $('#guess>.lists').on('click', 'ul', function () {
                        propertyId = $(this).attr('id');
                        sign = $(this).attr('class');
                        PostData('post', weixinUrl + "weixin/member/demo.html", {url: window.location.href}, weixin);
                        floorImage();
                        consult();
                        $("html,body").animate({scrollTop: 0}, 500);
                    });
                } else {
                    $('#guess>.lists').html(noDataHtml);
                }
                if (propertyCommissionData.length) {
                    $('#commissionInfo .more>span').text(propertyCommissionData.length + '套方案');
                    var yjfaHtml = '',
                        yjfaMoreHtml = '';
                    var noMoreHtml = '<li><span class="line"></span><sapn>已经到底啦</sapn><span class="line"></span></li>';
                    $.each(propertyCommissionData, function (i) {
                        var thisMoney = propertyCommissionData[i].commissionMoney;
                        if (thisMoney == null) {
                            thisMoney = '';
                        }
                        if (thisMoney.indexOf('%') > 0) {
                            thisMoney = thisMoney + '/套';
                        }
                        if (!propertyCommissionData[i].commissionPlanName) {
                            propertyCommissionData[i].commissionPlanName = '';
                        }
                        yjfaHtml += ("\n                        <li>\n                            <p>" + thisMoney + "</p>\n                            <p>" + propertyCommissionData[i].commissionPlanName + "</p>\n                        </li>\n                        ");
                        yjfaMoreHtml += ("\n                        <li><span>" + propertyCommissionData[i].commissionPlanName + "</span><span>" + thisMoney + "</span></li>\n                        ");
                    });
                    if (userType == 2) {
                        $('#commissionInfo>ul').html(yjfaHtml);
                        $('#commissionInfoMore>ul').html(yjfaMoreHtml + noMoreHtml);
                    } else {
                        $('#userType').show();
                    }
                } else {
                    $('#commissionInfo>.tip').show().html('暂无数据');
                    $('#commissionInfoMore>.tip').show().html('暂无数据');
                }
                if (propertyActivityData.length) {
                    var tgxqMoreHtml = '';
                    $('#floorInfo>.preferential>.right>span').html(propertyActivityData.length + '套方案');
                    var noMoreHtml = '<li><span class="line"></span><sapn>已经到底啦</sapn><span class="line"></span></li>';
                    $.each(propertyActivityData, function (i) {
                        if (!propertyActivityData[i].activityName) {
                            propertyActivityData[i].activityName = '';
                        }
                        if (!propertyActivityData[i].activityMoney) {
                            propertyActivityData[i].activityMoney = '';
                        }
                        tgxqMoreHtml += ("\n                        <li><span>" + propertyActivityData[i].activityName + "</span><span>" + propertyActivityData[i].activityMoney + "</span></li>\n                        ");
                    });
                    $('#preferentialMore>ul').html(tgxqMoreHtml + noMoreHtml);
                } else {
                    $('#preferentialMore>.tip').show().html('暂无数据');
                }
                if (floorDetailData.length) {
                    var callback = function () {
                        $.get(url, function (data) {
                            if (data.status === 0) {
                                pointOrigin = new BMap.Point(data.result[0].x, data.result[0].y);
                                _distance = getDistance({
                                    Longitude: thisLongitude,
                                    Latitude: thisLatitude
                                }, pointOrigin);
                                if (!floorDetailData[0].address) {
                                    floorDetailData[0].address = '';
                                }
                                if (String(_distance).length > 3) {
                                    _distance = Math.round(_distance / 1000) + 'km';
                                } else {
                                    _distance = _distance + 'm';
                                }
                                var attressHtml = ("\n " +
                                    "<div class=\"left\">\n  <img src=\"img/project_ic_location_big@2x.png\" alt=\"\"><span>" + floorDetailData[0].address + "</span>\n </div>\n " +
                                    "<div class=\"right\">\n<span>" + _distance + "</span>\n  </div>\n ");
                                $('#floorInfo>.attress').html(attressHtml);
                            }
                        }, 'jsonp');
                    };
                    propertyName = floorDetailData[0].name;
                    if (!propertyName) {
                        propertyName = '';
                    }
                    if (floorDetailData[0].minArea == null) {
                        floorDetailData[0].minArea = '';
                    }
                    if (floorDetailData[0].maxArea == null) {
                        floorDetailData[0].maxArea = '';
                    }
                    var averagePrice = floorDetailData[0].minPrice;
                    if (!averagePrice) {
                        averagePrice = '暂无定价';
                    } else {
                        averagePrice = averagePrice + '元/㎡';
                    }
                    var floorInfoHtml = `
                    <p>
                        <span>${propertyName}</span>
                        <span class="floorState">${sellState(floorDetailData[0].saleState)}</span>
                        <span class="isSigned">签约项目</span>
                    </p>
                    <p class="averagePrice">均价:${averagePrice}</p>
                    <div>
                        <span>${floorDetailData[0].minArea}-${floorDetailData[0].maxArea}㎡</span>
                        <span>${buildingType(floorDetailData[0].buildType)}</span>
                    </div>
                    `;
                    $('#floorInfo .nameLeft').html(floorInfoHtml);
                    if (sign == 0) {
                        $('#floorInfo span.isSigned').hide();
                    }
                    var swiperTitleHtml = ("\n                    <div class=\"img backImg\" onclick=\"history.back()\"><img src=\"img/topbar_ic_back_black@2x.png\" alt=\"\"></div>\n                    <div>" + propertyName + "</div>\n                    <div class=\"img\"><img src=\"img/topbar_ic_share_black@2x.png\" alt=\"\"></div>\n                    ");
                    $('#swiperTitle').html(swiperTitleHtml);
                    var x = res.longitude;
                    var y = res.latitude;
                    var pointOrigin,
                        _distance;
                    var url = "http://api.map.baidu.com/geoconv/v1/?coords=" + x + "," + y + "&from=1&to=5&ak=CB2ede775afeb6e413abd40261396a69";
                    var geocoder = new BMap.Geocoder();
                    var thisLongitude = floorDetailData[0].longitude,
                        thisLatitude = floorDetailData[0].latitude;
                    if (!thisLongitude || !thisLatitude) {
                        geocoder.getPoint(floorDetailData[0].address, function (point) {
                            if (point) {
                                thisLongitude = point.lng;
                                thisLatitude = point.lat;
                                callback();
                            }
                        }, floorDetailData[0].address);
                    } else {
                        callback();
                    }
                    $('#sellPoints>div').on('click', '.more', function () {
                        $(location).attr('href', 'detailmap.jsp?address=' + floorDetailData[0].address + '&thisLongitude=' + thisLongitude + '&thisLatitude=' + thisLatitude);
                    });
                    // 楼盘卖点，附近
                    var point = new BMap.Point(thisLongitude, thisLatitude);
                    map.centerAndZoom(point, 16);
                    var marker = new BMap.Marker(point);
                    map.addOverlay(marker);
                    map.panTo(point);
                    map.enableDragging();
                    $('#sellPoints>.iconType').on('click', '.bus', function () {
                        sellPoint1 = 1;
                        Search('交通', point);
                    })
                        .on('click', '.school', function () {
                            sellPoint1 = 2;
                            Search('学校', point);
                        })
                        .on('click', '.restaurant', function () {
                            sellPoint1 = 3;
                            Search('餐饮', point);
                        })
                        .on('click', '.shop', function () {
                            sellPoint1 = 4;
                            Search('购物', point);
                        })
                        .on('click', '.hospital', function () {
                            sellPoint1 = 5;
                            Search('医院', point);
                        });
                    // var shoppingHtml = '';
                    // if (propertyRemarkData.length > 0 && propertyRemarkData[0].nearbyBusiness) {
                    //     $.each(propertyRemarkData, function(i) {
                    //         shoppingHtml += propertyRemarkData[i].nearbyBusiness + ';';
                    //     });
                    //     $('#typeData').html(shoppingHtml);
                    // } else {
                    //     $('#typeData').html('暂无');
                    // }
                    $.ajax({
                        type: "post",
                        url: weixinUrl + "weixin/member/demo.html",
                        async: true,
                        data: {url: window.location.href},
                        success: function (data) {
                            wx.config({
                                debug: false,
                                appId: wxAppId,
                                timestamp: data.timestamp,
                                nonceStr: data.noncestr,
                                signature: data.signature,
                                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                            });
                        }
                    });
                    wx.ready(function () {
                        wx.onMenuShareTimeline({
                            title: floorDetailData[0].name + ' ' + floorDetailData[0].minPrice + '元/㎡',
                            link: weixinUrl + 'pages/efshare/pro.jsp?propertyID=' + propertyId + '&memberId=' + memberId,
                            imgUrl: imgUrl + shareImgUrl,
                            success: function () {
                                console.log("分享成功");
                            },
                            cancel: function () {
                                console.log('分享失败');
                            }
                        });
                        wx.onMenuShareAppMessage({
                            title: floorDetailData[0].name + ' ' + floorDetailData[0].minPrice + '元/㎡',
                            link: weixinUrl + 'pages/efshare/pro.jsp?propertyID=' + propertyId + '&memberId=' + memberId,
                            imgUrl: imgUrl + shareImgUrl,
                            success: function () {
                                console.log("分享成功");
                            },
                            cancel: function () {
                                console.log('分享失败');
                            }
                        });
                    });
                    if (!floorDetailData[0].openTime) {
                        floorDetailData[0].openTime = '';
                    }
                    if (!floorDetailData[0].completedTime) {
                        floorDetailData[0].completedTime = '';
                    }
                    if (!floorDetailData[0].finishTime) {
                        floorDetailData[0].finishTime = '';
                    }
                    var item1Html = ("\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">开盘时间</div>\n                        <div class=\"lpxq-group_value\">" + fmtDate(floorDetailData[0].openTime) + "</div>\n                    </div>\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">竣工时间</div>\n                        <div class=\"lpxq-group_value\">" + fmtDate(floorDetailData[0].completedTime) + "</div>\n                    </div>\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">交房时间</div>\n                        <div class=\"lpxq-group_value\">" + fmtDate(floorDetailData[0].finishTime) + "</div>\n                    </div>\n                    ");
                    $('#item1').html(item1Html);
                    if (!floorDetailData[0].developers) {
                        floorDetailData[0].developers = '';
                    }
                    var item2Html = ("\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">开发商</div>\n                        <div class=\"lpxq-group_value\">" + floorDetailData[0].developers + "</div>\n                    </div>\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">物业公司</div>\n                        <div class=\"lpxq-group_value\">" + floorDetailData[0].wuyeName + "</div>\n                    </div>\n                    <div class=\"lpxq-item\">\n                        <div class=\"lpxq-group_name\">建筑类型</div>\n                        <div class=\"lpxq-group_value\">" + buildingType(floorDetailData[0].buildType) + "</div>\n                    </div>\n                    ");
                    $('#item2').html(item2Html);
                    if (floorDetailData[0].buildCount == null) {
                        floorDetailData[0].buildCount = '';
                    }
                    if (floorDetailData[0].coverArea == null) {
                        floorDetailData[0].coverArea = '';
                    }
                    if (floorDetailData[0].buildArea == null) {
                        floorDetailData[0].buildArea = '';
                    }
                    if (!floorDetailData[0].volume) {
                        floorDetailData[0].volume = '';
                    }
                    if (!floorDetailData[0].afforest) {
                        floorDetailData[0].afforest = '';
                    }
                    if (!floorDetailData[0].parkNumber) {
                        floorDetailData[0].parkNumber = '';
                    }
                    if (floorDetailData[0].managementCost == null) {
                        floorDetailData[0].managementCost = '';
                    }
                    if (!floorDetailData[0].address) {
                        floorDetailData[0].address = '';
                    }
                    var item3Html = ("\n                    <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">栋楼总数</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].buildCount + "</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">占地面积</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].coverArea + "㎡</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">建筑面积</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].buildArea + "㎡</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">容积率</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].volume + "</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">绿化率</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].afforest + "</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">停车位</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].parkNumber + "</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">物业费</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].managementCost + "</div>\n            </div>\n            <div class=\"lpxq-item\">\n                <div class=\"lpxq-group_name\">楼盘地址</div>\n                <div class=\"lpxq-group_value\">" + floorDetailData[0].address + "</div>\n            </div>\n                    ");
                    $('#item3').html(item3Html);
                }
                if (houseTypeListData.length) {
                    var zlhxHtml = '';
                    $.each(houseTypeListData, function (i) {
                        if (!houseTypeListData[i].doorModelName) {
                            houseTypeListData[i].doorModelName = '';
                        }
                        if (houseTypeListData[i].bedroom == null) {
                            houseTypeListData[i].bedroom = '';
                        }
                        if (houseTypeListData[i].hall == null) {
                            houseTypeListData[i].hall = '';
                        }
                        if (houseTypeListData[i].bathroom == null) {
                            houseTypeListData[i].bathroom = '';
                        }
                        if (houseTypeListData[i].constructionArea == null) {
                            houseTypeListData[i].constructionArea = '';
                        }
                        if (!houseTypeListData[i].houseTypeName) {
                            houseTypeListData[i].houseTypeName = '';
                        }
                        if (houseTypeListData[i].tablePrice == null) {
                            houseTypeListData[i].tablePrice = '';
                        }
                        zlhxHtml += ("\n                            <ul class=\"swiper-slide\">\n                                <li class=\"slideImg \">\n                                  <img src=\"" + (!houseTypeListData[i].imageUrl ? initImg : houseTypeListData[i].imageUrl) + "\" alt=\"\"/>\n                                  <div></div>\n                                </li>\n                                <li class=\"status\"><span>" + houseTypeListData[i].doorModelName + "</span><span>" + sellState(floorDetailData[0].saleState) + "</span></li>\n                                <li>" + houseTypeListData[i].bedroom + "室" + houseTypeListData[i].hall + "厅" + houseTypeListData[i].bathroom + "卫·" + houseTypeListData[i].constructionArea + "㎡·" + houseTypeListData[i].houseTypeName + "</li>\n                                <li>" + houseTypeListData[i].tablePrice + "万起</li>\n                            </ul>\n                            ");
                    });
                    $('#renderings>.items').html(zlhxHtml);
                    $('#renderings').on('click', '.slideImg', function () {
                        $('#swiperTitle').css('visibility', 'hidden');
                        $('.scrollAuto').css('visibility', 'hidden');
                        var bigImgSrc = $(this).children('img').attr('src');
                        showBigImg(("<img class=\"zoomImg\" src=\"" + bigImgSrc + "\" />"));
                    });
                    $('.imgModal').click(function () {
                        $(this).hide();
                    });
                } else {
                    $('#renderings>.items').html(noDataHtml);
                }
            },
            error: function () {
                showTips('请求失败');
            }
        });
    }
    // 动态
    $.ajax({
        url:floorUrl+'api/v1/mine/getAllDynamic',
        type:'get',
        data:{
            pageNo:1,//	否	int	页码(1为第1页,默认1)
            pageSize:30,//	否	int	密码(默认20)
            propertyId:propertyId//	否	Long	楼盘ID (例:propertyId=1)
        },
        success:function (data) {
            var resultData=data.data[0];
            $('#dtTotal').html('查看全部（'+data.data.length+'）');
            var resultHtml=`
            <div class="itemLeft">
                <div>${resultData.title}</div>
                <div class="name"><span>${resultData.propertyList[0].propertyName}</span><span>${resultData.updateTime}</span></div>
            </div>
            <div class="itemRight">
                <img style="width: 1rem;height: .75rem;" src="${imgUrl+resultData.mainPicture}" alt="">
            </div>
            `;
            $('#homeItem').html(resultHtml);
        },
        error:function () {
            console.log('动态列表失败');
        }
    });
    $('#activeState>.title').on('click','.more',function () {
        $(location).attr('href', '../weixin2/pages/dongtai.jsp?propertyId='+propertyId);
    });
    $('#floorDetail>footer').on('click', '.myReport', function () {
        if (userType == 2) {
            $(location).attr('href', '../customer/customer.jsp');
        } else {
            $('.fhmModal').fadeIn();
            var consultHtml = "\n                    <div>您还没有绑定分行码</div>\n                    <div>\n                        <div class=\"cancel\">算了</div>\n                        <div class=\"call\">立即绑定</div>\n                    </div>\n                    ";
            $('.fhmToast').html(consultHtml);
            $('.cancel').on('click', function () {
                $('.fhmModal').fadeOut();
            });
            $('.call').on('click', function () {
                $(location).attr('href', '../login/login.jsp?member=1');
            });
        }
    }).on('click', '.poster', function () {
        showTips('暂未开放此功能');
    }).on('click', '.consult', function () {
        if (hasConsult) {
            $('.phoneModal').fadeIn();
        } else {
            $('.phoneModal').fadeOut();
            showTips('无相关信息');
        }
    });
    $('#report').on('click', function () {
        if (userType == 2) {
            $(location).attr('href', "../weixin2/pages/add-reserve-client.jsp?" + propertyId + "$" + encodeURI(propertyName));
        } else {
            $('.fhmModal').fadeIn();
            var consultHtml = "\n                    <div>您还没有绑定分行码</div>\n                    <div>\n                        <div class=\"cancel\">算了</div>\n                        <div class=\"call\">立即绑定</div>\n                    </div>\n                    ";
            $('.fhmToast').html(consultHtml);
            $('.cancel').on('click', function () {
                $('.fhmModal').fadeOut();
            });
            $('.call').on('click', function () {
                $(location).attr('href', '../login/login.jsp?member=1');
            });
        }
    });
});