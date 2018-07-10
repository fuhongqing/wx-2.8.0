var rootURL ='http://jjrtest.ehaofang.com/';
document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
var userType =localStorage.getItem('userType');
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
            window.location.href = "../weixin2/pages/index.jsp";
            break;
        case 1:
            if (userType == "2") {
                window.location.href = "customer.jsp";
            } else {
                var con;
                con = confirm("是否去绑定分行码查看？");
                if (con == true) {
                    window.location.href = "../login/login.jsp?member=1";
                }
            }
            break;
        case 2:
            if (userType == "2") {
                window.location.href = "../weixin2/pages/add-reserve-client.jsp";
            } else {
                var con;
                con = confirm("是否去绑定分行后报备？");
                if (con == true) {
                    window.location.href = "../login/login.jsp?member=1";
                }
            }
            break;
        case 3:
            window.location.href = "../weixin2/pages/dongtai.jsp";
            break;
        case 4:
            window.location.href = "../weixin2/pages/person.jsp";
            break;
        default:
            break;
    }
});
function showTips(text) {
    $('.modal').fadeIn();
    $('.toast').html(text);
    setTimeout(function() {
        $('.modal').fadeOut();
    }, 1000);
}
function showBigImg(imgSrc) {
    $('.imgModal').fadeIn();
    $('.imgToast').html(imgSrc);
}