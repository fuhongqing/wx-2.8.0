$(function () {
    var showModal=false;
    var showRightImg=true;
    document.documentElement.style.fontSize = document.documentElement.clientWidth / 3.75 + 'px';
    $('#onlineLi').on('click',function () {
        showModal=!showModal;
        if(showModal){
            $('.modal').show(500);
            $(this).children('img').attr('src','../img/home_btn_more_grey_export_up.png');
        }else{
            $('.modal').hide(500);
            $(this).children('img').attr('src','../img/home_btn_more_grey_export_down.png');
        }
    });
    $('.toast>div').on('click',function () {
        $(this).addClass('showRightImg').children('img').show().end().siblings().removeClass('showRightImg').children('img').hide();
    });
    $(document).click(function(e) {
        var _con = $('.toast,#onlineLi');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('.modal').hide(500);
            showModal=false;
            $('#onlineLi').children('img').attr('src','../img/home_btn_more_grey_export_down.png');
        }
    });
});