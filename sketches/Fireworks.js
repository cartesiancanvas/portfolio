const particle_count = 120;
const max_particles = 400;
const max_fparticles =250;
var particles = [];
var f_particles = [];
let xPos;
let yPos;
let f_xPos;
let f_yPos;
let cursorX = 0;
let cursorY = 0;
let isHovering = false;
let flag;
let choose;
let alpha_on = false;
let fade_start_time = 0;
let fadeDuration = 5000;
let alpha_value;
let elapsed;


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    let cnv = createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 1, 1, 255);
    cnv.elt.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
}


function draw() {
    if (alpha_on == true) {
        elapsed = millis() - fade_start_time;
        alpha_value = map(elapsed , 0 , fadeDuration , 5 , 255);
        background(0, 0, 0 , alpha_value);
        if (elapsed >= fadeDuration) {
            alpha_on = false;
        }
    } else {
        background(0, 0, 0, 255);
    }
    
    cursorX = lerp(cursorX, mouseX, 0.2);
    cursorY = lerp(cursorY, mouseY, 0.2);    
    stroke(0,0,1);
    strokeWeight(1);
    rose(cursorX, cursorY, 30, map(sin(frameCount*0.02), -1, 1, 3, 11), frameCount * 0.05);
    
    if (flag == 1) {
    for (var j = 0; j < particle_count; j++) {
        if (particles.length < max_particles) {
            particles.push(new Particles(xPos, yPos, 255, choose, int(random(8)), int(random(3,8)), int(random(3,8)), random(8*PI)));
        }
    }
}
    flag = 0;

    for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].y > height || particles[i].y < 0 || particles[i].x > width || particles[i].x < 0 || particles[i].alpha < 0) {
            particles.splice(i, 1);
        }
    }
    for (var i = f_particles.length - 1; i >= 0; i--) {
        f_particles[i].update();
        f_particles[i].display();
        if (f_particles[i].y > height || f_particles[i].y < 0 || f_particles[i].x > width || f_particles[i].x < 0 || f_particles[i].size <= 1) {
            f_particles.splice(i, 1);
        }
    }
}

function mouseClicked() {
    flag = 1;
    alpha_on = true;
    fade_start_time = millis();
    choose = int(random(14));
    xPos = mouseX;
    yPos = mouseY;
}

function init(count) {
    for (var j = 0; j < count; j++) {
        if (f_particles.length < max_fparticles) {
            f_particles.push(new f_Particles(f_xPos, f_yPos, int(random(8)), int(random(3,8)), int(random(3,8)), random(-2*PI, 2*PI)));
        }
    }
}

function mouseMoved() {
    f_xPos = mouseX;
    f_yPos = mouseY;
    init(8);
}

function touchMoved() {
    if (touches.length > 0) {
        f_xPos = touches[0].x;
        f_yPos = touches[0].y;
        init(3);
    }
}