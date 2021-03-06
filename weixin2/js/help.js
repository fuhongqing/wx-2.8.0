﻿$(function() {
    FastClick.attach(document.body);
    //-------userproblem
    var helpID = (window.location.search).substr(1, (window.location.search).length);
    switch(helpID) {
        case "0":
            $(".helpContent").html("<h3>怎么报备客户？</h3>" +
                "<p>途径一：具体楼盘项目→楼盘详情，最底部按钮可进行对此项目的报备</p>" +
                "<p>途径二：APP底部快速报备按钮，点击可进行报备，也可以一次报备多项目</p>" +
                "<p>途径三：客户中心→报备列表→报备详情，可对该客户进行报备其他项目</p>");
            break;
        case "1":
            $(".helpContent").html("<h3>一次可以报备几个项目？如何展示？</h3>" +
                "<p>一次可报备多个项目，分单条展示，一个项目一条</p>");
            break;
        case "2":
            $(".helpContent").html("<h3>如何进行客户搜索？</h3>" +
                "<p>在客户中心，进行全局搜索，输入任一关键词[项目名称、客户姓名、客户电话后4位]，列表自动检索出与关键词有关的列表信息</p>");
            break;
        case "3":
            $(".helpContent").html("<h3>报备详情如何复制转发？</h3>" +
                "<p>点击选中某条报备内容，查看详情，此处可以针对同一客户报备其他项目，同时点击详情右上角的复制按钮，可复制下详情的文本信息，可在微信，QQ等聊天工具中编辑发送</p>");
            break;
        case "4":
            $(".helpContent").html("<h3>分行码是什么，从哪里获得？</h3>" +
                "<p>分行码是对已和轩天合作的公司的识别ID，可在分行数据中心的数据中心网址查看获得</p>");
            break;
        case "5":
            $(".helpContent").html("<h3>门店更换了该怎么弄？</h3>" +
                "<p>注销原有账号，让新门店的门店经理提供分行码，然后重新填写分行码注册即可</p>");
            break;
        default:
            break;
    }

    //help
    $("#userhelp").on("click", function() {
        window.location.href = "userHelp.jsp";
    });

    $(".helpList ul li").on("click", function() {
        window.location.href = "userproblem.jsp?" + $(this).index();
    });

    //mine
    $(".mineBox").on("click", function() {
        window.location.href = "personal.jsp";
    });

    $(".helpItem").on("click", function() {
        window.location.href = "help.jsp";
    });

    if(thissex == "2") {
        $("#myphoto img").attr("src", "../img/woman.png");
    } else {
        $("#myphoto img").attr("src", "../img/man.png");
    }

    $(".mineBox h4").html(thisfullName);

    if(userType == "2") {
        $(".mineBox p").html(thisagencyName);

    } else {
        $(".mineBox p").html("暂未绑定分行");
    }

    function warn(word) {
        $(".warn").html(word).fadeIn("fast");
        setTimeout(function() {
            $(".warn").fadeOut("normal");
        }, 2000)
    }

});