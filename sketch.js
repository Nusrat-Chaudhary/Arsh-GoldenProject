var player, playerImg;
var alien, alienImg;
var bullet, bulletImg;
var missile, missileImg;
var bgImg, baseImg;
var score = 0, heart= 3,heartSprite ,heartImg;
var  lifeSheildImg;


function preload() {
    bgImg = loadImage("Images/bgblack.jpg");
    baseImg = loadImage("Images/bgblue.jpg");
    playerImg = loadImage("Images/spaceship.png");
    alienImg = loadImage("Images/alienspaceship.png");
    missileImg = loadImage("Images/missile.png");
    lifeSheildImg = loadImage("Images/lifeshield.png");
    heartImg=loadImage("Images/heart.png")

}

function setup() {
    canvas = createCanvas(900, 680);
    bg = createSprite(450, 200);
    bg.addImage(bgImg);
    base = createSprite(450, 660);
    base.addImage(baseImg);
    base.scale = 0.5
    player = createSprite(450, 560);
    player.addImage(playerImg);
    player.scale = 0.8;
    heartSprite= createSprite(50,650);
    heartSprite.addImage(heartImg) 
    heartSprite.scale=0.04;

    alienGroup = createGroup();
    missileGroup = createGroup();
}

function draw() {

    bg.velocityY = 10;

    if (keyDown("LEFT_ARROW")) {
        player.x = player.x - 10;
    }
    if (keyDown("RIGHT_ARROW")) {
        player.x = player.x + 10;
    }

    if (bg.y < 600) {
        bg.y = bg.height / 2;
    }

    spawnMissile();
    spawnAlien();
    if (missileGroup.isTouching(alienGroup)) {
        for (var i = 0; i < alienGroup.length; i++) {
            if (alienGroup.contains(alienGroup.get(i))) {
                if (missileGroup.isTouching(alienGroup.get(i))) {

                    alienGroup.get(i).destroy();
                    missileGroup.destroyEach()
                    score = score + 1;
                }
            }
        }
    }
    if (player.isTouching(alienGroup)) {
        for (var i = 0; i < alienGroup.length; i++) {
            if (alienGroup.contains(alienGroup.get(i))) {
                if (player.isTouching(alienGroup.get(i))) {

                    alienGroup.get(i).destroy();
                
                    heart = heart - 1;
                }
            }
        }
    }
   
    drawSprites();

    fill(0);
    stroke("#FF8D1A");
    textSize(20)
    text("SCORE :  " + score, 750, 650);
    text(" :   " + heart, 70, 660);
}

function spawnMissile() {
    missile = createSprite(player.x, 500);
    missile.addImage(missileImg);
    missile.scale = 0.1;

    if (keyWentDown("space")) {
        missile.visible = true;
        missile.velocityY = -10;
    }
    else {
        missile.visible = false;
    }
    missile.lifetime = 500;
    missileGroup.add(missile);
}

function spawnAlien() {
    if (frameCount % 100 === 0) {
        alien = createSprite(random(10, 870), -25);
        alien.addImage(alienImg);
        alien.scale = 0.5;
        alien.velocityY = 2 + score/5;
        alien.lifetime = 1000;
        alienGroup.add(alien);
    }
}