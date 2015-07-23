$(".chosen-select").chosen({
    width: "65%",
    disable_search_threshold: 10
});

var tiles = [];
var map = [[], []];
var newPiece = {};

$.getJSON('crypt.json', function (data) {
    tiles = data.tiles;
});

function genMap() {
    var eligibleTiles = [];
    var height = $("#map-height").val();
    var width = $("#map-width").val();
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

$(".gen-button").click(function () {
    $(".tile").remove();
    $("br").remove();
    genMap();
});