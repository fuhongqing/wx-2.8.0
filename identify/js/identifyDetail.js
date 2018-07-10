$(function () {
    var searchArr=location.search.slice(1).split('&');
    var identyInfoId=searchArr[0].split('=')[1];//认证id  1
    var identifyState=searchArr[1].split('=')[1];//1;  1审核中 2驳回 3通过
    var userType=localStorage.getItem('userType');
    var memberId=localStorage.getItem('memberID');//69;//
    //点击图片，显示大图
    function showBigImg(imgSrc) {
        $('.imgModal').fadeIn();
        $('.imgToast').html(imgSrc);
    }
    //获取详情
    if(userType==2){
        $.get(initUrl+'api/v1/mine/myCompanyInfo/'+memberId,function (data) {
            if(data.code=='200'){
                $('.step1').hide();
                $('#detailPage>section>.waitSignImg').hide();
                $('#detailPage>section>.passSignImg').show();
                var detailData=data.data;
                var urlData=[];
                if(detailData.images){
                    urlData=detailData.images.split(',');
                }
                var licenceHtml='';
                var detailHtml=`
                <li><span class="key">公司全称:</span><span>${detailData.companyName}</span></li>
                <li><span class="key">公司办公地址:</span><span>${detailData.address}</span></li>
                <li><span class="key">公司负责人:</span><span>${detailData.businessEntity}</span></li>
                <li><span class="key">负责人电话:</span><span>${detailData.businessEntityPhone}</span></li>
               `;
                $('#detailUl').html(detailHtml);
                //营业执照
                if(detailData.images!=''){
                    $.each(urlData,function (i) {
                        licenceHtml+=`
                            <div>
                                <img src="${imgUrl+urlData[i]}" alt="">
                                <div class="modalImg"></div>
                            </div>
                           `;
                    });
                    $('#licenceLi>span').after(licenceHtml);
                }
            }else{
                showTips(data.msg||'获取详情失败');
            }
        });
    }else{
        $.ajax({
            type:'get',
            url:initUrl+'api/v1/isAccredit/load',
            async:false,
            data:{
                id:identyInfoId//	是	int	用户名
            },
            success:function (data) {
                if(data.code=='200'){
                    var detailData=data.data;
                    var urlData=[];
                    if(detailData.businessUrls){
                        urlData=detailData.businessUrls.split(',');
                    }
                    var imgNames=[];
                    if(detailData.businessNames){
                        imgNames=detailData.businessNames.split(',');
                    }
                    var licenceHtml='',modifyCodeHtml='';
                    //修改页面内容初始化
                    $('#companyName').val(detailData.companyName);
                    $('#companyAttr').val(detailData.address);
                    $('#userName').val(detailData.businessEntity);
                    $('#userPhone').val(detailData.businessEntityPhone);
                    var detailHtml=`
                <li><span class="key">公司全称:</span><span>${detailData.companyName}</span></li>
                <li><span class="key">公司办公地址:</span><span>${detailData.address}</span></li>
                <li><span class="key">公司负责人:</span><span>${detailData.businessEntity}</span></li>
                <li><span class="key">负责人电话:</span><span>${detailData.businessEntityPhone}</span></li>
               `;
                    $('#detailUl').html(detailHtml);
                    localStorage.setItem('cityName',detailData.cityName);//城市名
                    localStorage.setItem('infoId',detailData.id);//信息id
                    localStorage.setItem('boroughName',detailData.boroughName);//区域名
                    // localStorage.setItem('cityId',detailData.cityId);//城市
                    // localStorage.setItem('oldAgentName',detailData.agencyName);//代理公司名
                    // localStorage.setItem('boroughId',detailData.boroughId);//区域
                    // localStorage.setItem('thisLongitude',detailData.longitude);//经度
                    // localStorage.setItem('thisLatitude',detailData.latitude);//维度
                    //营业执照
                    if(detailData.businessUrls!=''){
                        localStorage.setItem('urlData',urlData);
                        localStorage.setItem('imgNames',imgNames);
                        $.each(urlData,function (i) {
                            licenceHtml+=`
                            <div>
                                <img src="${imgUrl+urlData[i]}" alt="${imgNames[i]}">
                                <div class="modalImg"></div>
                            </div>
                           `;
                            modifyCodeHtml+=`
                        <div>
                            <img src="${imgUrl+urlData[i]}" alt="${imgNames[i]}">
                            <img class="closeImg scale" src="img/close.png" alt="">
                        </div>
                        `;
                        });
                        $('#licenceLi>span').after(licenceHtml);
                        $('#upLoad>span').after(modifyCodeHtml);
                    }
                    //审核流程展示
                    $('#submitTime').html(detailData.createTime);
                    if(identifyState==2){
                        var identifyHtml=`
                    <span>${detailData.examineTime}</span><span class="point"></span><span class="rejectSpan">驳回</span><img src="img/reject.png" alt="">
                    <div class="rejectModal">${detailData.remark}<span class="caret"></span><span class="caret caretOut"></span></div>        
                    `;
                        $('#detailPage>section>.rejectDiv').show().html(identifyHtml);
                        $('#detailPage>footer').show();
                        $('#detailPage>section>.waitSignImg').hide();
                        $('#detailPage>section>.rejectSignImg').show();
                        $('#detailPage>section>.line').show();
                    }else if(identifyState==3){
                        var identifyHtml=`
                        <span>${detailData.examineTime}</span><span class="point"></span><span class="passSpan">通过</span><img src="img/pass.png" alt="">
                    `;
                        $('#detailPage>section>.rejectDiv').show().html(identifyHtml);
                        $('#detailPage>section>.waitSignImg').hide();
                        $('#detailPage>section>.passSignImg').show();
                        $('#detailPage>section>.line').show();
                    }
                }else{
                    showTips(data.msg||'获取详情失败');
                }
            },
            error:function () {
                showTips('网络错误');
            }
        });
    }
    //图片放大
    $('#licenceLi').on('click','.modalImg',function (e) {
        e.stopPropagation();
        var bigImgSrc=$(e.target).prev().attr('src');
        showBigImg(`<img src="${bigImgSrc}" />`);
    });
    //点击非目标区域，弹框隐藏
    $(document).click(function(e){
        var _con=$('.modalImg');//设置点击，展示目标区域
        if(!_con.is(e.target)&&_con.has(e.target).length==0){
            $('.imgModal').hide();
        }
    });
    //返回按钮
    $('#detailPage>header').on('click','.backImg',function () {
        history.back();
    });
    //修改按钮
    $('#modifyBtn').click(function () {
        $('#detailPage').hide();
        $('#modifyPage').show();
    });
    //修改页面返回按钮
    $('#modifyPage>header').on('click','.backImg',function () {
        $('#detailPage').show();
        $('#modifyPage').hide();
    });
    $('#getAttr').click(function () {
        $('#modifyPage').hide();
    });
    $('#mapPage>header').on('click','.backImg',function () {
        $('#modifyPage').show();
    });
    $('#mapSubmit').click(function () {
        $('#companyAttr').val($('#imgDiv>span').html()+$('#inputDiv>input').val());
        $('#modifyPage').show();
    });
});