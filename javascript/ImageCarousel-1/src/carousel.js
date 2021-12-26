function Carousel() {
  this.left = 0;
  this.index = 0;
  this.imageWidth = 400;
  this.processing = false;
  this.speed = (100 / 60).toFixed(5);
  this.dots = [];

  this.init = function (carouselId, transitionTime) {
    this.container = document.getElementById(carouselId);
    this.transitionTime = transitionTime || 1;
    this.wrapper = this.container.querySelector(".carousel-image-wrapper");
    this.images = this.wrapper.querySelectorAll("img");
    this.imageCount = this.images.length;

    this.wrapper.style.width = this.imageCount * 100 + "%";
    this.wrapper.style.left = this.left + "%";

    for (let i = 0; i < this.imageCount; i++) {
      this.images[i].style.width = 100 / this.imageCount + "%";
    }

    this.dotsContainer = document.createElement("div");
    this.dotsContainer.style.textAlign = "center";
    this.dotsContainer.style.position = "absolute";
    this.dotsContainer.style.bottom = "5px";
    this.dotsContainer.classList.add("dots-container");
    this.container.appendChild(this.dotsContainer);

    for (var i = 0; i < this.imageCount; i++) {
      var dot = document.createElement("span");
      dot.classList.add("dots");
      if (i == 0) {
        dot.classList.add("active");
      }
      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }

    for (let i = 0; i < this.dots.length; i++) {
      var that = this;
      this.dots[i].addEventListener("click", function () {
        that.goToIndex(i);
      });
    }

    this.createButtons();
  };

  this.next = function () {
    if (this.index >= this.imageCount - 1) {
      this.goToIndex(0);
    } else {
      this.goToIndex(this.index + 1);
    }
  };

  this.previous = function () {
    if (this.index <= 0) {
      this.goToIndex(this.imageCount - 1);
    } else {
      this.goToIndex(this.index - 1);
    }
  };

  this.goToIndex = function (indexes) {
    let temp = this.left;
    this.left = -(indexes * 100);
    let multiple = Math.abs(this.index - indexes);
    this.index = indexes;

    this.indicate(this.index);

    if (temp <= this.left) {
      let x = setInterval(() => {
        this.processing = true;
        temp += this.speed * multiple;
        if (temp >= this.left) {
          clearInterval(x);
          this.processing = false;
        }
        this.wrapper.style.left = temp + "%";
      }, 16.67 * this.transitionTime);
    } else {
      let x = setInterval(() => {
        this.processing = true;
        temp -= this.speed * multiple;
        if (temp <= this.left) {
          clearInterval(x);
          this.processing = false;
        }
        this.wrapper.style.left = temp + "%";
      }, 16.67 * this.transitionTime);
    }
  };

  this.indicate = function (indexes) {
    for (let i = 0; i < this.dots.length; i++) {
      this.dots[i].classList.remove("active");
    }
    this.dots[indexes].classList.add("active");
  };

  this.createButtons = function () {
    this.nextButton = document.createElement("a");
    this.nextButton.classList.add("next-button");
    this.nextButton.innerHTML = "&raquo;";
    this.container.appendChild(this.nextButton);

    this.prevButton = document.createElement("a");
    this.prevButton.classList.add("prev-button");
    this.prevButton.innerHTML = "&laquo;";
    this.container.appendChild(this.prevButton);

    let forward = this;
    this.nextButton.addEventListener("click", function (e) {
      if (!forward.processing) {
        forward.next();
      }
    });

    this.prevButton.addEventListener("click", function (e) {
      if (!forward.processing) {
        forward.previous();
      }
    });

    this.container.addEventListener("mouseenter", function () {
      forward.stopSlide();
    });

    this.container.addEventListener("mouseleave", function () {
      forward.autoSlide();
    });
  };
}

let start = new Carousel();
start.init("carousel", 1);
