do ($, document) ->
  anime_urls = []
  anime_pushed_urls = {}
  anime_interval = 3000

  anime_ajax_by_tags = (tags) ->
    for tag in tags
      $.getJSON(
        'https://api.tumblr.com/v2/tagged?callback=?',
        tag: tag
        api_key: '3jJQBJhS6MidfygWrYPVUqzop3dkdk3kYUc5RUoSxSLL7OUonx'
      )

  anime_push = (url) ->
    if /\.gif$/.test(url) && !anime_pushed_urls[url]
      anime_pushed_urls[url] = true
      anime_urls.push(url)
    return

  anime_show = (target) ->
    $('#anime' + (target ^ 1))
      .css(
        display: ''
        'background-image': "url(\"#{anime_urls[Math.random() * anime_urls.length | 0]}\")"
      )
    $('#anime' + target).css(display: 'block')
    return

  $.when(anime_ajax_by_tags(['gif', 'gifs', 'anime', 'anime-gif'])...).done ->
    for arg in arguments
      for response in arg[0].response
        anime_push(photo.original_size.url) for photo in response.photos if response.photos

    $ ->
      $('body').append('<div class="anime" id="anime0">', '<div class="anime" id="anime1">')
      anime_show(1)
      anime_show(0)
      target = 0
      setInterval ->
        anime_show(target ^= 1)
        return
      , anime_interval
      return
    return

  $(document)
    .click (evt) ->
      $body = $('body')
      $target = $(evt.target)
      if $body.hasClass('hide-content') || (!$target.closest('a').length && !$target.closest('section').length)
        $body.toggleClass('hide-content')
        false

  return
