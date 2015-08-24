// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed=(Math.floor(Math.random() * 8) +1 )*50;
    this.direction='right';
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Multiply any movement by dt to ensure the game runs at the same speed
// on any computer
// Reverse enemy's direction and change speed when it goes off screen
Enemy.prototype.update = function(dt) {
    if ((this.x<505) && (this.direction==='right')) {
        this.x += this.speed * dt;
    } else {
        this.speed=(Math.floor(Math.random() * 8) +1 )*50;
        this.direction='left';
    };

    if ((this.x>-101) && (this.direction==='left')) {
        this.sprite='images/enemy-bug-left.png';
        this.x -= this.speed * dt;
    }  else {
        this.direction='right';
        this.speed=(Math.floor(Math.random() * 8) +1 )*50;
        this.sprite='images/enemy-bug.png';
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Our hero
// Define initial position and avatar
var Player = function(){
    this.x = 200;
    this.y = 390;
    this.sprite = 'images/char-pink-girl.png';
};

// Update player's position
Player.prototype.update = function(dt) {
    this.x = this.x;
    this.y = this.y;
    this.checkCollision();
};

// Draw player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define movement and boudaries to keep player on screen
Player.prototype.handleInput = function(keyInput) {
    switch(keyInput) {
        case 'up':
            if(this.y <= 58) {
                this.resetPosition();
                break;
            }
            else {
                this.y -= 83;
                break;
            }

        case 'down':
            if(this.y >= 390) {
                return null;
            }
            else {
                this.y += 83;
                break;
            }

        case 'left':
            if(this.x <= -2) {
                return null;
            }
            else {
                this.x -= 101;
                break;
            }

        case 'right':
            if(this.x >= 402) {
                return null;
            }
            else {
                this.x += 101;
                break;
            }
    }
};

// Called by the player prototype's update method
// to see if player overlaps with any of the enemies
Player.prototype.checkCollision = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if(Math.abs(player.x - allEnemies[i].x) < 50 && Math.abs(player.y - allEnemies[i].y) < 42) {
            this.resetPosition();
        }
    }
};

// Place player in starting position
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 390;
};

// Instantiate player and enemies.
// Place all enemy objects in an array called allEnemies
var player = new Player();
var amy = new Enemy (400, 60);
var ben = new Enemy (200, 145);
var carl = new Enemy (100, 228);

var allEnemies = [amy, ben, carl];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
// Add WASD keys
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
        68: 'right',
        83: 'down',
        87: 'up'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});