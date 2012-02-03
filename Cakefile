fs = require 'fs'
path = require 'path'
uglify = require 'uglify-js'
Less = require 'less'
CoffeeScript = require 'coffee-script'
UglifyParser = uglify.parser
UglifyGen = uglify.uglify

javascripts = 'app.js'; [
  'assets/js/libs.js': [
    'assets/js/lib/bootstrap-alerts.js',
    'assets/js/lib/bootstrap-buttons.js',
    'assets/js/lib/bootstrap-dropdopwn.js',
    'assets/js/lib/bootstrap-model.js',
    'assets/js/lib/bootstrap-popover.js',
    'assets/js/lib/bootstrap-scrollspy.js',
    'assets/js/lib/bootstrap-tabs.js',
    'assets/js/lib/bootstrap-twipsy.js',
  ]
]

coffeescripts =
  'app.js': ['app.coffee'],
  'mock.js': ['mock.coffee']
  'assets/js/spec_helpers.js': [
    'specs/spec_helper.coffee'
  ],
  'assets/js/specs.js': [
  ],
  'assets/js/app.js': [
  ]

# minify javascripts
minify_js = (dest) ->
  code = ''
  for file in javascripts[dest]
    content = "#{fs.readFileSync file}"
    code += content
  ast = UglifyParser.parse(code)
  UglifyGen.gen_code ast,
    beautify: true,
    indent_level: 2


# compile less file based onTwitter bootstrap to CSS
compile_to_css = (dest) ->
  console.log "starting to re-compile less files"
  parser = new Less.Parser {paths: ['assets/css/src', 'assets/css/src/partials'], filename: 'bootstrap.less'}
  style = "#{fs.readFileSync 'assets/css/src/bootstrap.less'}"
  parser.parse style, (e, tree) ->
    fs.writeFileSync dest, tree.toCSS({compress: true})

# compile all files specified in `sources` to `compiled`
compile_to_js = (dest) ->
  code = ''
  for file in coffeescripts[dest]
    content = "#{fs.readFileSync file}"
    code += CoffeeScript.compile content
  fs.writeFileSync dest, code

task 'watch', 'auto-compile source files', (options) ->
  # for javascripts
  for dest, files of javascripts
    for file in files
      do (dest, file) ->
        fs.watchFile file, {persistent: true, interval: 1}, (curr, prev) ->
          minify_js dest if +curr.mtime > +prev.mtime

  # for coffeescripts
  for dest, files of coffeescripts
    for file in files
      do (dest, file) ->
        fs.watchFile file, {persistent: true, interval: 1}, (curr, prev) ->
          compile_to_js dest if +curr.mtime > +prev.mtime

  # for less files
  css = fs.readdirSync "assets/css/src"
  for file in css
    do (file) ->
      fs.watchFile path.resolve("assets/css/src", file), {persistent: true, interval: 1}, (curr, prev) ->
        compile_to_css "assets/css/style.css" if +curr.mtime > +prev.mtime

task 'watch:less', 'auto compile less file', ->
  css = fs.readdirSync "assets/css/src"
  for file in css
    do (file) ->
      fs.watchFile path.resolve("assets/css/src", file), {persistent: true, interval: 1}, (curr, prev) ->
        compile_to_css "assets/css/style.css" if +curr.mtime > +prev.mtime

task 'build', 'build src depends on the mode', (mode) ->
  true
