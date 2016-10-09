/**
 * Created by Edward on 2016/8/14.
 */
(function (){
    function TabClass(selector){
        this.oTab=document.getElementById(selector);
        this.tabCon=utils.getElementsByClass("js_tab_con",this.oTab);
        this.tabWrap=utils.getElementsByClass("js_tab_wrap",this.oTab);

        this.init();
    }
    TabClass.prototype={
        constructor:TabClass,
        init: function (){
            this.eventBind();
        },
        eventBind:function (){
            var that=this;
            that.oTab.onmouseover=function(e){
                e=e||window.event;
                var tar= e.target || e.srcElement,
                    tarTag=tar.tagName.toUpperCase();
                var sib=utils.siblings(tar),
                    index=utils.index(tar);
                if(tarTag=="LI"&&utils.hasClass(tar.parentNode,"sub-nav-left")){
                    utils.addClass(tar,"on");
                    for(var i=0;i<sib.length;i++){
                        utils.removeClass(sib[i],"on");
                    }
                    for(var j=0;j<that.tabCon.length;j++){
                        j==index?utils.addClass(that.tabCon[j],"on"):utils.removeClass(that.tabCon[j],"on")
                    }
                }
                if(tarTag=="LI"&&utils.hasClass(tar.parentNode,"classify")){
                    utils.css(utils.fistEleChild(tar),{"color":"#e54077"});
                    utils.css(utils.lastEleChild(tar),{"color":"#e54077"});

                    utils.addClass(tar,"on");
                    for(var i=0;i<sib.length;i++){
                        utils.removeClass(sib[i],"on");
                    }
                    for(var j=0;j<that.tabWrap.length;j++){
                        j==index?utils.addClass(that.tabWrap[j],"on"):utils.removeClass(that.tabWrap[j],"on")
                    }
                }
                tar.onmouseleave=function(e){
                    e=e||window.event;
                    var tar= e.target|| e.srcElement,
                        tarTag=tar.tagName.toUpperCase();
                    if(tarTag=="LI"&&utils.hasClass(tar.parentNode,"classify")){
                        utils.css(utils.lastEleChild(tar),{"color":"#000"});
                        utils.css(utils.fistEleChild(tar),{"color":"#000"});
                        utils.removeClass(tar,"on");
                    }
                    for(var j=0;j<that.tabWrap.length;j++){
                        utils.removeClass(that.tabWrap[j],"on")
                    }
                };
                that.tabWrap.onmouseover=function(e){
                    e=e||window.event;
                    var tar= e.target|| e.srcElement;
                        index=utils.index(tar);
                    var lis= utils.children(utils.parent(tar));
                        console.log(lis);
                        for(var j=0;j<that.tabWrap.length;j++){
                            j==index?utils.addClass(that.tabWrap[j],"on"):utils.removeClass(that.tabWrap[j],"on")
                        }
                    for(var j=0;j<that.tabWrap.length;j++){
                        utils.removeClass(that.tabWrap[j],"on")
                    }
                }
            };

        }
    };
    window.TabClass=TabClass;
})();
new TabClass("tab_change1");
new TabClass("tab_change2");


