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
    Game.Notify('Watson', 'The game is in auto-pilot now.', [0,21]);
}

// Cookie auto clicker
Watson.autoClick = function() {
    setInterval(function() {
        Game.ClickCookie();
    }, 50);
}
