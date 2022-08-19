var PLAY = 1;
var END = 0;

var submarine;
var submarineImg;
var sea;
var invBg;
var gameState = PLAY;
var obstacleGroup;
var start,startImg;

var diverImg, whaleImg;
var score=0;

var mySound 

function preload() {
  submarineImg = loadImage("images/sub.png")
  seaImg = loadImage("images/bg.png");
  diverImg = loadImage("images/obs2.png");
  whaleImg = loadImage("images/obs1.png");
  startImg = loadImage("images/1120358.jpg");
   mySound = loadSound("eating_sound.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sea = createSprite(500, windowHeight / 2, 10, 10);
  sea.addImage(seaImg);
 /* start=createSprite(windowWidth/2,windowHeight/1.9,20,20);
  start.addImage(startImg);*/
  
  sea.velocityX = -20;
  submarine = createSprite(windowWidth / 6, windowHeight / 2, 50, 50);
  submarine.addImage(submarineImg);
  submarine.scale = 1.5;
  invBg = createSprite(windowWidth / 2, windowHeight, windowWidth, 20);

  obstacleGroup = new Group();
}

function draw() {
  
   //  console.log(obstacleGroup.x)



   if (gameState === PLAY) {

    if (sea.x < 0) {

      sea.x = sea.width / 2;
    }


    if (keyWentDown("up")) {
      submarine.velocityY = -5;
    }
    if (keyWentUp("up")) {
      submarine.velocityY = 0;

    }
    if (keyWentUp("down")) {
      submarine.velocityY = 0;
    }
    if (keyWentDown("down")) {
      submarine.velocityY = 5;
    }
    invBg.visible = false;

    obstacles();

    for(var i=0; i<obstacleGroup.length; i++){
   
      if(obstacleGroup.get(i).x<38 && obstacleGroup.get(i).x>28){    
        score=score+10
        mySound.play()
      }
    }

   /* if(ObstacleGroup.x<=38){
        score=score+1;
    }*/
  }
  drawSprites();
  fill("white");
  textSize(20);
  text("Score= "+score,30,20); 

}

function obstacles() {
  
  if (World.frameCount % 80 === 0) {
    var obstacle = createSprite(width, 200, 20, 20);
    obstacle.y = Math.round(random(100, 1000));
    //create switch statement
    rand = Math.round(random(1, 2));
    switch (rand) {
      case 1: obstacle.addImage(whaleImg);
        break;
      case 2: obstacle.addImage(diverImg);
        break;
      default: break;


    }
    obstacle.velocityX = -10;
    obstacle.scale = 0.5;
    obstacle.depth = submarine.depth + 1;
    obstacleGroup.add(obstacle);
  }
}