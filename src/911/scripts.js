/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const params = new URLSearchParams(window.location.search);
const video_prefix = params.get('prefix') || 'NHK';
const video_suffix = params.get('suffix') || 'Japan';

const get_now = function () {
  const date = new Date();
  if (process.env.NODE_ENV === 'development') {
    date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000);
  }
  return date;
};

const video_sec = process.env.NODE_ENV === 'development' ? 20 : 30 * 60;

const zz = (s) => `${s}`.padStart(2, '0');

const get_info = function (start_date) {
  // 20010911_120000 - 20010917_060000
  const video_mon = start_date.getUTCMonth() + 1;
  const video_day = start_date.getUTCDate();
  const video_hour = start_date.getUTCHours();
  const video_min = start_date.getUTCMinutes() < 30 ? 0 : 30;
  if (video_mon !== 9) {
    return;
  }
  if (
    (video_day !== 11 || 12 > video_hour) &&
    (12 > video_day || video_day >= 17) &&
    (video_day !== 17 || video_hour >= 6)
  ) {
    return;
  }
  const start_sec = (start_date.getUTCMinutes() - video_min) * 60 + start_date.getUTCSeconds() + 1;
  const end_sec = Math.min(30 * 60 + 1, start_sec + video_sec);
  const end_date = new Date();
  end_date.setTime(start_date.getTime() + (end_sec - start_sec) * 1000);
  const name = `${video_prefix}_2001${zz(video_mon)}${zz(video_day)}_${zz(video_hour)}${zz(
    video_min
  )}00_${video_suffix}`;
  return {
    url: `https://archive.org/download/${name}/${name}.mp4?start=${start_sec}&end=${end_sec}&ignore=x.mp4`,
    start: start_date,
    end: end_date,
  };
};

const infos = [];

const add_video = function (info) {
  const $video = $('<video>');
  info.video = $video[0];
  info.canplay = false;
  $video
    .css('z-index', -1)
    .attr({
      src: info.url,
      controls: process.env.NODE_ENV === 'development',
    })
    .on('canplay', function () {
      info.canplay = true;
    })
    .appendTo('#videos');
};

const add_info = function (date) {
  const info = get_info(date);
  if (info) {
    add_video(info);
    infos.push(info);
    return info.start;
  }
};

var play_first_info = function () {
  const info = infos.shift();
  if (!info) {
    return;
  }
  const next_start = add_info(info.end);
  const next_play = function () {
    $(info.video).css('z-index', -1);
    play_first_info();
    $(info.video).remove();
    info.video = null;
  };
  const info_play = function () {
    $(info.video).css('z-index', 2);
    info.video.play();
  };
  $(info.video)
    .on('timeupdate', function () {
      if (next_start < get_now()) {
        next_play();
      }
    })
    .on('ended', next_play);
  if (!info.canplay) {
    $(info.video).on('canplay', info_play);
  }
  info_play();
};

$('#videos').one('click', function () {
  $('#videos').empty();
  var tid = setInterval(function () {
    if (add_info(get_now())) {
      clearInterval(tid);
      play_first_info();
    }
  }, 1000);
});
