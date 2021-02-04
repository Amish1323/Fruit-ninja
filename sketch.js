var PLAY=1;
var END=0;
var gameState=1
var sword;
var score = 0;
var swordImage,gameImage;
var fruit1,fruit2,fruit3,fruit4;
var alien1,alien2;
var gameOverSound,knifeSound;


function preload(){
  swordImage = loadImage("sword.png");
 fruit1 = loadImage("fruit1.png");
   fruit2 = loadImage("fruit2.png");
   fruit3 = loadImage("fruit3.png");
   fruit4 = loadImage("fruit4.png");
  alien1 = loadImage("alien1.png");
  alien2 = loadImage("alien2.png");
  gameImage = loadImage("gameover.png")
   gameOverSound = loadSound("gameover.mp3");
  knifeSound = loadSound("knifeSwooshSound.mp3")
  
  
}

function setup(){
  createCanvas(400,400);
  
  sword = createSprite(200,200,20,20);
  
  
  fruitGroup = new Group();
  enemyGroup = new Group();
}


function draw(){
 background("lightblue");
  text("Score : "+ score,300,50);
  
  
   if(gameState === PLAY){
     sword.y = World.mouseY;
     sword.x = World.mouseX;
     
     sword.addImage(swordImage);
  sword.scale = 0.7
     
     if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       knifeSound.play()
       score = score+2
     }
     
     if(enemyGroup.isTouching(sword)){
       gameState = END;
      gameOverSound.play()
     }
     
     fruits();
     Enemy();
   }
  else if(gameState === END){
    sword.addImage(gameImage);
    sword.scale = 1.1
    sword.x = 200;
    sword.y = 200;
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    
    text("Press Space To Restart",130,50)
      score = 0
       
    
    if(keyDown("space")){
      gameState = PLAY
      }
  }
  
  

  drawSprites();
}
function fruits(){
  if(World.frameCount%80===0){
    fruit = createSprite(400,200,20,20);
    var position = Math.round(random(1,2));
    if (position == 1){
      fruit1.x = 400;
      fruit1.velocityX = -(7+(score/4));
    }
    else{
      fruit1.x = 0;
      fruit1.velocityX = 7+(score/4)
    }
    
    
    
    fruit.scale = 0.2;
    
    var r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    } else if (r == 2){
      fruit.addImage(fruit2);
    } else if (r == 3){
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
     }
  
    fruit.y = Math.round(random(50,340));
    
    
    fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
}
}
function Enemy(){
  if(World.frameCount%200===0){
     alien = createSprite(400,200,20,20);
    alien.addImage(alien1);
    alien.y = Math.round(random(100,300));
    alien.velocityX = -(8+(score/10));
    alien.setLifetime = 50;
    
    enemyGroup.add(alien);
  }
}

