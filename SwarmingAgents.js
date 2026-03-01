function jitter(){
  return random(-0.05,0.05);
}

class agent {
  //Agent initalization
  constructor(maxSize,minSize,agentHue) {
    //Randomize starting location
    this.x = random(width);
    this.y = random(height);
    
    //Randomize starting velocity
    this.velX = random(-0.5,0.5);
    this.velY = random(-0.5,0.5);
    
    //Randomize size within constraints
    this.size = random(minSize,maxSize);
    
    //Slightly vary color
    this.hue = agentHue;
    this.sat = 60 + random(-15,15);
    this.light = 55 + random(-15,15);
  }
  
  //Drawing an agent
  draw(){
    colorMode(HSL);
    
    let offsetX = abs(this.velX-0.5)*(this.size/3);
    let offsetY = abs(this.velY-0.5)*(this.size/3);
  
    //legs
    stroke(0)
    strokeWeight(this.size/8);
    line(this.x,
         this.y,
         this.x+offsetX+jitter(),
         this.y+offsetY+jitter())
    line(this.x,
         this.y,
         this.x+offsetX+jitter(),
         this.y-offsetY+jitter())
    line(this.x,
         this.y,
         this.x-offsetX+jitter(),
         this.y+offsetY+jitter())
    line(this.x,
         this.y,
         this.x-offsetX+jitter(),
         this.y-offsetY+jitter())
    
    //body
    stroke(this.hue, this.sat, this.light);
    strokeWeight(this.size);
    point(this.x,this.y);
  }
  
  //Making an agent move
  move(){
    //Move in heading
    this.x += this.velX;
    this.y += this.velY;
    //Vary velocity ('wander')
    this.velX = constrain(random(this.velX-0.05,
                                 this.velX+0.05),
                          -1,1);
    this.velY = constrain(random(this.velY-0.05,
                                 this.velY+0.05),
                          -1,1);
    //Bring agents back from off-screen
    if (this.x >= width+20 || this.x <= -20)
    {this.velX = -this.velX}
    if (this.y >= height+20 || this.y <= -20)
    {this.velY = -this.velY}
  }
  
}

//VARIABLES
//Number of agents
  let agents = []
  let count  = 300 
//Size range for agents
  let maxSize = 15;
  let minSize = 7;
//Base hue for agents
  let agentHue = 0;
//Swarming/fleeing range
  let clickRange = 100;
//How long agent's trails are (recommended range: 1 - 0.01)
  let trailing = 1;

//CREATE AGENTS
function setup() {
  createCanvas(400, 400);
  
  for( let i = 0; i < count; i++ ) {
    let a = new agent(maxSize, minSize, agentHue);
    agents.push(a);
  }
}

//DRAW & HANDLE SWARMING
function draw() {
  //Set up drawing modes
  colorMode(HSL);
  noStroke();
  
  //Draw background
  background(80,50,80,trailing);
  
  //Draw agents
  for( let i = 0; i < count; i++ ) {
    agents[i].draw();
    
    //Check if mouse held and if agents in range
    if(mouseIsPressed &&
       abs(agents[i].x - mouseX) < clickRange &&
       abs(agents[i].y - mouseY) < clickRange){
      
      //If button left, swarm
      if(mouseButton == LEFT){
        agents[i].x = lerp(agents[i].x, mouseX, 0.02);
        agents[i].y = lerp(agents[i].y, mouseY, 0.02);
      }
      
      //If button right, flee
      if(mouseButton == RIGHT){
        //Create vector pointing away from mouse to current location
        let heading = createVector(agents[i].x - mouseX, 
                                   agents[i].y - mouseY);
        heading.normalize();
        //Set velocity to new vector
        agents[i].velX = heading.x;
        agents[i].velY = heading.y;
      }
    }
    
    //Move along heading with jitter
    agents[i].move();
    
  }
}

