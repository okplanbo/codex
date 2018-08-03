$(document).ready(function() { // выполнять только после полной загрузки DOM

  let nums = [];
  let numsObj = [];
  let numberOfComparisons = 0;
  let i = 0;
  let j = 0;
  let swapped = 0;
  let timer = 0;

// описание элемента-числа
  class Num {

// свойства объекта при создании
    constructor(value, order) {
      this.value = value;
      this.order = order;
      this.id = order;
    }

// метод отрисовки одного элемента-числа в указанном теге
    draw(place) {
      $(place)
      .append('<div class="num" id="'+ this.id +'" value="'
      + this.value +'" style="order:'+ this.order +'">'
      + this.value + '</div>');
    }
// новый порядок flex расположения для элемента
    set setOrder(newOrder) {
      this.order = newOrder;
      $('#'+this.id).css("order", this.order);
    }

  }

// генерация одного случайного целого числа от min до max
  function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

// создание массива случайных чисел от 1 до 50
// используется стрелочная функция и Array.from()  (ES6)
  function getRandomSet(size) {
    return Array.from({length: size}, () => getRandomNum(1,50));
  }

// пузырьковая сортировка по возрастанию
  function BubbleSort(numsObj) {

    let len = numsObj.length;

    if (i == len-1) {
      return;
    }

// завершить выполнение, если при последнем проходе ничего не поменялось
    if (j == len-1-i && swapped == 0) {
      i = len-1;
      return;
    }

    if (j == len-1-i) {
      i++;
      j = 0;
      swapped = 0;
      return;
    }

// поместить 2 элемента-числа в синий круг, стилизовать
    let tags = $('*[id="'+numsObj[j].id+'"], *[id="'+numsObj[j+1].id+'"]');
    tags.wrapAll('<div class="bubble" style="order:'+j+'"></div>');
    $('#'+numsObj[j].id).css('color', 'white');
    $('#'+numsObj[j+1].id).css('color', 'white');

// поменять местами элементы, если правое число больше левого
    if (numsObj[j].value > numsObj[j+1].value) {
      swapped = 1;
      $('.bubble').css('animation', 'numRight 0.5s ease');
      $('#'+numsObj[j].id).css('animation', 'numLeft 0.5s ease');
      $('#'+numsObj[j+1].id).css('animation', 'numLeft 0.5s ease');

// установить таймер для плавного завершения анимацию до смены позиции блоков
      setTimeout(function() {
        let tempObj = numsObj[j+1];
        let tempOrd = numsObj[j+1].order;
        numsObj[j+1].setOrder = numsObj[j].order;
        numsObj[j].setOrder = tempOrd;
        numsObj[j+1] = numsObj[j];
        numsObj[j] = tempObj;
        let temp = nums[j+1];
        nums[j+1] = nums[j];
        nums[j] = temp;
        j++;
      }, 500);
    } else {
      j++;
    }
    numberOfComparisons++;
// убрать анимацию на обработанных числах
    setTimeout(function() {
      clearAnimation();
    }, 500);

  }

// вывод рандомных чисел по кнопке "новые данные"
  $("#show_nums").click(function() {
    i = 0; j = 0; // обнулить счётчики для сортировки
    clearInterval(timer); // остановить функцию сортировки
    clearAnimation(); // остановить анимацию
    $('#show_nums').attr('disabled','disabled');
    $('.visual-wrapper').empty();
    $('.nums-output').empty();
    $('#sort_nums').removeClass('onclick');
    $('#show_nums').css('margin-top', '0px');
    $(".header-done").css('display', 'none');

// таймаут для генерации нового массива чисел и объектов
    setTimeout(function() {
      i = 0; j = 0;
      nums = getRandomSet(10); // новые рандомные числа
      let str = 'Исходные данные: ';
      drawNums('.visual-wrapper'); // создать объекты, поместить в массив
      nums.forEach(function(item) {
        str += item + ', ';
      });
// вывести числа через запятую, убрать в конце запятую и пробел
      $('.nums-input').text(str.substr(0,str.length-2));
      $('#sort_nums').css('display','inline');
      $('#sort_nums').removeAttr('disabled'); // разблокируем кнопку сортировки

    }, 400);
  });

// функция для наполнения массива объектами и отрисовки чисел
  function drawNums(place) {
    numsObj = [];
    nums.forEach(function(value, order) {
      numsObj.push(new Num(value, order));
    });
    numsObj.forEach(function(a) {
      a.draw(place);
      $('#show_nums').removeAttr('disabled');
    });
  }

// выводим результат из массива чисел nums[] через запятую для копирования
  function showResult() {
    let str = 'Результат: ';
    nums.forEach(function(item) {
      str += item + ', ';
    });
    $(".nums-output").text(str.substr(0,str.length-2));
    $(".header-done").css('display','inline');
    $('#sort_nums').removeClass('onclick');
  }

// убрать синий круг
  function clearAnimation() {
    $('.bubble').children().css('animation', '');
    $('.bubble').children().css('color', '');
    $('.bubble').children().unwrap();
  }

// кнопка сортировки
  $("#sort_nums").click(function() {
    timer = setInterval(function() {
      BubbleSort(numsObj);
      if (i == numsObj.length-1) {
        clearInterval(timer); // остановить сортировку
        showResult();
      }
    }, 1000);
    $('#sort_nums').attr('disabled','disabled');
    $('#sort_nums').addClass('onclick');
  });

// анимация инструкции
  $('.toggle').click(function() {
    $('.instructions-text').toggleClass('faded');
  });

});
