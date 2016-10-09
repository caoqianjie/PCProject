/**
 * Created by Administrator on 2016/8/1.
 */
var animate = (function () {
    function move(ele, target, duration, effect, callback) {
        window.clearInterval(timer)
        var objEffect = {
            linear: function (t, b, c, d) {
                return t / d * c + b;
            }
        }
        var tempEffect = objEffect.linear;
        if (typeof effect == "number") {
            switch (effect) {
                case 0:
                    tempEffect = objEffect.linear;
                    break;
            }
        } else if (effect instanceof Array) {
            tempEffect = objEffect[effect[0]][effect[1]];
        } else if (typeof effect == "function") {
            callback = effect;
        }
        var time = 0, begin = {}, change = {}, interval = 10;
        for (var key in target) {
            begin[key] = utils.css(ele, key);
            change[key] = target[key] - begin[key];
        }
        var timer = window.setInterval(function () {
            time += interval;
            if(time>=duration){
                window.clearInterval(timer)
                utils.css(ele,target);
                if(typeof callback=="function"){
                    callback.call(ele);
                    return;
                }
            }
            for (var attr in change) {
                if (change[attr]) {
                    var curPosition = tempEffect(time, begin[attr], change[attr], duration);
                    utils.css(ele,attr,curPosition)
                }
            }
        },interval)
    };
    return move;
})();