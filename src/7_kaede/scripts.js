/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const table = require('./table.js');

$(window).resize(function () {
  $('#r').autofit();
});

const update = function () {
  const new_name = `七${table[Math.floor(Math.random() * table.length)]}楓`;
  document.title = new_name;
  $('#r').text(new_name).show().autofit();
};

let auto_update = true;

setInterval(function () {
  if (!auto_update) {
    return;
  }
  update();
}, 100);

const delay = (ms, fn) => setTimeout(fn, ms);
var flash = function (ms, count) {
  if (count) {
    delay(ms, function () {
      $('#r').toggle();
      flash(ms, count - 1);
    });
  }
};

$(window).click(function () {
  if (auto_update === null) {
    return;
  }
  auto_update = !auto_update;
  if (!auto_update) {
    auto_update = null;
    delay(500, function () {
      update();
      delay(750, function () {
        update();
        delay(1000, function () {
          update();
          flash(100, 8);
          auto_update = false;
        });
      });
    });
  }
  return false;
});

update();
