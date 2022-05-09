const canvas1 = document.getElementById("canvas2"); // selects 'canvas1' element in html 'document' and gives it to javascript canvas
//changing javascript canvas will change html canvas too
const canvas2 = document.getElementById("canvas1");
margin=innerHeight*0.1;
canvas1.width = canvas2.width =innerWidth;
canvas1.height = canvas2.height =innerHeight-margin;//Decreasing canvas height so that it does not cover
//buttons below and render them incapable of being clicked
c=canvas1.getContext('2d');
d=canvas2.getContext('2d');
const img=document.getElementById("board");
//img.width = canvas.width-100;//modifies img in html
//img.height = canvas.height-100;//modifies img in html
d.drawImage(img,0,0,canvas1.width-margin,canvas1.height);
//c.drawImage(board.jpg,0,0)
class player{
    constructor(posx,posy,radius,color){
        this.posx=posx;
        this.posy=posy;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        c.beginPath();
        c.arc(this.posx,this.posy,this.radius,0,2*Math.PI,false);
        c.closePath();
        c.fillStyle=this.color;
        c.fill();
    }
}
    xbox=(canvas1.width-margin)/10;
    ybox=(canvas1.height)/10;
  x=xbox*0.5;
  y=ybox*9.5;
   // c.save();
  const p=new player(x,y,Math.min(xbox,ybox)/2,'blue');
  //p.draw();
  const comp=new player(x,y,Math.min(xbox,ybox)/4,'orange');
  //comp.draw();
  pb=document.getElementById("player");
  rb=document.getElementById("reset");
  cb=document.getElementById("computer");
  p1=document.getElementById("text1");
  p2=document.getElementById("text2");
  p3=document.getElementById("text3");
  row=document.getElementById("nav");
    pturn=1;
    cturn=0;
    ax=[];//canvas position in x direction correcponding to box no.
    ay=[];//canvas position in y direction correcponding to box no.
    au=[]
    for(i=0;i<100;i++){
        au[i]=0;
    }
    //Updating increment decrement values for snakes and ladders and storing in array
    au[1]=21;
    au[5]=39;
    au[19]=39;
    au[42]=-26;
    au[49]=-45;
    au[51]=20;
    au[55]=-48;
    au[56]=39;
    au[70]=21;
    au[72]=-58;
    au[83]=-26;
    au[86]=-38;
    au[97]=-58;
    j=0;
    k=0;
    flag=1;
    for(i=0;i<100;i++){
        ax[i]=xbox*(k+0.5);
        k+=flag;
        ay[i]=ybox*(9-j+0.5);
        if((i+1)%10==0){
            j++;
            flag=flag*(-1);
            k+=flag;
        }
    }

    cb.disabled=true;
    pb.disabled=false;
    pb.addEventListener("click",p1click);

    playerpos=0;
    function p1click(){
        dice=Math.floor((Math.random() * 6) + 1);
        p1.innerHTML="Dice Value: "+dice;
        playerpos+=dice;
        if(playerpos<=100){
            playerpos+=au[playerpos-1];
            p.posx=ax[playerpos-1];
            p.posy=ay[playerpos-1];
            c.clearRect(0, 0, canvas2.width, canvas2.height);
            //const p=new player(x+(xbox*dice),y,Math.min(xbox,ybox)/2,'blue');
            p.draw();
            if(computerpos!=0){
                comp.draw();
            }
            //c.restore();
            /*if(playerpos==100){
                pb.disabled=true;
                cb.disabled=true;
                p3.innerHTML="Player Won!!! Reset?"
            }*///Do not put this if here. else, due to flow of function, one button 
            //will be kept open
        }
        else{
            playerpos-=dice;
        }
        pturn=0;
        cturn=1;
        cb.disabled=false;
        pb.disabled=true;
        if(playerpos==100){
            pb.disabled=true;
            cb.disabled=true;
            p3.innerHTML="Player 1 Won!!! Reset?"
        }
        cb.addEventListener("click",coclick);//Activate when 2 human players are playing
        //coclick();//Activate when a Human and a computer is playing
    }

    rb.addEventListener("click",reset)

    function reset(){
        c.clearRect(0, 0, canvas2.width, canvas2.height);
        p.posx=0;
        comp.posx=0;
        p.posy=0;
        comp.posy=0;
        pturn=1;
        cturn=0;
        playerpos=0;
        computerpos=0;
        cb.disabled=true;
        pb.disabled=false;
        p1.innerHTML="Roll the Dice";
        p2.innerHTML="Roll the Dice";
        p3.innerHTML="Reset?";
        pb.addEventListener("click",p1click);
    }
    //Initially, Player will move
    

    //img.onclick=p1click;//Do not use onlick as multiple onclick are not possible. Later onclick
    //will rewrite the first onclick
    /*if(pturn==1){ // No loop required. Javascript will remain active even without loop
        cb.disabled=true;
        pb.disabled=false;
        pb.addEventListener("click",p1click);//()is not put after function name else it will
        //be called immediately
    }*/ //This loop is also giving problems. Not working properly after reset;
    /*if(cturn==1){ //This if statement is not being executed after previous function call!!
        pb.disabled=true;//Not Working. Working only when called from function
        cb.disabled=false;//Not Working. Working only when called from function
        cb.addEventListener("click",coclick);
    }*/
    computerpos=0;
    function coclick(){
        dice=Math.floor((Math.random() * 6) + 1);
        p2.innerHTML="Dice Value: "+dice;
        computerpos+=dice;
        if(computerpos<=100){
            computerpos+=au[computerpos-1];
            comp.posx=ax[computerpos-1];
            comp.posy=ay[computerpos-1];
            c.clearRect(0, 0, canvas2.width, canvas2.height);
            //const p=new player(x+(xbox*dice),y,Math.min(xbox,ybox)/2,'blue');
            if(playerpos!=0){
                p.draw();
            }
            comp.draw();
            //c.restore();
        }
        else{
            computerpos-=dice;
        }
        pturn=1;
        cturn=0;
        pb.disabled=false;
        cb.disabled=true;
        if(computerpos==100){
            cb.disabled=true;
            pb.disabled=true;
            p3.innerHTML="Player 2 Won!!! Reset?"
        }
    }
  

console.log(canvas1);
