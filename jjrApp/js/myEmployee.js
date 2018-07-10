$(function () {
    var searchArr = location.search.slice(1).split('&');
    var thisparentID =searchArr[0].split('=')[1];//公司id  209109;//
    var thisbranchID =searchArr[1].split('=')[1]; //分行id  80180222;//
    var manageLevel =searchArr[2].split('=')[1];	// 1 分行经理 2 公司法人
    var thisagentId =searchArr[3].split('=')[1];	// 经纪人id 197993;//
    var showModal=false;
    var showRightImg=true;
    $('#onlineLi').on('click',function () {
        showModal=!showModal;
        if(showModal){
            $('.personModal').show(500);
            $(this).children('img').attr('src','img/home_btn_more_grey_export_up.png');
        }else{
            $('.personModal').hide(500);
            $(this).children('img').attr('src','img/home_btn_more_grey_export_down.png');
        }
    });
    // $('header').on('click','.back',function () {
    //     if (isIPhone) {
    //         alert();
    //     }
    //     if (isAndroid) {
    //         AndroidWebView.back();
    //     }
    // });
    $('.personToast>div').on('click',function () {
        $(this).children('img').show().end().siblings().children('img').hide();
        $('.personModal').hide();
        showModal=!showModal;
        $('#onlineLi').children('img').attr('src','img/home_btn_more_grey_export_down.png');
    });
    // $(document).click(function(e) {
    //     var _con = $('.personToast,#onlineLi');
    //     if (!_con.is(e.target) && _con.has(e.target).length === 0) {
    //         $('.personModal').hide(500);
    //         showModal=false;
    //         $('#onlineLi').children('img').attr('src','img/home_btn_more_grey_export_down.png');
    //     }
    // });
    //员工列表
    var pageNum=1,pageSum;
    var loading = false;
    var personData=[];
    var totalCount=0;
    var thisState=1;// 1 在职 2 离职
    function personLists() {
        $.ajax({
            url:initUrl+'api/v2/agent/channelAgents',
            type:'get',
            async:false,
            data:{
                pageNo:pageNum,//	否	int	页码(默认第1页)
                pageSize:20,//		否	int	页长(默认5行)
                companyId:thisparentID,//	134169,//	否	Long	公司id
                branchId:thisbranchID,//	134152,//	否	Long	分行id
                state:thisState,//		否	Integer	// 1 在职 2 离职
                manageLevel:manageLevel,//		是	Integer	// 1 分行经理 2 公司法人
                agentId	:thisagentId//是	Long	// 经纪人id
            },
            success:function (data) {
                if(data.code==200) {
                    var personHtml='';
                    loading = false;//重置
                    pageSum=data.data.totalPage;
                    totalCount=data.data.totalCount;
                    personData=personData.concat(data.data.list);
                    if(personData.length==0||personData.length>=totalCount){
                        $('.infinite-scroll-preloader').hide();
                        $.detachInfiniteScroll($('.infinite-scroll'));
                    }
                    $.each(personData,function (i) {
                        personHtml+=`
                        <li id="${personData[i].id}">
                            <div style="width: .56rem">
                                <p class="name">${personData[i].name?personData[i].name:''}</p>
                                <p class="time">${personData[i].createTime?personData[i].createTime:''}</p>
                            </div>
                            <div style="width: .32rem">${personData[i].reportCount}</div>
                            <div style="width: .32rem">${personData[i].visitCount}</div>
                            <div style="width: .32rem">${personData[i].signCount}</div>
                            <div style="width: .58rem">${personData[i].totalCommissionMoney.toFixed(1)}</div>
                        </li>
                        `;
                    });
                    $('#personLists').html(personHtml);
                }
            },
            error:function (data) {
                console.log(data||'网络错误');
            }
        });
    }
    personLists();
    //是否在职
    $('.personToast').on('click','div',function () {
        personData=[];
        $('.infinite-scroll-preloader').show();
        $.attachInfiniteScroll($('.infinite-scroll'));
        var thisIndex=$(this).index();
        if(thisIndex==0){
            thisState=1;
            pageNum=1;
            personLists();
        }else{
            thisState=2;
            pageNum=1;
            personLists();
        }
    });
    // 注册'infinite'事件处理函数
    $(document).on('infinite', '.infinite-scroll',function(){
        // 首先判断如果正在加载，则退出
        if (loading) return;
        pageNum++;
        personLists();
        loading=true;//此次无限滚动请求结束
        //无限滚动终止条件
        if (pageNum>=pageSum) {
            loading=false;
            // 加载完毕，则注销无限加载事件，以防不必要的加载
            $.detachInfiniteScroll($('.infinite-scroll'));
            // 删除加载提示符
            $('.infinite-scroll-preloader').hide();
        }
    });
    //初始化
    $.init();
});