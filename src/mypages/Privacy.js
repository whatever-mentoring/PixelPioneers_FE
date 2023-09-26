import React from 'react';


class HtmlRenderer extends React.Component {
  constructor() {
    super();
    this.state = {
      htmlContent: '', // HTML 내용을 저장할 상태
    };
  }

  componentDidMount() {
    // HTML 파일을 가져오는 비동기 함수 (예: fetch)를 사용하여 내용을 가져옵니다.
    // 이 예제에서는 public 폴더 내의 HTML 파일 경로를 사용합니다.
    fetch('/text1.html') // 파일 경로를 수정해야 할 수 있습니다.
      .then((response) => response.text())
      .then((htmlContent) => {
        this.setState({ htmlContent });
      });
  }

  render() {
    return (
      <div>
        {/* HTML 내용을 dangerouslySetInnerHTML을 사용하여 렌더링합니다. */}
        <div dangerouslySetInnerHTML={{ __html: this.state.htmlContent }} />
      </div>
    );
  }
}

export default HtmlRenderer;
