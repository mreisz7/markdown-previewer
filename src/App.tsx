import React, { ChangeEvent } from 'react';
import './scss/App.scss';
import marked from 'marked';

interface AppState {
  rawMarkdown: string;
}

marked.setOptions({
  breaks: true,
});

const defaultText: string = `# An H1 element (#)

## An H2 element (##)
  
**Inline Code**: \`this.setState({});\` (between backticks)

**Multiline Code**:

\`\`\`
render() {
  return (
    <div>Something to Render</div>
  )
}
\`\`\`

**Bold Text**: **Surround with Asterisks**

**Italic Text**: _Surround with Underscores_ 

**Strikethrough**: ~~Surround with Tildes~~ 

**Links**: [links](https://www.freecodecamp.com)

**Block Quotes**:
> Here is some text that will be displayed in a block quote.

**Bulleted Lists**:
- Item #1
- Item #2
- Item #3


**Numbered Lists**:
1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...


**Images**:
![Michael Reisz](https://www.mreisz.com/static/img/profile.jpg)
`;

const renderer = new marked.Renderer();
renderer.link = function(href, _, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

export class App extends React.Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      rawMarkdown: defaultText,
    }
    this.handleMarkdownChange = this.handleMarkdownChange.bind(this);
  }

  handleMarkdownChange(event: ChangeEvent<HTMLTextAreaElement>) {
    this.setState({
      rawMarkdown: event.target.value,
    });
  }

  renderHeader() {
    return (
      <header>
        <h1>Markdown Previewer</h1>
      </header>
    );
  }

  renderFooter() {
    return (
      <footer>
        <span>&copy; 2019 - MReisz.com</span>
      </footer>
    );
  }

  renderEditor() {
    return (
      <textarea 
        id="editor" 
        value={this.state.rawMarkdown} 
        onChange={(e) => this.handleMarkdownChange(e)}
      />
    );
  }

  renderPreview() {
    return (
      <div id="preview" dangerouslySetInnerHTML={{__html: marked(this.state.rawMarkdown, { renderer })}} />
    )
  }

  render() {
    return (
      <>
        {this.renderHeader()}
        <div id="preview-area">
          {this.renderEditor()}
          {this.renderPreview()}
        </div>
        {this.renderFooter()}
      </>
    );
  }
}

