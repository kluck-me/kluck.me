/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
if (!('speechSynthesis' in window)) {
  alert('Not support speech API');
}

window.vm = new Vue({
  el: '#vue',
  data: {
    lang: 'ja-JP',
    text:
      process.env.NODE_ENV === 'development'
        ? `\
音読のサンプルです。日本語のみのサポートです。\
`
        : '',
    voices: [],
    selectedVoiceURI: null,
    volume: 1,
    pitch: 1,
    rate: 1,
    playing: false,
    speaking: false,
  },

  computed: {
    selectedVoice() {
      return this.voices.find((voice) => voice.voiceURI === this.selectedVoiceURI);
    },
  },

  methods: {
    play() {
      if (speechSynthesis.paused) {
        speechSynthesis.resume();
      } else {
        speechSynthesis.cancel();
        const uttr = new SpeechSynthesisUtterance(this.text);
        uttr.lang = this.lang;
        uttr.voice = this.selectedVoice;
        uttr.volume = this.volume;
        uttr.pitch = this.pitch;
        uttr.rate = this.rate;
        speechSynthesis.speak(uttr);
      }
    },

    pause() {
      speechSynthesis.pause();
    },

    stop() {
      speechSynthesis.cancel();
    },

    updateVoices() {
      const lang = /^[a-z]+/i.exec(this.lang)[0];
      this.voices = speechSynthesis.getVoices().filter((voice) => voice.lang.startsWith(lang));
      if (this.voices.length && !this.selectedVoice) {
        this.selectedVoiceURI = this.voices[0].voiceURI;
      }
    },
  },

  mounted() {
    this.updateVoices();
    speechSynthesis.onvoiceschanged = () => {
      this.updateVoices();
    };

    setInterval(() => {
      this.playing = speechSynthesis.speaking && !speechSynthesis.paused;
    }, 100);
  },
});
