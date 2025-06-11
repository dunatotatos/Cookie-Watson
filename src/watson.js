//Global variables
var lastCompatibleVersion = 2.052

if (Game.version > lastCompatibleVersion) {
    console.log("WARNING: The Cookie Clicker version is newer than this version of Cookie Watson.");
}

// Init script
var Watson = {};

Watson.loadInterval = setInterval(function () {
    if (Game && Game.ready) {
        clearInterval(Watson.loadInterval);
        Watson.init();
    }
}, 1000);

Watson.init = function() {
    Watson.autoClick();
    Watson.autoWrinklers();
    Game.Notify('Watson', 'The game is in auto-pilot now.', [0,21]);
}

// Cookie auto clicker
Watson.autoClick = function() {
    setInterval(function() {
        Game.ClickCookie();
    }, 50);
}

// Wrinklers auto popping
Watson.autoWrinklers = function() {
    setInterval(function() {
        // Count existing wrinklers, and find the fattest
        var currentWrinklers = 0;
        var idFattest = 0;
        var suckedByFattest = 0;

        for (let i=0; i<Game.wrinklers.length; i++) {
            if (Game.wrinklers[i].sucked != 0) {
                currentWrinklers += 1;
            }
            if (Game.wrinklers[i].type == 0 && Game.wrinklers[i].sucked > suckedByFattest) {
                idFattest = i;
            }
        }

        // If too may wrinklers, pop the fattest.
        if(currentWrinklers >= Game.getWrinklersMax() - 1) {
            Game.wrinklers[idFattest].hp = 0;
        }
    }, 1000);
}
