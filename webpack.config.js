import text1 from './src/mypages/Terms';

module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.html$/, // .js 확장자를 가진 파일에 대한 로더를 설정합니다.
          entry: {text1},
          exclude: /node_modules/, // node_modules 폴더 제외
          use: {
            loader: 'html-loader', // babel-loader를 사용하여 JavaScript 파일을 처리합니다.
          },
        },
        // 다른 로더 설정을 추가할 수 있습니다.
      ],
    },
    // ...
  };