/*
* p5.mapper
* Display rainbow array of quad maps
* 
* Jenna deBoisblanc
* jdeboi.com
* 11/16/2021
* 
*/

let pMapper;
let surfaces = [];

let t = 0; // time variable


function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    // initialize map surfaces
    pMapper = createProjectionMapper(this);
    for (let i = 0; i < 10; i++) {
        surfaces.push(pMapper.createQuadMap(200, 200, 4));
    }
    // load maps
    pMapper.load("maps/map.json");

    // HSB color for rainbow effect
    // colorMode(HSB, 255);
}

function draw() {
    //background(0);

    // draw on quad surfaces
    let index = 0;
    for (const surface of surfaces) {
        //let col = color((frameCount + index++ * 20) % 255, 255, 255);
        //surface.clear();
        //surface.background(col);
        drawOnSurface(surface); 
    }
}

function drawOnSurface(surface) {
  surface.strokeWeight(0.2); // translucent background (creates trails)
  surface.stroke(random(30, 180), random(10,125), random(150, 200), random(5, 20)); // translucent background (creates trails)
  //surface.stroke(250, 250, 250); // translucent background (creates trails)
  //surface.fill(random(200, 255), 30); // translucent background (creates trails)
  surface.fill(20, random(10, 30)); // translucent background (creates trails)
  surface.rect(-100, -100, 200, 200); // draw particle

  //surface.background(100,0,0,25);
  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 100) {
    for (let y = 0; y <= height; y = y + 100) {
      //surface.background(10, 10); // translucent background (creates trails)
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, 4 * width, -36 * PI, 36 * PI, true);
      const yAngle = map(mouseY, 0, 4 * height, -36 * PI, 36 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + random(10, 50) * cos(2 * PI * t * 4 + angle);
      const myY = y + random(10, 50) * sin(2 * PI * t * 4 + angle);

      surface.fill(random(0,50), random(160,230), random(200,255), random(50, 120)); // translucent background (creates trails)
      surface.ellipse(myX - 100, myY - 100, random(4, 10)); // draw particle
    }
  }

  t = t + 0.001; // update time
}

function keyPressed() {
    switch (key) {
        case 'c':
            // toggle calibration
            pMapper.toggleCalibration();
            break;
        case 'f':
            // toggle fullscreen
            let fs = fullscreen();
            document.getElementById("header").style.display = "none";
            fullscreen(!fs);
            break;
        case 'l':
            pMapper.load("maps/map.json");
            break;

        case 's':
            pMapper.save("map.json");
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
