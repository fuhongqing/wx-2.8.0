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

//检查数值
function check(Num){
	if ((!Num)&&(Num!=0)) {
		return Num = "";
	} else{
		return Num;
	}
}

var dataStr = "http://jjrtest.ehaofang.com/api/";
var imgurlStr = "http://images.ehaofang.com/";