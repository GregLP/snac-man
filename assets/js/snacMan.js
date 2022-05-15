Object.keys = Object.keys || (function () {
    var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !{toString:null}.propertyIsEnumerable("toString"),
        DontEnums = [
            'toString',
            'toLocaleString',
            'valueOf',
            'hasOwnProperty',
            'isPrototypeOf',
            'propertyIsEnumerable',
            'constructor'
        ],
        DontEnumsLength = DontEnums.length;

    return function (o) {
        if (typeof o != "object" && typeof o != "function" || o === null)
            throw new TypeError("Object.keys called on a non-object");

        var result = [];
        for (var name in o) {
            if (hasOwnProperty.call(o, name))
                result.push(name);
        }

        if (hasDontEnumBug) {
            for (var i = 0; i < DontEnumsLength; i++) {
                if (hasOwnProperty.call(o, DontEnums[i]))
                    result.push(DontEnums[i]);
            }
        }

        return result;
    };
})();

var score = 0;
var badGuyPos2 = "99";
var isBlue = false;
var badGuyDead = false;
var chewable = true;
var prize1Chewable = false;
var chewablePrizes = [false, false, false];
var availablePrizes = [true, true, true];

var puzzle = getParameterByName("name");
var gameSongs = games[puzzle]["puzzle"];

var songs = Object.keys(gameSongs);

drawLives(2);

drawBoard();
placeSpaceship(spacePos, "test");
placeSpaceship(badGuyPos1, "badGuy1");
//placeSpaceship(badGuyPos2, "badGuy2");
stateChange();
