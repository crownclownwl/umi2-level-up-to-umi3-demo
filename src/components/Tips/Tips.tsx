import React, { PureComponent } from 'react';

interface ITextPaperProps {
    text: string | any
}

export default class Tips extends PureComponent<ITextPaperProps> {
  render() {
    return (
      <div style={{ padding: 10, textAlign: 'center', fontSize: 16, color: '#888' }}>
        {this.props.text}
      </div>
    );
  }
}
