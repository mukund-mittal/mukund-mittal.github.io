const canvas1 = document.getElementById("canvas1"); // selects 'canvas1' element in html 'document' and gives it to javascript canvas
//changing javascript canvas will change html canvas too
const canvas2 = document.getElementById("canvas2");
const container = document.getElementById("container");
margin=innerHeight*0.2;
container.style.height=canvas1.width = canvas2.width = canvas1.height = canvas2.height = Math.min(innerHeight-margin,innerWidth-margin);
//canvas1.height = canvas2.height =innerHeight-margin;//Decreasing canvas height so that it does not cover
//buttons below and render them incapable of being clicked
canvas1.style.left=(innerWidth-canvas1.width)/2;//Set canvas to middle of screen
canvas2.style.left=(innerWidth-canvas2.width)/2;//Set canvas to middle of screen
c=canvas1.getContext('2d');
d=canvas2.getContext('2d');
const img=document.getElementById("board");
//img.width = canvas.width-100;//modifies img in html
//img.height = canvas.height-100;//modifies img in html
c.drawImage(img,0,0,canvas1.width,canvas1.height);

class player{
    constructor(posx,posy,radius,color){
        this.posx=posx;
        this.posy=posy;
        this.radius=radius;
        this.color=color;
    }
    draw(){
        d.beginPath();
        d.arc(this.posx,this.posy,this.radius,0,2*Math.PI,false);
        d.closePath();
        d.fillStyle=this.color;
        d.fill();
        d.lineWidth=1;
        d.strokeStyle = '#000000'; 
        d.stroke();
    }
}
xbox=(canvas1.width)/15;
ybox=(canvas1.height)/15;
yp=[new player(2*xbox,12*ybox,Math.min(xbox,ybox)/2,'#8B8000'),new player(3*xbox,11*ybox,Math.min(xbox,ybox)/2,'#8B8000'),new player(3*xbox,13*ybox,Math.min(xbox,ybox)/2,'#8B8000'),new player(4*xbox,12*ybox,Math.min(xbox,ybox)/2,'#8B8000')];
gp=[new player(2*xbox,3*ybox,Math.min(xbox,ybox)/2,'#006400'),new player(3*xbox,2*ybox,Math.min(xbox,ybox)/2,'#006400'),new player(3*xbox,4*ybox,Math.min(xbox,ybox)/2,'#006400'),new player(4*xbox,3*ybox,Math.min(xbox,ybox)/2,'#006400')];
rp=[new player(11*xbox,3*ybox,Math.min(xbox,ybox)/2,'#880808'),new player(12*xbox,2*ybox,Math.min(xbox,ybox)/2,'#880808'),new player(12*xbox,4*ybox,Math.min(xbox,ybox)/2,'#880808'),new player(13*xbox,3*ybox,Math.min(xbox,ybox)/2,'#880808')];
bp=[new player(11*xbox,12*ybox,Math.min(xbox,ybox)/2,'#00008B'),new player(12*xbox,11*ybox,Math.min(xbox,ybox)/2,'#00008B'),new player(12*xbox,13*ybox,Math.min(xbox,ybox)/2,'#00008B'),new player(13*xbox,12*ybox,Math.min(xbox,ybox)/2,'#00008B')];
yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();
gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();

yellowIsPlayer=1;
greenIsPlayer=1;
redIsPlayer=1;
blueIsPlayer=1;

ypos=[-1,-1,-1,-1];
ysafe=[1,1,1,1];
yxi=[2*xbox,3*xbox,3*xbox,4*xbox];//Initial home locations in x
yyi=[12*ybox,11*ybox,13*ybox,12*ybox];//Initial home locations in x
gpos=[-1,-1,-1,-1];
gsafe=[1,1,1,1];
gxi=[2*xbox,3*xbox,3*xbox,4*xbox];
gyi=[3*ybox,2*ybox,4*ybox,3*ybox];
rpos=[-1,-1,-1,-1];
rsafe=[1,1,1,1];
rxi=[11*xbox,12*xbox,12*xbox,13*xbox];
ryi=[3*ybox,2*ybox,4*ybox,3*ybox];
bpos=[-1,-1,-1,-1];
bsafe=[1,1,1,1];
bxi=[11*xbox,12*xbox,12*xbox,13*xbox];
byi=[12*ybox,11*ybox,13*ybox,12*ybox];

tp1=document.getElementById("textp1");
tp2=document.getElementById("textp2");
tp3=document.getElementById("textp3");
tp4=document.getElementById("textp4");
p1=document.getElementById("player1");
p2=document.getElementById("player2");
p3=document.getElementById("player3");
p4=document.getElementById("player4");
rb=document.getElementById("reset");
msg=document.getElementById("textmsg");
pass=document.getElementById("message");

p1.disabled=false;
p2.disabled=true;
p3.disabled=true;
p4.disabled=true;

p1.addEventListener("click",yrolldice);
p2.addEventListener("click",grolldice);
p3.addEventListener("click",rrolldice);
p4.addEventListener("click",brolldice);
rb.addEventListener("click",reset);

function reset(){
    ypos=[-1,-1,-1,-1];
    ysafe=[1,1,1,1];
    gpos=[-1,-1,-1,-1];
    gsafe=[1,1,1,1];
    rpos=[-1,-1,-1,-1];
    rsafe=[1,1,1,1];
    bpos=[-1,-1,-1,-1];
    bsafe=[1,1,1,1];
    p1.disabled=false;
    p2.disabled=true;
    p3.disabled=true;
    p4.disabled=true;
    for(i=0;i<4;i++){
        yp[i].posx=yxi[i];
        yp[i].posy=yyi[i];
        gp[i].posx=gxi[i];
        gp[i].posy=gyi[i];
        rp[i].posx=rxi[i];
        rp[i].posy=ryi[i];
        bp[i].posx=bxi[i];
        bp[i].posy=byi[i];
    }
    d.clearRect(0, 0, canvas2.width, canvas2.height);
    yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();
    gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
    rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
    bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();
}


function yrolldice(){
    dice=Math.floor((Math.random() * 6) + 1);
    tp1.innerHTML="Dice Value: "+dice;
    p1.disabled=true;
    canvas2.addEventListener("click",checkyellow);
    ycheck();
}

function grolldice(){
    dice=Math.floor((Math.random() * 6) + 1);
    tp2.innerHTML="Dice Value: "+dice;
    p2.disabled=true;
    canvas2.addEventListener("click",checkgreen);
    gcheck();
}

function rrolldice(){
    dice=Math.floor((Math.random() * 6) + 1);
    tp3.innerHTML="Dice Value: "+dice;
    p3.disabled=true;
    canvas2.addEventListener("click",checkred);
    rcheck();
}

function brolldice(){
    dice=Math.floor((Math.random() * 6) + 1);
    tp4.innerHTML="Dice Value: "+dice;
    p4.disabled=true;
    canvas2.addEventListener("click",checkblue);
    bcheck();
}

function checkyellow(event) {
    if(yellowIsPlayer==1){
        const rect = canvas2.getBoundingClientRect();//Gives bounding coordinates of canvas
        x = event.clientX-rect.left;
        y = event.clientY-rect.top;
        coords = "X coords: " + x + ", Y coords: " + y;
        msg.innerHTML = coords;
        for(i=0;i<4;i++){
            dist=Math.sqrt(Math.pow(yp[i].posx-x,2)+Math.pow(yp[i].posy-y,2));
            if(dist<yp[i].radius){
            document.getElementById("textmsg").innerHTML = "Yellow Clicked";
            break;
            }
        }
        if(i<4){
            ypmove(yp[i],i);
        }
    }
    else{//player is computer
        for(i=0;i<4;i++){
            if(ypos[i]==0&&dice==6){
                ypos[i]++;
                break;
            }
        }
        if(i>=4){
            rplayer=Math.floor((Math.random() * 4) + 1);
            ypmove[yp[rplayer],rplayer];
        }
    }
  }

  function checkgreen(event) {
    if(greenIsPlayer==1){
        const rect = canvas2.getBoundingClientRect();//Gives bounding coordinates of canvas
        x = event.clientX-rect.left;
        y = event.clientY-rect.top;
        coords = "X coords: " + x + ", Y coords: " + y;
        msg.innerHTML = coords;
        for(i=0;i<4;i++){
            dist=Math.sqrt(Math.pow(gp[i].posx-x,2)+Math.pow(gp[i].posy-y,2));
            if(dist<gp[i].radius){
            document.getElementById("textmsg").innerHTML = "Green Clicked";
            break;
            }
        }
        if(i<4){
            gpmove(gp[i],i);
        }
    }
    else{//player is computer
        
    }
  }

  function checkred(event) {
    if(redIsPlayer==1){
        const rect = canvas2.getBoundingClientRect();//Gives bounding coordinates of canvas
        x = event.clientX-rect.left;
        y = event.clientY-rect.top;
        coords = "X coords: " + x + ", Y coords: " + y;
        msg.innerHTML = coords;
        for(i=0;i<4;i++){
            dist=Math.sqrt(Math.pow(rp[i].posx-x,2)+Math.pow(rp[i].posy-y,2));
            if(dist<rp[i].radius){
            document.getElementById("textmsg").innerHTML = "Red Clicked";
            break;
            }
        }
        if(i<4){
            rpmove(rp[i],i);
        }
    }
    else{//player is computer
        
    }
  }

  function checkblue(event) {
    if(blueIsPlayer==1){
        const rect = canvas2.getBoundingClientRect();//Gives bounding coordinates of canvas
        x = event.clientX-rect.left;
        y = event.clientY-rect.top;
        coords = "X coords: " + x + ", Y coords: " + y;
        msg.innerHTML = coords;
        for(i=0;i<4;i++){
            dist=Math.sqrt(Math.pow(bp[i].posx-x,2)+Math.pow(bp[i].posy-y,2));
            if(dist<bp[i].radius){
            document.getElementById("textmsg").innerHTML = "Blue Clicked";
            break;
            }
        }
        if(i<4){
            bpmove(bp[i],i);
        }
    }
    else{//player is computer
        
    }
  }

  /*function checkyellow(){
    for(i=0;i<4;i++){
        dist=Math.sqrt(Math.pow(yp[i].posx-x,2)+Math.pow(yp[i].posy-y,2));
        if(dist<yp[i].radius){
          document.getElementById("textmsg").innerHTML = "Yellow Clicked";
          break;
        }
    }
    if(i<4){
        pmove(yp[i],i);
    }
  }*/
  // Players of same color are NOT allowed in same position

  function ycheck(){
      counter=0;
      for(i=0;i<4;i++){
          if((ypos[i]==100||(ypos[i]==-1&&dice!=6))||(ypos[i]+dice)>100){
              counter++;
          }
      }
      if(counter==4){
        document.getElementById("textmsg").innerHTML = "No move possible. Passing to green";
        canvas2.removeEventListener("click",checkyellow);
        p2.disabled=false;
      }
      for(i=0;i<4;i++){
          if(ypos[i]!=-1&&ypos[i]<95){
              for(j=0;j<4;j++){
                  if((ypos[i]+dice)%52==ypos[j]){
                      yrolldice();
                      return;
                  }
              }
          }
      }
  }

  function gcheck(){
    counter=0;
    for(i=0;i<4;i++){
        if((gpos[i]==100||(gpos[i]==-1&&dice!=6))||(gpos[i]+dice)>100){
            counter++;
        }
    }
    if(counter==4){
      document.getElementById("textmsg").innerHTML = "No move possible. Passing to red";
      canvas2.removeEventListener("click",checkgreen);
      p3.disabled=false;
      
    }
    for(i=0;i<4;i++){
        if(gpos[i]!=-1&&gpos[i]<95){
            for(j=0;j<4;j++){
                if((gpos[i]+dice)%52==gpos[j]){
                    grolldice();
                    return;
                }
            }
        }
    }
}

function rcheck(){
    counter=0;
    for(i=0;i<4;i++){
        if((rpos[i]==100||(rpos[i]==-1&&dice!=6))||(rpos[i]+dice)>100){
            counter++;
        }
    }
    if(counter==4){
      document.getElementById("textmsg").innerHTML = "No move possible. Passing to blue";
      canvas2.removeEventListener("click",checkred);
      p4.disabled=false;
      
    }
    for(i=0;i<4;i++){
        if(rpos[i]!=-1&&rpos[i]<95){
            for(j=0;j<4;j++){
                if((rpos[i]+dice)%52==rpos[j]){
                    rrolldice();
                    return;
                }
            }
        }
    }
}

function bcheck(){
    counter=0;
    for(i=0;i<4;i++){
        if((bpos[i]==100||(bpos[i]==-1&&dice!=6))||(bpos[i]+dice)>100){
            counter++;
        }
    }
    if(counter==4){
      document.getElementById("textmsg").innerHTML = "No move possible. Passing to yellow";
      canvas2.removeEventListener("click",checkblue);
      p1.disabled=false;
      
    }
    for(i=0;i<4;i++){
        if(bpos[i]!=-1&&bpos[i]<95){
            for(j=0;j<4;j++){
                if((bpos[i]+dice)%52==bpos[j]){
                    brolldice();
                    return;
                }
            }
        }
    }
}

  function ypmove(p,pos){
      again=0;
      if(dice==6){
          again=1;
      }
      if(ypos[pos]!=-1&&ypos[pos]!=100){
        for(i=1;i<=dice;i++){
            ypos[pos]++;
            if(ypos[pos]==52){//Not >52 to that it executes only one time
            ypos[pos]=95;
            }
            if(ypos[pos]>=95){
                ysafe=1;
            }
        }
        if(ypos[pos]==100){
            again=1;
        }
        if(ypos[pos]>100){
            document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
            ypos[pos]-=dice;
            return;
        }
        //ypos[pos]+=dice;
        //ypos[pos]=ypos[pos]%52;
        if(ypos[pos]<95){
            for(i=0;i<4;i++){//condition for cutting other players
                if(gpos[i]==ypos[pos]&&gsafe[i]==0){
                    gpos[i]=-1;
                    //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                    //No need
                    gp[i].posx=gxi[i];
                    gp[i].posy=gyi[i];
                    again=1;
                }
                if(rpos[i]==ypos[pos]&&rsafe[i]==0){
                    rpos[i]=-1;
                    //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                    //No need
                    rp[i].posx=rxi[i];
                    rp[i].posy=ryi[i];
                    again=1
                }
                if(bpos[i]==ypos[pos]&&bsafe[i]==0){
                    bpos[i]=-1;
                    //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                    //No need
                    bp[i].posx=bxi[i];
                    bp[i].posy=byi[i];
                    again=1;
                }
                if(ypos[i]==ypos[pos]&&i!=pos&&ysafe[i]==0){
                    document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
                    ypos[pos]-=dice;
                    return;
                }
            }
        }
      }
      else{
          if(ypos[pos]==-1&&dice==6){
              ypos[pos]=1;
          }
          else{
            document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
            return;
          }
      }
      d.clearRect(p.posx-(xbox/2), p.posy-(ybox/2), xbox, ybox);

        tempx=p.posx;
        tempy=p.posy;

        if(ypos[pos]<95){
        p.posx=axboard[ypos[pos]];
        p.posy=ayboard[ypos[pos]];
        }
        else{
            p.posx=yxh[ypos[pos]-95];
            p.posy=yyh[ypos[pos]-95];
        }
        yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();//Draw every color due to multiple players
        //together in safe region
        gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
        rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
        bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();

        //Redrawing token in previous position and new position so they stack up according to their size

        //counter=0;
        /*for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
                //yp[i].radius=Math.min(xbox,ybox)/2;//No need. It will make matters worse
            }
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }*///Wrong loop. First print all yellow tokens is loop. Then green, red and blue. Wrong due to 409-411(Yellow drawn first, then green, red, blue)

        /*tempx=p.posx;
        tempy=p.posy;

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
                //yp[i].radius=Math.min(xbox,ybox)/2;//No need. It will make matters worse
            }
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }*/

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }        

        tempx=p.posx;
        tempy=p.posy;

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }

        if(ypos[pos]==1||ypos[pos]==14||ypos[pos]==27||ypos[pos]==40||ypos[pos]==-1||ypos[pos]==100){
            ysafe[pos]=1;
        }
        else{
            ysafe[pos]=0;
        }
        counter=0;
        for(i=0;i<4;i++){
            if(ypos[i]==100){
                counter++;
            }
        }
        if(counter==4){
            document.getElementById("textmsg").innerHTML = "Player 1 Won!! Please Reset.";
            canvas2.removeEventListener("click",checkyellow);
            return;
        }
        if(again==1){
            document.getElementById("textmsg").innerHTML = "Yellow's Turn Again";
            canvas2.removeEventListener("click",checkyellow);
            p1.disabled=false;
            return;
        }
        document.getElementById("textmsg").innerHTML = "Yellow moved. Green's Turn";
        //p1.disabled=false;
        canvas2.removeEventListener("click",checkyellow);
        //All players are drawn even when only one player is cleared because if a player goes
        //on top of other player, then if one of the a player moves from there, other will
        //be also cleared
        //dice=Math.floor((Math.random() * 6) + 1);//Roll dice for next player
        //tp2.innerHTML="Dice Value: "+dice;
        p2.disabled=false;
        p2.addEventListener("click",grolldice);

  }

  function gpmove(p,pos){
    again=0;
    if(dice==6){
        again=1;
    }
    if(gpos[pos]!=-1&&gpos[pos]!=100){
        for(i=1;i<=dice;i++){
            gpos[pos]++;
            if(gpos[pos]==52){
            gpos[pos]=0;
            }
            if(gpos[pos]==13){
                gpos[pos]=95;
            }
            if(gpos[pos]>=95){
                gsafe=1;
            }
        }
        if(gpos[pos]==100){
            again=1;
        }
        if(gpos[pos]>100){
            document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
            gpos[pos]-=dice;
            return;
        }
      //gpos[pos]+=dice;
      //gpos[pos]=gpos[pos]%52;
      if(gpos[pos]<95){
        for(i=0;i<4;i++){
            if(ypos[i]==gpos[pos]&&ysafe[i]==0){
                ypos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                yp[i].posx=yxi[i];
                yp[i].posy=yyi[i];
                again=1;
            }
            if(rpos[i]==gpos[pos]&&rsafe[i]==0){
                rpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                rp[i].posx=rxi[i];
                rp[i].posy=ryi[i];
                again=1
            }
            if(bpos[i]==gpos[pos]&&bsafe[i]==0){
                bpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                bp[i].posx=bxi[i];
                bp[i].posy=byi[i];
                again=1;
            }
            if(gpos[i]==gpos[pos]&&i!=pos&&gsafe[i]==0){
                document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
                gpos[pos]-=dice;
                return;
            }
          }
        }
    }
    else{
        if(gpos[pos]==-1&&dice==6){
            gpos[pos]=14;
        }
        else{
          document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
          return;
        }
    }
    d.clearRect(p.posx-(xbox/2), p.posy-(ybox/2), xbox, ybox);

    tempx=p.posx;
    tempy=p.posy;

    if(gpos[pos]<95){
        p.posx=axboard[gpos[pos]];
        p.posy=ayboard[gpos[pos]];
        }
        else{
            p.posx=gxh[gpos[pos]-95];
            p.posy=gyh[gpos[pos]-95];
        }
      yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();//Draw every color due to multiple players
      //together in safe region
      gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
      rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
      bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();

      counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }        

        tempx=p.posx;
        tempy=p.posy;

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }

      if(gpos[pos]==1||gpos[pos]==14||gpos[pos]==27||gpos[pos]==40||gpos[pos]==-1||gpos[pos]==100){
          gsafe[pos]=1;
      }
      else{
          gsafe[pos]=0;
      }
      counter=0;
      for(i=0;i<4;i++){
          if(gpos[i]==100){
              counter++;
          }
      }
      if(counter==4){
        document.getElementById("textmsg").innerHTML = "Player 2 Won!! Please Reset.";
        canvas2.removeEventListener("click",checkgreen);
        return;
      }
      if(again==1){
          document.getElementById("textmsg").innerHTML = "Green's Turn Again";
          canvas2.removeEventListener("click",checkgreen);
          p2.disabled=false;
          return;
      }
      document.getElementById("textmsg").innerHTML = "Green moved. Red's Turn";
      //p1.disabled=false;
      canvas2.removeEventListener("click",checkgreen);
      //All players are drawn even when only one player is cleared because if a player goes
      //on top of other player, then if one of the a player moves from there, other will
      //be also cleared
      //dice=Math.floor((Math.random() * 6) + 1);//Roll dice for next player
      //tp2.innerHTML="Dice Value: "+dice;
      p3.disabled=false;
}

function rpmove(p,pos){
    again=0;
    if(dice==6){
        again=1;
    }
    if(rpos[pos]!=-1&&rpos[pos]!=100){
        for(i=1;i<=dice;i++){
            rpos[pos]++;
            if(rpos[pos]==52){
            rpos[pos]=0;
            }
            if(rpos[pos]==26){
                rpos[pos]=95;
            }
            if(rpos[pos]>=95){
                rsafe=1;
            }
        }
        if(rpos[pos]==100){
            again=1;
        }
        if(rpos[pos]>100){
            document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
            rpos[pos]-=dice;
            return;
        }
      //gpos[pos]+=dice;
      //gpos[pos]=gpos[pos]%52;
      if(rpos[pos]<95){
        for(i=0;i<4;i++){
            if(ypos[i]==rpos[pos]&&ysafe[i]==0){
                ypos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                yp[i].posx=yxi[i];
                yp[i].posy=yyi[i];
                again=1;
            }
            if(gpos[i]==rpos[pos]&&gsafe[i]==0){
                gpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                gp[i].posx=gxi[i];
                gp[i].posy=gyi[i];
                again=1
            }
            if(bpos[i]==rpos[pos]&&bsafe[i]==0){
                bpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                bp[i].posx=bxi[i];
                bp[i].posy=byi[i];
                again=1;
            }
            if(rpos[i]==rpos[pos]&&i!=pos&&rsafe[i]==0){
                document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
                rpos[pos]-=dice;
                return;
            }
          }
        }
    }
    else{
        if(rpos[pos]==-1&&dice==6){
            rpos[pos]=27;
        }
        else{
          document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
          return;
        }
    }
    d.clearRect(p.posx-(xbox/2), p.posy-(ybox/2), xbox, ybox);

    tempx=p.posx;
    tempy=p.posy;

    if(rpos[pos]<95){
        p.posx=axboard[rpos[pos]];
        p.posy=ayboard[rpos[pos]];
        }
        else{
            p.posx=rxh[rpos[pos]-95];
            p.posy=ryh[rpos[pos]-95];
        }
      yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();//Draw every color due to multiple players
      //together in safe region
      gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
      rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
      bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();

      counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }        

        tempx=p.posx;
        tempy=p.posy;

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }

      if(rpos[pos]==1||rpos[pos]==14||rpos[pos]==27||rpos[pos]==40||rpos[pos]==-1||rpos[pos]==100){
          rsafe[pos]=1;
      }
      else{
          rsafe[pos]=0;
      }
      counter=0;
      for(i=0;i<4;i++){
          if(rpos[i]==100){
              counter++;
          }
      }
      if(counter==4){
        document.getElementById("textmsg").innerHTML = "Player 3 Won!! Please Reset.";
        canvas2.removeEventListener("click",checkred);
        return;
      }
      if(again==1){
          document.getElementById("textmsg").innerHTML = "Red's Turn Again";
          canvas2.removeEventListener("click",checkred);
          p3.disabled=false;
          return;
      }
      document.getElementById("textmsg").innerHTML = "Red moved. Blue's Turn";
      //p1.disabled=false;
      canvas2.removeEventListener("click",checkred);
      //All players are drawn even when only one player is cleared because if a player goes
      //on top of other player, then if one of the a player moves from there, other will
      //be also cleared
      //dice=Math.floor((Math.random() * 6) + 1);//Roll dice for next player
      //tp2.innerHTML="Dice Value: "+dice;
      p4.disabled=false;
}

function bpmove(p,pos){
    again=0;
    if(dice==6){
        again=1;
    }
    if(bpos[pos]!=-1&&bpos[pos]!=100){
        for(i=1;i<=dice;i++){
            bpos[pos]++;
            if(bpos[pos]==52){
            bpos[pos]=0;
            }
            if(bpos[pos]==39){
                bpos[pos]=95;
            }
            if(bpos[pos]>=95){
                bsafe=1;
            }
        }
        if(bpos[pos]==100){
            again=1;
        }
        if(bpos[pos]>100){
            document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
            bpos[pos]-=dice;
            return;
        }
      //gpos[pos]+=dice;
      //gpos[pos]=gpos[pos]%52;
      if(bpos[pos]<95){
        for(i=0;i<4;i++){
            if(ypos[i]==bpos[pos]&&ysafe[i]==0){
                ypos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                yp[i].posx=yxi[i];
                yp[i].posy=yyi[i];
                again=1;
            }
            if(gpos[i]==bpos[pos]&&gsafe[i]==0){
                gpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                gp[i].posx=gxi[i];
                gp[i].posy=gyi[i];
                again=1
            }
            if(rpos[i]==bpos[pos]&&rsafe[i]==0){
                rpos[i]=-1;
                //d.clearRect(gp[i].posx-(xbox/2), gp[i].posy-(ybox/2), xbox, ybox);
                //No need
                rp[i].posx=rxi[i];
                rp[i].posy=ryi[i];
                again=1;
            }
            if(bpos[i]==bpos[pos]&&i!=pos&&bsafe[i]==0){
                document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
                bpos[pos]-=dice;
                return;
            }
          }
        }
    }
    else{
        if(bpos[pos]==-1&&dice==6){
            bpos[pos]=40;
        }
        else{
          document.getElementById("textmsg").innerHTML = "Invalid Move! Select Another piece";
          return;
        }
    }
    d.clearRect(p.posx-(xbox/2), p.posy-(ybox/2), xbox, ybox);

    tempx=p.posx;
    tempy=p.posy;

    if(bpos[pos]<95){
        p.posx=axboard[bpos[pos]];
        p.posy=ayboard[bpos[pos]];
        }
        else{
            p.posx=bxh[bpos[pos]-95];
            p.posy=byh[bpos[pos]-95];
        }
      yp[0].draw();yp[1].draw();yp[2].draw();yp[3].draw();//Draw every color due to multiple players
      //together in safe region
      gp[0].draw();gp[1].draw();gp[2].draw();gp[3].draw();
      rp[0].draw();rp[1].draw();rp[2].draw();rp[3].draw();
      bp[0].draw();bp[1].draw();bp[2].draw();bp[3].draw();

      counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }        

        tempx=p.posx;
        tempy=p.posy;

        counter=0;
        for(i=0;i<4;i++){
            if(yp[i].posx==tempx &&yp[i].posy==tempy){
                yp[i].radius=Math.min(xbox,ybox)/2;
                yp[i].radius-=3*counter;
                counter++;
                yp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(gp[i].posx==tempx &&gp[i].posy==tempy){
                gp[i].radius=Math.min(xbox,ybox)/2;
                gp[i].radius-=3*counter;
                counter++;
                gp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(rp[i].posx==tempx &&rp[i].posy==tempy){
                rp[i].radius=Math.min(xbox,ybox)/2;
                rp[i].radius-=3*counter;
                counter++;
                rp[i].draw();
            }
        }
        for(i=0;i<4;i++){
            if(bp[i].posx==tempx &&bp[i].posy==tempy){
                bp[i].radius=Math.min(xbox,ybox)/2;
                bp[i].radius-=3*counter;
                counter++;
                bp[i].draw();
            }
        }

      if(bpos[pos]==1||bpos[pos]==14||bpos[pos]==27||bpos[pos]==40||bpos[pos]==-1||bpos[pos]==100){
          bsafe[pos]=1;
      }
      else{
          bsafe[pos]=0;
      }
      counter=0;
      for(i=0;i<4;i++){
          if(bpos[i]==100){
              counter++;
          }
      }
      if(counter==4){
        document.getElementById("textmsg").innerHTML = "Player 4 Won!! Please Reset.";
        canvas2.removeEventListener("click",checkblue);
        return;
      }
      if(again==1){
          document.getElementById("textmsg").innerHTML = "Blue's Turn Again";
          canvas2.removeEventListener("click",checkblue);
          p4.disabled=false;
          return;
      }
      document.getElementById("textmsg").innerHTML = "Blue moved. Yellow's Turn";
      //p1.disabled=false;
      canvas2.removeEventListener("click",checkblue);
      //All players are drawn even when only one player is cleared because if a player goes
      //on top of other player, then if one of the a player moves from there, other will
      //be also cleared
      //dice=Math.floor((Math.random() * 6) + 1);//Roll dice for next player
      //tp2.innerHTML="Dice Value: "+dice;
      p1.disabled=false;
}

  axboard=[];//storing x ccordinate of common path
  ayboard=[];//storing y ccordinate of common path
  //Starting point of yellow player is axboard[1],ayboard[1]
  for(i=0;i<6;i++){
      axboard[i]=6.5*xbox;
      ayboard[i]=(14.5-i)*ybox;
  }
  for(i=6;i<12;i++){
    axboard[i]=(11.5-i)*xbox;
    ayboard[i]=8.5*ybox;
  }
  axboard[12]=0.5*xbox;
  ayboard[12]=7.5*ybox;
  for(i=13;i<19;i++){
    axboard[i]=(-12.5+i)*xbox;
    ayboard[i]=6.5*ybox;
  }
  for(i=19;i<25;i++){
    axboard[i]=6.5*xbox;
    ayboard[i]=(24.5-i)*ybox;
  }
  axboard[25]=7.5*xbox;
  ayboard[25]=0.5*ybox;
  for(i=26;i<32;i++){
    axboard[i]=8.5*xbox;
    ayboard[i]=(-25.5+i)*ybox;
  }
  for(i=32;i<38;i++){
    axboard[i]=(i-22.5)*xbox;
    ayboard[i]=6.5*ybox;
  }
  axboard[38]=14.5*xbox;
  ayboard[38]=7.5*ybox;
  for(i=39;i<45;i++){
    axboard[i]=(53.5-i)*xbox;
    ayboard[i]=8.5*ybox;
  }
  for(i=45;i<51;i++){
    axboard[i]=8.5*xbox;
    ayboard[i]=(i-35.5)*ybox;
  }
  axboard[51]=7.5*xbox;
  ayboard[51]=14.5*ybox;

  yxh=[];//Yellow Home path in X
  yyh=[];//Yellow Home path in Y
  gxh=[];
  gyh=[];
  rxh=[];
  ryh=[];
  bxh=[];
  byh=[];

  for(i=0;i<6;i++){
    yxh[i]=7.5*xbox;
    yyh[i]=(13.5-i)*ybox;
    gxh[i]=(1.5+i)*xbox;
    gyh[i]=7.5*ybox;
    rxh[i]=7.5*xbox;
    ryh[i]=(1.5+i)*ybox;
    bxh[i]=(13.5-i)*xbox;
    byh[i]=7.5*ybox;
  }
  