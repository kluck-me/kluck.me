const prefix = 'glitch-dncngrl';

$.fn.glitchDncngrl = function () {
  const display = this.css('display');
  $('<div>')
    .addClass(`${prefix}-clone`)
    .css({
      display: display === 'inline' ? 'inline-block' : display,
      verticalAlign: this.css('vertical-align'),
      width: `${this.width()}px`,
      height: `${this.height()}px`,
    })
    .append(
      $('<div>').addClass(`${prefix}-red`).append(this.clone()),
      $('<div>').addClass(`${prefix}-green`).append(this.clone()),
      $('<div>').addClass(`${prefix}-blue`).append(this.clone())
    )
    .mouseenter(function () {
      $(this).addClass(`${prefix}-pattern-${(Math.random() * 3 + 1) | 0}`);
    })
    .mouseleave(function () {
      $(this).removeClass(`${prefix}-pattern-1 ${prefix}-pattern-2 ${prefix}-pattern-3`);
    })
    .insertBefore(this);

  this.css('display', 'none');
};

$(`.${prefix}`).each(function () {
  if (this.naturalWidth) {
    $(this).glitchDncngrl();
  } else {
    $(this).on('load', function () {
      $(this).glitchDncngrl();
    });
  }
});
