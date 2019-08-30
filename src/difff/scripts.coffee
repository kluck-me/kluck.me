location.reload() if process.env.NODE_ENV == 'development' && window.vm

tolf = (s) -> s.replace(/\r\n?/g, "\n")
h = (s) -> ('' + s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
mark = (lines) -> lines.split("\n").map((line) -> "<mark class=\"alert-primary\">#{h(line)}</mark>").join("\n")

window.vm = new Vue(
  el: '#vue'
  data:
    inputs: [
      '''
下記の文章を比較してください。
   Betty Botter bought some butter, 
But, she said, this butter's bitter;
If I put it in my batter,
It will make my batter bitter,
But a bit of better butter
Will make my batter better.
So she bought a bit of butter
Better than her bitter butter,
And she put it in her batter,
And it made her batter better,
So 'twas better Betty Botter
Bought a bit of better butter.
'''
      '''
下記の文章を，ﾋﾋ較してくだちい．
Betty Botter bought some butter,
but, she said, the butter's bitter;
If I put it in my batter,
That will make my batter bitter.
But a bit of better butter, 
That will make my batter better.
So she bought a bit of butter
Better than her bitter butter.
And she put it in her batter,
And it made her batter better.
So it was better Betty Botter
Bought a bit of better butter.
'''
    ]
    row_htmls: []
    stats: []
  methods:
    diff: ->
      inputs = (tolf(input) for input in @inputs)
      stats = for input in inputs
        char_count = input.replace(/\s+/g, '').length
        char_and_space_count = input.replace(/\n+/g, '').length
        char_count: char_count
        space_count: char_and_space_count - char_count
        line_count: input.length - char_and_space_count
        word_count: input.split(/\s+/).filter((w) -> w.length).length
      changes = Diff.diffChars("#{inputs[0]}\n", "#{inputs[1]}\n")
      pp changes if process.env.NODE_ENV == 'development'
      change_names = ['removed', 'added']
      row_htmls = []
      out_htmls = ['', '']
      for c in changes
        for change_name, i in change_names
          unless c[change_names[1 - i]]
            out_htmls[i] += if c[change_name] then mark(c.value) else h(c.value)
        while true
          col_matches = (/^.*\n/.exec(out_html) for out_html in out_htmls)
          break if !col_matches[0] && !col_matches[1]
          col_htmls = ['', '']
          for col_match, i in col_matches
            if col_match
              col_htmls[i] = col_match[0]
              out_htmls[i] = out_htmls[i].slice(col_match[0].length)
          row_htmls.push(col_htmls)
      @stats = stats
      @row_htmls = row_htmls
      return
  mounted: ->
    @diff() if process.env.NODE_ENV == 'development'
    return
)
