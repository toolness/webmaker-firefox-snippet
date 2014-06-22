var Snippet = (function() {
  var inCruiseControl = true;

  function setCss() {
    var css = $('#snippet-css').val();
    // http://meyerweb.com/eric/thoughts/2014/06/19/rebeccapurple/
    if (/^(re)?beccapurple$/i.test(css.trim()))
      css = '#663399';
    $('body').css('background', css);
  }

  function typeCssChars(chars, cb) {
    chars = chars.split('');

    function typeNextChar() {
      if (chars.length == 0) return cb();
      $('#snippet-css').val($('#snippet-css').val() + chars.shift());
      setCss();
      setTimeout(typeNextChar, 250);
    }

    typeNextChar();
  }

  function startRemixing() {
    $('#snippet-css').on('keyup change', setCss);
    $('#snippet-css').on('keydown', function() {
      if (inCruiseControl) return false;
    });
    $('#snippet-pg-1').fadeOut(function() {
      $('#snippet-pg-2').fadeIn(function() {
        $('.body-frame').addClass('selected');
        $('#snippet-css').focus();
        setTimeout(function() {
          $('.body-frame .arrow-box')
            .addClass('selected')
            .one('transitionend', function() {
              typeCssChars('DeepSkyBlue', function() {
                inCruiseControl = false;
                setTimeout(function() {
                  $('.body-frame, .arrow-box').removeClass('selected');
                  $('#snippet-end').addClass('selected');
                }, 1000);
              });
            });
        }, 1000);
      });
    });
  }

  function start() {
    $("#snippet-begin").click(function() {
      startRemixing();
      return false;
    });
  };

  return {
    start: start
  };
})();
