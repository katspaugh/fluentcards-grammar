import React from 'react';
import { Link } from 'react-router-dom';
import patterns from '../../patterns';
import Header from '../../../shared/components/Header/Header.jsx';
import App from '../Quiz/Quiz.jsx';
import PosField from './PosField.jsx';
import styles from './EditorRoute.module.css';


export default class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      language: 'English',
      title: '',
      description: '',
      pattern: [ {} ],
      testing: false
    };
  }

  renderPatternPart(index) {
    const pattern = this.state.pattern.slice();
    const patternPart = pattern[index] = (pattern[index] || {});

    const setValue = (key, value) => {
      patternPart[key] = value;
      this.setState({ pattern });
    };

    return (
      <div>
        <h2>Pattern for word #{ index + 1 }</h2>

        <div className={ styles.field }>
          <PosField
            onChange={ (value) => setValue('partOfSpeech', value) }
            language={ this.state.language }
            pos={ patternPart.partOfSpeech } />
        </div>

        <div className={ styles.field }>
          <span>
            <label>Base form regex</label>

            <input
              placeholder="optional"
              defaultValue={ patternPart.baseForm }
              onChange={ (e) => setValue('baseForm', e.target.value) } />
          </span>

          <p>
            This regular expression will match words based on their base form.
            For example, the base form of <code>him</code> is <code>he</code>.
          </p>
        </div>

        <div className={ styles.field }>
          <span>
            <label>Surface form regex</label>

            <input
              placeholder="optional"
              defaultValue={ patternPart.surfaceForm }
              onChange={ (e) => setValue('surfaceForm', e.target.value) } />
          </span>

          <p>
            This will match according to the surface form.
          </p>
        </div>

        <div className={ styles.field }>
          <span>
            <label>Occlusion regex</label>

            <input
              placeholder="optional"
              defaultValue={ patternPart.occlusion }
              onChange={ (e) => setValue('occlusion', e.target.value) } />
          </span>

          <p>
            This regular expression doesn't participate in the match, but creates a cloze test out of the word.
            For example, <code>.+</code> will occlude the whole word.
            The occlusion will appear as a yellow input in the quiz.
          </p>
        </div>

        <div className={ styles.field }>
          <span>
            <label>
              Choices
              <br />
              (comma-separated)
            </label>

            <textarea
              placeholder="optional"
              defaultValue={ (patternPart.choices || []).join(', ') }
              onChange={ (e) => setValue('choices', e.target.value) } />
          </span>

          <p>
            A list of possible answers in the multiple choice test.
          </p>
        </div>
      </div>
    );
  }

  transformPattern() {
    const pattern = this.state.pattern.map(patternPart => {
      return Object.keys(patternPart).reduce((acc, key) => {
        if (patternPart[key] == null) return acc;

        if ('choices' === key) {
          acc[key] = patternPart[key].split(/,\s*/g).map(s => s.trim());
        } else {
          acc[key] = new RegExp(patternPart[key]);
        }

        return acc;
      }, {});
    });

    if (!pattern.some(patternPart => patternPart.occlusion)) {
      pattern[0].occlusion = /.+/;
    }

    return pattern;
  }

  getLink() {
    const base64 = btoa(JSON.stringify({
      title: this.state.title,
      description: this.state.description,
      pattern: this.state.pattern
    }));
    return `/grammar/quiz/${ this.state.language }/${ base64 }`;
  }

  render() {
    const testApp = e => {
      e.preventDefault();
      this.setState({ testing: true });
    };

    const addWord = e => {
      e.preventDefault();
      this.setState({ pattern: this.state.pattern.concat([ {} ]) });
    };

    const patternParts = this.state.pattern.map((item, i) => (
      <div key={ i }>{ this.renderPatternPart(i) }</div>
    ));

    const app = this.state.testing ? (
      <div className={ styles.appTest }>
        <div className={ styles.shareLink }>
          <Link to={ this.getLink() }>A shareable link to the quiz</Link>
        </div>

        <App
          language={ this.state.language }
          description={ this.state.description }
          pattern={ this.transformPattern() }
          patternSlug={ this.state.title }
          />
      </div>
    ) : '';

    return (
      <div className={ styles.container }>
        <Header title={ 'Exercise editor' }></Header>

        <div className={ styles.editor }>
          <p className={ styles.intro }>
            Create exercises by finding matching sentences in the corpus.<br />
            The sentences are matched word by word. Each word is tested against a morpho-syntactic pattern.
          </p>

          <div className={ styles.field }>
            <span>
              <label>Language</label>

              <select
                defaultValue={ this.state.language }
                onChange={ (e) => this.setState({ language: e.target.value }) }>
                { Object.keys(patterns).map(lang => <option key={ lang }>{ lang }</option>) }
              </select>
            </span>
          </div>

          <div className={ styles.field }>
            <span>
              <label>Title</label>

              <input onChange={ (e) => this.setState({ title: e.target.value }) } />
            </span>
          </div>

          <div className={ styles.field }>
            <span>
              <label>Description</label>

              <textarea onChange={ (e) => this.setState({ description: e.target.value }) } />
            </span>
          </div>

          { patternParts }

          <div className={ styles.submitField }>
            <button className={ styles.flatButton } onClick={ addWord }>Add word</button>

            <button className={ styles.bigButton } onClick={ testApp }>Save & test</button>
          </div>

          { app }
        </div>
      </div>
    );
  }
}
