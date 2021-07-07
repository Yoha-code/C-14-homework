var bow , arrow,  scene;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, backgroundImage;
var redsGroup, greensGroup, pinksGroup, bluesGroup, arrowsGroup;

var START = 0;
var PLAY = 1;
var WIN = 2;
var LOSE = 3;
var gameState = START;

var score=0;

function preload(){
  
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  //creating background
  scene = createSprite(0,0,400,400);
  scene.addImage(backgroundImage);
  scene.scale = 2.5
  
  // creating bow to shoot arrow
  bow = createSprite(380,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1;
  
  

   score = 0   
   redsGroup = new Group();
   greensGroup = new Group();
   pinksGroup = new Group();
   bluesGroup = new Group();
   arrowsGroup = new Group();
}
  



function draw() {
 
  background(0);
  
  
  if(gameState == START && keyWentDown("s")){
    gameState = PLAY;
  }

  if(gameState == PLAY){
    
    // moving ground
    scene.velocityX = -3 

    if (scene.x < 0){
      scene.x = scene.width/2;
    }
  
  //moving bow
  bow.y = World.mouseY
  
  // release arrow when space key is pressed
  if (keyWentDown("space")) {
     createArrow();
  }

  if(arrowsGroup.isTouching(redsGroup)){
     
    redsGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score + 1;  
  
  }

  if(arrowsGroup.isTouching(greensGroup)){
     
    greensGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score + 3;  
  
  }

  if(arrowsGroup.isTouching(bluesGroup)){
     
    bluesGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score + 1;  
  
  }

  if(arrowsGroup.isTouching(pinksGroup)){
     
    pinksGroup.destroyEach();
    arrowsGroup.destroyEach();
    score = score + 4;  
  
  }
 
  //creating continous enemies
 var select_balloon = Math.round(random(1,4));
  
 if (World.frameCount % 60 == 0) {
   
  switch(select_balloon){
    
    case 1 : redBalloon();
           break;
    case 2 : blueBalloon();
           break;
    case 3 : greenBalloon();
           break;
    case 4 : pinkBalloon();
           break;
    default : break;

    }

  }

 }

 if(score > 20){
   gameState = WIN;
 }

  drawSprites();
  
  fill("black");
  textSize(18);
  text("Score: "+ score, 300,50);
 
  if(gameState == START){
   
    fill("black");
    textSize(14);
    text("Press s to start", 140, 170)
    text("Pink balloons give 4 points, green gives 3, blue and red gives 1", 5, 205);
    text("Use space to shoot arrows at balloons, the goal is", 50, 240)
    text("to get more than 20 points.", 110, 275)
    
  }

  if(gameState == WIN){
    scene.velocityX = 0;
    fill("black");
    textSize(18);
    text("You Win! Wow!", 150, 190);
  }

  if(gameState == LOSE){
    screen.velocityX = 0;
    text("You Lose! Oh no!", 140, 190);
  }
}

// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(100, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;

  arrowsGroup.add(arrow);
}

function redBalloon() {
  var red = createSprite(0,Math.round(random(20, 370)), 10, 10);
  
  red.addImage(red_balloonImage);
  red.velocityX = 5;
  red.lifetime = 200;
  red.scale = 0.1;
  
  redsGroup.add(red);
}

function blueBalloon() {
  var blue = createSprite(0,Math.round(random(20, 370)), 10, 10);
  
  blue.addImage(blue_balloonImage);
  blue.velocityX = 5;
  blue.lifetime = 200;
  blue.scale = 0.1;
  
  bluesGroup.add(blue);
}

function greenBalloon() {
  var green = createSprite(0,Math.round(random(20, 370)), 10, 10);
  
  green.addImage(green_balloonImage);
  green.velocityX = 6;
  green.lifetime = 200;
  green.scale = 0.1;

  greensGroup.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0,Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX = 7;
  pink.lifetime = 200;
  pink.scale = 1

  pinksGroup.add(pink);
}
