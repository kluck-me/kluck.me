$.getJSON('https://api.github.com/repos/kluck-me/kluck.me/contents/src/tests').then (contents) ->
  $('#list').empty()
  ext_reg = /\.pug$/
  for content in contents when ext_reg.test(content.name)
    name = content.name.replace(ext_reg, '')
    $('<li>').append($('<a>').attr('href', "#{name}.html").text(name)).appendTo('#list')
  return
