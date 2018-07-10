$(function () {
    var searchArr = location.search.slice(1).split('&');
    var thisId =searchArr[0].split('=')[1];//经纪人app为经纪人id，案场app为案场id，市场app为市场id
    var thisType =searchArr[1].split('=')[1];//1:经纪人提交 2:案场提交 3:市场提交
    var userName =decodeURIComponent(searchArr[2].split('=')[1].split('&')[0]);
    $('#inviteName').html(userName + '邀请您加入易好房');
    var mySwiper = new Swiper('.swiper-container', {
        //autoplay: true,//可选选项，自动滑动
        direction: 'vertical',
        // effect : 'fade',
        // fadeEffect: {
        //     crossFade: true,
        // },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        // on: {
        //     touchMove: function(event){
        //         $('.opacity').css('opacity',1);
        //     },
        //     slideChangeTransitionEnd: function () {
        //         $('.opacity').css('opacity',0);
        //     }
        // }
        // observer: true,
        // observeParents: true,
    });
    //获取验证码
    $('#regCodeSpan').on('click',function () {
        var thisPhoneNum=$('#regPhoneInput').val();
        if(!(/^1[3456789]\d{9}$/.test(thisPhoneNum))){
            showTips("手机号无效");
            return;
        }
        $.ajax({//手机号判重
            url: initUrl + 'api/v1/agent/checkPhone',
            type: 'get',
            async:false,
            data: {
                phone: thisPhoneNum
            },
            success: function (data) {
                if (data.code == '43002') {
                    showTips('您已注册过易好房/被邀请过，无法再次被邀请哦！');
                }else if(data.code == '200'){
                    $.ajax({
                        url:initUrl+'api/v1/agent/getCode',
                        type:'get',
                        async:false,
                        data:{
                            phone:thisPhoneNum
                        },
                        success:function (data) {
                            if(data.code=='200'){
                                showTips('验证码已发送');
                                var self='#regCodeSpan';
                                var time=60;
                                var timeReg=setInterval(function () {
                                    time--;
                                    $(self).html(time+'s后可重发');
                                    if(time<=0){
                                        clearInterval(timeReg);
                                        timeReg=null;
                                        $(self).html('重新获取');
                                    }
                                },1000);
                            }else{
                                showTips(data.msg||'获取验证码失败');
                            }
                        },
                        error:function (data) {
                            showTips('网络错误');
                        }
                    });
                }else{
                    showTips(data.msg||'手机号无效');
                }
            },
            error: function () {
                showTips('网络错误');
            }
        });
    });
    //提交认证
    $('#inviteRegBtn').on('click',function () {
        var thisPhone=$('#regPhoneInput').val();
        var thisCode=$('#regCodeInput').val();
        if(thisPhone==''){
            showTips('请输入手机号');
            return;
        }
        if(thisCode==''){
            showTips('请输入验证码');
            return;
        }
        $.ajax({//验证手机验证码
            url:initUrl+'api/v1/agent/checkCode',
            type:'get',
            async:false,
            data:{
                phone:thisPhone,//	是	string	电话
                randCode:thisCode//	是	string	验证码
            },
            success:function (data) {
                if(data.code=='200'){
                    $.ajax({//提交
                        url:initUrl+'api/v2/invitation',
                        type:'post',
                        async:false,
                        contentType: 'application/json',
                        data:JSON.stringify({
                            inviterId:thisId,//	是	string	邀请人id (经纪人id,案场id,市场id)
                            inviteeTelephone:thisPhone,//	是	string	电话
                            type:thisType//	是	string	1:经纪人提交 2:案场提交 3:市场提交
                        }),
                        success:function (data) {
                            if(data.code=='200'){
                                showTips('提交成功');
                                setTimeout(function () {
                                    $(location).attr('href','download.html?state=1');
                                },1000);
                            }else{
                                $('.tipModal').show(500);
                            }
                        },
                        error:function () {
                            showTips('网络错误');
                        }
                    });
                }else{
                    showTips(data.msg||'验证码已过期');
                }
            },
            error:function () {
                showTips('网络错误');
            }
        });
    });
    $('#reSubmit').on('click',function () {
        $('.tipModal').hide(500);
        $('#regPhoneInput').val('');
        $('#regCodeInput').val('');
    });
    $('#closeImg').on('click',function () {
        $('.tipModal').hide(500);
    });
});