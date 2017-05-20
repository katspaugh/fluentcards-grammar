export default {
  English: {
    'a-vs-the': {
      title: 'The definite article vs the indefinite article',

      pattern: [
        {
          partOfSpeech: 'DET',
          baseForm: [ 'a', 'an', 'the' ],
          occlusion: /.+/,
          choices: [ 'a', 'an', 'the' ]
        }
      ]
    },

    'irregular-verbs': {
      title: 'Irregular verbs',

      pattern: [
        {
          partOfSpeech: [ 'VPAST', 'VPAP' ],

          occlusion: /.+/,

          choices: [],

          baseForm: /^(ache|be|bear|beat|become|beget|begin|bend|beseech|bet|beware|bid|bid|bide|bind|bite|bleed|bless|blow|break|breed|bring|build|burn|burst|bust|buy|can|cast|catch|chide|choose|clad|clap|cleave|cling|clothe|come|cost|creep|crow|cut|dare|deal|dig|dive|do|dow|drag|draw|dream|dress|drink|drive|dwell|earn|eat|fall|feed|feel|fight|find|fit|flee|fling|fly|forbid|forget|forlese|adjectivally|forsake|freeze|get|gild|gird|give|go|grind|grow|hang|have|hear|heave|help|hew|hide|hit|hoist|hold|hurt|keep|ken|kneel|knit|know|lade|laugh|lay|lead|lean|leap|learn|leave|lend|let|lie|light|lose|make|may|mean|meet|melt|mix|mow|must|ought|pay|pen|plead|loanword|prove|loanword|put|quit|loanword|reach|read|rend|rid|ride|ring|rise|rive|run|saw|say|see|seek|seethe|sell|send|set|sew|shake|shall|shape|shave|shear|shed|shine|shit|shoe|shoot|show|shrink|shut|sing|sink|sit|slay|sleep|slide|sling|slink|slip|slit|smell|smite|sneak|sow|speak|speed|spell|spend|spill|spin|spit|split|spoil|spread|sprenge|spring|stand|starve|stave|stay|steal|stick|sting|stink|stretch|strew|stride|strike|string|strip|strive|swear|sweat|sweep|swell|swim|swing|take|teach|tear|tell|think|thrive|throw|thrust|tread|vex|wake|wax|wear|weave|wed|weep|wend|wet|will|win|wind|work|wreak|wring|write|writhe|zinc)$/
        }
      ]
    }
  },

  German: {
    'definite-article-and-adjectives': {
      title: 'Adjective endings with definite articles (Weak Declension)',

      pattern: [
        {
          partOfSpeech: [ 'ART', 'PREPART' ],
          baseForm: /^((?!ein).)/
        },

        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          occlusion: /e[nrs]?$/,
          choices: [ 'e', 'en', 'er', 'es' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'indefinite-article-and-adjectives': {
      title: 'Adjective endings with indefinite articles (Mixed Declension)',

      pattern: [
        {
          partOfSpeech: [ 'ART', 'INDDET', 'POSDET' ],
          baseForm: /^((?!der|die|das).)/
        },

        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          occlusion: /(e[nrs]?)?$/,
          choices: [ 'e', 'en', 'er', 'es', 'em', '' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'adjective-declension': {
      title: 'Weak, Mixed and Strong declension',

      pattern: [
        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          occlusion: /(e[nrs]?)?$/,
          choices: [ 'e', 'en', 'er', 'es', 'em', '' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'verbs-with-prepositions': {
      title: 'Verbs with prepositions and case government',

      pattern: [
        {
          partOfSpeech: [ 'VVFIN', 'VVINF' ]
        },

        {
          partOfSpeech: 'PREP',
          occlusion: /.+/,
          baseForm: [
            'an',
            'auf',
            'aus',
            'bei',
            'für',
            'gegen',
            'in',
            'mit',
            'nach',
            'um',
            'von',
            'vor',
            'über',
            'zu'
          ],
          choices: [
            'an',
            'auf',
            'aus',
            'bei',
            'für',
            'gegen',
            'in',
            'mit',
            'nach',
            'um',
            'von',
            'vor',
            'über',
            'zu'
          ]
        }
      ]
    },

    'definite-article-declension': {
      title: 'Declension of the definite articles',

      pattern: [
        {
          partOfSpeech: 'ART',
          baseForm: /^((?!ein).)/,
          occlusion: /.+/,
          choices: [
            'der',
            'die',
            'das',
            'des',
            'den',
            'dem'
          ]
        }
      ]
    },

    'modal-verbs': {
      title: 'Modal verbs',

      pattern: [
        {
          partOfSpeech: [ 'VMFIN', 'VMINF', 'VMPP' ],
          occlusion: /.+/
        }
      ]
    }
  }
}
