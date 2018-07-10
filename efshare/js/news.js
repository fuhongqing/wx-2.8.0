$(function(){
	FastClick.attach(document.body);
	var data = (window.location.search).substr(1);
	$.get(dataStr+"/v1/propert/getFXdongtai",data,function(data){
		console.log(data);
		if (data.data) {
			$(".detailfooter").html(
				"<a><span>"+ data.data.name +"</span>"+ data.data.phone +"</a>"+
				"<a href='tel:"+data.data.phone+"'>联系他</a>"
			);
			$(".newsDetails").html("<h4>"+ check(data.data.title) +"</h4><p class='newsMark'><span>"+ check(data.data.propertyName) +"</span>"+
			check(data.data.updateTime) +"</p><div class='newsContent'>"+ check(data.data.content) +"</div>");
			setTimeout(function(){
			    //利用iframe的onload事件刷新页面
				document.title = data.data.Title;
				var iframe = document.createElement('iframe');
			    iframe.style.visibility = 'hidden';
			    iframe.style.width = '1px';
			    iframe.style.height = '1px';
			    iframe.onload = function () {
			        setTimeout(function () {
			            document.body.removeChild(iframe);
			        }, 0);
			    };
			    document.body.appendChild(iframe);
			},0);			


		}
	})
})
