/* globals Prism */
import "./App.css";
import React from "react";
import { marked } from "marked";

marked.setOptions({
    breaks: true,
    highlight: function (code) {
        return Prism.highlight(code, Prism.languages.javascript, "javascript");
    },
    langPrefix: "language-",
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isEditorExpanded: false,
            isPreviewExpanded: false,
        };
        this.showParsedMarkdown = this.showParsedMarkdown.bind(this);
        this.handlePreviewExpansion = this.handlePreviewExpansion.bind(this);
        this.handleEditorExpansion = this.handleEditorExpansion.bind(this);
    }

    showParsedMarkdown(e) {
        const previewer = document.querySelector("#preview");
        const editor = document.querySelector("#editor");
        const editorValue = editor.value;

        previewer.innerHTML = marked.parse(editorValue);
    }

    handlePreviewExpansion() {
        this.setState((prevState) => ({
            isPreviewExpanded: !prevState.isPreviewExpanded,
        }));
    }
    handleEditorExpansion() {
        this.setState((prevState) => ({
            isEditorExpanded: !prevState.isEditorExpanded,
        }));
    }

    componentDidMount() {
        this.showParsedMarkdown();
    }

    render() {
        return (
            <div className="App">
                <h1>Markdown Previewer</h1>
                <div className="main-wrapper">
                    <div
                        className={
                            "editor-wrapper " +
                            (this.state.isPreviewExpanded ? "hide" : "") +
                            (this.state.isEditorExpanded ? "expanded" : "")
                        }
                    >
                        <div className="sub-title">
                            <h2>Editor</h2>
                            <button onClick={this.handleEditorExpansion}>
                                <i
                                    className={
                                        this.state.isEditorExpanded
                                            ? "fas fa-times"
                                            : "fas fa-expand-alt"
                                    }
                                ></i>
                            </button>
                        </div>
                        <textarea
                            defaultValue={markdownPlaceholder}
                            id="editor"
                            onChange={this.showParsedMarkdown}
                        ></textarea>
                    </div>
                    <div
                        className={
                            "preview-wrapper " +
                            (this.state.isPreviewExpanded ? "expanded" : "") +
                            (this.state.isEditorExpanded ? "hide" : "")
                        }
                    >
                        <div className="sub-title">
                            <h2>Previewer</h2>
                            <button onClick={this.handlePreviewExpansion}>
                                <i
                                    className={
                                        this.state.isPreviewExpanded
                                            ? "fas fa-times"
                                            : "fas fa-expand-alt"
                                    }
                                ></i>
                            </button>
                        </div>
                        <div id="preview"></div>
                    </div>
                </div>
                <p>
                    by{" "}
                    <a
                        href="https://ovidio.welikeperas.com"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ovidio Pérez
                    </a>
                </p>
            </div>
        );
    }
}

export default App;

const markdownPlaceholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;
