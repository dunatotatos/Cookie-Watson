//Global variables
var lastCompatibleVersion = 2.052

if (Game.version > lastCompatibleVersion) {
    console.log("WARNING: The Cookie Clicker version is newer than this version of Cookie Watson.");
}

// Init script
Watson.loadInterval = setInterval(function () {
    if (Game && Game.ready) {
        clearInterval(Watson.loadInterval);
        watsonInit();
    }
}, 1000);

watsonInit = function() {
    Game.Notify('Watson', 'The game is in auto-pilot now.', [0,21]);
}

// Obsolete
InitBot = function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            // Remove click sound
            Game.playCookieClickSound=function(){return};

            // Cookie autoclick
            var autoclick = setInterval(function() {
                Game.ClickCookie();
            }, 50);

            // Notify that the mod is loaded
            Game.Notify('Watson','The game is in auto-pilot, now.',[0, 21]);
        }
    }, 1000)
}
