var seed;
var framerate = 60;
var trail_count = 10;
var speed = 1;
var size = 50;
var resolution = 50;
var trail_length = 0.25;
var interval = 1;
var t = 0;

function color_lerp(a, b, t) {
  var c = color(red(a)*(1-t)+red(b)*t, green(a)*(1-t)+green(b)*t, blue(a)*(1-t)+blue(b)*t, alpha(a)*(1-t)+alpha(b)*t);
  return c;
}

var start;
var end;
var next_change;

function random_color() {
  return color(random(255), random(255), random(255));
}

function change_trail_colors() {
  start = random_color();
  end =   random_color();
  next_change = (second()+interval)%60;
}

function draw_trail(offset, id) {
  var p_time = (t + offset) * constrain((offset*2123.5123)%5, 0.5, 2);
  for (i = 0; i <= resolution; i++) {
    var ellipse_t = p_time-(resolution-i-1)*trail_length/resolution;
    var p_size = max((offset * 36127.14) % (size), 5);
    var x = noise(ellipse_t);
    var y = noise(ellipse_t+51);
    var trail_t = i/resolution;
    var c = color_lerp(start, end, ((id%2==0)?trail_t:1-trail_t));
    fill(red(c), green(c), blue(c), trail_t*255);
    x = map(x, 0, 1, 0, width);
    y = map(y, 0, 1, 0, height);
    ellipse(x, y, trail_t * p_size, trail_t * p_size);
  }
}

function setup() {
  seed = random(0, 1024)*random(0, 1024)%9182.12131;
  createCanvas(windowWidth, windowHeight);
  noStroke();
  frameRate(framerate);
  change_trail_colors();
}

function draw() {
  var time_seed = second() * seed;
  var back_color = color(time_seed * 65.1416 % 255, time_seed * 145.1416 % 255, time_seed * 567.1416 % 255);
  background(back_color);
  
  t += speed/framerate;
  if (second() == next_change) { change_trail_colors(); }
  for (j = 0; j <= trail_count; j++) {
    draw_trail(j*3.1416*seed, j);
  }
}
