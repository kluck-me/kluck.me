load_image = (data) ->
  new Promise (resolve, reject) ->
    img = data.img = new Image
    img.crossOrigin = 'anonymous'
    img.onload = ->
      resolve(data)
      return
    img.onerror = ->
      reject(data)
      return
    img.src = data.url
    return

Promise.all([
  {
    url: 'https://4.bp.blogspot.com/-Anllqq6pDXw/VRUSesbvyAI/AAAAAAAAsrc/CIHz6vLsuTU/s800/computer_jinkou_chinou.png'
    x: 180
    y: 40
    w: 90
  }
  {
    url: 'https://4.bp.blogspot.com/-4xxTe_qeV1E/Vd7FkNUlwjI/AAAAAAAAxFc/8u9MNKtg7gg/s800/syachiku.png'
    x: 0
    y: 0
    w: 300
  }
].map(load_image)).then (dataset) ->
  ctx = $('canvas')[0].getContext('2d')
  for d in dataset by -1
    ctx.drawImage(d.img, d.x, d.y, d.w, d.w / d.img.width * d.img.height)
  return

$('button').click ->
  $('canvas')[0].toBlob (blob) ->
    link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = 'canvas-download.png'
    link.click()
    URL.revokeObjectURL(link.url)
    return
  false
