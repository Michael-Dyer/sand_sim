let w;
let columns;
let rows;

//two arrays to control board and next step
let board;
let next;

//find location of mouse to put into board array
let saved_x =1;
let saved_y =1;


function setup() {
  createCanvas(720, 400);
  //width of the cells
  w = 11;
  // Calculate columns and rows
  columns = floor(width / w);
  rows = floor(height / w);
  //gen 2d array
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  // Going to use multiple 2D arrays and swap them
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  //init arrays
  make();
}

function draw() {
  background(255);
  generate();
  //show arr visually 
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) { 
      if ((board[i][j] > 0)) fill(235, 213, 52);
      
      else fill(255);
      strokeWeight(0.05);
      
      rect(i * w, j * w, w-1, w-1);
    }
  }
  
  
  
  
}

function generate(){
  
  //gen sand if mouse is over and pressed
  if (mouseIsPressed){
    
      //avoids out of bound error
      if(saved_x < 3){
        saved_x = 3;
      }
      board[saved_x][saved_y] = 1; 
  }
  else{
    board[saved_x][saved_y] = 0;
  }
  
  //this loop will control sand motion  and find x y cords
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      
      //little math to determine which square mouse is over
      let xx = x*w;
      let yy = y*w;
      if (mouseX > xx && mouseX < (xx + w) && mouseY > yy && mouseY < (yy + w)) {  
        
      saved_x = floor(xx/w);
      saved_y = floor(yy/w);
      
      }
      
      
      
      //check if spot exists
      if (board[x][y] == 1) {
        
        //if blank underneath, move down
        //the reason i check for next being 0 is
        //so the sand can fall normally with sand above
        if (next[x][y+1] == 0){
          next[x][y+1] = 1;
          board[x][y] = 0;
        }
        //if the board contains sand beneath it
        else if(board[x][y+1] != 0){
          
          //checks to see if sand is to either side
          //these three conditionals determine the physics
         if(board[x-1][y+1] == 0 && x >= 2) {
          next[x-1][y+1] = 1;
           board[x][y] = 0;
         }
         else if(board[x][y+1] == 0 && x<= columns-4) {
          next[x+1][y+1] = 1;
           board[x][y] = 0;
         }
          else{
          next[x][y] = 1;
          }
          
          
        }
        
      }
      
    
    }
  }
  
  
  //this will change states
  let temp = board;
  board = next;
  next = temp;
}//end of generate


function make(){
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      board[x][y] = 0;
      next[x][y] = 0;
      if (y == rows-1){
        board[x][y] = 2;
        next[x][y] = 2;
      }
    }
  }
}

