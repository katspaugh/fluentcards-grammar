/* eslint-disable */
export default {
  English: {
    'a-vs-the': {
      title: 'Articles: definite vs indefinite',

      description: 'Choose the right article.',

      pattern: [
        {
          partOfSpeech: 'DET',
          baseForm: [ 'a', 'an', 'the' ],
          occlusion: /.+/,
          choices: [ 'a', 'an', 'the' ]
        }
      ]
    },

    'many-vs-much': {
      title: 'Quantifiers: many vs much, few vs little',

      description: 'Choose the right answer.',

      pattern: [
        {
          partOfSpeech: 'QUANT',
          baseForm: [ 'little', 'few', 'much', 'many' ],
          occlusion: /.+/,

          choices: (lexeme) => {
            return (/little|few/.test(lexeme.baseForm)) ?
              [ 'little', 'few' ] :
              [ 'much', 'many' ];
          }
        }
      ]
    },

    'each-vs-every': {
      title: 'Quantifiers: each vs every',

      description: 'Choose the right answer.',

      pattern: [
        {
          partOfSpeech: 'QUANT',
          baseForm: [ 'each', 'every' ],
          choices: [ 'each', 'every' ],
          occlusion: /.+/
        }
      ]
    },

    'some-vs-any': {
      title: 'Quantifiers: some vs any',

      description: 'Choose the right answer.',

      pattern: [
        {
          partOfSpeech: 'QUANT',
          baseForm: [ 'some', 'any' ],
          choices: [ 'some', 'any' ],
          occlusion: /.+/
        }
      ]
    },

    'irregular-verbs': {
      title: 'Verbs: irregular verbs',

      description: 'Type the correct forms of the missing verbs.',

      pattern: [
        {
          partOfSpeech: [ 'VPAST', 'VPAP' ],

          occlusion: /.+/,

          choices: [],

          baseForm: /^(ache|be|bear|beat|become|beget|begin|bend|beseech|bet|beware|bid|bide|bind|bite|bleed|bless|blow|break|breed|bring|build|burn|burst|bust|buy|can|cast|catch|chide|choose|clad|clap|cleave|cling|clothe|come|cost|creep|crow|cut|dare|deal|dig|dive|do|dow|drag|draw|dream|dress|drink|drive|dwell|earn|eat|fall|feed|feel|fight|find|fit|flee|fling|fly|forbid|forget|forlese|forsake|freeze|get|gild|gird|give|go|grind|grow|hang|have|hear|heave|help|hew|hide|hit|hoist|hold|hurt|keep|ken|kneel|knit|know|lade|laugh|lay|lead|lean|leap|learn|leave|lend|let|lie|light|lose|make|may|mean|meet|melt|mix|mow|must|ought|pay|pen|plead|prove|put|quit|reach|read|rend|rid|ride|ring|rise|rive|run|saw|say|see|seek|seethe|sell|send|set|sew|shake|shall|shape|shave|shear|shed|shine|shit|shoe|shoot|show|shrink|shut|sing|sink|sit|slay|sleep|slide|sling|slink|slip|slit|smell|smite|sneak|sow|speak|speed|spell|spend|spill|spin|spit|split|spoil|spread|sprenge|spring|stand|starve|stave|stay|steal|stick|sting|stink|stretch|strew|stride|strike|string|strip|strive|swear|sweat|sweep|swell|swim|swing|take|teach|tear|tell|think|thrive|throw|thrust|tread|vex|wake|wax|wear|weave|wed|weep|wend|wet|will|win|wind|work|wreak|wring|write|writhe|zinc)$/
        }
      ]
    },

    'third-person-singular': {
      title: 'Verbs: third person singular',

      description: 'Insert the verbal ending "-s" where necessary.',

      pattern: [
        {
          partOfSpeech: [ 'PRON', 'PRONONE', 'PROP', 'NOUN' ]
        },
        {
          partOfSpeech: [ 'VPRES' ],
          baseForm: /^((?!be|have|go).)/,
          occlusion: /s$/,
          choices: [ '', 's' ]
        }
      ]
    },

    'phrasal-verbs': {
      title: 'Verbs: phrasal verbs',

      description: 'Complete the phrasal verbs with the correct preposisions.',

      pattern: [
        {
          partOfSpeech: [ 'VPRES', 'VPAST', 'VPAP' ],
          baseForm: [
            'give', 'get', 'put', 'look', 'turn', 'break',
            'call', 'go', 'make', 'do', 'bring', 'cut', 'drop',
            'keep', 'run', 'set'
          ]
        },
        {
          partOfSpeech: 'PREP',
          baseForm: [
            'out', 'up', 'down', 'back', 'on', 'off', 'for', 'over', 'away', 'after'
          ],
          occlusion: /.+/
        }
      ]
    },

    'modal-verbs': {
      title: 'Verbs: modal verbs',

      description: 'Choose the most suitable modal verb.',

      pattern: [
        {
          partOfSpeech: [ 'VAUX' ],
          surfaceForm: /^((?!will|'ll|'d).)/,
          occlusion: /.+/
        }
      ]
    },

    'prepositions-in-on-at': {
      title: 'Prepositions: in, on, at',

      description: 'Choose the right preposition.',

      pattern: [
        {
          partOfSpeech: 'PREP',
          baseForm: [ 'in', 'on', 'at' ],
          occlusion: /.+/,
          choices: [ 'in', 'on', 'at' ]
        }
      ]
    }
  },

  German: {
    'definite-article-and-adjectives': {
      title: 'Adjectives: weak declension',

      description: 'Choose the right ending of the adjectives that go after a definite article.',

      pattern: [
        {
          partOfSpeech: 'ART',
          baseForm: /^((?!ein).)/
        },

        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          surfaceForm: /.{4,}/,
          occlusion: /e[nrs]?$/,
          choices: [ 'e', 'en', 'er', 'es' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'indefinite-article-and-adjectives': {
      title: 'Adjectives: mixed declension',

      description: 'Choose the right ending of the adjectives that go after an idefinite article, "kein" or a possessive pronoun ("mein", "sein" etc).',

      pattern: [
        {
          partOfSpeech: [ 'ART', 'INDDET', 'POSDET' ],
          baseForm: /^((?!der|die|das).)/
        },

        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          surfaceForm: /.{4,}/,
          occlusion: /(e[mnrs]?)?$/,
          choices: [ 'e', 'en', 'er', 'es', 'em', '' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'adjective-declension': {
      title: 'Adjectives: weak, mixed and strong declensions',

      description: 'Choose the correct endings of adjectives.',

      pattern: [
        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
          surfaceForm: /.{4,}/,
          occlusion: /(e[mnrs]?)?$/,
          choices: [ 'e', 'en', 'er', 'es', 'em', '' ]
        },

        {
          partOfSpeech: 'NOUN'
        }
      ]
    },

    'definite-article-declension': {
      title: 'Articles: definite articles',

      description: 'Put the articles into correct form.',

      pattern: [
        {
          partOfSpeech: 'ART',
          baseForm: /^((?!ein).)/,
          occlusion: /.+/,
          choices: [ 'der', 'die', 'das', 'des', 'den', 'dem' ]
        }
      ]
    },

    'preposition-case': {
      title: 'Prepositional cases',

      description: 'Choose the right form of an article after a preposition',

      pattern: [
        {
          partOfSpeech: 'PREP'
        },
        {
          partOfSpeech: 'ART',
          occlusion: /[^d]+$/,
          choices: [ 'er', 'ie', 'as', 'es', 'en', 'em' ]
        }
      ]
    },


    'verbs-with-prepositions': {
      title: 'Verbs: prepositional government',

      description: 'Choose the preposision that is required by a verb.',

      pattern: [
        {
          partOfSpeech: [ 'VVFIN', 'VVINF' ]
        },

        {
          partOfSpeech: [ 'PREP', 'PREPART' ],
          occlusion: /.+/,
          baseForm: /^((?!da).)/,
          choices: [
            'an', 'auf', 'aus', 'bei', 'für', 'gegen', 'in', 'mit', 'nach', 'um', 'von', 'vor', 'über', 'zu', 'zurück', 'zusammen'
          ]
        }
      ]
    },

    'modal-verbs': {
      title: 'Verbs: modal verbs',

      description: 'Choose the most suitable modal verb.',

      pattern: [
        {
          partOfSpeech: [ 'VMFIN', 'VMINF', 'VMPP' ],
          occlusion: /.+/
        }
      ]
    },

    'separable-verbal-prefixes': {
      title: 'Verbs: separable prefixes',

      description: 'Choose the right separated verbal prefix.',

      pattern: [
        {
          partOfSpeech: 'VPREF',
          baseForm: /^((?!da).)/,
          occlusion: /.+/,
          choices: [
            'ab', 'an', 'auf', 'aus', 'raus', 'ein', 'hin', 'hinzu', 'los', 'mit', 'vor', 'weg', 'zurück',
            'durch', 'über', 'rüber', 'um', 'unter', 'wider'
          ]
        },
        {
          partOfSpeech: [ 'SENT', 'CM' ]
        }
      ]
    },

    'verb-conjugation': {
      title: 'Verbs: conjugation',

      description: 'Type the correct forms of the verbs.',

      pattern: [
        {
          partOfSpeech: 'VVFIN',
          occlusion: /.+/,
          choices: []
        }
      ]
    },

    'sein-vs-haben': {
      title: 'Verbs: sein vs haben',

      description: 'Choose between "sein" and "haben" to form the Perfect tense.',

      pattern: [
        {
          partOfSpeech: 'VAFIN',
          surfaceForm: /^(bin|bist|ist|seid|sind|habe|hast|hat|habt|haben)$/,
          occlusion: /.+/
        },
        {
          partOfSpeech: /./
        },
        {
          partOfSpeech: /./
        },
        {
          partOfSpeech: 'VVPP'
        }
      ]
    },

    'personal-pronouns': {
      title: 'Pronouns: personal',

      description: 'Put the personal pronouns into the right form.',

      pattern: [
        {
          partOfSpeech: [ 'PERSPRO' ],
          surfaceForm: /^(mich|mir|dich|dir|ihn|ihm|ihr|uns|euch|ihnen)$/i,
          occlusion: /.+/,

          choices: (lexeme) => {
            switch (lexeme.baseForm) {
                case 'ich': return [ 'ich', 'mich', 'mir' ];
                case 'du': return [ 'du', 'dich', 'dir' ];
                case 'es': return [ 'es', 'ihm' ];
                case 'er': return [ 'er', 'ihn', 'ihm' ];
                case 'sie': return [ 'sie', 'ihr', 'ihnen' ];
                case 'wir': return [ 'wir', 'uns' ];
                case 'ihr': return [ 'ihr', 'euch' ];
            }
          }
        }
      ]
    },

    'possessive-pronouns-and-indefinite-article': {
      title: 'Pronouns: possessive',

      description: 'Choose the correct form of the possessive pronouns.',

      pattern: [
        {
          partOfSpeech: 'POSDET',
          occlusion: /(e[mnrs]?)$/,
          choices: [ 'e', 'em', 'en', 'er', 'es' ]
        }
      ]
    }
  }
}
