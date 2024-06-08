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

let newsContainer = document.getElementById("newsContainer");
let loader = document.getElementById("loader");
let oneIndex = 0;

function loadMoreNews() {
  loader.style.display = "block";

  setTimeout(function () {
    for (let i = 0; i < 1; i++) {
      if (oneIndex < news.length) {
        let newsElement = document.createElement("div");
        newsElement.className = "news";
        newsElement.textContent = news[oneIndex];
        newsContainer.appendChild(newsElement);
        oneIndex++;
      }
    }
    loader.style.display = "none";
  }, 3000);
  let news = [
    `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio facer
    vitae voluptates corrupti quo, doloribus provident repellendus sapiente odio
    quam aliquam itaque! Voluptatem consectetur quas veritatis rerum atque ex
    nobis? Lorem ipsum dolor sit, amet consectetur adipisicing elit
    Exercitationem hic, cum, iure eligendi voluptatem laudantium dolores soluta
    sint tenetur aliquam, consectetur numquam quaerat reru. Voluptate possimus
    quisquam eius ducimus inventore lorem m quis ducimus fugit dignissimos illo atque temporibus quod ipsa totam eaque, enim similique obcaecati veniam ratione. Soluta amet optio laudantium id!`,
  ];
}

window.addEventListener("scroll", function () {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    loadMoreNews();
  }
});

loadMoreNews();

// Задание 5
// Создать html-страницу, на которой пользователь может ввести номер месяца, год, и получить календарь на указанный месяц.
// Календарь можно генерировать с помощью таблицы. Начальный
// день недели всегда должен быть понедельник.

// Задание 6
// Создать html-страницу со списком ссылок.
// Ссылки на внешние источники (которые начинаются с http://)
// необходимо подчеркнуть пунктиром.
// Искать такие ссылки в списке и устанавливать им дополнительные стили необходимо с помощью JS.
let linkList = document.getElementById("link-list");
let links = linkList.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
  let link = links[i];
  if (link.href.startsWith("https://")) {
    link.classList.add("external-link");
  }
}

// Задание 7
// Создать html-страницу со списком книг.
// При щелчке на элемент, цвет текста должен меняться на оранжевый. При повторном щелчке на другую книгу, предыдущей - необходимо возвращать прежний цвет.
// Если при клике мышкой была зажата клавиша Ctrl, то элемент
// добавляется/удаляется из выделенных. Если при клике мышкой
// была зажата клавиша Shift, то к выделению добавляются все
// элементы в промежутке от предыдущего кликнутого до текущего.
let rows = document.querySelectorAll("tr");
rows.forEach((element) => {
  element.onmousedown = paint;
});

let lastRow;

function paint() {
  if (event.shiftKey) {
    if (lastRow.rowIndex < this.rowIndex) {
      for (let i = lastRow.rowIndex; i <= this.rowIndex; i++) {
        rows[i].classList.add("selected");
      }
    } else {
      for (let i = lastRow.rowIndex; i >= this.rowIndex; i--) {
        rows[i].classList.add("selected");
      }
    }
    return;
  }
  if (event.ctrlKey) {
    if (this.classList.contains("selected")) {
      this.classList.remove("selected");
      return;
    } else {
      this.classList.add("selected");
      return;
    }
  }

  document.querySelectorAll(".selected").forEach((elem) => {
    elem.classList.remove("selected");
  });
  if (!this.classList.contains("selected")) {
    this.classList.add("selected");
  }
  if (this.classList.contains("selected")) {
    lastRow = this;
    return;
  }
}

// Задание 8
// Создать html-страницу для отображения/редактирования текста.
// При открытии страницы текст отображается с помощью тега
// div. При нажатии Ctrl+E, вместо div появляется textarea с тем
// же текстом, который теперь можно редактировать. При нажатии
// Ctrl+S, вместо textarea появляет div с уже измененным текстом.
// Не забудьте выключить поведение по умолчанию для этих сочетаний клавиш.
area.hidden = true;

document.onkeydown = function (e) {
  if (e.ctrlKey && e.keyCode == "69") {
    view.hidden = true;
    area.hidden = false;
    area.focus();
    area.innerHTML = view.innerHTML;
    return false;
  }

  if (e.ctrlKey && e.keyCode == "83") {
    view.hidden = false;
    area.hidden = true;
    //alert(area.value);
    view.innerHTML = area.value;
    return false;
  } else if (e.keyCode == "27") {
    view.hidden = false;
    area.hidden = true;
  }
};

// Задание 9
// Создать html-страницу с большой таблицей.
// При клике по заголовку колонки, необходимо отсортировать
// данные по этой колонке. Например: на скриншоте люди отсортированы по возрасту. Учтите, что числовые значения должны
// сортироваться как числа, а не как строки.
table.onclick = function (e) {
  if (e.target.tagName != "TH") return;
  let th = e.target;
  sortTable(th.cellIndex, th.dataset.type);
};

function sortTable(colNum, type) {
  let tbody = table.querySelector("tbody");
  let rowsArray = Array.from(tbody.rows);
  let compare;
  switch (type) {
    case "number":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
      };
      break;
    case "string":
      compare = function (rowA, rowB) {
        return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML
          ? 1
          : -1;
      };
      break;
  }
  rowsArray.sort(compare);
  tbody.append(...rowsArray);
}
