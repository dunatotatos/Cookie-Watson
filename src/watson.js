// Disble with :
// clearInterval(autoclick);
InitBot = function() {
    var checkReady = setInterval(function() {
        if (typeof Game.ready !== 'undefined' && Game.ready) {
            // Remove click sound
            Game.playCookieClickSound=function(){return};

            // Cookie autoclick
            var autoclick = setInterval(function() {
                Game.ClickCookie();
            }, 50);
        }
    }, 1000)
}

InitBot();
