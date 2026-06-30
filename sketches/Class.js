const friction=0.99;
const gravity=0.03;

class Particles {
  constructor(x, y, alpha, decide, change, vertex, petal, off) {
    this.x=x;
    this.y=y;

    this.speed=random(1.5, 5);
    this.angle=random(2*PI);

    this.decide=decide;
    this.change=change;
    this.vertex=vertex;
    this.petal=petal;
    this.off=off;

    if (this.decide==0) {
      this.vx= 1.5*this.speed*cos(this.angle);
      this.vy= 1.5*this.speed*sin(this.angle);
    } else if (this.decide==1 || this.decide==12) {
      this.vx=this.speed*0.15*16*pow(sin(this.angle), 3);
      this.vy=-this.speed*0.15*(13*cos(this.angle)-5*cos(2*this.angle)-2*cos(3*this.angle)-cos(4*this.angle));
    } else if (this.decide==2) {
      this.vx= 2.5*((5-1)*cos(this.angle) + 1*cos((5/1-1)*this.angle));
      this.vy= 2.5*((5-1)*sin(this.angle) - 1*sin((5/1-1)*this.angle));
    } else if (this.decide==3) {
      this.vx= (4-1)*cos(this.angle) + 1*cos((4/1-1)*this.angle);
      this.vy= (4-1)*sin(this.angle) - 1*sin((4/1-1)*this.angle);
    } else if (this.decide==4) {
      this.vx= 2*((4-1)*cos(this.angle) + 1*cos((4/1-1)*this.angle));
      this.vy= 2*((4-1)*sin(this.angle) - 1*sin((4/1-1)*this.angle));
    } else if (this.decide==5 || this.decide==6) {
      this.vx= (-5-1)*cos(this.angle) + 1*cos((-5/1-1)*this.angle);
      this.vy= (-5-1)*sin(this.angle) - 1*sin((-5/1-1)*this.angle);
    } else if (this.decide==7 || this.decide==8) {
      this.vx= 0.5*((cos(this.angle*2*PI) + this.angle*2*PI*sin(this.angle*2*PI)));
      this.vy= 0.5*((sin(this.angle*2*PI) - this.angle*2*PI*cos(this.angle*2*PI)));
    } else if (this.decide==10 || this.decide==11) {
      this.vx= 3*((3-1)*cos(this.angle) + 1*cos((3/1-1)*this.angle));
      this.vy= 3*((3-1)*sin(this.angle) - 1*sin((3/1-1)*this.angle));
    } else if (this.decide==13) {
      this.vx=13*sin(4*this.angle)*cos(this.angle);
      this.vy=13*sin(4*this.angle)*sin(this.angle);
    }
    this.alpha=alpha;
    this.size=random(5, 15);
    this.friction = map(this.size, 5, 15, friction, friction-0.02);
  }
  update() {
    this.vx*=this.friction;
    this.vy*=this.friction;

    this.vy+=gravity;

    this.x+=this.vx;
    this.y+=this.vy;

    this.alpha-=random(1, 2);
  }
  display() {
    noStroke();
    fill(map(this.x, 0, width, 0, 360), map(this.y, 0, height, 1, 0.3), 1, this.alpha);
    if (this.change==1) {
      stars(this.x, this.y, this.vertex, 15, 7, this.off);
    } else if (this.change==0) {
      rose(this.x, this.y, 15, this.petal, this.off);
    } else {
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}

class f_Particles {
  constructor(x, y, change, vertex, petal, off) {
    this.x=x;
    this.y=y;
    this.speed=random(1.5, 5);
    this.angle=random(2*PI);
    this.change=change;
    this.vertex=vertex;
    this.petal=petal;
    this.off=off;
    this.vx= 2.5*((5-1)*cos(this.angle) + 1*cos((5/1-1)*this.angle));
    this.vy= 2.5*((5-1)*sin(this.angle) - 1*sin((5/1-1)*this.angle));
    this.size_lower=10;
    this.size_upper=25;
    this.size=random(this.size_lower, this.size_upper);
    this.alpha=255;
    this.friction=map(this.size, this.size_lower, this.size_upper, friction, friction-0.02);
  }
  update() {
    this.vx*=this.friction;
    this.vy*=this.friction;
    this.vy+=gravity;
    this.x+=this.vx;
    this.y+=this.vy;
    this.size-=0.5;
    this.off+=0.1;
    this.alpha-=10;
  }
  display() {
    stroke(map(this.x, 0, width, 0, 360),map(this.x, 0, height, 0, 1),1);
    fill(map(this.x, 0, width, 0, 360), map(this.y, 0, height, 1, 0.1),1, this.alpha);
    if (this.change==1) {
      stars(this.x, this.y, this.vertex, this.size*2, this.size, this.off);
    } else if (this.change==0) {
      rose(this.x, this.y, this.size*2, this.petal, this.off);
    } else {
      ellipse(this.x, this.y, this.size, this.size);
    }
  }
}



function stars(locx, locy, numVertex, shapeSize_R, shapeSize_r, offset) {
  var angle=0;
  var step= PI/numVertex;
  beginShape();
  noStroke();
  for (let i=0; i<=numVertex; i++) {
    var px = locx+cos(angle+offset) * shapeSize_R;
    var py = locy-sin(angle+offset) * shapeSize_R;
    vertex(px, py);
    angle += step;
    px = locx+cos(angle+offset) * shapeSize_r;
    py = locy-sin(angle+offset) * shapeSize_r;
    angle += step;
    vertex(px, py);
  }
  endShape();
}
function rose(x_loc, y_loc, amp, freq, offset) {
  beginShape();
  for (let phi = 0; phi < 2*PI; phi += 0.05) {
    let r = amp * sin(freq * phi+offset);
    x = x_loc+r * cos(phi+offset);
    y = y_loc+r * sin(phi+offset);
    vertex(x, y);
  }
  endShape();
}
