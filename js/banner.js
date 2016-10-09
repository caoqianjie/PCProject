/**
 * Created by Edward on 2016/8/14.
 */
var banner_out=document.getElementById("banner_out");
var bannerMid=utils.getElementsByClass("js_banner-mid",banner_out)[0];
var oDiv=bannerMid.getElementsByTagName('div');
var oImg=bannerMid.getElementsByTagName('img');
var uls=utils.getElementsByClass("js_focus",banner_out)[0];
var lis=uls.getElementsByTagName('li');
;(function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open("get","data.txt?_="+Math.random(),false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
            data=utils.jsonParse(xhr.responseText);
        }
    };
    xhr.send(null)
})();
;(function dataBind(){
    if(data){
        var str='',strLi='';
        for(var i=0;i<data.length;i++){
            var curData=data[i];
            str+=' <div><img src="" trueSrc="'+curData["src"]+'"/></div>';
            strLi+=i==0? ' <li class="bg"></li>':' <li></li>';
        }
        bannerMid.innerHTML=str;
        uls.innerHTML=strLi;
    }
})();
function imgLazyLoad(){
    for(var i=0;i<oImg.length;i++){
        (function (i){
            var curImg=oImg[i];
            var tempImg=new Image;
            tempImg.src=curImg.getAttribute("trueSrc");
            tempImg.onload=function(){
                curImg.src=this.src;
                utils.css(curImg,"display","block");
                if(i==0){
                    utils.css(curImg.parentNode,"zIndex",1);
                    animate(curImg.parentNode,{opacity:1},300);
                }else{
                    utils.css(curImg.parentNode,"zIndex",0)
                    utils.css(curImg.parentNode,"opacity",0)
                }
            }
        })(i);

    }
}
window.setTimeout(imgLazyLoad,300);
var step=0;
var timer=null;
timer=window.setInterval(autoMove,3000)
function autoMove(){
    if(step==data.length-1){
        step=-1;
    }
    step++;
    setBanner();
}
function setBanner(){
    for(var i=0;i<oImg.length;i++){
        var curImg=oImg[i];
        if(i==step){
            utils.css(curImg.parentNode,"zIndex",1);
            animate(curImg.parentNode,{opacity:1},300,function(){
                var siblings=utils.siblings(this);
                for(var j=0;j<siblings.length;j++){
                    utils.css(siblings[j],"opacity",0)
                }
            });
        }else{
            utils.css(curImg.parentNode,"zIndex",0);
        }
    }
    for(var k=0;k<lis.length;k++){
        lis[k].className=k==step?"bg":"";
    }
}
(function eventBind(){
    for(var i=0;i<lis.length;i++){
        var curLi=lis[i];
        curLi.index=i;
        lis[i].onmouseover=function(){
            step=this.index;
            setBanner();
        }
    }
})();
banner_out.onmouseover=function(){
    window.clearInterval(timer);
};
banner_out.onmouseout=function(){
    timer=window.setInterval(autoMove,3000)
};