import React, { PureComponent } from 'react';
import exportCsv from '../../services/csv';
import styles from './ExportView.css';


/**
 * ExportView component
 */
export default class ExportView extends PureComponent {
  constructor() {
    super();

    this.helpTexts = {
      plain: {
        text: `
<p>
Use the Bulk Add feature in Memrise. Copy the contents of the downloaded file and insert it into a Memrise course.
</p>
<p>
<a target="_blank" href="http://feedback.memrise.com/knowledgebase/articles/525095-add-words-to-my-course">http://feedback.memrise.com/knowledgebase/articles/525095-add-words-to-my-course</a>
</p>`,
        image: `<img src="/images/memrise.png" width="390" />`
      },

      basic: {
        text: `
<p>
<ul>
<li>Open Anki</li>
<li>Choose an existing deck or create a new deck</li>
<li>Click the File menu and then "Import"</li>
<li>Choose the "Basic" type (it's the default)</li>
</ul>
See the <a target="_blank" href="https://apps.ankiweb.net/docs/manual.html#importing-text-files">Anki manual</a> for more details.
</p>`,
        image: `<img src="/images/anki-basic.png" width="582" />`
      },

      cloze: {
        text: `
<p>
<ul>
<li>Open Anki</li>
<li>Choose an existing deck or create a new deck</li>
<li>Click the File menu and then "Import"</li>
<li>Choose the "Cloze" type</li>
</ul>
See the <a target="_blank" href="https://apps.ankiweb.net/docs/manual.html#importing-text-files">Anki manual</a> for more details.
</p>`,
        image: `<img src="/images/anki-cloze.png" width="582" />`
      }
    };
  }

  componentWillMount() {
    exportCsv(this.props.words, this.props.type);
  }

  /**
   * @return {JSX.Element}
   */
  render() {
    const help = this.helpTexts[this.props.type];

    return (
      <div className={ styles.container }>
        <div className={ styles.row }>
          <div className={ styles.col }>
            <p>The deck has been successfully exported.</p>

            <h4>How to import?</h4>

            <div dangerouslySetInnerHTML={ { __html: help.text } } />
          </div>

          <div className={ styles.col }>
            <div dangerouslySetInnerHTML={ { __html: help.image } } />
          </div>
        </div>
      </div>
    );
  }
}
