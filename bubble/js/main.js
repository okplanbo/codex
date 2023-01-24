$(document).ready(function() { // will be executed only if DOM is loaded and ready

  // initial values
  let nums = [];
  let numsObj = [];
  let i = 0;
  let j = 0;
  let swapped = 0;
  let timer = 0;

// describing our element (single number)
  class Num {
    constructor(value, order) {
      this.value = value;
      this.order = order;
      this.id = order;
    }

// drawing single element (number) in a given tag
    draw(place) {
      $(place)
      .append('<div class="num" id="'+ this.id +'" value="'
      + this.value +'" style="order:'+ this.order +'">'
      + this.value + '</div>');
    }
// change order of flex items
    set setOrder(newOrder) {
      this.order = newOrder;
      $('#'+this.id).css("order", this.order);
    }

  }

// single number generation within given limits
  function getRandomNum(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

// creating array with random numbers
// arrow function, Array.from(), ES6
  function getRandomSet(size) {
    return Array.from({length: size}, () => getRandomNum(1,50));
  }

// bubble sort from smallest to largest
  function BubbleSort(numsObj) {

    let len = numsObj.length;

    if (i == len-1) {
      return;
    }

// stop if there is nothing else to swap
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

// place two numbers in a blue circle, apply styles
    let tags = $('*[id="'+numsObj[j].id+'"], *[id="'+numsObj[j+1].id+'"]');
    tags.wrapAll('<div class="bubble" style="order:'+j+'"></div>');
    $('#'+numsObj[j].id).css('color', 'white');
    $('#'+numsObj[j+1].id).css('color', 'white');

// compare and swap animation
    if (numsObj[j].value > numsObj[j+1].value) {
      swapped = 1;
      $('.bubble').css('animation', 'numRight 0.5s ease');
      $('#'+numsObj[j].id).css('animation', 'numLeft 0.5s ease');
      $('#'+numsObj[j+1].id).css('animation', 'numLeft 0.5s ease');

// timeout for smooth animation after position change
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
// remove animation for a sorted numbers
    setTimeout(function() {
      clearAnimation();
    }, 500);

  }

// new random set (button handler)
  $("#show_nums").click(function() {
    i = 0; j = 0;
    clearInterval(timer);
    clearAnimation();
    $('#show_nums').attr('disabled','disabled');
    $('.visual-wrapper').empty();
    $('.nums-output').empty();
    $('#sort_nums').removeClass('onclick');
    $('#show_nums').css('margin-top', '0px');
    $(".header-done").css('display', 'none');

// generating new array with data with timeout
    setTimeout(function() {
      i = 0; j = 0;
      nums = getRandomSet(10); // adding random numbers
      let str = 'Initial data: ';
      drawNums('.visual-wrapper');
      nums.forEach(function(item) {
        str += item + ', ';
      });
// render all nums with commas, remove blank space at the end
      $('.nums-input').text(str.substr(0,str.length-2));
      $('#sort_nums').css('display','inline');
      $('#sort_nums').removeAttr('disabled'); // enable sort button

    }, 400);
  });

// filling array and drawing numbers
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

// show result from the nums[] array 
  function showResult() {
    let str = 'Result: ';
    nums.forEach(function(item) {
      str += item + ', ';
    });
    $(".nums-output").text(str.substr(0,str.length-2));
    $(".header-done").css('display','inline');
    $('#sort_nums').removeClass('onclick');
  }

// remove blue circle
  function clearAnimation() {
    $('.bubble').children().css('animation', '');
    $('.bubble').children().css('color', '');
    $('.bubble').children().unwrap();
  }

// sort button
  $("#sort_nums").click(function() {
    timer = setInterval(function() {
      BubbleSort(numsObj);
      if (i == numsObj.length-1) {
        clearInterval(timer); // stop
        showResult();
      }
    }, 1000);
    $('#sort_nums').attr('disabled','disabled');
    $('#sort_nums').addClass('onclick');
  });

// hint text animation
  $('.toggle').click(function() {
    $('.instructions-text').toggleClass('faded');
  });

});
