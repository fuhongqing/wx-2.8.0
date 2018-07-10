var oHtml = document.documentElement;

getSize();

function getSize(){

	var screenWidth = oHtml.clientWidth;
	//console.log(screenWidth);

	if(screenWidth >= 640){

		oHtml.style.fontSize = '40px';

	}else if(screenWidth <= 320){

		oHtml.style.fontSize = '20px';

	}else{

		oHtml.style.fontSize = screenWidth/640*40 +'px';

	}	

};

window.onresize = function(){

	getSize();

};

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
//点击返回
$(".back").on("click",function(){
	window.history.back();
});

//检查数值
function check(Num){
	if ((!Num)&&(Num!=0)) {
		return Num = "";
	} else{
		return Num;
	}
}

   var hrdataStr = "http://hr.ehaofang.org/api/";
   
   var newsdataStr = "http://xmjyapi.ehaofang.org/api";
   var imgurlStr = "http://images.ehaofang.com/";

   // var dataStr = "http://agentapi.ehaofang.net/api/";
   var dataStr = 'http://jjrtest.ehaofang.com/api/';
	// var dataStr2 = "http://weixintest.ehaofang.com/efapp2";
   var dataStr3 = "http://jjrtest.ehaofang.net/efapp2";//2.5.3测试接口

var thismemberID =localStorage.getItem('memberID');//197993


var thisparentID = "";
var thisbranchID = "";
var thisunionID = "";
var thisfullName = "";
var thissex = "";
var thispicture='';
var thisagencyName = "";
var thisbranchName = "";
var thisphone = "";
var thisagencyCode = "";
var userType=localStorage.getItem('userType');
var manageLevel;
var thisTitle;
function title(t){
	switch (t){
		case 0:
			return t='销售顾问';
			break;
        case 1:
            return t='分行店长';
            break;
        case 2:
            return t='分行经理';
            break;
        case 3:
            return t='公司高管';
            break;
        default:
            return t='其他职位';
            break;
	}
}
$.ajax({//+thismemberID,
	url: dataStr + "v1/agent/getChannelAgent?id="+thismemberID,
    type:"get",
    async:false,
    success: function(data) {
		if (data.code == 200) {
		    	thisparentID = data.data.companyId;//公司id
		    	thisbranchID = data.data.branchId;//分行id
		    	thisunionID = data.data.weixinUnionId;
		    	thisfullName = data.data.name;//经纪人名字
		    	thissex = data.data.sex;//性别（0-未知，1-男，2-女）
                thispicture=data.data.picture;//头像
		    	thisagencyName = data.data.companyName;//公司名字
		    	thisbranchName = data.data.branchName;//分行名字
		    	thisphone = data.data.phone;//经纪人手机号
		    	thisagencyCode = data.data.branchCode;//分行码
		    	//userType = data.data.userType;//账号类型 1 游客  2 经纪人
		    	manageLevel =  data.data.manageLevel;//管理级别(0-普通员工，1-分行经理 2-法人)
                thisTitle=title(data.data.title);//经纪人职称  0 销售顾问  1 分行店长  2 分行经理   3 公司高管  4 其他职位
		}
    }
});

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
$(".visitor").on("click",function(){
	var con;
	con=confirm("是否去绑定分行码查看？");
	if(con==true){
		window.location.href = "../../login/login.jsp?member=1";
	}
	
});

