var createInput = function() {
  if (($(this).find('input').length == 0) && ($(this).find('textarea').length == 0) && ($(this).find('select').length == 0)) {
    var val = $(this).html();
    if ($(this).parent().hasClass('cv-block-skills')) {
      val = '';
      $(this).children('span').each(function() {
        val = val + $(this).text() + '; ';
      })
      if (val == '') {
        val = "Введите свои навыки через ';'";
      }
    }
    var html = $(this).attr('data-html');
    $(this).html(html);
    if ($(this).parent().hasClass('cv-block-item-date')) {
      var year = val.split(' ')[1];
      var month = val.split(' ')[0];
      switch (month) {
        case 'Январь':
          month = '01';
          break;
        case 'Февраль':
          month = '02';
          break;
        case 'Март':
          month = '03';
          break;
        case 'Апрель':
          month = '04';
          break;
        case 'Май':
          month = '05';
          break;
        case 'Июнь':
          month = '06';
          break;
        case 'Июль':
          month = '07';
          break;
        case 'Август':
          month = '08';
          break;
        case 'Сентябрь':
          month = '09';
          break;
        case 'Октябрь':
          month = '10';
          break;
        case 'Ноябрь':
          month = '11';
          break;
        case 'Декабрь':
          month = '12';
          break;
      }
      val = $(this).attr('data-val');
      if ($(this).is(':first-child')) {
        var max = $(this).parent().children('span:last-child').attr('data-val');
        if (max != undefined) {
          $(this).children().attr('max', max);
        }
      } else if ($(this).is(':last-child')) {
        var min = $(this).parent().children('span:first-child').attr('data-val');
        if (min != undefined) {
          $(this).children().attr('min', min);
        }
      }
    }
    if (!$(this).hasClass('default')) {
      $(this).children().val(val);
    }
    $(this).children().attr('data-default', val);
  }
}

var formPhone = function() {
    $(this).val($(this).val().replace(/\D/g,''));
    console.log($(this).val());
    if ($(this).val().length < 11) {
      var d = 11 - $(this).val().length
      for (var i=0; i<d; i++) {
        $(this).val($(this).val()+'0');
      }
    }
    var x = $(this).val().match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
    $(this).val('+'+ x[1] + ' (' + x[2] + ') ' + x[3] + '-' + x[4] + '-' + x[5]);
}

var changeInput = function() {
  var val = $(this).val();
  if ($(this).val() != '') {
    $(this).parent().removeClass('default');
    if ($(this).attr('type') == 'month') {
      var year = val.split('-')[0];
      var month = val.split('-')[1];
      switch (month) {
        case '01':
          month = 'Январь';
          break;
        case '02':
          month = 'Февраль';
          break;
        case '03':
          month = 'Март';
          break;
        case '04':
          month = 'Апрель';
          break;
        case '05':
          month = 'Май';
          break;
        case '06':
          month = 'Июнь';
          break;
        case '07':
          month = 'Июль';
          break;
        case '08':
          month = 'Август';
          break;
        case '09':
          month = 'Сентябрь';
          break;
        case '10':
          month = 'Октябрь';
          break;
        case '11':
          month = 'Ноябрь';
          break;
        case '12':
          month = 'Декабрь';
          break;
      }
      $(this).parent().attr('data-val', val);
      val = month + ' ' + year
    } else if ($(this).parent().parent().hasClass('cv-block-skills')) {
      arr = val.split(';');
      valNew = '';
      for (var i=0;i<arr.length; i++) {
        arr[i] = $.trim(arr[i]);
        if (arr[i] != '') {
          valNew = valNew + '<span class="cv-block-skills-item" style="text-decoration: underline; text-decoration-color: #aaa; padding: 2% 0; margin: 2% 0;">'+arr[i]+'</span> ';
        }
      }
      val = valNew;
    }
    $(this).parent().html(val);
  } else {
    $(this).parent().html($(this).attr('data-default'));
  }
}

var changeTextarea = function() {
  var val = $(this).val();
  if ($(this).parent().parent().hasClass('cv-block-skills')) {
    arr = val.split(';');
    valNew = '';
    for (var i=0;i<arr.length; i++) {
      arr[i] = $.trim(arr[i]);
      if (arr[i] != '') {
        valNew = valNew + '<span class="cv-block-skills-item" style="text-decoration: underline; text-decoration-color: #aaa; padding: 2% 0; margin: 2% 0;">'+arr[i]+'</span> ';
      }
    }
    val = valNew;
  }
  $(this).parent().html(val);
}

var changeSelect = function() {
  var val = $(this).val();
  $(this).parent().html(val);
}

var addItem = function() {
  var item = $(this).parent().find('.item').last().clone();
  $(this).parent().append(item);
}

var delItem = function() {
  if ($(this).closest('.cv-block').children('.item').length > 1) {
    $(this).parent().remove();
  }
}

/* Implement */
$('.input-click').click(createInput)
$('.cv').on('change', 'input[name="phone"]', formPhone);
$('.cv').on('focusout', 'input', changeInput);
$('.cv').on('focusout', 'textarea', changeInput);
$('.cv').on('focusout', 'select', changeInput);
$('.add').click(addItem);
$('.cv').on('click', '.remove-item', delItem);
