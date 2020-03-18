alert('Not support speech API') unless 'speechSynthesis' of window

window.vm = new Vue(
  el: '#vue'
  data:
    lang: 'ja-JP'
    text:
      if process.env.NODE_ENV == 'development'
        '''
          音読のサンプルです。日本語のみのサポートです。
        '''
      else
        ''
    voices: []
    selectedVoiceURI: null
    volume: 1
    pitch: 1
    rate: 1
    playing: false
    speaking: false

  computed:
    selectedVoice: ->
      @voices.find((voice) => voice.voiceURI == @selectedVoiceURI)

  methods:
    play: ->
      if speechSynthesis.paused
        speechSynthesis.resume()
      else
        speechSynthesis.cancel()
        uttr = new SpeechSynthesisUtterance(@text)
        uttr.lang = @lang
        uttr.voice = @selectedVoice
        uttr.volume = @volume
        uttr.pitch = @pitch
        uttr.rate = @rate
        speechSynthesis.speak(uttr)
      return

    pause: ->
      speechSynthesis.pause()
      return

    stop: ->
      speechSynthesis.cancel()
      return

    updateVoices: ->
      lang = /^[a-z]+/i.exec(@lang)[0]
      @voices = speechSynthesis.getVoices().filter((voice) -> voice.lang.startsWith(lang))
      @selectedVoiceURI = @voices[0].voiceURI if @voices.length && !@selectedVoice
      return

  mounted: ->
    @updateVoices()
    speechSynthesis.onvoiceschanged = =>
      @updateVoices()
      return

    setInterval(=>
      @playing = speechSynthesis.speaking && !speechSynthesis.paused
      return
    , 100)
    return
)
