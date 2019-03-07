rgb2hsv = (rgb) ->
  r = rgb[0]
  g = rgb[1]
  b = rgb[2]
  maxc = Math.max(Math.max(r, g), b)
  minc = Math.min(Math.min(r, g), b)
  c = maxc - minc
  h = if c == 0
    0
  else if maxc == r
    (60 * (g - b) / c) + 0
  else if maxc == g
    (60 * (b - r) / c) + 120
  else
    (60 * (r - g) / c) + 240
  h += 360 while h < 0
  s = if maxc == 0 then 0 else c / maxc * 255
  v = maxc
  [ h, s, maxc ]

hsv2rgb = (hsv) ->
  h = hsv[0]
  s = hsv[1]
  v = hsv[2]
  h += 360 while h < 0
  h %= 360
  if s == 0
    v = Math.round(v)
    return [ v, v, v ]
  s /= 255
  i = (h / 60 | 0) % 6
  f = (h / 60) - i
  p = v * (1 - s)
  q = v * (1 - f * s)
  t = v * (1 - (1 - f) * s)
  switch i
    when 0 then r = v; g = t; b = p
    when 1 then r = q; g = v; b = p
    when 2 then r = p; g = v; b = t
    when 3 then r = p; g = q; b = v
    when 4 then r = t; g = p; b = v
    when 5 then r = v; g = p; b = q
  [ Math.round(r), Math.round(g), Math.round(b) ]

genCanvas = (img) ->
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d')
  w = canvas.width = img.width
  h = canvas.height = img.height
  ctx.drawImage(img, 0, 0, w, h)
  pimg = ctx.getImageData(0, 0, w, h)

  for i in [0...pimg.data.length] by 4
    rr = pimg.data[i + 0] - baseColor[0]
    gg = pimg.data[i + 1] - baseColor[1]
    bb = pimg.data[i + 2] - baseColor[2]
    yy = (2 * rr + 4 * gg + bb) / 7
    pimg.data[i + 0] = 255
    pimg.data[i + 1] = 255
    pimg.data[i + 2] = 255
    pimg.data[i + 3] = yy

  ctx.putImageData(pimg, 0, 0)
  canvas

bodyStyle = document.body.style
baseColor = [34, 34, 74]
$window = $(window)
tid = null

img = new Image
img.src = 'kluckfack.png'
img.onload = ->
  bodyStyle.backgroundImage = "url(#{genCanvas(img).toDataURL('image/png')})"
  $window.scroll(->
    clearTimeout(tid)
    tid = setTimeout ->
      hsv = rgb2hsv(baseColor)
      hsv[0] += ($window.scrollTop() / $(document).height() * 360)
      bodyStyle.backgroundColor = "rgb(#{hsv2rgb(hsv).join(',')})"
      return
    , 0
  ).scroll()
  return
