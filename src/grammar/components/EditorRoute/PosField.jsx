import React from 'react';
import styles from './PosField.module.css';

const tagsets = {
  English: require('xerox-nlp-client/data/tagset-english.json'),
  German: require('xerox-nlp-client/data/tagset-german.json')
};

export default class Editor extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      hint: ''
    };
  }

  render() {
    const tags = tagsets[this.props.language];

    let posInput;

    const addPoS = (e, item) => {
      e.preventDefault();

      const value = item.tag.slice(1);
      const prevValue = posInput.value;

      posInput.value = prevValue ?
        [ prevValue, value ].join('|') :
        value;

      onChange();
    };

    const onChange = () => {
      this.props.onChange(posInput.value);
    };

    const setHint = (item) => {
      if (!item) {
        this.setState({ hint: '' });
        return;
      }

      this.setState({ hint: (
        <span>
          <b>{ item.description }</b>
          { item.example }
        </span>
      ) });
    };

    return (
      <div className={ styles.container }>
        <label>
          Part of speech

          <span className={ styles.hint }>
            { this.state.hint }
          </span>
        </label>

        <textarea
          ref={ el => posInput = el }
          defaultValue={ this.props.pos }
          onChange={ onChange } />

        <div className={ styles.buttons }>
          { tags.map(item => (
            <button
              key={ item.tag }
              onMouseEnter={ () => setHint(item) }
              onMouseLeave={ () => setHint() }
              onClick={ (e) => addPoS(e, item) }>
              { item.tag }
            </button>
          )) }
        </div>
      </div>
    );
  }
}
