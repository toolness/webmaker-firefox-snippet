var Snippet = (function() {
  function startRemixing() {
    // TODO: Fade out snippet text, fade in next step.
    $('.body-frame').addClass('selected');
    setTimeout(function() {
      $('.body-frame .arrow-box')
        .addClass('selected')
        .one('transitionend', function() {
          console.log('TODO');
        });
    }, 1000);
  }

  function start() {
    $("#begin").click(function() {
      startRemixing();
      return false;
    });
  };

  return {
    start: start
  };
})();
