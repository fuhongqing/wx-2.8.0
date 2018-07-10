$(function(){
    var searchArr = location.search.slice(1).split('=')[1];
    var propertyId;
    if(!searchArr){
        propertyId='';
    }else{
        propertyId=searchArr;
    }
    $.get(dataStr+"v1/mine/getAllDynamic",{pageSize:"30",pageNo:"1",propertyId:propertyId}, function(data){
         if(data.code==200){
              var resultData=data.data;
              var resultHtml='';
              var randImg=['../img/find_ic_fire@2x.png','../img/find_ic_recommend@2x.png'];
              $.each(resultData,function (i) {
                  if(i%4==0){
                      resultHtml+=`
                      <div class="look-item" onclick="window.location.href='newsDetails.jsp?${resultData[i].id}'">
                            <div style="text-align: center;margin-bottom: 10px;"><img style="width: 335px;height: 175px;" src="${imgurlStr+resultData[i].mainPicture}" alt=""></div>
                            <div>
                                <img style="width: 20px;margin-right: 10px" src="${randImg[parseInt(Math.random()*2)]}" alt="">
                                <span style="font-size:16px;flex: 1">${resultData[i].title}</span>
                            </div>
                        </div>
                    `;
                  }else{
                      resultHtml+=`
                      <a href='newsDetails.jsp?${resultData[i].id}'>
                          <dl class='clearfix'>
                              <dt style='float: right'><img style='width: 120px;height: 90px;' src='${imgurlStr+resultData[i].mainPicture}' /></dt>
                              <dd>${resultData[i].title}</dd>
                              <dd>${resultData[i].propertyList[0].propertyName}<span>${resultData[i].updateTime}</span></dd>
                          </dl>
                      </a>
                      `;
                  }
              });
             $(".buildNews1").html(resultHtml);
         }
	})
});
