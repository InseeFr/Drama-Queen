import { tss } from 'tss-react/mui'

const borderColorCheckbox = '#aaaaaa'
const backgroundColorCheckbox = '#d6d6d6'
const modalityLabelColorChecked = '#1d63a0'
const modalityCodeBackgroundColor = 'white'
const borderInput = '1px solid #767676'
const disabledColor = '#dcdcdc'

export const useLunaticStyles = tss.create(({ theme }) => ({
  lunatic: {
    display: 'flex',
    flexDirection: 'column',

    /* Remove arrow for input number */
    /* Chrome, Safari, Edge, Opera */
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: '0',
    },

    // button-lunatic inside Loop
    '&.Loop .button-lunatic': {
      marginTop: '1em',
    },

    // table
    '& .lunatic-table': {
      margin: '1em',
      borderCollapse: 'collapse',
      '& .lunatic-table-tr, .lunatic-table-th, .lunatic-table-td': {
        border: '0.15em solid #555',
        padding: '0.2em 1em',
      },
      '& .lunatic-table-td > .field-container': {
        marginTop: '1rem',
      },
    },

    '&.Loop': {
      display: 'block',
    },

    '& .sequence-lunatic, .subsequence-lunatic': {
      backgroundColor: 'transparent',
      color: 'black',
      fontSize: '1.2em',
      display: 'block',
      marginBottom: '2rem',
      fontWeight: 'bold',
    },
    '& .subsequence-lunatic': {
      fontSize: '1.1em',
    },

    '& input': {
      fontSize: '1rem',
    },

    '& textarea': {
      fontSize: '1rem',
    },

    /* Firefox */
    '& input[type=text]': {
      MozAppearance: 'textfield',
      marginBottom: '1em',
      padding: '0.45rem 0 0.45rem 0.45rem',
      minWidth: '40%',
      borderRadius: '10px',
      border: '1px solid black',
      backgroundColor: 'white',
    },
    '& input[type=number]': {
      MozAppearance: 'textfield',
      marginBottom: '1em',
      padding: '0.45rem 0 0.45rem 0.45rem',
      borderRadius: '10px',
      border: '1px solid black',
      backgroundColor: 'white',
    },
    // unit for lunatic-input-number
    '& .lunatic-input-number > span': {
      position: 'relative',
      left: '0.5em',
      fontWeight: 'bold',
    },

    // to replace checkbox by svg
    '& .list-icon': { position: 'absolute', marginTop: '-0.2rem' },

    // datepicker
    '.lunaticDatepickerFields': {
      display: 'flex',
      gap: '2rem',
    },
    '.lunaticDatepickerField input, .lunaticDatepickerFieldLarge input': {
      width: '4rem',
    },
    '.lunaticDatepickerHint': {
      display: 'flex',
      fontWeight: 400,
      fontSize: '0.9rem',
    },

    // duration
    '.duration-fields': {
      display: 'flex',
      gap: '2rem',
    },
    '.duration-field input': {
      minWidth: '4rem', // cannot overload width directly
    },

    // declarations
    '& .declarations-lunatic, &:is(.Sequence, .Subsequence) .label-description':
      {
        marginBottom: '2rem',
        fontSize: '0.92rem',
      },
    '& .declaration-lunatic': {
      marginBottom: '1em',
    },
    '&:not(.Question) .declaration-lunatic': {
      '&.declaration-help': {
        color: theme.palette.declarations.help,
      },
      '&.declaration-instruction, &.declaration-statement, &.declaration-codecard':
        {
          color: theme.palette.declarations.instruction,
        },
    },
    '&.Question > .declarations-lunatic': {
      '.declaration-help': {
        color: theme.palette.declarations.instruction,
      },
    },
    '&.Question > .field-container .declarations-lunatic': {
      '.declaration-help': {
        color: theme.palette.declarations.help,
      },
      '.declaration-instruction, .declaration-statement, .declaration-codecard':
        {
          color: theme.palette.declarations.instruction,
        },
    },
    '&.Subsequence > .field-container > .field > .label-description': {
      color: theme.palette.declarations.instruction,
    },

    '& .label-top label': {
      fontWeight: 'bold',
    },

    '&:not(.Loop) .lunatic-component fieldset legend, &:not(.Question, .Loop) fieldset legend':
      {
        fontWeight: 'bold',
        maxWidth: '90%',
        color: 'initial',
        backgroundColor: 'initial',
        fontSize: 'initial',
        marginBottom: '2em',
        lineHeight: '1.3em',
      },
    '&.Question .lunatic-component .field-container': {
      marginTop: '0',
    },
    '& .lunatic-textarea textarea': {
      padding: '0.5rem',
      borderRadius: '10px',
      border: `${borderInput}`,
      width: '55%',
      minWidth: '200px',
      height: '10em',
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 5px ${theme.palette.declarations.main}`,
      },
    },
    '& .input-lunatic': {
      paddingRight: '0.5em',
      fontSize: '100%',
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      borderRadius: '10px',
      border: `${borderInput}`,
      width: '55%',
      minWidth: '200px',
      height: '1.5em',
      '&:focus': {
        outline: 'none',
        boxShadow: `0 0 5px ${theme.palette.declarations.main}`,
      },
      "&[type='number']": {
        width: '7em',
        minWidth: '7em',
      },
    },

    '&.CheckboxOne, &.Radio': {
      '& .code-modality': {
        borderRadius: '15px',
      },
    },
    '&.Question .lunatic-table fieldset:is(.lunatic-radio-group, .lunatic-checkbox-one) .code-modality':
      {
        borderRadius: '5px',
      },
    '&.Question fieldset:is(.lunatic-radio-group, .lunatic-checkbox-one) .code-modality':
      {
        borderRadius: '15px',
      },

    '& .lunatic-component fieldset, fieldset': {
      padding: 0,
      margin: 0,
      border: 'none',

      // checkbox & radio
      '&:not(:has(.lunatic-checkbox-boolean)) .lunatic-input-checkbox': {
        borderRadius: '5px',
        border: `1px solid ${borderColorCheckbox}`,
        backgroundColor: `${backgroundColorCheckbox}`,
        marginBottom: '12px',
        width: '70%',
        padding: '0.5rem',

        '& .lunatic-input-checkbox__icon': {
          display: 'none',
        },

        '& > .lunatic-label': {
          display: 'flex',
          gap: '0.5em',
          alignItems: 'center',
        },

        '&:hover': {
          fontWeight: 'bold',
          '& .code-modality': {
            color: `${modalityCodeBackgroundColor}`,
            backgroundColor: theme.palette.declarations.main,
            borderColor: theme.palette.declarations.main,
          },
        },

        '&[aria-checked=true]': {
          backgroundColor: theme.palette.background.button.light,
          borderColor: `${modalityLabelColorChecked}`,
          '& *': {
            fontWeight: 'bold',
          },
          '& label::after': {
            marginLeft: 'auto',
            content: "'✓'",
          },
          '& .code-modality': {
            color: `${modalityCodeBackgroundColor}`,
            backgroundColor: theme.palette.declarations.main,
            borderColor: theme.palette.declarations.main,
          },
        },
      },
      '& .code-modality': {
        padding: '0.3em 0.5em 0.3em 0.5em',
        fontWeight: 'bold',
        border: `1px solid ${borderColorCheckbox}`,
        backgroundColor: `${modalityCodeBackgroundColor}`,
        borderRadius: '5px',
        marginRight: '1em',
        height: 'min-content',
      },
    },

    // checkbox boolean
    '& .lunatic-checkbox-boolean': {
      '& .lunatic-input-checkbox__icon': {
        display: 'grid',
        placeItems: 'center',
        width: '18px',
        height: '18px',
        padding: '0.1em',
        flex: 'none',
        borderRadius: '5px',
        color: '#FFF',
        backgroundColor: `${modalityCodeBackgroundColor}`,
        border: `2px solid ${borderColorCheckbox}`,

        '& svg': {
          transform: 'scale(0.7)',
        },
      },

      "& .lunatic-input-checkbox[aria-checked='true'] .lunatic-input-checkbox__icon":
        {
          backgroundColor: theme.palette.background.button.main,
          borderColor: `${modalityLabelColorChecked}`,
        },
    },

    // .lunatic-component lunatic label
    '& .lunatic-input , .lunatic-textarea, .lunatic-input-number, .lunatic-dropdown, .lunatic-combo-box-container, .field-container > .field .lunatic-input':
      {
        '& > .lunatic-label, label': {
          backgroundColor: 'transparent',
          fontSize: '1em',
          color: 'black',
          display: 'block',
          marginBottom: '2rem',
          fontWeight: 'bold',
        },
      },
    '&:is(.Question, .Loop) .field-container > .field > fieldset > legend': {
      '> h3': {
        backgroundColor: 'transparent',
        fontSize: '1em',
        color: 'black',
        display: 'block',
        marginBottom: '2rem',
        fontWeight: 'bold',
        marginTop: '0',
      },
      '> p:not(:has(*))': {
        display: 'none',
      },
    },
    '&.Loop .field-container > .field > fieldset > legend': {
      '> h3': { marginBottom: '0' },
    },

    // missing response buttons css override
    // roll-back some changes when Missing override is available in lunatic-v2
    // such as shortcut and checked selectors

    '&.Question, &.Loop': {
      '&:has(> .declarations-lunatic)': {
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
      },
      '.field fieldset': {
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        legend: {
          gridRow: '1',
          '&:not(:has(*))': {
            display: 'none',
          },
        },
        '.declarations-lunatic': {
          gridRow: '2',
        },
        '.lunatic.lunatic-component': {
          gridRow: '3',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
        },
      },
    },

    // fix missing-buttons except in Loop because there are multiple missing responses
    '&:not(.Loop) .missing-buttons': {
      position: 'fixed',
      bottom: '1em',
    },

    '& .lunatic-component .missing-buttons, .missing-buttons': {
      display: 'flex',
      gap: '1em',

      '& .button-lunatic': {
        marginTop: 0,
        height: '100%',
      },

      // Commons css for buttons
      '& .missing-button-rf, .missing-button-rf-active, .missing-button-dk, .missing-button-dk-active, .button-lunatic':
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          color: 'white',
          backgroundColor: '#666666',
          border: 'none',
          borderRadius: '4px',
          lineHeight: 1.75,
          fontSize: '0.875rem',
          width: '170px',
          textAlign: 'left',

          '&::before': {
            padding: '0.3em 0.5em 0.3em 0.5em',
            margin: '0.5em',
            color: '#666666',
            fontWeight: 'bold',
            backgroundColor: 'white',
            borderRadius: '4px',
          },
          '&::after': {
            content: 'none',
            width: '1em',
            fontSize: '125%',
            fontWeight: 'bold',
            paddingRight: '0.5em',
          },
        },

      // nonactive DK button
      '& .missing-button.missing-button-dk, .missing-button.missing-button-dk .button-lunatic, .missing-button-active.missing-button-dk-active, .missing-button-active.missing-button-dk-active .button-lunatic':
        {
          '&:hover,&:focus': {
            backgroundColor: '#f9cb9c',
            color: '#b45f06',
            '& *': { backgroundColor: '#f9cb9c', color: '#b45f06' },
            '&::before': {
              color: 'white',
              backgroundColor: '#b45f06',
            },
          },
          '&::before': {
            content: "'F2'",
          },
        },

      // active DK button
      '& .missing-button-active.missing-button-dk-active, .missing-button-active.missing-button-dk-active .button-lunatic':
        {
          backgroundColor: '#f9cb9c',
          color: '#b45f06',
          '& *': { backgroundColor: '#f9cb9c', color: '#b45f06' },
          '&::before': {
            color: 'white',
            backgroundColor: '#b45f06',
          },
          '&::after': {
            content: "'✓'",
          },
        },

      // nonactive RF button
      '& .missing-button.missing-button-rf, .missing-button.missing-button-rf .button-lunatic, .missing-button-active.missing-button-rf-active, .missing-button-active.missing-button-rf-active .button-lunatic':
        {
          '&:hover,&:focus': {
            backgroundColor: '#ea9999',
            color: '#990000',
            '& *': { backgroundColor: '#ea9999', color: '#990000' },
            '&::before': {
              color: 'white',
              backgroundColor: '#990000',
            },
          },
          '&::before': {
            content: "'F4'",
          },
        },

      // active RF button
      '& .missing-button-active.missing-button-rf-active, .missing-button-active.missing-button-rf-active .button-lunatic':
        {
          backgroundColor: '#ea9999',
          color: '#990000',
          '& *': { backgroundColor: '#ea9999', color: '#990000' },
          '&::before': {
            color: 'white',
            backgroundColor: '#990000',
          },
          '&::after': {
            content: "'✓'",
          },
        },
    },

    // suggester & dropdown
    ' .lunatic-combo-box-container': {
      '&.default-style': {
        position: 'relative',
        marginBottom: '10px',
        '.lunatic-combo-box': {
          minHeight: '30px',
          minWidth: '260px',
          width: '100%',
          '& .lunatic-combo-box-content': {
            width: '70%',

            '.lunatic-combo-box-selection': {
              height: '34px',
              lineHeight: '34px',
              borderRadius: '10px',
              border: '1px solid black',
              backgroundColor: 'white',
              '& .placeholder': {
                color: 'gray',
              },
              '& > .placeholder, >.selection': {},
              '.lunatic-combo-box-input': {
                height: '34px',
                lineHeight: '34px',
                textIndent: '4px',
                margin: 0,
                padding: 0,
                width: '100%',
                border: '1px solid black',
                '&::placeholder': {
                  fontFamily: "'Gotham SSm A','Gotham SSm B',sans-serif",
                },
              },

              '.lunatic-combo-box-selected': {
                paddingLeft: '4px',

                '&.disabled': {
                  backgroundColor: `${disabledColor}`,
                },
              },
            },

            '.lunatic-combo-box-panel': {
              paddingTop: '5px',
              textIndent: '10px',
              backgroundColor: 'white',
              '&.expanded': {
                margin: 0,
                padding: 0,
                listStyle: 'none',
                border: 'solid 1px',
                minHeight: '30px',
                maxHeight: '50vh',
                overflow: 'auto',
                boxShadow: '0 2px 2px grey',
                borderRadius: '4px',
              },

              '.lunatic-combo-box-option, .lunatic-dropdown-option': {
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                marginBottom: '0.1em',
                lineHeight: '2rem',
                display: 'block',
                '&.selected': {
                  color: `${theme.palette.primary.main}`,
                  backgroundColor: '#eaeaea',
                },
                '&:hover': {
                  backgroundColor: `${theme.palette.primary.main}`,
                  color: 'white',
                  cursor: 'pointer',
                },
              },
            },
          },
        },

        '.lunatic-combo-box-fab': {
          position: 'absolute',
          top: '60px',
          left: '70.5%',
          backgroundColor: `${theme.palette.background.button.main}`,
          borderRadius: '50%',
          border: 'none',
          width: '20px',
          height: '20px',
          margin: 0,
          padding: 0,
          cursor: 'pointer',

          '.lunatic-icon': {
            display: 'flex',
            alignItems: 'center',
            svg: {
              fill: 'white',
              width: '16px',
              height: '16px',
              margin: 'auto',
            },
          },
        },
      },
    },
    '&.Question .lunatic-combo-box-container:has(.lunatic-combo-box-fab)': {
      display: 'grid',
      gridTemplateColumns: '70% auto',
      gridTemplateRows: 'auto auto',
      columnGap: '0.5em',
      '.lunatic-combo-box': {
        gridColumn: 1,
        '.lunatic-combo-box-content': {
          width: 'unset',
        },
      },
      '.lunatic-combo-box-fab': {
        gridColumn: 2,
        position: 'unset',
        left: 'unset',
        alignSelf: 'center',
      },
      '.lunatic-errors': {
        gridRow: 2,
        gridColumn: 1 / 3,
      },
    },
  },
}))
