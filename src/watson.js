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
    Watson.loadAutoMarket();
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
                suckedByFattest = Game.wrinklers[i].sucked
            }
        }

        // If too may wrinklers, pop the fattest.
        if(currentWrinklers >= Game.getWrinklersMax() - 1) {
            Game.wrinklers[idFattest].hp = 0;
        }
    }, 1000);
}

// Auto market
Watson.loadAutoMarket = function() {
    autoMarketLoader = setInterval(function() {
        if (Game.Objects.Bank.minigameLoaded) {
            Watson.autoMarket();
            clearInterval(autoMarketLoader);
        }
    }, 1000);
}

// Strategy is to buy while the prices rise, and sell when it does not rise anymore. All other modes
// are ignored.
Watson.autoMarket = function() {
    // Modes:
    // 0: Stable
    // 1: Slow rise
    // 2: Slow fall
    // 3: Fast rise
    // 4: Fast fall
    // 5: Chaotic
    var market = Game.Objects.Bank.minigame
    setInterval(function() {
        for (let i=0; i < market.goodsById.length; i++){
            var good = market.goodsById[i]
            if (good.active) {
                var maxGoods = parseInt(good.stockMaxL.innerText.replace(/[^0-9]/g,""));
                // Buy in fast or slow rise mode
                if ([1,3].includes(good.mode)) {
                    if (good.stock != maxGoods) {
                        market.buyGood(i, maxGoods);
                        console.log("Buy ", good.name);
                    }
                } else {
                    if (good.stock != 0) {
                        market.sellGood(i, maxGoods);
                        console.log("Sell ", good.name);
                    }
                }
            }
        }
    }, 60000);
}
