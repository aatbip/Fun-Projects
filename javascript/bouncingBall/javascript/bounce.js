var circle = document.getElementById("circle");

let trigger = true;
let distance = 0;
function move() {
  if (trigger === true) {
    distance += 1;
    circle.style.top = distance + "px";
    if (parseInt(circle.style.top) >= 265) {
     trigger = false;
    }
  } else {
    distance -= 1;
    circle.style.top = distance + "px";
    if (parseInt(circle.style.top) <= 0) {
      trigger = true;
    }
  }
};

setInterval(move, 1);
