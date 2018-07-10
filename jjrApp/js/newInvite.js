$(function () {
    var searchArr = location.search.slice(1).split('&');
    var thisId =searchArr[0].split('=')[1];//经纪人app为经纪人id，案场app为案场id，市场app为市场id
    var thisType =searchArr[1].split('=')[1].split('&')[0];//1:经纪人提交 2:案场提交 3:市场提交
    //提示框显示
    function showTips(text) {
        $('.inviteModal').fadeIn();
        $('.inviteToast').html(text);
        setTimeout(function () {
            $('.inviteModal').fadeOut();
        },2000);
    }
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
    $('#inviteBtn').click(function() {
        if (isIPhone) {
            alert();
        }
        if (isAndroid) {
            AndroidWebView.invite();
        }
    });
});