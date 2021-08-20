var dog,sadDog,happyDog;
var feedPet,addFodd;
var foodStock,foodStockValue;
var foodObj;
var database;
var foods,lastFed,getFoodStock;
var feedTime;
var foodS

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database();
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feedPet = createButton("Feed The Dog")
  feedPet.position(700,95);
  feedPet.mousePressed(feedDog);

  addFodd = createButton("add Food");
  addFodd.position(800,95);
  addFodd.mousePressed(addFoods);

  foodObj = new Food()
  foodStock = database.ref('Food')
  foodStock.on("value",readStock)

}

function draw() {
  background(46,139,87);
  foodObj.display();
  feedTime = database.ref("feedTime")
  feedTime.on("value",function(data){
    lastFed=data.val()
  })

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val()
  foodObj.updatefoodStock(foodS)
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog)
  
  if(foodObj.getFoodStock()<=0) {
    foodObj.updatefoodStock(foodObj.getFoodStock()*0)
  }
    else{
      foodObj.updatefoodStock(foodObj.getFoodStock()-1)
    }
    
    
  }


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}