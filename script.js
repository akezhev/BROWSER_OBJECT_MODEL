//  Задание 1
// Создать html-страницу с трекбаром.
// Предоставить пользователю возможность изменять положение
// синего указателя.

const trackbars = document.querySelectorAll(".trackbar");
for (let i = 0; i < trackbars.length; i++) {
  let trackbar = trackbars[i];

  const button = trackbar.querySelector(".track-button");
  if (button && button instanceof HTMLElement) {
    let dragging = false;

    const parentWidth = trackbar.offsetWidth;
    const elementWidth = button.offsetWidth;

    let clickOffset = 0;
    button.addEventListener("mousedown", () => {
      clickOffset = event.pageX - button.offsetLeft - 8 - elementWidth / 2;
      dragging = true;
    });
    document.body.addEventListener("mouseup", () => {
      dragging = false;
    });
    document.body.addEventListener("mousemove", (event) => {
      if (dragging) {
        let currentPosition =
          event.pageX - button.offsetLeft - 8 - elementWidth / 2;
        let elementPosition = parseInt(
          window.getComputedStyle(button).getPropertyValue("left")
        );

        let nextPosition = elementPosition + currentPosition - clickOffset;

        if (nextPosition < 0) nextPosition = 0;
        if (nextPosition >= parentWidth - elementWidth)
          nextPosition = parentWidth - elementWidth;

        if (elementPosition == nextPosition + 2) return false;
        nextPosition = nextPosition + "px";

        button.style.left = nextPosition;
        let color =
          "hsl(" +
          (
            120 -
            (100 -
              Math.floor(
                (elementPosition * 100) / (parentWidth - elementWidth)
              )) *
              1.2
          ).toString(10) +
          ",70%,60%)";

        button.style.setProperty("--next-bg-color", color);

        trackbar.setAttribute(
          "complete",
          Math.floor((elementPosition * 100) / (parentWidth - elementWidth))
        );
        if ((trackSelector = trackbar.querySelector(".track-selector")))
          trackSelector.style.width =
            Math.floor(
              (elementPosition * parentWidth) / (parentWidth - elementWidth)
            ) + "px";

        if ((trackPercentage = trackbar.querySelector(".track-percentage")))
          trackPercentage.innerHTML =
            Math.floor((elementPosition * 100) / (parentWidth - elementWidth)) +
            "%";
      }
    });
    document.body.addEventListener("mouseleave", () => {
      dragging = false;
    });
  }
}

// Задание 2
// Создать html-страницу с галереей.
// В один момент времени на экране отображается одно изображение и две кнопки: Назад и Вперед. При нажатии на кнопки
// изображения должны переключатся в указанном порядке. Когда
// следующего/предыдущего изображения нет, то соответствующую
// кнопку необходимо блокировать. Изображения хранить в заранее
// подготовленном массиве.

let images = ["img/html.png", "img/css.png", "img/js.png"];

let imageElement = document.getElementById("image");
let prevButton = document.getElementById("prevButton");
let nextButton = document.getElementById("nextButton");
let currentIndex = 0;

function updateGallery() {
  imageElement.src = images[currentIndex];

  if (currentIndex === 0) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentIndex === images.length - 1) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

prevButton.addEventListener("click", function () {
  if (currentIndex > 0) {
    currentIndex--;
    updateGallery();
  }
});

nextButton.addEventListener("click", function () {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    updateGallery();
  }
});

updateGallery();

// Задание 3
// Создать html-страницу с блоками информации, которые открываются по щелчку на заголовок. В один момент времени может
// быть развернут только один блок информации.
let blocks = Array.from(document.getElementsByClassName("block"));

function toggleBlock(index) {
  blocks.forEach(function (block, i) {
    if (i === index) {
      block.classList.add("active");
    } else {
      block.classList.remove("active");
    }
  });
}

// Задание 4
// Создать html-страницу с новостями.
// Необходимо отлавливать, когда скролл доходит до конца страницы, и догружать еще новости в список. Новости для подгрузки
// хранить в заранее подготовленном массиве.
// Облегченный вариант: вместо отлова, когда скролл дойдет до
// конца страницы, используйте кнопку в конце списка новостей.
let news = [
  "Новость 1",
  "Новость 2",
  "Новость 3",
  "Новость 4",
  "Новость 5",
  "Новость 6",
  "Новость 7",
  "Новость 8",
  "Новость 9",
  "Новость 10",
];

let newsContainer = document.getElementById("newsContainer");
let loader = document.getElementById("loader");
let oneIndex = 0;

function loadMoreNews() {
  loader.style.display = "block";

  setTimeout(function () {
    for (let i = 0; i < 4; i++) {
      if (oneIndex < news.length) {
        let newsElement = document.createElement("div");
        newsElement.className = "news";
        newsElement.textContent = news[oneIndex];
        newsContainer.appendChild(newsElement);
        oneIndex++;
      }
    }
    loader.style.display = "none";
  }, 2000);
}

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMoreNews();
  }
});

loadMoreNews();
