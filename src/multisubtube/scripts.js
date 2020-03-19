/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS103: Rewrite code to no longer use __guard__
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const binarySearch = function(arr, elm, compare) {
  let m = 0;
  let n = arr.length - 1;
  while (m <= n) {
    const k = (n + m) >> 1;
    const cmp = compare(elm, arr[k]);
    if (cmp > 0) {
      m = k + 1;
    } else if (cmp < 0) {
      n = k - 1;
    } else {
      return k;
    }
  }
  return -m - 1;
};

const fetchLangs = (videoId) =>
  new Promise(function(resolve, reject) {
    if (!videoId) {
      reject();
      return;
    }
    $.get({
      url: '//video.google.com/timedtext',
      data: {
        type: 'list',
        v: videoId,
      },
      dataType: 'xml',
    }).then(function(doc) {
      const langs = {};
      $('transcript_list>track', doc).each(function() {
        const $track = $(this);
        const code = $track.attr('lang_code');
        langs[code] = {
          label: $track.attr('lang_original'),
          params: {
            name: $track.attr('name'),
            lang: code,
            v: videoId,
          },
        };
      });
      resolve(langs);
    }, reject);
  });

const getSubs = function(langs, codes) {
  const subs = {};
  codes.forEach(function(code) {
    const lang = langs[code];
    if (!lang) {
      return;
    }
    const texts = (subs[code] = []);
    $.get({
      url: '//video.google.com/timedtext',
      data: lang.params,
      dataType: 'xml',
    }).done(function(doc) {
      $('transcript>text', doc).each(function() {
        const $text = $(this);
        const start = parseFloat($text.attr('start'));
        const dur = parseFloat($text.attr('dur'));
        texts.push({
          start,
          end: start + dur,
          text: $text.text(),
        });
      });
    });
  });
  return subs;
};

window.vm = new Vue({
  el: '#vue',
  data: {
    videoId: null,
    texts: [],
    subs: null,
    langs: null,
    selectedCodes: {},
    url: '',
  },
  computed: {
    codes() {
      return Object.keys(this.selectedCodes)
        .filter((code) => this.selectedCodes[code])
        .sort();
    },
  },
  watch: {
    url(url) {
      this.fetchLangs(__guard__(/v=([^=&?]+)/.exec(url), (x) => x[1]));
    },
  },
  methods: {
    play() {
      $('#modal-conf').modal('hide');
      if (this.videoId && player.getVideoData().video_id !== this.videoId) {
        player.loadVideoById(this.videoId);
      }
    },
    fetchLangs(videoId) {
      this.videoId = videoId;
      this.langs = null;
      return fetchLangs(videoId).then((langs) => {
        this.langs = langs;
      });
    },
    fetchSubs(videoId) {
      if (!this.langs || this.videoId !== videoId) {
        this.subs = null;
        this.fetchLangs(videoId);
        return;
      }
      if (!this.subs) {
        this.subs = getSubs(this.langs, this.codes);
      }
    },
    updateSubs(cur) {
      this.texts = this.codes.map((code) => {
        if (this.subs) {
          const arr = this.subs[code];
          if (cur != null && arr) {
            const j = binarySearch(arr, cur, function(t, v) {
              if (t > v.end) {
                return 1;
              } else if (t < v.start) {
                return -1;
              } else {
                return 0;
              }
            });
            if (j >= 0) {
              return arr[j].text;
            }
          }
        }
      });
    },
  },
});

// player
var updateCurrentTime = function() {
  window.vm.updateSubs(__guardMethod__(player, 'getCurrentTime', (o) => o.getCurrentTime()));
  requestAnimationFrame(updateCurrentTime);
};

updateCurrentTime();

const onPlayerReady = function({ target: player }) {
  $('#modal-conf').modal('show');

  // debug code
  if (location.hostname === 'localhost') {
    const delay = (fn) => setTimeout(fn, 500);
    delay(function() {
      window.vm.$data.url = 'https://www.youtube.com/watch?v=WqUBWz3YR7s';
      return delay(function() {
        window.vm.$data.selectedCodes = { en: true, 'zh-TW': true };
        window.vm.$data.url = 'https://www.youtube.com/watch?v=4cQ4ZQn-KRA';
        return delay(() => $('#modal-conf .btn-primary').click());
      });
    });
  }
};

const onPlayerStateChange = function({ target: player }) {
  window.vm.fetchSubs(player.getVideoData().video_id);
};

window.onYouTubeIframeAPIReady = function() {
  window.player = new YT.Player('ytplayer', {
    height: '480',
    width: '853',
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

function __guard__(value, transform) {
  return typeof value !== 'undefined' && value !== null ? transform(value) : undefined;
}
function __guardMethod__(obj, methodName, transform) {
  if (typeof obj !== 'undefined' && obj !== null && typeof obj[methodName] === 'function') {
    return transform(obj, methodName);
  } else {
    return undefined;
  }
}
