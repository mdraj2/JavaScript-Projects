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
    var track = {
        current: null,
        playing: false
    }
    return {
        getASCIIkeys: function() {
            return ASCIIConvertor();
        },
        
        getLastplayedTrack: function() {
            return track
        }
    }
})();

// View -> Render the page 
var UIController = (function() {
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
    //Listen to key fired and if true
    //Toggle sound and show the growth of the key
    };

    function keyCheck(el) {
        audioObj = KeyCtrl.getLastplayedTrack();
        if(!audioObj.playing){
            for(var i = 0; i < ASCIIkeys.length; i++){
                if(el.keyCode === ASCIIkeys[i]) {
                    //Make the lighting effects
                    //'.keyboard__key--' + '0'
                    audioObj.playing = true;
                    audioObj.current = el.keyCode;
                    var classString = UICtrl.getDOMStrings().keyboard + i;
                    var keyboard = document.querySelector(classString);
                    keyboard.classList.toggle('keyboard__key--active');
                    //introduce the noise
                    const audio = document.querySelector(classString + ' audio');
                    audio.play();
                    setTimeout(function(){ 
                        audioObj.playing = false;
                        keyboard.classList.toggle('keyboard__key--active'); }
                        , audio.duration*1000);
                }
            }
        }
    } 

    return {
        init : function() {
            setUpEventListeners();
        }
    }
})(KeyboardController,UIController);

controller.init();