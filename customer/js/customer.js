$(function () {
    var historyArr=[];
    if(localStorage.getItem('historyItem')){
        historyArr=localStorage.getItem('historyItem').split(',');
    }
    $('#search>input').focus(function () {
        var historyHtml='';
        $('#customPage').hide();
        $('#searchPage').show();
        $('#cus-search>input').val('');
        $.each(historyArr,function (i) {
            historyHtml+=`
            <div class="history-item">
                <div>${historyArr[i]}</div>
                <img  style="width: .16rem;" src="img/search_ic_delete@2x.png" alt="">
            </div>
            `;
        });
        $('#history-lists').html('<h2>历史搜索</h2>'+ historyHtml + '<div id="clearAll">清空历史记录</div>');
    });
    $('#searchPage>header').on('click','.back',function () {
        $('#customPage').show();
        $('#searchPage').hide();
        $('#cus-search>input').val('');
    });
    $('#history-lists').on('click','#clearAll',function () {
        historyArr=[];
        $('#history-lists').html('');
        localStorage.setItem('historyItem','');
    });
    $('#cus-search>input').focus(function () {
        $('#cus-search>button').fadeIn();
    });
    $('#history-lists').on('click','img',function (e) {
        e.stopPropagation();
        $(e.target).parent().remove();
        historyArr.splice(historyArr.indexOf($(e.target).prev().html()),1);
        localStorage.setItem('historyItem',historyArr);
    });
    //数量统计
    $.ajax({
        url:rootURL+'api/v1/sum',
        type:'GET',
        async:false,
        data:{
            memberId:localStorage.getItem('memberID'),//	是	Long	经纪人id  171929
            branchId:localStorage.getItem('branchId'),//	是	Long	分行id  80194280
        },
        success:function (data) {
            if(data.code==200){
               var count=data.data;
               var countHtml=`
                <li class="no-look">报<span>备</span>(${count.reportCount})</li>
                <li>来<span>访</span>(${count.visitCount})</li>
                <li>成<span>交</span>(${count.CJCount})</li>
                <li>佣<span>金</span>(${count.commissionCount})</li>
               `;
               $('#filter').html(countHtml);
            }else{
                var countHtml=`
                <li class="no-look">报<span>备</span></li>
                <li>来<span>访</span></li>
                <li>成<span>交</span></li>
                <li>佣<span>金</span></li>
               `;
                $('#filter').html(countHtml);
            }
        },
        error:function () {
            showTips('网络出错了');
        }
    });
    //客户列表
    var thissearchStr='',customerState=1,pageNum=1,pageSum;
    var loading = false;
    var customData=[];
    var totalCount=0;
    var isSearch=false;
    function customLists(){
        var customHtml='';
        $.ajax({
            url:rootURL+'api/v1/customers',
            type:'GET',
            async:false,
            data:{
                memberId:localStorage.getItem('memberID'),//	是	Long	经纪人id  171929
                branchId:localStorage.getItem('branchId'),//	是	Long	分行id  80194280
                customerState:customerState,//	是	Integer	参考customerState枚举值，（搜索全部信息（报备+来访+成交+发佣）传0，1为报备，2为来访，3为成交，4为发佣）
                searchStr:thissearchStr,//	否	String	搜索内容（客户名称/项目名称/号码后四位）
                pageNo:pageNum,//	否	Integer	第几页，页码从1开始，默认pageNo为1
                pageSize:20//	否	Integer	一页几条数据，默认pageSize为20
            },
            success:function (data) {
                if(data.code==200){
                    loading=false;//重置
                    pageSum=data.data.totalPage;
                    totalCount=data.data.totalCount;
                    customData=customData.concat(data.data.list);
                    var classState='no-look';
                    $.each(customData,function (i) {
                        if(customData[i].customerState==1){
                            classState='no-look';
                        }else if(customData[i].customerState==2){
                            classState='visited';
                        }else if(customData[i].customerState==3||customData[i].customerState==4){
                            classState='deal';
                        }else{
                            classState='commited';
                        }
                        customHtml+=`
                    <div class="cus-item" id="${customData[i].customerId};${customData[i].customerState};${customData[i].transactionNumber}">
                        <div class="cus-lf">
                            <div class="name"><b>${customData[i].customerName}</b><span>${customData[i].propertyName}</span></div>
                            <div class="${classState} stateName">${customData[i].stateName}</div>
                        </div>
                        <div class="cus-gt">日期：${customData[i].theDate}</div>
                    </div>
                    `;
                    });
                    if(isSearch){
                        $('#history-lists').html(customHtml);
                    }else{
                        $('#cus-lists').html(customHtml);
                    }
                }else{
                    showTips(data.msg||'获取列表失败');
                }
            },
            error:function () {
                showTips('网络出错了');
            }
        });
    }
    customLists();
    // 注册'infinite'事件处理函数
    $(document).on('infinite',function(){
        // 首先判断如果正在加载，则退出
        if (loading) return;
        pageNum++;
        customLists();
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
    $('#cus-lists,#history-lists').on('click','.cus-item',function () {
        var paramsData=$.trim($(this).attr('id'));
        $(location).attr('href','customerDetail.jsp?paramsData='+paramsData);
    });
    $('#filter').on('click','li',function () {
        isSearch=false;
        pageNum=1;
        thissearchStr='';
        customData=[];
        totalCount=0;
        switch ($(this).index()){
            case 0:
                $(this).addClass('no-look').siblings().removeClass();
                customerState=1;
                customLists();
                break;
            case 1:
                $(this).addClass('visited').siblings().removeClass();
                customerState=2;
                customLists();
                break;
            case 2:
                $(this).addClass('deal').siblings().removeClass();
                customerState=3;
                customLists();
                break;
            case 3:
                $(this).addClass('commited').siblings().removeClass();
                customerState=4;
                customLists();
                break;
            default:
                break;
        }
        if($('.cus-item').length<totalCount){
            $('.infinite-scroll-preloader').show();
            $.attachInfiniteScroll($('.infinite-scroll'));
        }else{
            $('.infinite-scroll-preloader').hide();
            $.detachInfiniteScroll($('.infinite-scroll'));
        }
    });
    $('#cus-search').on('click','button',function () {
        var historyVal=$(this).prev().prev().val();
        if(historyVal!=''){
            historyArr.push(historyVal);
        }
        localStorage.setItem('historyItem',historyArr);
        isSearch=true;
        customData=[];
        customerState=0;
        thissearchStr=$('#cus-search>input').val();
        customLists();
        $('#cus-search>button').fadeOut();
        // $('#customPage').show();
        // $('#searchPage').hide();
        // $('#cus-search>input').val('');
    });
    // $(window).keydown(function(e) {
    //     if (e.which == '13') {
    //         event.returnValue = false;
    //         event.cancel = true;
    //         $('#cus-search>button').click();
    //     }
    // });
    //初始化
    $.init();
});