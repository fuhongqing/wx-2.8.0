$(function () {
    var searchArr = location.search.slice(1).split('=')[1];
    var paramsData=searchArr.split(';');
    var customerId=paramsData[0];//929426;//
    var customerState=paramsData[1];//5;//
    var transactionNumber=paramsData[2];//'A201807023258';//

    $('#editeFollow').on('click',function () {
        $('#edit').val('');
        $('#cusDetailPage').hide();
        $('#followEditePage').show();
    });
    $('#cusDetailPage>header').on('click','.back',function () {
        history.back();
    });
    $('#followEditePage>header').on('click','.back',function () {
        $('#cusDetailPage').show();
        $('#followEditePage').hide();
    });
    $('#progress>.contacts').on('click',function () {
        $('#cusDetailPage').hide();
        $('#customAnaPage').show();
    });
    $('#customAnaPage>header').on('click','.back',function () {
        $('#cusDetailPage').show();
        $('#customAnaPage').hide();
    });
    switch (customerState){
        case '2':
            $('#reportCard').hide();
            $('#visitedCard,.secPro').show();
            break;
        case '3':
            $('#reportCard').hide();
            $('#dealCard,.dealPro').show();
            break;
        case '4':
            $('#reportCard').hide();
            $('#signCard,.signPro').show();
            break;
        case '5':
            $('#reportCard').hide();
            $('#commissionCard').show();
            $('#cusDetailPage .commissionPro').show();
            break;
        case '6':
            $('#reportCard').hide();
            $('#commissionCard').show();
            $('#cusDetailPage .commissionPro').show();
            break;
        default:
            break;
    }
    function dadingState(t){
        switch (t){
            case 2:
                return t='通过';
                break;
            default:
                return t='审核中';
                break;
        }
    }
    function signState(t){
        switch (t){
            case 4:
                return t='通过';
                break;
            default:
                return t='审核中';
                break;
        }
    }
    //详情
    $.ajax({
        url:rootURL+'api/v1/customer',
        type:'GET',
        async:false,
        data:{
            customerState:customerState,//	是	Integer	customerState(列表给出)
            customerId:customerId,//	是	Long	customerId(列表给出)
            transactionNumber:transactionNumber//	否	String	transactionNumber(列表给出)
        },
        success:function (data) {
            if(data.code==200){
                var signInfoData=data.data.signInfo;//签约信息
                var analyseListData=data.data.analyseList;//分析字段列表
                var customerListData=data.data.customerList;//客户列表
                var reportInfoData=data.data.reportInfo;//报备信息
                var commonInfoData=data.data.commonInfo;//报备、来访、大定、签约、佣金公共信息
                var visitInfoData=data.data.visitInfo;//来访信息
                var dadingInfoData=data.data.dadingInfo;//大定信息
                var commissionInfoData=data.data.commissionInfo;//申佣信息
                var commissionChecksData=data.data.commissionChecks;//申佣审批记录
                var contactHtml=`<a href="tel:${commonInfoData[0].saleUserPhone?commonInfoData[0].saleUserPhone:''}">联系案场</a>`;
                $('#contactCase').html(contactHtml);
                if(!commonInfoData[0].saleUserPhone){
                    $('#contactCase').on('click',function () {
                        showTips('无相关信息');
                    });
                }
                $('#propertyNum').html(commonInfoData[0].propertyName+' '+commonInfoData[0].buildingName+'-'+commonInfoData[0].unitName+'-'+commonInfoData[0].roomNumber);
                //客户分析
                var customAnaHtml='';
                $.each(analyseListData,function (i) {
                    customAnaHtml+=`
                    <div>
                        <div class="label">${analyseListData[i].keyName}</div>
                        <div>${analyseListData[i].keyValue}</div>
                    </div>
                    `;
                });
                $('#customAnaPage>section').html(customAnaHtml);
                //客户列表
                var customerListHtml='';
                $.each(customerListData,function (i) {
                    customerListHtml+=`
                    <div class="item">
                        <div><span class="name">${customerListData[i].customerName}</span><span class="phone">${customerListData[i].customerPhone}</span><img src="img/ic_phone@2x.png" alt=""></div>
                        <div class="propertyName">${commonInfoData[0].propertyName}</div>
                    </div>
                    `;
                });
                $('#progress>.contacts').html(customerListHtml);
                $('#progress>.contacts>div:last-child>.propertyName').html('客户详情').css('font-size','14px');
                //报备信息
                if(reportInfoData){
                    var reportInfoHtml=`
                    <div class="circle" style="background: #00CBAC"></div>
                    <div>
                        <div><span style="color: #02BD9C;margin-right: .1rem">报备</span></div>
                        <div class="progressTime">${reportInfoData[0].reportTime}</div>
                    </div>
                    <div>
                        <div>预约案场：${reportInfoData[0].saleUserName}</div>
                        <div>${reportInfoData[0].visitType}</div>
                    </div>
                    <div>
                        <div>来访：${reportInfoData[0].visitorsNumber}人</div>
                    </div>
                    <div>
                        <div>备注：${reportInfoData[0].remark}</div>
                    </div>
                `;
                    $('#reportCard').html(reportInfoHtml);
                    var reportSecHtml=`
                <div><span class="label">报备时间</span><span>${reportInfoData[0].reportTime}</span></div>
                <div><span class="label">预计来访</span><span>${reportInfoData[0].visitTime}</span></div>
                <div><span class="label">来访人数</span><span>${reportInfoData[0].visitorsNumber}</span></div>
                <div><span class="label">来访方式</span><span>${reportInfoData[0].visitType}</span></div>
                <div><span class="label">预约案场</span><span>${reportInfoData[0].saleUserName}</span></div>
                <div><span class="label">备注</span><span class="remark">${reportInfoData[0].remark}</span></div>
                `;
                    $('#reportSec').html(reportSecHtml);
                }

                //来访
                if(visitInfoData){
                    var visitNum=visitInfoData.length;
                    var visitNumHtml='';
                    var visitInfoHtml=`
                <span class="circle"></span>
                <span class="line"></span>
                <div>
                    <div><span style="color: #666666">${visitNum}访</span></div>
                    <div class="progressTime">${visitInfoData[0].realVisitTime}</div>
                </div>
                <div>
                    <div>案场：${visitInfoData[0].saleUserName}</div>
                    <div>落位：${visitInfoData[0].isSitDown}</div>
                </div>
                <div>
                    <div>来访：${visitInfoData[0].visitorsNumber}人</div>
                </div>
                <div>
                    <div>备注：${visitInfoData[0].remark}</div>
                </div>
                `;
                    $('#visitedCard').html(visitInfoHtml);
                    function visit(t) {
                        var imgArr=[],imgHtml='';
                        if(!visitInfoData[t].imageUrl){
                            imgArr=visitInfoData[t].imageUrl.split(',');
                        }
                        $.each(imgArr,function (i) {
                            imgHtml+=`
                            <img class="zoomImg" style="width:.8rem;height: .8rem;margin-right: .1rem" src="${imgArr[i]}" alt="">
                            `;
                        });
                        var visitedSecHtml=`
                        <div><span class="label">来访时间</span><span>${visitInfoData[t].realVisitTime}</span></div>
                        <div><span class="label">案场接待</span><span>${visitInfoData[t].saleUserName}</span></div>
                        <div><span class="label">来访人数</span><span>${visitInfoData[t].visitorsNumber}</span></div>
                        <div><span class="label">价格预算</span><span>${visitInfoData[t].offerPrice}万元</span></div>
                        <div><span class="label">落座</span><span>${visitInfoData[t].isSitDown}</span></div>
                        <div><span class="label">落位</span><span>${visitInfoData[t].isEngoyHouse}</span></div>
                        <div><span class="label">下次来访</span><span>${visitInfoData[t].nextComeTime}</span></div>
                        <div><span class="label">备注</span><span class="remark">${visitInfoData[t].remark}</span></div>
                        <div id="hasUrl"><span class="label">带看单</span>${imgHtml}</div>
                        `;
                        $('#visitedSec').html(visitedSecHtml);
                        if(!visitInfoData[t].imageUrl){
                            $('#hasUrl').hide();
                        }
                    }
                    visit(visitNum-1);

                    //发佣，签约来访
                    var afterDealHtml='',afterSignHtml='',beforeDaDingHtml='';
                    for(var i=visitNum;i>0;i--){
                        afterDealHtml+=`
                        <div class="visitDetail afterDeal">
                            <div class="relativeDiv">
                                <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;margin-right: .1rem">${i}访</span><img style="width: .16rem;" src="img/clients_ic_attachment@2x.png" alt="">
                            </div>
                            <div class="progressTime">${visitInfoData[i-1].realVisitTime}</div>
                        </div>
                        `;
                        afterSignHtml+=`
                        <div class="visitDetail afterSign">
                            <div class="relativeDiv">
                                <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;margin-right: .1rem">${i}访</span><img style="width: .16rem;" src="img/clients_ic_attachment@2x.png" alt="">
                            </div>
                            <div class="progressTime">${visitInfoData[i-1].realVisitTime}</div>
                        </div>
                        `;
                        beforeDaDingHtml+=`
                        <div class="visitDetail beforeDaDing">
                            <div class="relativeDiv">
                                <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;margin-right: .1rem">${i}访</span><img style="width: .16rem;" src="img/clients_ic_attachment@2x.png" alt="">
                            </div>
                            <div class="progressTime">${visitInfoData[i-1].realVisitTime}</div>
                        </div>
                        `;
                    }
                    $('#afterDealPro').after(afterDealHtml);
                    $('#afterSign').after(afterSignHtml);
                    $('#beforeDaDing').before(beforeDaDingHtml);
                    //发佣
                    $('.afterDeal').on('click',function () {
                        var thisIndex=visitNum+2-$(this).index();
                        $('#proDetailPage>header>h2').html('来访详情');
                        $('#proDetailPage>h2').text(thisIndex+'访').css('color','#2EA9FF');
                        $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#visitedSec,#proDetailPage').show();
                        visit(thisIndex-1);
                    });
                    //签约
                    $('.afterSign').on('click',function () {
                        var thisIndex=visitNum+1-$(this).index();
                        $('#proDetailPage>header>h2').html('来访详情');
                        $('#proDetailPage>h2').text(thisIndex+'访').css('color','#2EA9FF');
                        $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#visitedSec,#proDetailPage').show();
                        visit(thisIndex-1);
                    });
                    //大定
                    $('.beforeDaDing').on('click',function () {
                        var thisIndex=visitNum-$(this).index();
                        $('#proDetailPage>header>h2').html('来访详情');
                        $('#proDetailPage>h2').text(thisIndex+'访').css('color','#2EA9FF');
                        $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#visitedSec,#proDetailPage').show();
                        visit(thisIndex-1);
                    });
                    for(var i=visitNum-1;i>0;i--){
                        visitNumHtml+=`
                     <div class="visitForList">
                        <div class="relativeDiv">
                            <span  class="circle"></span><span class="line"></span><span style="color: #02BD9C;font-size: 16px;margin-right: .1rem">${i}访</span><img style="width: .16rem;" src="img/clients_ic_attachment@2x.png" alt="">
                        </div>
                        <div class="progressTime">${visitInfoData[i].realVisitTime}</div>
                     </div>                   
                    `;
                    }
                    var visitProHtml=`
                   ${visitNumHtml}               
                    <div class="forRepDetail">
                        <div class="relativeDiv">
                            <span class="circle"></span><span style="color: #02BD9C;font-size: 16px">报备</span>
                        </div>
                        <div class="progressTime">${reportInfoData[0].reportTime}</div>
                    </div>
                `;
                    $('.secPro').html(visitProHtml);
                    $('.visitForList').on('click',function () {
                        var thisIndex=visitNum-2-$(this).index();
                        $('#proDetailPage>header>h2').html('来访详情');
                        $('#proDetailPage>h2').html(thisIndex+1+'访').css('color','#2EA9FF');
                        $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#visitedSec,#proDetailPage').show();
                        visit(thisIndex);
                    });
                    $('.forRepDetail').on('click',function () {
                        $('#reportSec,#proDetailPage').show();
                        $('#cusDetailPage,#visitedSec,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#proDetailPage>header>h2').html('报备详情');
                        $('#proDetailPage>h2').html('报备').css('color','#02BD9C');
                    });
                    $('#visitedCard').on('click',function () {
                        visit(visitNum-1);
                        $('#proDetailPage>header>h2').html('来访详情');
                        $('#proDetailPage>h2').html(visitNum+'访').css('color','#2EA9FF');
                        $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
                        $('#visitedSec,#proDetailPage').show();
                    });
                }
                $('#visitedSec').on('click','.zoomImg',function () {
                    showBigImg("<img src=" + $(this).attr('src') + " />");
                });
                $('.imgModal').click(function () {
                    $(this).hide();
                });
                //大定
                if(dadingInfoData){
                    var thisColor='';
                    if(dadingInfoData[0].examineState==2){
                        thisColor='#02BD9C';
                    }else{
                        thisColor='#FF7300';
                    }
                    var dadingInfoHtml=`
                <span class="circle"></span>
                <span class="line"></span>
                <div>
                    <div><span style="color: #666666">大定</span><span style="color: ${thisColor};margin: 0 .15rem">${dadingState(dadingInfoData[0].examineState)}</span></div>
                    <div class="progressTime">${dadingInfoData[0].ddTime}</div>
                </div>
                <div>
                    <div>案场：${dadingInfoData[0].saleUserName}</div>
                    <div>金额：${(dadingInfoData[0].price/10000).toFixed(1)}万元</div>
                </div>
                <div>
                    <div>总价：${(dadingInfoData[0].totalPrice/10000).toFixed(1)}万元</div>
                </div>
                <div>
                    <div>备注：${dadingInfoData[0].remark}</div>
                </div>
                `;
                    $('#dealCard').html(dadingInfoHtml);
                    $('#deaRepTime').html(reportInfoData[0].reportTime);
                    var dealSecHtml=`
                <div><span class="label">大定时间</span><span>${dadingInfoData[0].ddTime}</span></div>
                <div><span class="label">案场销售</span><span>${dadingInfoData[0].saleUserName}</span></div>
                <div><span class="label">大定总价</span><span>${dadingInfoData[0].totalPrice} 元</span></div>
                <div><span class="label">大定金额</span><span>${dadingInfoData[0].price} 元</span></div>
                <div><span class="label">优惠方案</span><span>${dadingInfoData[0].activityName}</span></div>
                <div><span class="label">约签时间</span><span>${dadingInfoData[0].nextContractTime}</span></div>
                <div><span class="label">备注</span><span class="remark">${dadingInfoData[0].remark}</span></div>
                `;
                    $('#dealSec').html(dealSecHtml);
                }
                //签约
                if(signInfoData){
                    var thisColor='';
                    if(signInfoData[0].examineState==4){
                        thisColor='#02BD9C';
                    }else{
                        thisColor='#FF5A47';
                    }
                    var signInfoHtml=`
                <span class="circle"></span>
                <span class="line"></span>
                <div>
                    <div><span style="color: #FF7300;">签约</span><span style="color: ${thisColor};margin: 0 .15rem">${signState(signInfoData[0].examineState)}</span></div>
                    <div  class="progressTime">${signInfoData[0].signTime}</div>
                </div>
                <div>
                    <div>案场：${signInfoData[0].saleUserName}</div>
                    <div>首付：${(signInfoData[0].firstPrice/10000).toFixed(1)}万元</div>
                </div>
                <div>
                    <div>总价：${(signInfoData[0].totalPrice/10000).toFixed(1)}万元</div>
                </div>
                <div>
                    <div>备注：${signInfoData[0].remark}</div>
                </div>
                `;
                    $('#signCard').html(signInfoHtml);
                    $('#signDeaTime').html(dadingInfoData[0].ddTime);
                    $('#signRepTime').html(reportInfoData[0].reportTime);
                    var signSecHtml=`
                 <div><span class="label">签约时间</span><span>${signInfoData[0].signTime}</span></div>
                <div><span class="label">案场销售</span><span>${signInfoData[0].saleUserName}</span></div>
                <div><span class="label">签约总价</span><span>${signInfoData[0].totalPrice} 元</span></div>
                <div><span class="label">签约面积</span><span>${signInfoData[0].buildArea} m²</span></div>
                <div><span class="label">优惠方案</span><span>${signInfoData[0].activityName}</span></div>
                <div><span class="label">备注</span><span class="remark">${signInfoData[0].remark}</span></div>
                `;
                    $('#signSec').html(signSecHtml);
                }

                //发佣
                if(commissionInfoData){
                    var commissionInfoHtml=`
                <span class="circle"></span>
                <span class="line"></span>
                <div>
                    <div><span style="color: #FF7171;">发佣</span></div>
                </div>
                <div>
                    <div>佣金：${commissionInfoData[0].commissionMoney}元</div>
                    <div>折佣：${commissionInfoData[0].zyMoney}元</div>
                </div>
                <div>
                    <div>应发：${commissionInfoData[0].shouldSendMoney}元</div>
                    <div>发票：${commissionInfoData[0].isInvoice}</div>
                </div>
                `;
                    $('#commissionCard').html(commissionInfoHtml);
                    $('#comSigTime').html(signInfoData[0].signTime);
                    $('#comDeaTime').html(dadingInfoData[0].ddTime);
                    $('#comRepTime').html(reportInfoData[0].reportTime);
                    var commissionSecHtml=`
                 <div><span class="label">佣金金额</span><span>${commissionInfoData[0].commissionMoney} 元</span></div>
                <div><span class="label">折佣金额</span><span>${commissionInfoData[0].zyMoney} 元</span></div>
                <div><span class="label">提供发票</span><span>${commissionInfoData[0].isInvoice}</span></div>
                <div><span class="label">应发佣金</span><span>${commissionInfoData[0].shouldSendMoney} 元</span></div>
                `;
                    $('#commissionSec').html(commissionSecHtml);
                }
               //审核
                var commProHtml='';
                var isReject=false;
                var resultUrl='img/ic_pass_green@2x.png';
                $.each(commissionChecksData,function (i) {
                    if(commissionChecksData[i].showContent.indexOf('驳回')>0){
                        isReject=true;
                        resultUrl='img/ic_reject_red@2x.png';
                    }else{
                        isReject=false;
                        resultUrl='img/ic_pass_green@2x.png';
                    }
                    commProHtml+=`
                    <div>
                        <div class="relativeDiv">
                            <img src="${resultUrl}" alt=""><span class="${isReject?'line commProLine':'line'}"></span><span style="font-size: 16px">${commissionChecksData[i].showContent}</span>
                        </div>
                        <div class="progressTime">${commissionChecksData[i].createTime}</div>
                    </div>
                    `;
                });
                $('#commProDiv').html(commProHtml);
                $('#commProDiv>div:last-child .line').hide();
            }else{
                showTips(data.msg||'获取客户详情失败');
            }
        },
        error:function () {
            showTips('网络出错了');
        }
    });
    //跟进列表
    function followList(){
        $.ajax({
            url:rootURL+'api/v1/mine/getFollow',
            type:'GET',
            data:{
                customerId:customerId//	是	int	客户ID(例:customerId=10356)
            },
            success:function (data) {
                if(data.code==200){
                    var followData=data.data;
                    var followHtml='';
                    $('#folllowNum').html('全部跟进 ('+followData.length+')');
                    var recordImg='';
                    var audioHtml='';
                    var isShowRecord=false;
                    $.each(followData,function (i) {
                        if(followData[i].recordFile){
                            isShowRecord=true;
                            audioHtml=`<audio style="display: none" controls  src="${followData[i].recordFile}"></audio>`;
                        }
                        switch (followData[i].followStr){
                            case '微信':
                                recordImg='img/ic_wechat@2x.png';
                                break;
                            case '面谈':
                                recordImg='img/ic_talk@2x.png';
                                break;
                            case '电话':
                                recordImg='img/ic_phone_follow.png';
                                break;
                            default:
                                break;
                        }
                        followHtml+=`
                    <div class="follow-item">
                        <div><img style="width: .26rem;" src="${followData[i].picture?followData[i].picture:'img/profile_img_head_man@2x.png'}" alt=""></div>
                        <div class="content">
                            <div>
                                <div style="float: right;color: #999999">${followData[i].followTime}</div>
                                <div style="font-size: 15px;font-weight: bold">
                                    <span>${followData[i].name}</span><img style="width: .17rem;height: .17rem;margin-left: .15rem;${isShowRecord?'':'display:none'}" src="${recordImg}" alt="">  
                                </div>
                            </div>
                            <div class="tip">${followData[i].text}</div>
                            <div class="record" style="${isShowRecord?'':'display:none'}">
                                <img style="width: .15rem;height: .15rem;margin-right: .1rem" src="img/ic_record@2x.png" alt=""><span>${followData[i].keepTime?followData[i].keepTime:''}</span> 
                            </div>
                            ${audioHtml}   
                        </div>
                    </div>
                    `;
                    });
                    $('#follow-lists').html(followHtml);
                }else{
                    console.log(data.msg||'获取跟进列表失败')
                }
            },
            error:function () {
                showTips('网络出错了');
            }
        });
    }
    followList();
    //录音播放
    var recordImgArr=['img/ic_recordtwo@2x.png','img/ic_recordone@2x.png','img/ic_record@2x.png'];
    var recordTimer=null;
    var isPlay=false;
    $('#follow-lists').on('click','.record',function () {
        var count=0;
        isPlay=!isPlay;
        if(isPlay){
            //$(this).next()[0].play();
            recordTimer=setInterval(function () {
                if(count>=recordImgArr.length){
                    count=-1;
                }else{
                    $(this).children('img').attr('src',recordImgArr[count]);
                }
                count++;
                if($(this).next()[0].ended){
                    clearInterval(recordTimer);
                    recordTimer=null;
                    $(this).children('img').attr('src','img/ic_record@2x.png');
                }
            }.bind(this),500);
        }else{
            $(this).next()[0].pause();
        }
    });
    //跟进
    var thismemberId=localStorage.getItem('memberID');//	是	int	经纪人ID  12
    $('#subFollow').on('click',function () {
        var thistext=$('#edit').val();//	是	string	跟进内容
        var date= new Date().toLocaleDateString().replace(new RegExp('/','g'),'-');
        var time= new Date().toLocaleTimeString().slice(2);
        var now= date+' '+time.substring(0,time.lastIndexOf(':'));
        $.ajax({
            url:rootURL+'api/v1/mine/saveFollow',
            type:'POST',
            data:{
                memberId:thismemberId,//	是	int	经纪人ID
                customerId	:customerId,//是	int	客户ID
                followTime:now,//	是	Date	跟进时间(如:2018-06-12 21:26)
                text:thistext,//	是	string	跟进内容
                followType:4//	是	int	跟进方式码(1面谈 2微信 3电话 4其他)
            },
            success:function (data) {
                if(data.code==200){
                    showTips('添加成功');
                    $('#cusDetailPage').show();
                    $('#followEditePage').hide();
                    followList();
                }else{
                    showTips(data.msg||'添加失败')
                }
            },
            error:function () {
                showTips('网络出错了');
            }
        })
    });
    $('#reportCard,.reportDetail').on('click',function () {
        $('#reportSec,#proDetailPage').show();
        $('#cusDetailPage,#visitedSec,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
        $('#proDetailPage>header>h2').html('报备详情');
        $('#proDetailPage>h2').html('报备').css('color','#02BD9C');
    });
    // $('.visitDetail').on('click',function () {
    //     $('#proDetailPage>header>h2').html('来访详情');
    //     $('#proDetailPage>h2').html('一访').css('color','#2EA9FF');
    //     $('#reportSec,#cusDetailPage,#dealSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
    //     $('#visitedSec,#proDetailPage').show();
    // });
    $('#dealCard,.dealDetail').on('click',function () {
        $('#proDetailPage>header>h2').html('大定详情');
        $('#proDetailPage>h2').html('大定').css('color','#FFA100');
        $('#proDetailPage,#dealSec').show();
        $('#cusDetailPage,#reportSec,#visitedSec,#signSec,#commissionSec,#proDetailPage .commissionPro').hide();
    });
    $('#signCard,.signDetail').on('click',function () {
        $('#proDetailPage>header>h2').html('签约详情');
        $('#proDetailPage>h2').html('签约').css('color','#FFA100');
        $('#proDetailPage,#signSec').show();
        $('#cusDetailPage,#reportSec,#visitedSec,#dealSec,#commissionSec,#proDetailPage .commissionPro').hide();
    });
    $('#commissionCard').on('click',function () {
        $('#proDetailPage>header>h2').html('佣金详情');
        $('#proDetailPage>h2').html('发佣').css('color','#FF5A47');
        $('#proDetailPage,#commissionSec,#proDetailPage .commissionPro').show();
        $('#cusDetailPage,#reportSec,#visitedSec,#dealSec,#signSec').hide();
    });
    $('#proDetailPage>header').on('click','.back',function () {
        $('#cusDetailPage').show();
        $('#proDetailPage').hide();
    });
});