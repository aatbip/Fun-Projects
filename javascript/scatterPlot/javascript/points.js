var points = [
  {
    x: 10,
    y: 20,
  },
  {
    x: 100,
    y: 100,
  },
  {
    x: 120,
    y: 40,
  },
  {
    x: 140,
    y: 60,
  },
  {
    x: 120,
    y: 80,
  },
  {
    x: 100,
    y: 50,
  },
];

let box = document.getElementById("box");

for (let i = 0; i < points.length; i++) {
  let point = document.createElement("div");

  point.style.top = points[i].x + "px";
  point.style.left = points[i].y + "px";
  point.style.width = "20px";
  point.style.height = "20px";
  point.style.background = "blue";
  point.style.borderRadius = "50%";
  point.style.position = "absolute";
  box.appendChild(point);

  point.onclick = function (e) {
    e.target.style.background = "white";
  };
}
