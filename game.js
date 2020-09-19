//Creating canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

//Linking images
var heroPic = document.getElementById("heroPic");
var monsterPic = document.getElementById("monsterPic");
var grass = document.getElementById("grass");
var tree = document.getElementById("tree");
var weapon = document.getElementById("weapon");

//Game variables
var breakspeed = 0;
var numberOfEnemies = 25;
var numberOfTrees = 115;

//Canvas Styling
canvas.style.position = "absolute";
canvas.style.left = 0;
canvas.style.top = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.width = window.innerWidth + "px";
canvas.style.height = window.innerHeight + "px";
canvas.style.backgroundColor = "white";
document.body.appendChild(canvas);

//creating hero
var hero = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 30,
    height: 30,
    goRight: false,
    goLeft: false,
    goUp: false,
    goDown: false,
    draw: function() {
        ctx.drawImage(heroPic, this.x, this.y, this.width, this.height);
    },
    update: function() {
        
        
        if(this.goLeft && this.x > 0) this.x -= 3;
        else if(this.goRight && this.x < canvas.width - this.width) this.x += 3;
        else if(this.goUp && this.y > 0) this.y -= 3;
        else if(this.goDown && this.y < canvas.height - this.height) this.y += 3;
        
        //collision detection with tree
        for(i = 0; i < trees.length; i++) {
            if(this.x < trees[i].x + trees[i].width && this.x + this.width > trees[i].x && this.y < trees[i].y + trees[i].height && this.y + this.height > trees[i].y) {
                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.fillText("You came in contact with a tree.", 10, 65);
                if(breakspeed > 25) {
                    trees.splice(i, 1);
                    breakspeed = 0;
                }
                if(breakspeed > 1) {
                    breakmeter.draw();
                }
            }
        }
        //collision detection with enemy
        for(i = 0; i < enemies.length; i++) {
            if(this.x < enemies[i].x + enemies[i].width && this.x + this.width > enemies[i].x && this.y < enemies[i].y + enemies[i].height && this.y + this.height > enemies[i].y) {
                ctx.font = "20px Verdana";
                ctx.fillStyle = "white";
                ctx.fillText("You came in contact with an enemy.", 10, 65);
            }
        }
        //collision detection with sword
        if(this.x < sword.x + sword.width && this.x + this.width > sword.x && this.y < sword.y + sword.height && this.y + this.height > sword.y) {
            //currently do nothing    
        }
    },
}
//creating and drawing the enemies

    function Enemy() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 30;
        this.height = 30;
        this.goLeft = false;
        this.goRight = false;
        this.goUp = false;
        this.goDown = false;
        this.cooldown = 0;
        this.update = function() {
            this.cooldown++;
            //Random Path
            if(this.cooldown > 30 + Math.random() * 20) {
                this.goLeft = false;
                this.goRight = false;
                this.goUp = false;
                this.goDown = false;
                switch(Math.floor(Math.random() * 4)) {
                    case 0:
                        this.goRight = true;
                        break;
                    case 1:
                        this.goLeft = true;
                        break;
                    case 2:
                        this.goUp = true;
                        break;
                    case 3:
                        this.goDown = true;
                        break;
                }
                this.cooldown = 0;
            }
            if(this.goLeft && this.x > 0) this.x -= 1;
            else if(this.goRight && this.x < canvas.width - this.width) this.x += 1;
            else if(this.goUp && this.y > 0) this.y -= 1;
            else if(this.goDown && this.y < canvas.height - this.height) this.y += 1;
            ctx.drawImage(monsterPic, this.x, this.y, this.width, this.height);
        }
    }
var enemies = [];
for(i = 0; i < numberOfEnemies; i++) {
    enemies.push(new Enemy());
}

var healthbar = {
    x: 600,
    y: 200,
    width: 100,
    height: 20,
}

//creating the weapon
var sword = {
    x: Math.random() * canvas.width,
    y: 442,
    width: 20,
    height: 20,
    goUp: true,
    goDown: false,
    draw: function() {
        ctx.drawImage(weapon, this.x, this.y, this.width, this.height);
    },
    update: function() {
        if(this.goDown) this.y += 0.13;
        if(this.goUp) this.y -= 0.13;
        if(this.goUp && this.y < 440) {
            this.goDown = true;
            this.goUp = false;
        }
        if(this.goDown && this.y > 443) {
            this.goDown = false;
            this.goUp = true;
        }
    },
}
//creating and drawing trees

    function Tree() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.width = 40;
        this.height = 40;
        this.update = function() {
            ctx.drawImage(tree, this.x, this.y, this.width, this.height);
        }
    }
var trees = [];
for(i = 0; i < numberOfTrees; i++) {
    trees.push(new Tree());
}
//keyboard functions
document.addEventListener("keydown", function(e) {
    //arrowkeys
    if(e.keyCode === 37) {
        hero.goLeft = true;
    }
    if(e.keyCode === 38) {
        hero.goUp = true;
    }
    if(e.keyCode === 39) {
        hero.goRight = true;
    }
    if(e.keyCode === 40) {
        hero.goDown = true;
    }
    //wasd
    if(e.keyCode === 65) {
        hero.goLeft = true;
    }
    if(e.keyCode === 87) {
        hero.goUp = true;
    }
    if(e.keyCode === 68) {
        hero.goRight = true;
    }
    if(e.keyCode === 83) {
        hero.goDown = true;
    }
})
document.addEventListener("keyup", function(e) {
    //arrowkeys
    if(e.keyCode === 37) {
        hero.goLeft = false;
    }
    if(e.keyCode === 38) {
        hero.goUp = false;
    }
    if(e.keyCode === 39) {
        hero.goRight = false;
    }
    if(e.keyCode === 40) {
        hero.goDown = false;
    }
    //wasd
    if(e.keyCode === 65) {
        hero.goLeft = false;
    }
    if(e.keyCode === 87) {
        hero.goUp = false;
    }
    if(e.keyCode === 68) {
        hero.goRight = false;
    }
    if(e.keyCode === 83) {
        hero.goDown = false;
    }
})
var mapArray = [];

function updateEnemies() {
    //drawing and updating enemies
    for(i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }
}

function gameLoop() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < 32; i++) {
        mapArray[i] = [];
        for(var k = 0; k < 50; k++) {
            mapArray[i][k] = Math.random();
        }
    }
    var x = 0;
    var y = 0;
    for(i = 0; i < mapArray.length; i++) {
        for(j = 0; j < mapArray[i].length; j++) {
            if(mapArray[i][j] < 2) {
                ctx.drawImage(grass, x, y, 32, 32);
            }
            x += 32;
        }
        y += 32;
        x = 0;
    }
    //drawing trees
    for(i = 0; i < trees.length; i++) {
        trees[i].update();
    }

    updateEnemies();
    hero.update();
    hero.draw();
    sword.update();
    sword.draw();
    window.requestAnimationFrame(gameLoop);
}
gameLoop();