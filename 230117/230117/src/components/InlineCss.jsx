import React from 'react';

export default function InlineCss() {
  const divStyle = {
    backgroundColor: 'red',
  };
  const headingStyle = {
    backgroundColor: 'pink',
    fontWeight: '700',
  };
  const spanStyle = {
    backgroundColor: 'skyblue',
    fontWeight: '700',
  };

  return (
    <div style={divStyle}>
      <h1 style={headingStyle}>CSS 테스트 컴포넌트 입니다.</h1>
      <span style={spanStyle}>해당 컴포넌트를 CSS로 꾸며 보아유</span>
    </div>
  );
}
