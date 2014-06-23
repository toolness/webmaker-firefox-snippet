var Snippet = (function() {
  var inCruiseControl = false;
  var wasCssTinkeredWith = false;

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

    $('#snippet-css').val('');
    typeNextChar();
  }

  function startRemixing() {
    inCruiseControl = true;
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
                  setTimeout(function() {
                    if (!wasCssTinkeredWith)
                      $('.snippet .arrow-box').addClass('selected');
                  }, 3000);
                }, 1000);
              });
            });
        }, 1000);
      });
    });
  }

  function activateTypeahead() {
    // http://twitter.github.io/typeahead.js/examples/
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    $('#snippet-css').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    }, {
      name: 'colors',
      displayKey: 'value',
      source: substringMatcher(Object.keys(CSS_COLORS).sort())
    });

    // Uncomment this to debug styling.
    // $('#snippet-css').focus().typeahead('val', 'gray').typeahead('open');
  }

  function start() {
    activateTypeahead();
    $('#snippet-css').on('keyup change', setCss);
    $('#snippet-css').on('keydown', function(e) {
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        if (inCruiseControl) return false;
        if (!wasCssTinkeredWith) {
          $('.snippet .arrow-box').removeClass('selected');
          wasCssTinkeredWith = true;
        }
      }
    });
    $("#snippet-begin").click(function() {
      startRemixing();
      return false;
    });
  };

  return {
    start: start
  };
})();
