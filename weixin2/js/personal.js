$(function(){
		//FastClick.attach(document.body);
        //个人头像
        if(thispicture){
            $('#editPhotoBox>img.editPhoto').attr('src',thispicture);
        }
      
    	if(thissex == "2"){
    		$("#editSex span.sex").html("女");
    		$("#editSex span.sex").attr("value","2");

    	}else if(thissex == "1"){
    		$("#editSex span.sex").html("男");
    		$("#editSex span.sex").attr("value","1");
    	}else{
    		$("#editSex span.sex").html("男");
    		$("#editSex span.sex").attr("value","0");
    	}
    	$("#editName span.realName").html(thisfullName);
    	$("#editMobile span.phoneNum").html(thisphone);

			
		$(".back").click(function(){
			window.history.back();
		});
		
		$(".editback").on("click",function(){
			//$(".editWrap").css("display","none").animate({left:"30rem"},"slow");
			$(".editWrap").animate({left: "19rem"}, 300 );
			setTimeout(function(){
				$(".editWrap").css("display","none");
			},200);
		});//取消修改
		//修改头像
		$('#editPhotoBox').on('click',function () {
				$('#loadImg').click();
		});
		$('#loadImg').on('change',function(e) {
				var files=this.files[0];
				var formData = new FormData();
				if (files.size > 5 * 1024 * 1024) {
					warn("单个文件大小不可超过5M");
				}else{
					formData.append('files', files);
				}
				$.ajax({
					url: 'http://www.ehaofang.com:8888/publicshow/qiniuUtil/fileToQiniu',
					type: 'POST',
					data: formData,
					contentType: false,
					processData: false,
					cache: false,
					async: false,
					success: function(data) {
						console.log(data);
						if (data.statas == 'true') {
							warn(data.message);
							var thisImgUrl=data.pathUrls;
							// imgNames.push(data.fileNames);
							$.ajax({
								url:dataStr+'v1/agent/updatePicture',
								type:'PUT',
								contentType:"application/json",
								data:JSON.stringify({
									picture:imgurlStr+thisImgUrl,//	是	string	头像url
									id:thismemberID//	是	Long	经纪人id
								}),
								success:function (data) {
									if(data.code==200){
										window.location.reload();
									}
								},
								error:function (error) {
									console.log(error);
								}
							})

						} else if (data.statas == 'false') {
							warn(data.message||'图片上传失败');
						}
					},
					error: function(jqXHR) {
						console.log(JSON.stringify(jqXHR));
					}
				});
			});
		//修改姓名
	    var oldName=$("#editName span.realName").html();
		$("#editName").on("click",function(){
			
			$("#nameID").val(oldName);
			$("#nameWrap").css("display","block").animate({left: "0"}, 300 );			
		});
		$("#nameID").on("keyup",function(){
			if($(this).val()!=oldName){
				$("#nameWrap button").addClass("saveName");
				$("#clearName").css("display","block");
			}else{
				$("#nameWrap button").removeClass("saveName");
				$("#clearName").css("display","none");
			}
		});
		
		
		$(".edittop button").on("click",function(){
			if ($(".edittop button").hasClass("saveName")) {

//此处书写保存名字的ajax；
				updateMember(6,'name',$("#nameID").val())
			}
		});
		
		
		function updateMember(Type,Name,Value){

			var updateMemberParams = {
				id:thismemberID,
//				Name:Value,
				updateType:Type
			}
			updateMemberParams[Name] = Value;
			$.ajax({
				url: dataStr + "v1/agent/updateMember",
			    type:"put",
				data:JSON.stringify(updateMemberParams),
				headers: { 
				    "Content-Type": "application/json"
				},
			    success: function(data) {
					if(data.code == 200){
						$(".loaderWrap").css("display","block");
						setTimeout(function(){
							$(".loaderWrap").css("display","none");
//姓名更新							
							if(Name == 'name'){
								$("#editName span.realName").html($("#nameID").val());
							}
//性别更新							
							if(Name == 'sex'){
								$("#editSex span.sex").text($(".changeSexActive").html());
								$("#editSex span.sex").attr("value",$(".changeSexActive").attr("value"));
							}
							
							
							$(".editWrap").animate({left: "19rem"}, 300 );
							setTimeout(function(){
								$(".editWrap").css("display","none");
							},200);
						},300);
						
					}else{
						$(".loaderWrap").css("display","block");
						setTimeout(function(){
							$(".loaderWrap").css("display","none");
							warn("操作失败！");
						},500);
						
					}
			    	
			    }
			})
			
		}
		
		$("#clearName").on("click",function(){
			$("#nameID").val("");
			$("#editNum").val("");
			$("#nameWrap button").removeClass("saveName");
			$(this).css("display","none");
		});
		
//修改性别

		$("#editSex").on("click",function(){			
			if ($("#editSex span.sex").html() == "男") {
				$(".changeSex p[value=1]").addClass("changeSexActive");
			} else if($("#editSex span.sex").html() == "女"){
				$(".changeSex p[value=2]").addClass("changeSexActive");
			}else{
				$(".changeSex p").removeClass(".changeSexActive");
			}
			$("#sexWrap").css("display","block").animate({left: "0"}, 300 );			
		});
		$(".changeSex p").on("click",function(){
			
			
			if (!$(this).hasClass("changeSexActive")) {
				$(this).addClass("changeSexActive");
				$(".changeSex p").not($(this)).removeClass("changeSexActive");
				
				updateMember(5,'sex',$(".changeSexActive").attr("value"));
			}

		});
//修改手机号				

		$("#editMobile").on("click",function(){
			$("#numberWrap").css("display","block").animate({left: "0"}, 300 );			
		});
		var thisNum = "";
		$("#getcode").on("click",function(){
			thisNum = parseInt($(".writePhone input").val());
			
			if( /^1[34578]\d{9}$/.test(thisNum) ){
				$.get(dataStr+"v1/agent/checkPhone?phone="+thisNum,function(data){
					if (data.code == 200) {
						$(".loaderWrap").css("display","block");
						setTimeout(function() { 
							$(".loaderWrap").css("display","none");
						},4000);
						$.get(dataStr+"v1/agent/getCode?phone="+thisNum,function(data){
							$(".loaderWrap").css("display","none");
							if (data.code == 200) {
								warn("验证码发送成功！");
								settime($("#getcode"));
								
							}else{
								warn(data.msg)
							}
						})
						
					} else{
						warn(data.msg);
					}
	
				})			
				
			
			
			}
		});
		$("#clearNum").on("click",function(){
			$("#editNum").val("");
			thisNum = "";
			$(this).css("display","none");
		});
		
		$("#editNum").on("keyup",function(){
			if($(this).val().length >= 2){
				$("#clearNum").css("display","block");
			}else{
				$("#clearNum").css("display","none");
			}
		});
		
			var countdown=60; 
			function settime(val) { 
				if (countdown == 0) { 
					val.removeAttr("disabled");
					val.css("color","#31B431");
					val.html("重新获取"); 
					countdown = 60;
					return;
				} else { 
					val.attr("disabled", "disabled");  
					val.css("color","#999");
					val.html("重新发送(" + countdown + "s)"); 
					countdown--; 
				} 
				setTimeout(function() { 
					settime(val) 
				},1000) 
			}//手机验证码60s倒计时
		
//输入手机验证码				
		var codelength = "";
		$(".writeCode input").on("keyup",function(){
			codelength = $(this).val().length;
			thisNum = parseInt($(".writePhone input").val());
			if( codelength == 4 && /^1[34578]\d{9}$/.test(thisNum) ){
				$("#updateNum").css("background","#31B431");
				$("#updateNum").removeAttr("disabled");
			}else{
				$("#updateNum").css("background","#B8DDB8");
				$("#updateNum").attr("disabled", "disabled");  
			}
			
		});
//点击更改电话号码完成				
		$("#updateNum").on("click",function(){
			$(".loaderWrap").css("display","block");
			setTimeout(function() { 
				$(".loaderWrap").css("display","none");
			},4000);
			$.get(dataStr+"v1/agent/checkCode",
				{
					phone:$(".writePhone input").val(),
					randCode:$(".writeCode input").val()
				},function(data){

				if (data.code == 200) {
					$.ajax({
						url: dataStr + "v1/agent/updatePhone",
					    type:"put",
						data:JSON.stringify({
							"phone":$(".writePhone input").val(),
							"id":thismemberID
						}),
						headers: { 
						    "Content-Type": "application/json"
						},
					    success: function(data) {
							console.log(data);
							if(data.code == 200){
								$(".loaderBox").html("<div class='loader'><div class='right'><img src='../img/finish.png' /></div></div>更改成功！")
								setTimeout(function(){
									$(".loaderWrap").css("display","none");
									$("#editMobile span.phoneNum").html($(".writePhone input").val());
									
									$(".editWrap").animate({left: "19rem"}, 300 );
									setTimeout(function(){
										$(".editWrap").css("display","none");
									},200);
								},500)
							}else{
								$(".loaderWrap").css("display","none");
								warn(data.msg);
							}
						}
					})
				}else{
					warn(data.msg);
				}
			})
				
		});
		
		
		function warn(word){
			$(".warn").html(word).fadeIn("fast");
			setTimeout(function(){$(".warn").fadeOut("normal");},2000)
		}

});
