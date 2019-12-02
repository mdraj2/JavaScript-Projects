
var UIController = (function () {
    let DOMstrings = {
        hour: '.clock__time--hour',
        min : '.clock__time--min',
        sec : '.clock__time--sec',
    };

    return {
        getDOMstring: function () { return DOMstrings;},
        rotateHand :  function (hand,rotation) {
            hand.style.transform = `translate(100%,50%) rotate(${rotation}deg)`;
            if (window.getComputedStyle(hand).getPropertyValue('visibility') === "hidden") {
                hand.style.visibility = "visible";
            }
        }
    }
})();

var DataController = (function () {

    var date = new Date();
    var timeObj = {
        hour : (date.getHours()%12)|| 12,
        min : date.getMinutes(),
        sec : date.getSeconds()
    }

    return {
        getTime: function() {return timeObj;}
    }
})();

var Controller = (function(UICtrl,DataCtrl) {

    var currentTime = DataCtrl.getTime();
    var hour = currentTime.hour;
    var min = currentTime.min;
    var sec = currentTime.sec;
    
    var hourTick = document.querySelector(UICtrl.getDOMstring().hour);
    var minTick = document.querySelector(UICtrl.getDOMstring().min);
    var secTick = document.querySelector(UICtrl.getDOMstring().sec);

    return {
        init: function() {
            UICtrl.rotateHand(hourTick,((hour + ((min +(sec%60)/60)%60)/60)/12*360) -90);
            UICtrl.rotateHand(minTick,(min +(sec%60)/60)*360/60 - 90);
            UICtrl.rotateHand(secTick,sec*360/60 - 90);
            setInterval(function(){ 
                sec++;
                if(sec%60 === 0) {
                    min++;
                    if (min%60 === 0) {
                        console.log(hour);
                        hour++; 
                    }
                }
                UICtrl.rotateHand(hourTick,((hour + ((min +(sec%60)/60)%60)/60)/12*360) -90);
                UICtrl.rotateHand(minTick,(min +(sec%60)/60)*360/60 - 90);
                UICtrl.rotateHand(secTick,sec*360/60 - 90);
            }, 1000);
        }
    }

})(UIController,DataController);

Controller.init();







