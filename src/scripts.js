(($) => {
  const animeUrls = [];
  const animeInterval = 3000;
  const getTumblrApi = (tag) =>
    $.getJSON('https://api.tumblr.com/v2/tagged', {
      tag,
      api_key: '3jJQBJhS6MidfygWrYPVUqzop3dkdk3kYUc5RUoSxSLL7OUonx',
    });

  const showAnime = (index) => {
    $(`#anime${index}`).attr('class', 'anime anime-show');
    index = (index + 1) % 3;
    $(`#anime${index}`)
      .attr('class', 'anime anime-load')
      .css(
        'background-image',
        animeUrls.length ? `url(\"${animeUrls[(Math.random() * animeUrls.length) | 0]}\")` : '',
      );
    index = (index + 1) % 3;
    $(`#anime${index}`).attr('class', 'anime anime-hide');
  };

  $.when(...['gifs', 'anime', 'anime-gif'].map(getTumblrApi)).then((...results) => {
    const urls = new Set();
    for (let result of results) {
      for (let response of result[0].response) {
        if (response.body) {
          const reg = /<img src="([^"]+\.gif)"/g;
          let m;
          while ((m = reg.exec(response.body))) {
            urls.add(m[1]);
          }
        }
      }
    }
    animeUrls.push(...Array.from(urls));

    $(() => {
      $('body').append(
        '<div class="anime anime-hide" id="anime0">',
        '<div class="anime anime-hide" id="anime1">',
        '<div class="anime anime-hide" id="anime2">',
      );
      showAnime(1);
      showAnime(2);
      let index = 0;
      setInterval(function () {
        showAnime(index);
        index = (index + 1) % 3;
      }, animeInterval);
    });
  });

  $(() => {
    const $body = $('body');
    let tid = null;
    const showContent = () => {
      $body.removeClass('hide-content');
      clearTimeout(tid);
    };
    $(window).on('focus', showContent);
    $body
      .mouseover(showContent)
      .mouseout(() => {
        tid = setTimeout(() => {
          $body.addClass('hide-content');
        }, 1000);
      })
      .click((evt) => {
        const $target = $(evt.target);
        if (
          $body.hasClass('hide-content') ||
          (!$target.closest('a').length && !$target.closest('section').length)
        ) {
          $body.toggleClass('hide-content');
        }
      });
  });
})(jQuery);
