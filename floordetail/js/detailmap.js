$(function() {
    var searchArr = location.search.slice(1).split('&');
    var address = decodeURIComponent(searchArr[0].split('=')[1]);//'上海北翟路协和路';//
    var thisLongitude =searchArr[1].split('=')[1];//121.351868;//
    var thisLatitude =searchArr[2].split('=')[1];// 31.228855;//
    var search = '';
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    $('header').on('click', '.backImg', function() {
        history.back();
    });
    var map = new BMap.Map("attrMap", {
        minZoom: 7,
        maxZoom: 20,
        enableMapClick: false
    });
    var geocoder = new BMap.Geocoder();
    if (thisLongitude == 'null' || thisLatitude == 'null') {
        geocoder.getPoint(address, function(point) {
            if (point) {
                thisLongitude = point.lng;
                thisLatitude = point.lat;
                callback();
            }
        }, address);
    } else {
        callback();
    }
    function callback() {
        var point = new BMap.Point(thisLongitude, thisLatitude);
        map.centerAndZoom(point, 16);
        var myIcon = new BMap.Icon("img/home_ic_map_red.png", new BMap.Size(22, 35));
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
        map.panTo(point);
        map.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_ZOOM
        }));
        var scaleCtrl = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            offset: new BMap.Size(10, 10)
        });
        map.addControl(scaleCtrl);
        map.enableDragging();
        function getSquareBounds(centerPoi, r) {
            var a = Math.sqrt(2) * r;
            var mPoi = getMecator(centerPoi);
            var x0 = mPoi.x,
                y0 = mPoi.y;
            var x1 = x0 + a / 2,
                y1 = y0 + a / 2;
            var x2 = x0 - a / 2,
                y2 = y0 - a / 2;
            var ne = getPoi(new BMap.Pixel(x1, y1)),
                sw = getPoi(new BMap.Pixel(x2, y2));
            return new BMap.Bounds(sw, ne);
        }
        function getMecator(poi) {
            return map.getMapType().getProjection().lngLatToPoint(poi);
        }
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
                renderOptions: {
                    map: map,
                    autoViewport: false
                },
                onSearchComplete : function(results) {
                    // var totalResults = results.getNumPois();
                    // var totalPages = results.getNumPages();
                    // var currPage = results.getPageIndex();// 获取当前是第几页数据
                    //console.log(results);
                    // var resultData=results.tr;
                    // $.each(resultData,function (i) {
                    //     var point = new BMap.Point(resultData[i].point.lng, resultData[i].point.lat);
                    //     var myIcon = new BMap.Icon("img/ic_bus@2x.png", new BMap.Size(60, 60));
                    //     var marker = new BMap.Marker(point, {icon: myIcon});
                    //     map.addOverlay(marker);
                    //
                    // });
                }
                // ,pageCapacity : 50
            });
            var bounds = getSquareBounds(circle.getCenter(), circle.getRadius());
            local.searchInBounds(search, bounds);
            // console.log(local.searchNearby('景点', pp, 2000));
            map.addOverlay(marker);
        }
        $('footer').on('click', '.traffic', function() {
            $(this).addClass('pActive').siblings().removeClass('pActive');
            search = '交通';
            Search(search, point);
        }).on('click', '.educate', function() {
            $(this).addClass('pActive').siblings().removeClass('pActive');
            search = '学校';
            Search(search, point);
        }).on('click', '.restaurant', function() {
            $(this).addClass('pActive').siblings().removeClass('pActive');
            search = '餐饮';
            Search(search, point);
        }).on('click', '.shopping', function() {
            $(this).addClass('pActive').siblings().removeClass('pActive');
            search = '购物';
            Search(search, point);
        }).on('click', '.medical', function() {
            $(this).addClass('pActive').siblings().removeClass('pActive');
            search = '医院';
            Search(search, point);
        });
    }
});
