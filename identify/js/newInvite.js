$(function () {
    var thisId=localStorage.getItem('memberID');//	memberId  是	string	Id （经纪人app为经纪人id，案场app为案场id，市场app为市场id）
    var userName=decodeURIComponent(location.search.slice(1).split('=')[1]);//userName
    //提示框显示
    function showTips(text) {
        $('.inviteModal').fadeIn();
        $('.inviteToast').html(text);
        setTimeout(function () {
            $('.inviteModal').fadeOut();
        },2000);
    }
    function weixin(data) {
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的
            //参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId:wxAppId,//  必填，企业号的唯一标识，此处填写企业号corpid  wx9cbe0adb2edc523f
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.noncestr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名，见附录1W
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '海量新房，24小时结佣，我在易好房等你！', // 分享标题 楼盘名称和均价
                link: weixinUrl+'pages/house/mod/broker/identify/inviteReg.jsp?userName='+encodeURIComponent(userName)+'&thisId='+thisId,
                //imgUrl: imgUrl+midImgList[0], // 分享图标  当前轮播图第一张图
                desc:'卖房更容易，易好房是业内领先的新房整合营销服务平台',
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log('分享失败');// 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: '海量新房，24小时结佣，我在易好房等你！', // 分享标题 楼盘名称和均价
                link: weixinUrl+'pages/house/mod/broker/identify/inviteReg.jsp?userName='+encodeURIComponent(userName)+'&thisId='+thisId,
                //imgUrl: imgUrl+midImgList[0], // 分享图标  当前轮播图第一张图
                desc:'卖房更容易，易好房是业内领先的新房整合营销服务平台',
                success: function () {
                    console.log("分享成功");
                },
                cancel: function () {
                    console.log('分享失败');// 用户取消分享后执行的回调函数
                }
            });
        });
        wx.error(function (res) {
            console.log(res);
        });
    }
    function PostData(url, data, callback) {
        $.ajax({
            type:'post',
            url:url,
            data:data,
            success:function (data) {
                callback(data);
            },
            error:function () {
                showTips('请求失败');
            }
        });
    }
    //分享
    PostData(weixinUrl+"weixin/member/demo.html", {url:window.location.href}, weixin);
    //邀请经纪人列表
    function  invite(){
        $.ajax({
            type:'get',
            url:initUrl+'api/v2/invitation',
            data:{
                inviterId:thisId,//	是	Long	邀请人ID
                type:1//	是	Long	1:经纪人提交 2:案场提交 3:市场提交
                // pageNo:1,//	否	Integer	第几页，页码从1开始，默认pageNo为1
                // pageSize:20,//	否	Integer	一页几条数据，默认pageSize为20
            },
            success:function (data) {
                if(data.code=='200'){
                    var listHtml='';
                    var resultData=data.data.list;
                    // var pageSum=data.data.totalPage;
                    if(resultData.length>0){
                        $.each(resultData,function (i) {
                            listHtml+=`
                          <li>
                             <div>${resultData[i].firstTel}****${resultData[i].endTel}</div>
                          </li>
                         `;
                        });
                        $('#inviteLists').html('<li>邀请好友</li>'+listHtml);
                    }else{
                        $('#inviteLists').html('<img style="width: .44rem;height: .71rem;margin-top: .3rem;" src="img/noData.png">');
                    }
                }else{
                    showTips(data.msg||'无邀请人');
                }
            },
            error:function () {
                console.log('服务器内部错误');
            }
        });
    }
    invite();
    //立即邀请
    $('#inviteBtn').click(function () {
        showTips('请点击右上角菜单栏分享');
    });
});