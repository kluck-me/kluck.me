$(document).on 'click', 'a', ->
  $this = $(this)
  return if $this.hasClass('clicked')
  imgNode = $this.find('img')[0]
  $('body').css(
    backgroundImage: "url(#{imgNode.src})"
    backgroundSize: "#{imgNode.width}px #{imgNode.height}px"
  )
  $this.addClass('clicked')
  false
