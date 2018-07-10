var memberID = localStorage.getItem('memberID');//69;//

var month = (new Date()).getMonth() ? (new Date()).getMonth() : "12";
$("#month").html(month);

$.get(initUrl7+"api/v1/mine/yeji-rank/"+memberID, personTop);
$.get(initUrl7+"api/v1/mine/yeji/"+memberID+'?timeType=1', xiangGuan);

function personTop(data) {
    if (data.code == "200") {//Number(1/3).toFixed(2)*100
        var personYeji=Number(data.data.memberYeJi/data.data.countYeJi).toFixed(2)*100+'%';
        con.font = "60px PingFang-SC";
        con.fillText(personYeji, 90, 180);
        $("#cJJinE").html(data.data.LastMonthYeJi);
        //画实线圆形
        con.beginPath();
        con.lineWidth = 4;
        con.setLineDash([0, 0]);
        con.strokeStyle = "rgba(255,255,255,1)";
        con.arc(150, 150, 126, -0.5 * Math.PI, (parseInt(personYeji) / 100) * Math.PI*2 - .5 * Math.PI);
        con.stroke();
    }
}

function xiangGuan(data) {
    if (data.code == "200") {
        var cjMoney=data.data.ChengJiaoCount.priceCount;
        if(cjMoney&&cjMoney>100000){
            cjMoney=(cjMoney/10000).toFixed(2)+'万';
        }else if(cjMoney&&cjMoney>0){
            cjMoney=cjMoney.toFixed(2) + '元';
        }else{
            cjMoney='';
        }
        var fyMoney=data.data.FaYongCount.commissionCount;
        if(fyMoney&&fyMoney>100000){
            fyMoney=(fyMoney/10000).toFixed(2)+'万';
        }else if(fyMoney&&fyMoney>0){
            fyMoney=fyMoney.toFixed(2) + '元';
        }else{
            fyMoney='';
        }
        var list = `
            <div>
                <div class="count">${data.data.reportCount?data.data.reportCount:''}</div>
                <p class="item">报备(组)</p></div>
            <div>
                <div class="count">${data.data.VisitCount?data.data.VisitCount:''}</div>
                <p class="item">来访(组)</p></div>
            <div>
                <div class="count">${data.data.ChengJiaoCount.chengjiaoCount?data.data.ChengJiaoCount.chengjiaoCount:''}</div>
                <p class="money">${cjMoney}</p>
                <p class="item">成交(套)</p></div>
            <div>
                <div class="count">${data.data.FaYongCount.count?data.data.FaYongCount.count:''}</div>
                <p class="money">${fyMoney}</p>
                <p class="item">发佣(套)</p></div>
        `;
        $("#xiangGuan").html(list)
    }
}

$(".tab_nav_item").on("click", function () {
    var condition = +($(this).attr("data-condition"));
    $(".tab_nav_item").removeClass("active");
    $(this).addClass("active");
    $.get(initUrl7+"api/v1/mine/yeji/"+memberID+'?timeType='+condition, xiangGuan);
});

var circle = document.getElementById("circle");
var con = circle.getContext("2d");
//画外部大圆
con.beginPath();
con.lineWidth = 12;
con.strokeStyle = "rgba(255,255,255,.6)";
con.arc(150, 150, 144, 0, 2 * Math.PI);
con.stroke();

//画虚线圆形
con.beginPath();
con.setLineDash([6, 6]);
con.lineWidth = 2;
con.strokeStyle = "rgba(255,255,255,.6)";
con.arc(150, 150, 126, 0, 2 * Math.PI);
con.stroke();

con.font = "24px PingFang-SC";
con.fillStyle = "#ffffff";
con.fillText("超过", 124, 100);

con.font = "24px PingFang-SC";
con.fillText("易好房经纪人", 80, 230);

