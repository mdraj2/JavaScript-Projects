// Model -> Keyboard
var KeyboardController = (function () {
    var keys = ['A','S','D','F','G','H','J','K','L'];
    function ASCIIConvertor () {
        var ASCIICode = [];
        for(var i = 0; i < keys.length; i++) {
            ASCIICode[i] = keys[i].charCodeAt(0);
        }
        return ASCIICode;
    };
    //return the converted key
    return {
        getASCIIkeys: function() {
            return ASCIIConvertor();
        }
    }
})();
// View -> Render the page 
var UIController = (function() {
    //Save class names
    var DOMstrings = {
        keyboard: '.keyboard__key--'
    };
    return {
        getDOMStrings: function() { return DOMstrings}
    }
})();

// Controller -> Will handle dom events and delegation
var controller = (function(KeyCtrl, UICtrl) {
    function setUpEventListeners () {
    //Get all the listening keys
    ASCIIkeys = KeyCtrl.getASCIIkeys();
    //Attach event listen to global object
    document.addEventListener('keydown',keyCheck);
    };

    function keyCheck(el) {
        for(var i = 0; i < ASCIIkeys.length; i++){
            if(el.keyCode === ASCIIkeys[i]) {
                // e.g '.keyboard__key--' + '0'
                var classString = UICtrl.getDOMStrings().keyboard + i;
                var keyboard = document.querySelector(classString);
                // selector of the audio element that is a child of `keybord__key--${i}`
                var audio = document.querySelector(classString + ' audio');
                audio.currentTime = 0;
                audio.play();
                audio.onplaying = function (el) {
                    keyboard.classList.toggle('keyboard__key--active',true);
                };
                audio.onended = function(el) {
                    keyboard.classList.toggle('keyboard__key--active',false);
                };
            }
        }
    }  
    return {
        init : function() {
            setUpEventListeners();
            console.log('loaded JS');
        }
    }
})(KeyboardController,UIController);

controller.init();