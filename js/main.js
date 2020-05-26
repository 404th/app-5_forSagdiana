let canvas = document.querySelector("#canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function () {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener( 'resize' , function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
} )

let maxRadius = 30;

let colorArray = [
  "rgba( 0, 0, 0, 1 )",
];

function Circle(x, y, radius, dx, dy, minRadius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = minRadius;
  this.colors = colorArray[0];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    c.fillStyle = this.colors;
    c.fill();
  };
  this.upDate = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    if (
      mouse.x - this.x < maxRadius &&
      mouse.x - this.x > -maxRadius &&
      mouse.y - this.y < maxRadius &&
      mouse.y - this.y > -maxRadius
    ) {
    if(this.radius < maxRadius){
      this.radius += 1 };
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }
    this.draw();
  };
}

let circleStore = [];

for (let j = 0; j < 100; j++) {
  let radius = Math.random()*6+1 ;
  let minRadius = radius;
  let x = Math.random() * (innerWidth - 2 * radius) + radius;
  let y = Math.random() * (innerHeight - 2 * radius) + radius;
  let dx = (Math.random() - 0.5) ;
  let dy = (Math.random() - 0.5) ;

  circleStore.push(new Circle(x, y, radius, dx, dy, minRadius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < circleStore.length; i++) {
    circleStore[i].upDate();
  }
}
animate();

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}
