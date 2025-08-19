window.vm = new Vue({
  el: '#vue',
  data: {
    q: '',
  },
  computed: {
    links() {
      const q = this.q;
      const r = ['iatnehxe', 'imotih'].map((s) => s.split('').reverse().join(''));
      return q
        ? [
            {
              text: r[0],
              url: `https://${r[0]}.org/?${new URLSearchParams({ f_search: `${q} -translated` }).toString()}`,
            },
            {
              text: r[1],
              url: `https://${r[1]}.la/search.html?${encodeURIComponent(`${q} language:japanese`)}`,
            },
          ]
        : [];
    },
  },
});
