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
        surfaces.push(pMapper.createQuadMap(400, 200, 4));
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
        // surface.clear();
        //surface.background(col);
        drawOnSurface(surface); 
    }
}

function drawOnSurface(surface) {
  surface.background(5, 1); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 50) {
    for (let y = 0; y <= height; y = y + 50) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, 16 * width, -8 * PI, 8 * PI, true);
      const yAngle = map(mouseY, 0, 16 * height, -8 * PI, 8 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t * 6 + angle);
      const myY = y + 20 * sin(2 * PI * t * 6 + angle);

      surface.ellipse(myX - 500, myY - 500, 10); // draw particle
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
