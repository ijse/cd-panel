module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    require('autoprefixer')({
      browsers: [
        "> 1%",
        "last 2 versions",
        "not ie <= 8"
      ]
    })
  ]
}

