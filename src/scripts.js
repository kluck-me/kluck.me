/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
(function ($) {
  const anime_urls = [];
  const anime_pushed_urls = {};
  const anime_interval = 3000;

  const anime_ajax_by_tags = (tags) =>
    tags.map((tag) =>
      $.getJSON('https://api.tumblr.com/v2/tagged?callback=?', {
        tag,
        api_key: '3jJQBJhS6MidfygWrYPVUqzop3dkdk3kYUc5RUoSxSLL7OUonx',
      }),
    );

  const anime_push = function (url) {
    if (/\.gif$/.test(url) && !anime_pushed_urls[url]) {
      anime_pushed_urls[url] = true;
      anime_urls.push(url);
    }
  };

  const anime_show = function (index) {
    $(`#anime${index}`).attr('class', 'anime anime-show');
    index = (index + 1) % 3;
    $(`#anime${index}`)
      .attr('class', 'anime anime-load')
      .css('background-image', `url(\"${anime_urls[(Math.random() * anime_urls.length) | 0]}\")`);
    index = (index + 1) % 3;
    $(`#anime${index}`).attr('class', 'anime anime-hide');
  };

  $.when(...Array.from(anime_ajax_by_tags(['gif', 'gifs', 'anime', 'anime-gif']) || [])).done(
    function () {
      for (let arg of arguments) {
        for (let response of arg[0].response) {
          if (response.photos) {
            for (let photo of response.photos) {
              anime_push(photo.original_size.url);
            }
          }
        }
      }

      $(function () {
        $('body').append(
          '<div class="anime anime-hide" id="anime0">',
          '<div class="anime anime-hide" id="anime1">',
          '<div class="anime anime-hide" id="anime2">',
        );
        anime_show(1);
        anime_show(2);
        let index = 0;
        setInterval(function () {
          anime_show(index);
          index = (index + 1) % 3;
        }, anime_interval);
      });
    },
  );

  $(function () {
    const $body = $('body');

    let tid = null;
    const show_content = function () {
      $body.removeClass('hide-content');
      clearTimeout(tid);
    };

    window.onfocus = show_content;
    $body
      .mouseover(show_content)
      .mouseout(function () {
        tid = setTimeout(function () {
          $body.addClass('hide-content');
        }, 1000);
      })
      .click(function (evt) {
        const $target = $(evt.target);
        if (
          $body.hasClass('hide-content') ||
          (!$target.closest('a').length && !$target.closest('section').length)
        ) {
          $body.toggleClass('hide-content');
        }
      });
  });
})($);
