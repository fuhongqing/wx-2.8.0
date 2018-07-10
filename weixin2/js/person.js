$(function () {
    var thismemberID=localStorage.getItem('memberID');
    var userType =localStorage.getItem('userType');
    $('#userName').html(thisfullName);
    $('#userTitle').html(thisTitle);
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
       // window.location.href = "myEmployee.jsp";
        $alert.init();
    });
    $("#myCustomer").on("click", function () {
        //window.location.href = "myCustomer.jsp";
        $alert.init();
    });
    $("#identifyCom").on("click", function () {
        $alert.init();
    });
    $("#helpLi").on("click", function () {
        window.location.href = "help.jsp";
    });
    $("#inviteLi").on("click", function () {
        //window.location.href = "../../identify/invite.jsp?memberId=" + thismemberID + "&state=0&type=0&userName=" + thisfullName;
        $alert.init();
    });
    $(".avator").on("click", function () {
        window.location.href = "personal.jsp";
    });

    window.confirm = function (message) {
        var iframe = document.createElement("IFRAME");
        iframe.style.display = "none";
        iframe.setAttribute("src", 'data:text/plain,');
        document.documentElement.appendChild(iframe);
        var alertFrame = window.frames[0];
        var result = alertFrame.window.confirm(message);
        iframe.parentNode.removeChild(iframe);
        return result;
    };
    $('#footer-item').on('click', 'li', function () {
        var index = $(this).index();
        switch (index) {
            case 0:
                window.location.href = "index.jsp";
                break;
            case 1:
                if (userType == "2") {
                    window.location.href = "../../customer/customer.jsp";
                } else {
                    var con;
                    con = confirm("是否去绑定分行码查看？");
                    if (con == true) {
                        window.location.href = "../../login/login.jsp?member=1";
                    }
                }
                break;
            case 2:
                if (userType == "2") {
                    window.location.href = "add-reserve-client.jsp";
                } else {
                    var con;
                    con = confirm("是否去绑定分行后报备？");
                    if (con == true) {
                        window.location.href = "../../login/login.jsp?member=1";
                    }
                }
                break;
            case 3:
                window.location.href = "dongtai.jsp";
                break;
            case 4:
                window.location.href = "person.jsp";
                break;
            default:
                break;
        }
    });
});