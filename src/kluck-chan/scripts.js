/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
$(document).on('click', 'a', function() {
  const $this = $(this);
  if ($this.hasClass('clicked')) {
    return;
  }
  const imgNode = $this.find('img')[0];
  $('body').css({
    backgroundImage: `url(${imgNode.src})`,
    backgroundSize: `${imgNode.width}px ${imgNode.height}px`,
  });
  $this.addClass('clicked');
  return false;
});
