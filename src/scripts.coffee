do ($) ->
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

  anime_show = (index) ->
    $("#anime#{index}").attr('class', 'anime anime-show')
    index = (index + 1) % 3
    $("#anime#{index}").attr('class', 'anime anime-load').css('background-image', "url(\"#{anime_urls[Math.random() * anime_urls.length | 0]}\")")
    index = (index + 1) % 3
    $("#anime#{index}").attr('class', 'anime anime-hide')
    return

  $.when(anime_ajax_by_tags(['gif', 'gifs', 'anime', 'anime-gif'])...).done ->
    for arg in arguments
      for response in arg[0].response when response.photos
        for photo in response.photos
          anime_push(photo.original_size.url)

    $ ->
      $('body').append(
        '<div class="anime anime-hide" id="anime0">'
        '<div class="anime anime-hide" id="anime1">'
        '<div class="anime anime-hide" id="anime2">'
      )
      anime_show(1)
      anime_show(2)
      index = 0
      setInterval ->
        anime_show(index)
        index = (index + 1) % 3
        return
      , anime_interval
      return
    return

  $ ->
    $body = $('body')

    tid = null
    show_content = ->
      $body.removeClass('hide-content')
      clearTimeout(tid)
      return

    window.onfocus = show_content
    $body
      .mouseover(show_content)
      .mouseout ->
        tid = setTimeout ->
          $body.addClass('hide-content')
          return
        , 1000
        return
      .click (evt) ->
        $target = $(evt.target)
        if $body.hasClass('hide-content') || (!$target.closest('a').length && !$target.closest('section').length)
          $body.toggleClass('hide-content')
          false
        return
    return

  return
