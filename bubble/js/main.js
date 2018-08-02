$(document).ready(function() { // выполнять только после полной загрузки DOM

  let nums = [];
  let numsObj = [];
  let numberOfComparisons = 0;
  let i = 0;
  let j = 0;
  let swapped = 0;
  let timer = 0;

// описание числа
  class Num {

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

    let tags = $('*[id="'+numsObj[j].id+'"], *[id="'+numsObj[j+1].id+'"]');
    tags.wrapAll('<div class="bubble" style="order:'+j+'"></div>');
    $('#'+numsObj[j].id).css('color', 'white');
    $('#'+numsObj[j+1].id).css('color', 'white');

    if (numsObj[j].value > numsObj[j+1].value) {
      swapped = 1;
      $('.bubble').css('animation', 'numRight 0.5s ease');
      $('#'+numsObj[j].id).css('animation', 'numLeft 0.5s ease');
      $('#'+numsObj[j+1].id).css('animation', 'numLeft 0.5s ease');

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
        numberOfComparisons++;
        j++;
      }, 500);
    } else {
      numberOfComparisons++;
      j++;
    }
    setTimeout(function() {
      clear();
    }, 500);

  }

// вывод новых перемешанных чисел
  $("#show_set").click(function() {
    i = 0; j = 0; // обнуляем счётчики для сортировки, удаляем старые данные
    clearInterval(timer);
    $('.visual-wrapper').empty();
    $('.nums-output').empty();
    let str = 'Исходные данные: ';
    nums = getRandomSet(10); // выводим числа из массива
    nums.forEach(function(item) {
      str += item + ', ';
    });
// убрать запятую и пробел
    $('.nums-input').text(str.substr(0,str.length-2));
    $('#sort_set').css('display','inline');
    $('#sort_set').removeAttr('disabled'); // разблокируем кнопку сортировки
    drawNums('.visual-wrapper');
  });

// функция для наполнения массива объектами и отрисовки чисел
  function drawNums(place) {
    numsObj = [];
    nums.forEach(function(value, order) {
      numsObj.push(new Num(value, order));
    });
    numsObj.forEach(function(a) {
      a.draw(place);
    });
  }

  function showResult() {
    let str = 'Результат: ';
    nums.forEach(function(item) {
      str += item + ', ';
    });
    $(".nums-output").text(str.substr(0,str.length-2));
  }

  function clear() {
    let tags = $('*[id="'+numsObj[j-1].id+'"], *[id="'+numsObj[j].id+'"]');
    tags.unwrap();
    tags.css('animation', '');
    tags.css('color', '');
  }

  $("#sort_set").click(function() {
    timer = setInterval(function() {
      BubbleSort(numsObj);
      if (i == numsObj.length-1) {
        clearInterval(timer);
        showResult();
      }
    }, 1000);

    $('#sort_set').attr('disabled','disabled');
  });

});
