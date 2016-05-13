/*
 * robotMaze.js
 *
 * The blue key is inside a labyrinth, and extracting
 * it will not be easy.
 *
 * It's a good thing that you're a AI expert, or
 * we would have to leave empty-handed.
 */

function startLevel(map) {
    // Hint: you can press R or 5 to "rest" and not move the
    // player, while the robot moves around.

    map.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    map.placePlayer(map.getWidth()-1, map.getHeight()-1);
    var player = map.getPlayer();

    map.defineObject('robot', {
        'type': 'dynamic',
        'symbol': 'R',
        'color': 'gray',
        'onCollision': function (player, me) {
            me.giveItemTo(player, 'blueKey');
        },
        'behavior': function (me) {
if (!me.last_move) me.last_move = 'right';
if (me.last_move == 'right') {
if (me.canMove('up')) {
me.last_move = 'up';
me.move('up');
} else if (me.canMove('right')) {
me.last_move = 'right';
me.move('right');
} else if (me.canMove('down')) {
me.last_move = 'down';
me.move('down');
} else if (me.canMove('left')) {
me.last_move = 'left';
me.move('left');
}
} else if (me.last_move == 'up') {
if (me.canMove('left')) {
me.last_move = 'left';
me.move('left');
} else if (me.canMove('up')) {
me.last_move = 'up';
me.move('up');
} else if (me.canMove('right')) {
me.last_move = 'right';
me.move('right');
} else if (me.canMove('down')) {
me.last_move = 'down';
me.move('down');
}
} else if (me.last_move == 'left') {
if (me.canMove('down')) {
me.last_move = 'down';
me.move('down');
} else if (me.canMove('left')) {
me.last_move = 'left';
me.move('left');
} else if (me.canMove('up')) {
me.last_move = 'up';
me.move('up');
} else if (me.canMove('right')) {
me.last_move = 'right';
me.move('right');
}
} else if (me.last_move == 'down') {
if (me.canMove('right')) {
me.last_move = 'right';
me.move('right');
} else if (me.canMove('down')) {
me.last_move = 'down';
me.move('down');
} else if (me.canMove('left')) {
me.last_move = 'left';
me.move('left');
} else if (me.canMove('up')) {
me.last_move = 'up';
me.move('up');
}
} 
        }
    });

    map.defineObject('barrier', {
        'symbol': '░',
        'color': 'purple',
        'impassable': true,
        'passableFor': ['robot']
    });

    map.placeObject(0, map.getHeight() - 1, 'exit');
    map.placeObject(1, 1, 'robot');
    map.placeObject(map.getWidth() - 2, 8, 'blueKey');
    map.placeObject(map.getWidth() - 2, 9, 'barrier');

    var autoGeneratedMaze = new ROT.Map.DividedMaze(map.getWidth(), 10);
    autoGeneratedMaze.create( function (x, y, mapValue) {
        // don't write maze over robot or barrier
        if ((x == 1 && y == 1) || (x == map.getWidth() - 2 && y >= 8)) {
            return 0;
        } else if (mapValue === 1) { //0 is empty space 1 is wall
            map.placeObject(x,y, 'block');
        } else {
            map.placeObject(x,y,'empty');
        }
    });
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
    map.validateExactlyXManyObjects(1, 'robot');
    map.validateAtMostXObjects(1, 'blueKey');
}

function onExit(map) {
    if (!map.getPlayer().hasItem('blueKey')) {
        map.writeStatus("We need to get that key!");
        return false;
    } else {
        return true;
    }
}
 
