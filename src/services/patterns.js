export default {
  English: {
    'a-vs-the': {
      title: 'Articles: definite vs indefinite',

      description: 'Insert the right article into the sentences below.',

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
      title: 'Verbs: irregular verbs',

      description: 'Type the correct form of the missing irregular verbs.',

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

      description: 'Decide whether a verb should take an "-s" ending or stay in the base form.',

      pattern: [
        {
          partOfSpeech: [ 'PRON', 'PRONONE', 'PROP', 'NOUN' ]
        },
        {
          partOfSpeech: [ 'VPRES' ],
          baseForm: /^((?!be|have).)/,
          occlusion: /s$/,
          choices: [ '', 's' ]
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
      title: 'Adjectives: mixed declension',

      description: 'Choose the right ending of the adjectives that go after an idefinite article, "kein" or a possessive pronoun ("mein", "sein" etc).',

      pattern: [
        {
          partOfSpeech: [ 'ART', 'INDDET', 'POSDET' ],
          baseForm: /^((?!der|die|das).)/
        },

        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
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

      description: 'Depending on whether an adjective follows a determiner or not, it\'s declined differently. Choose the correct adjectival endings.',

      pattern: [
        {
          partOfSpeech: [ 'ADJA', 'ADJA2', 'ADJA3' ],
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

      description: 'Articles in German show not only the definitiveness, but also the gender, case and plurality of nouns. Choose the correct form of the definite article.',

      pattern: [
        {
          partOfSpeech: 'ART',
          baseForm: /^((?!ein).)/,
          occlusion: /.+/,
          choices: [ 'der', 'die', 'das', 'des', 'den', 'dem' ]
        }
      ]
    },

    'verbs-with-prepositions': {
      title: 'Verbs: prepositional government',

      description: 'Certain verbs require certain preposisions and govern the case of the object. Choose the right preposisions.',

      pattern: [
        {
          partOfSpeech: [ 'VVFIN', 'VVINF' ]
        },

        {
          partOfSpeech: [ 'PREP', 'PREPART' ],
          occlusion: /.+/,
          baseForm: /^((?!d).)/,
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

      description: 'Choose the right separated prefix.',

      pattern: [
        {
          partOfSpeech: 'VPREF',
          occlusion: /.+/,
          choices: [
            'ab', 'an', 'dran', 'auf', 'drauf', 'aus', 'raus', 'ein', 'hin', 'hinzu', 'los', 'mit', 'vor', 'weg', 'zurück',
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

    'personal-pronouns': {
      title: 'Pronouns: personal',

      description: 'Put the personal pronouns into the right forms.',

      pattern: [
        {
          partOfSpeech: [ 'PERSPRO' ],
          surfaceForm: /^(mich|mir|dich|dir|ihn|ihm|ihr|uns|euch)$/i,
          occlusion: /.+/,
          choices: []
        }
      ]
    },

    'possessive-pronouns-and-indefinite-article': {
      title: 'Pronouns: possessive',

      description: 'Choose the correct form of the possessive pronouns, indefinite articles and "kein".',

      pattern: [
        {
          partOfSpeech: [ 'ART', 'INDDET', 'POSDET' ],
          baseForm: /^((?!der|die|das).)/,
          occlusion: /(e[mnrs]?)$/,
          choices: [ 'e', 'em', 'en', 'er', 'es' ]
        }
      ]
    }
  }
}
