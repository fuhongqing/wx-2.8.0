$(function() {
        var showModal = false;
        var showRightImg = true;
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
        $('#onlineLi').on('click', function() {
            showModal = !showModal;
            if (showModal) {
                $('.personModal').show(500);
                $(this).children('img').attr('src', '../img/home_btn_more_grey_export_up.png');
            } else {
                $('.personModal').hide(500);
                $(this).children('img').attr('src', '../img/home_btn_more_grey_export_down.png');
            }
        });
        $('.personToast>div').on('click', function() {
            $(this).children('img').show().end().siblings().children('img').hide();
            $('.personModal').hide();
            showModal = !showModal;
            $('#onlineLi').children('img').attr('src', '../img/home_btn_more_grey_export_down.png');
        });
        var pageNum = 1,
            pageSum;
        var loading = false;
        var personData = [];
        var totalCount = 0;
        var thisState = 1;
        function personLists() {
            $.ajax({
                url: dataStr + 'v2/agent/channelAgents',
                type: 'get',
                async: false,
                data: {
                    pageNo: pageNum,
                    pageSize: 20,
                    companyId: thisparentID,
                    branchId: thisbranchID,
                    state: thisState,
                    manageLevel: manageLevel,
                    agentId: thismemberID
                },
                success: function(data) {
                    if (data.code == 200) {
                        var personHtml = '';
                        loading = false;
                        pageSum = data.data.totalPage;
                        totalCount = data.data.totalCount;
                        personData = personData.concat(data.data.list);
                        if (personData.length == 0 || personData.length >= totalCount) {
                            $('.infinite-scroll-preloader').hide();
                            $.detachInfiniteScroll($('.infinite-scroll'));
                        }
                        $.each(personData, function(i) {
                            personHtml += ("\n                        <li id=\"" + personData[i].id + "\">\n                            <div style=\"width: .56rem\">\n                                <p class=\"name\">" + (personData[i].name ? personData[i].name : '') + "</p>\n                                <p class=\"time\">" + (personData[i].createTime ? personData[i].createTime : '') + "</p>\n                            </div>\n                            <div style=\"width: .32rem\">" + personData[i].reportCount + "</div>\n                            <div style=\"width: .32rem\">" + personData[i].visitCount + "</div>\n                            <div style=\"width: .32rem\">" + personData[i].signCount + "</div>\n                            <div style=\"width: .58rem\">" + personData[i].totalCommissionMoney.toFixed(1) + "</div>\n                        </li>\n                        ");
                        });
$('#personLists').html(personHtml);
                    }
                },
                error: function(data) {
                    console.log(data || '网络错误');
                }
            });
        }
        personLists();
        $('.personToast').on('click', 'div', function() {
            personData = [];
            $('.infinite-scroll-preloader').show();
            $.attachInfiniteScroll($('.infinite-scroll'));
            var thisIndex = $(this).index();
            if (thisIndex == 0) {
                thisState = 1;
                personLists();
            } else {
                thisState = 2;
                personLists();
            }
        });
        $(document).on('infinite', '.infinite-scroll', function() {
            if (loading)
                return;
            pageNum++;
            personLists();
            loading = true;
            if (pageNum >= pageSum) {
                loading = false;
                $.detachInfiniteScroll($('.infinite-scroll'));
                $('.infinite-scroll-preloader').hide();
            }
        });
        $.init();
    });