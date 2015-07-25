$(".chosen-select").chosen({
    width: "65%",
    disable_search_threshold: 10
});

var tiles = [];
var map = [];
var newPiece = {};

$.getJSON('crypt.json', function (data) {
    tiles = data.tiles;
});

function genMap(width, height) {
    var eligibleTiles = [];
    console.log(height + " is the height!");
    console.log(width + " is the width!");
    for (i = 0; i < height; i++) {
        map.push([]);
        for (j = 0; j < width; j++) {
            map[i].push([]);
            //Check if first tile
            if (i === 0 && j === 0) {
                newPiece = tiles[Math.floor(Math.random() * tiles.length)];
                map[i][j] = newPiece;
            } else {
                //clear eligible tiles for next position
                eligibleTiles = [];
                //loop through available tiles checking compatibility with surrounding tiles
                for (k = 0; k < tiles.length; k++) {
                    //check if first row to avoid checking non-existant row above
                    if (i === 0) {
                        if (map[i][j - 1].right === tiles[k].left) {
                            eligibleTiles.push(tiles[k]);
                        }
                    } else {
                        //check if first column to avoid checking non-existant column before
                        if (j === 0) {
                            if (map[i - 1][j].bottom === tiles[k].top) {
                                eligibleTiles.push(tiles[k]);
                            }
                        } else {
                            if (map[i][j - 1].right === tiles[k].left) {
                                if (map[i - 1][j].bottom === tiles[k].top) {
                                    eligibleTiles.push(tiles[k]);
                                }
                            }
                        }
                    }
                }
                //select random eligible tile and add to map
                newPiece = eligibleTiles[Math.floor(Math.random() * eligibleTiles.length)];
                map[i][j] = newPiece;
            }
        }
    }
    for (i = 0; i < height; i++) {
        for (j = 0; j < width; j++) {
            $(".map-display").append('<img src="' + map[i][j].link + '" class="tile">');
        }
        $(".map-display").append('<br>');
    }
};

function mapRestyling(width) {
    var width = $("#map-width").val();
    if(width === "5") {
        $(".tile").css("width", "20%");
    } else if(width === "10") {
        $(".tile").css("width", "10%");
    } else if (width === "15") {
        $(".tile").css("width", "6.66%");
    } else if (width === "20") {
        $(".tile").css("width", "5%");
    } else if (width === "25") {
        $(".tile").css("width", "4%");
    } else if (width === "30") {
        $(".tile").css("width", "3.33%");
    }
};

$(".gen-button").click(function () {    
    var width = $("#map-width").val();
    var height = $("#map-height").val();
    $(".tile").remove();
    $(".map-display br").remove();
    genMap(width, height);
    mapRestyling(width)
});