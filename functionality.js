   function start()
{
   

let right , left , up , down ,x = 0 , shift_key , space , vy = 0 ; 
let frameX = 0;
let frameY = 0;
let charecter_animation_speed = 0;

const canvas = document.getElementById("canvas2");
const ctx = canvas.getContext("2d");
canvas.width = 1170;
canvas.height = 600;

const background = new Image();
background.src = "E:/project 1/Wallpaper-House.com_451352.jpg";

const  charecter_img_forward = new Image();
charecter_img_forward.src = "E:/project 1/shadow_dog.png";

const  charecter_img_backward = new Image();
charecter_img_backward.src = "E:/project 1/shadow_dog - Copy.png";

const sound_1 = new Audio("E:/project 1/audio/mixkit-horse-fast-gallop-on-a-concrete-surface-83.wav");
const sound_2  = new Audio("E:/project 1/audio/mixkit-arcade-video-game-machine-alert-2821.wav");
const sound_3  = new Audio("E:/project 1/audio/forest-birds-sound-effect-relaxing-nature-ambience.mp3");
const sound_4 = new Audio ("E:/project 1/audio/Untitled video - Made with Clipchamp.mp3");
                         
const player = { x:50 , y:320 , width:200 , height:200 , speed:5 };
const object = { x:650 , y:465 , width:50 , height:50 , speed:1 };

               
function collision(){
                    const playerCenterX = player.x + player.width / 2;
                    const playerCenterY = player.y + player.height / 2;
                    const objectCenterX = object.x + object.width / 2;
                    const objectCenterY = object.y + object.height / 2;
                            
                    const dx = playerCenterX - objectCenterX;
                    const dy = playerCenterY - objectCenterY;
                                    
                    const widthHalf = (player.width + object.width) / 2;
                    const heightHalf = (player.height + object.height) / 2;
                                
                    if (Math.abs(dx) <= widthHalf && Math.abs(dy) <= heightHalf) 
                  {      
                        const wy = widthHalf * dy;
                        const hx = heightHalf * dx;
                                 
                        if (wy > hx)
                      {     

                            if (wy > -hx) 
                            {    
                               

                                player.y = object.y + object.height;
                            }   
                           
                            else 
                            {
                                player.x = object.x - player.width;
                            }

                      } 
                          else 
                            {
                            if (wy > -hx) 
                               {
                                player.x = object.x + object.width;
                               } 
                         else
                             {
                                player.y = object.y - player.height;
                             }
                           }
                    
                }}

function drawobject()
{
  // ctx.fillStyle = "red";  
  // ctx.fillRect(object.x, object.y, object.width, object.height);
}

               
function drawplayer()
{  
  
const spritewidth = 575;      
const spriteheight = 523;
   
if(left)
{
ctx.drawImage(charecter_img_backward,frameX*spritewidth ,frameY*spriteheight,spritewidth,spriteheight,player.x,player.y,player.width,player.height);
}

else 
{
ctx.drawImage(charecter_img_forward,frameX*spritewidth ,frameY*spriteheight,spritewidth,spriteheight,player.x,player.y,player.width,player.height);
}

}

//backgroundframe

function frameSet()
{
ctx.imageSmoothingEnabled = false;     
ctx.clearRect(0, 0, canvas.width, canvas.height);
ctx.drawImage(background ,x ,-400,2900, 1000); 
 
if(x <= -1730) { x = 0 ;} 
  
if(player.x+player.width >= canvas.width-50  && right ) { x -= 5;   }
 
if(player.x == -5 && x < 0  && left ) { x += 5;  }

if(charecter_animation_speed % 5 == 0)
{
  if(frameX <4) { frameX++; }
  else { frameX = 0; } 

  if(shift_key ){ frameY = 6; }
  else if(right || left) { frameY = 3;}
  else { frameY = 0; }
   
}   
charecter_animation_speed++;
   
}
                                  //main function
function main()
{

gravity();
frameSet();   
drawplayer();
drawobject();
move();
window.requestAnimationFrame(main);

}

  
                               // movements of player 

function move()
{

if(right && player.x+player.width< canvas.width )
  { 
     player.x += player.speed ; 
     if(shift_key) { player.x += player.speed ;} 
  }
     
if(left && player.x >=0 ) 
 {
   player.x -= player.speed ; 
    if(shift_key) { player.x -= player.speed ;} 
 }
    
if(space)
{
  
     if( player.y >=100)  
   { player.y -= 50; } 

       
    
} 


if(up){ player.y -= player.speed ;  }

if(down){ player.y += player.speed ;  }
 
//collision();
}

function down_key()
{
  key = event.key;
  sound_3.play();
      
    if(key === "ArrowRight"){ right = true;  sound_1.play();;
 }
    if(key === "ArrowLeft") { left = true; sound_1.play();}
  //  if(key === "ArrowUp") { up = true;}
   // if(key === "ArrowDown") { down = true;}
    if(key === "Shift") { shift_key = true ; sound_2.play();  }
    if(key === " ") { space = true ; sound_4.play(); } 
            
}

function up_key()
{
     key = event.key;
   
    if(key === "ArrowRight"){ right = false ; sound_1.pause();}
    if(key === "ArrowUp") {   up = false ;}
    if(key === "ArrowLeft") {  left = false ; sound_1.pause();}
    if(key === "ArrowDown") { down = false  ;}
    if(key === "Shift") { shift_key = false ; sound_2.pause();}
      if(key === " ") { space = false ;}
    
}
   
function gravity()
{   
    if(canvas.height-(player.y+player.height) <= 80)
    {    return true ;}
    else
   {  
      player.y += 10;
      
   } 
  
  
}
document.addEventListener("keydown" , down_key);
document.addEventListener("keyup" , up_key);
window.requestAnimationFrame(main);

}

document.addEventListener('onLoad' , start());