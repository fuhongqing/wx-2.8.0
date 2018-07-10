$(function () {
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    //客户列表
    var pageNum=1,pageSum,customerState=1;
    var loading = false;
    var customerData=[];
    var totalCount=0;
    function customerLists() {
        $.ajax({
            url:dataStr+'v2/mine/customers',
            type:'get',
            async:false,
            data:{
                manageLevel:manageLevel,//		是	Integer	// 1 分行经理 2 公司法人
                pageNo:pageNum,//	否	int	页码(默认第1页)
                pageSize:20,//		否	int	页长(默认5行)
                customerState:customerState,//1为报备，2为来访，3为成交，4为发佣
                companyId:thisparentID,//	134169,//	否	Long	公司id
                branchId:thisbranchID,//	134152,//	否	Long	分行id
            },
            success:function (data) {
                if(data.code==200) {
                    var customerHtml='';
                    loading = false;//重置
                    pageSum=data.data.totalPage;
                    totalCount=data.data.totalCount;
                    customerData=customerData.concat(data.data.list);
                    if(customerData.length==0||customerData.length>=totalCount){
                        $('.infinite-scroll-preloader').hide();
                        $.detachInfiniteScroll($('.infinite-scroll'));
                    }
                    var classState='no-look';
                    $.each(customerData,function (i) {
                        if(customerData[i].customerState==1){
                            classState='no-look';
                        }else if(customerData[i].customerState==2){
                            classState='visited';
                        }else if(customerData[i].customerState==3||customerData[i].customerState==4){
                            classState='deal';
                        }else{
                            classState='commited';
                        }
                        customerHtml+=`
                        <div class="cus-item" id="${customerData[i].customerId}">
                            <div class="cus-lf">
                                <div class="name"><b>${customerData[i].customerName}</b><span>${customerData[i].propertyName}</span></div>
                                <div class="gt-item">${customerData[i].agentName?customerData[i].agentName:''}</div>
                            </div>
                            <div class="cus-gt">
                                <div class="${classState} progress">${customerData[i].stateName}</div>
                                <div class="gt-item">${customerData[i].theDate}</div>
                            </div>
                        </div>
                        `;
                    });
                    $('#cus-lists').html(customerHtml);
                }
            },
            error:function (data) {
                console.log(data||'网络错误');
            }
        });
    }
    customerLists();
    // 注册'infinite'事件处理函数
    $(document).on('infinite', '.infinite-scroll',function(){
        // 首先判断如果正在加载，则退出
        if (loading) return;
        pageNum++;
        customerLists();
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
    $('#filter').on('click','li',function () {
        pageNum=1;
        customerData=[];
        switch ($(this).index()){
            case 0:
                $(this).addClass('no-look').siblings().removeClass();
                customerState=1;
                customerLists();
                break;
            case 1:
                $(this).addClass('visited').siblings().removeClass();
                customerState=2;
                customerLists();
                break;
            case 2:
                $(this).addClass('deal').siblings().removeClass();
                customerState=3;
                customerLists();
                break;
            case 3:
                $(this).addClass('commited').siblings().removeClass();
                customerState=4;
                customerLists();
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
    //初始化
    $.init();
});