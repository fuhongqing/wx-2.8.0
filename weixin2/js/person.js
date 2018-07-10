$(function () {
    $('#userName').html(thisfullName);
    $('#userTitle').html(thisTitle);
    if(thispicture){
        $('#personImg').attr('src',thispicture);
    }
    //普通员工无员工和客户列表
    if(manageLevel==0){
        $('#myEmployee,#myCustomer').hide();
    }
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    var $alert = {
        init: function () {
            this.getEle();
        },
        getEle: function () {
            var ele = "<div onclick='$(this).remove()' style='position: fixed;left: 0;right: 0;top:0;bottom: 0;margin: auto;background: rgba(0,0,0,.5)'>" +
                "<div style='width: 2.3rem;height: 3.2rem;position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);'>" +
                "<img style='width: 100%;height: 100%' src='../img/image_windows@2x.png' />" +
                "<span style='width: 0.4rem;height: 0.4rem;position: absolute;bottom: -.5rem;left: 50%;transform: translateX(-50%)'><img style='width: 100%;height: 100%' src='../img/ic_delete@2x.png' /></span>" +
                "</div>" +
                "</div>";
            $("body").append(ele);
        }
    };
    $("#reward,#qiandao,#level,#jifen,#guanzhu").on("click", function () {
        $alert.init();
    });
    $("#setting").on("click", function () {
        window.location.href = "setting.jsp";
    });
    $("#personal").on("click", function () {
        window.location.href = "personal.jsp";
    });
    $("#persontop").on("click", function () {
        window.location.href = "../../home/persontop.jsp";
    });
    $("#myEmployee").on("click", function () {
        window.location.href = "myEmployee.jsp";
    });
    $("#myCustomer").on("click", function () {
        window.location.href = "myCustomer.jsp";
    });
    $("#identifyCom").on("click", function () {
        $.get(dataStr+'v1/mine/myCompany/'+thismemberID,function (data) {
            if(data.code==200){
                if(data.data.userType==2){
                    var identyInfoId=data.data.renzhengId;//认证id
                    var identyState=data.data.state;//认证状态  1提交 2驳回 3通过
                    $(location).attr('href','../../identify/identifydetail.jsp?infoId='+identyInfoId+'&state='+identyState);
                } else if(data.data.userType==1&&data.data.state!='4'){
                    var identyInfoId=data.data.renzhengId;//认证id
                    var identyState=data.data.state;//认证状态  1提交 2驳回 3通过
                    $(location).attr('href','../../identify/identifydetail.jsp?infoId='+identyInfoId+'&state='+identyState);
                }else{
                    $(location).attr('href','../../identify/identifyadd.jsp');
                }
            }
        });
    });
    $("#helpLi").on("click", function () {
        window.location.href = "help.jsp";
    });
    $("#inviteLi,#poster").on("click", function () {
        window.location.href = "../../identify/invite.jsp?userName=" + thisfullName;
    });
    $(".avator").on("click", function () {
        window.location.href = "personal.jsp";
    });
});