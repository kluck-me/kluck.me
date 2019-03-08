prefix = 'glitch-dncngrl'

$.fn.glitchDncngrl = ->
  display = @css('display')
  $('<div>')
    .addClass("#{prefix}-clone")
    .css(
      display: if display == 'inline' then 'inline-block' else display
      verticalAlign: @css('vertical-align')
      width: "#{@width()}px"
      height: "#{@height()}px"
    )
    .append(
      $('<div>').addClass("#{prefix}-red").append(@clone())
      $('<div>').addClass("#{prefix}-green").append(@clone())
      $('<div>').addClass("#{prefix}-blue").append(@clone())
    )
    .mouseenter ->
      $(this).addClass("#{prefix}-pattern-#{Math.random() * 3 + 1 | 0}")
      return
    .mouseleave ->
      $(this).removeClass("#{prefix}-pattern-1 #{prefix}-pattern-2 #{prefix}-pattern-3")
      return
    .insertBefore(this)

  @css('display', 'none')
  return

$(".#{prefix}").on 'load', ->
  $(this).glitchDncngrl()
  return
