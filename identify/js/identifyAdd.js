$(function () {
    var thisAgencyName='',//	是	string	公司名
        thisAddressDetail='',//	是	string	详细地址
        thisFullName='',//	是	string	负责人名
        thisTelephone='',//	是	string	负责人电话
        thisCityName='',//	是	string	城市名
        thisAreaName='',//	是	string	区域名
        thisInfoId,
        thisMemberId=localStorage.getItem('memberID'),//	是	string	经纪人id
        thisYyzlUrl='',//	是	string	营业执照url
        thisBusinessNames='',
        thisLongitude='121.351868',//	是	Double	经度
        thisLatitude='31.228855';//	是	Double	纬度
    var phoneReg = /(\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/;
    var imgUrlArr=[],imgNames=[];
    //修改按钮
    $('#modifyBtn').click(function () {
        if(localStorage.getItem('urlData')){
            imgUrlArr=localStorage.getItem('urlData').split(',');//图片
        }
        if(localStorage.getItem('imgNames')){
            imgNames=localStorage.getItem('imgNames').split(',');//图片名
        }
        thisInfoId=localStorage.getItem('infoId');//信息id
        thisCityName=localStorage.getItem('cityName');//城市
        thisAreaName=localStorage.getItem('boroughName');//区域
    });
    //返回按钮
    $('#addPage>header').on('click','.backImg',function () {
        history.back();
    });
    $('#mapPage>header').on('click','.backImg',function () {
        $('#addPage').show();
        $('#mapPage').hide();
    });
    //公司名验重
    var isRepeatName=false;
    $('#companyName').blur(function () {
        var companyName=$(this).val();
        $.ajax({
            type:'get',
            url:initUrl+'api/v1/isAccredit/isRepetition',
            data:{
                companyName:companyName//	是	string	公司名
            },
            async: false,
            success:function (data) {
                if(data.code=='200'&&data.data=='0'){
                    isRepeatName=true;
                    showTips('您提交的公司信息已存在！');
                }else{
                    isRepeatName=false;
                }
            },
            error:function () {
                showTips('网络错误');
            }
        });
    });
    //定位
    $('#getAttr').click(function () {
        $('#addPage').hide();
        $('#mapPage').show();
        // $('#inputDiv>input').focus();
        var map = new BMap.Map("attrMap", {
            minZoom: 7,
            maxZoom: 19
        });
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                thisLongitude=r.point.lng;
                thisLatitude=r.point.lat;
            }
            else {
                //showTips('failed'+this.getStatus());
            }
        });
        var point = new BMap.Point(thisLongitude, thisLatitude);

        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs) {
            var addComp = rs.addressComponents;
            thisCityName = addComp.city;
            thisAreaName = addComp.district;
            $('#imgDiv>span').html(addComp.province + addComp.city + addComp.district);
            $('#inputDiv>input').val(addComp.street + addComp.streetNumber);
        });
        map.centerAndZoom(point, 10);
        map.enableDragging();
        var myIcon = new BMap.Icon("img/curPosition.png", new BMap.Size(22, 35));
        var marker = new BMap.Marker(point, {icon: myIcon});
        map.addOverlay(marker);
        marker.enableDragging();
        map.panTo(point);
        marker.addEventListener("dragend", function(e) {
            map.panTo(new BMap.Point(e.point.lng, e.point.lat));
            new BMap.Geocoder().getLocation(new BMap.Point(e.point.lng, e.point.lat), function(rs) {
                var addComp = rs.addressComponents;
                // thisLongitude=rs.point.lng;
                // thisLatitude=rs.point.lat;
                thisCityName=addComp.city;
                thisAreaName=addComp.district;
                $('#imgDiv>span').html(addComp.province + addComp.city + addComp.district);
                $('#inputDiv>input').val(addComp.street + addComp.streetNumber);
            });
        });
    });
    //提交地址
    $('#mapSubmit').click(function () {
        $('#companyAttr').val($('#imgDiv>span').html()+$('#inputDiv>input').val());
        $('#addPage').show();
        $('#mapPage').hide();
    });
    //上传执照
    $('#upLoad').on('click','.upLoadImg',function () {
        if(imgUrlArr.length>=9){
            showTips('最多可以上传9张');
        }else{
            $('#btn-file').click();
        }
    });
    $('#btn-file').on('change',function(e) {
        // $('.loading').show();
        // $('.upLoadImg').css('opacity',0);
        var files=this.files[0];
        // if(!files){
        //     $('.loading').hide();
        //     $('.upLoadImg').css('opacity',1);
        //     return;
        // }
        var formData = new FormData();
        if (files.size > 5 * 1024 * 1024) {
            showTips("单个文件大小不可超过5M");
            // $('.loading').hide();
            // $('.upLoadImg').css('opacity',1);
        }else{
            formData.append('files', files);
        }
        setTimeout(function () {
            $.ajax({
                url: 'http://www.ehaofang.com:8888/publicshow/qiniuUtil/fileToQiniu',
                type: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                cache: false,
                async: false,
                success: function(data) {
                    if (data.statas == 'true') {
                        // $('.loading').hide();
                        // $('.upLoadImg').css('opacity',1);
                        showTips(data.message);
                        imgUrlArr.push(data.pathUrls);
                        imgNames.push(data.fileNames);
                        var codeHtml=`
                        <div>
                            <img src="${imgUrl+data.pathUrls}" alt="${data.fileNames}">
                            <img class="closeImg scale" src="img/close.png" alt="">
                        </div>
                        `;
                        $('#upLoad>span').after(codeHtml);
                    } else if (data.statas == 'false') {
                        showTips(data.message||'图片上传失败');
                    }
                },
                error: function(jqXHR) {
                    console.log(JSON.stringify(jqXHR));
                }
            });
        },0);
    });
    //删除营业执照
    $('#upLoad').on('click','div>.closeImg',function (e) {
        $(e.target).parent().remove();
        imgUrlArr.remove($(e.target).prev().attr('src').slice(27));
        imgNames.remove($(e.target).prev().attr('alt'));
    });
    //新增认证公司
    $('#submitBtn').click(function () {
        thisAgencyName=$('#companyName').val();
        thisFullName=$('#userName').val();
        thisTelephone=$('#userPhone').val();
        thisAddressDetail=$('#companyAttr').val();
        thisYyzlUrl=imgUrlArr.join(',');
        thisBusinessNames=imgNames.join(',');
        if(thisAgencyName==''){
            showTips('公司全称不能为空');
            return;
        }
        if(thisAddressDetail==''){
            showTips('公司地址不能为空');
            return;
        }
        if(thisFullName==''){
            showTips('负责人姓名不能为空');
            return;
        }
        if (!phoneReg.test(thisTelephone)) {
            showTips('负责人电话不合法');
            return;
        }
        if(isRepeatName){
            showTips('公司名已存在，请修改');
            return;
        }
        if(imgUrlArr.length==0){
            showTips('请上传营业执照');
            return;
        }
        if(imgNames.length==0){
            showTips('请上传营业执照');
            return;
        }

        if($(this).hasClass('submitModify')){
            $.ajax({
                type:'post',
                url:initUrl+'api/v1/isAccredit/update',
                data:{
                    companyName:thisAgencyName,//	是	string	新公司名
                    address:thisAddressDetail,//		是	string	详细地址
                    businessEntity:thisFullName,//		是	string	负责人名
                    businessEntityPhone:thisTelephone,//		是	string	负责人电话
                    cityName:thisCityName,//		是	string	城市名
                    boroughName:thisAreaName,//		是	string	区域名
                    id:thisInfoId,//	是	int	信息id
                    memberId:thisMemberId,//		是	string	经纪人id
                    businessUrls	:thisYyzlUrl,//是		string	营业执照url
                    businessNames:thisBusinessNames//	是	String	营业执照图名(多个用英文逗号隔开)
                },
                success:function (data) {
                    if(data.code=='200'){
                        showTips('修改成功');
                        setTimeout(function () {
                            $(location).attr('href','../weixin2/pages/index.jsp');//跳转楼盘首页
                        },1000);
                    }else{
                        showTips(data.msg||'修改失败');
                    }
                },
                error:function () {
                    showTips('服务器内部错误');
                }
            });
        }else{
            if(thisCityName==''){
                showTips('城市名不能为空，请在地图页获取');
                return;
            }
            if(thisAreaName==''){
                showTips('区域名不能为空，请在地图页获取');
                return;
            }
            $.ajax({
                type:'post',
                url:initUrl+'api/v1/isAccredit/create',
                data:{
                    companyName:thisAgencyName,//	是	string	公司名
                    address:thisAddressDetail,//		是	string	详细地址
                    businessEntity:thisFullName,//		是	string	负责人名
                    businessEntityPhone:thisTelephone,//		是	string	负责人电话
                    cityName:thisCityName,//		是	string	城市名
                    boroughName:thisAreaName,//		是	string	区域名
                    memberId:thisMemberId,//		是	string	经纪人id
                    businessUrls	:thisYyzlUrl,//是		string	营业执照url
                    businessNames:thisBusinessNames//	是	String	营业执照图名(多个用英文逗号隔开)
                },
                success:function (data) {
                    if(data.code=='200'){
                        showTips('提交成功！您可以在个人中心中查看审核结果哦！');
                        setTimeout(function () {
                            $(location).attr('href','../weixin2/pages/index.jsp');//跳转楼盘首页
                        },1000);
                    }else{
                        showTips(data.msg||'添加失败');
                    }
                },
                error:function () {
                    showTips('网络错误');
                }
            });
        }
    });
});