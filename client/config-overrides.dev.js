module.exports = (config) => {
  // Add the SASS loader second-to-last
  // (last one must remain as the "file-loader")
  const loaderList = config.module.rules[1].oneOf;
  loaderList.splice(loaderList.length - 1, 0, {
    test: /^((?!\.global).)*\.scss$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          sourceMap: true,
          importLoaders: 1,
          localIdentName: '[name]__[local]__[hash:base64:5]',
        }
      },
      {
        loader: 'sass-loader'
      }
    ]
  });
};
