import { type LunaticSource } from '@inseefr/lunatic'

export const form = {
  id: 'ldacbdcw',
  modele: 'm2',
  enoCoreVersion: '2.4.1',
  lunaticModelVersion: '2.3.1',
  generatingDate: '05-04-2023 10:59:07',
  missing: true,
  pagination: 'question',
  maxPage: '103',
  label: {
    value:
      "Enquête annuelle auprès des ménages sur les technologies de l'information et de la communication 2023 - QUESTIONNAIRE TELEPHONE",
    type: 'VTL|MD',
  },
  components: [
    {
      id: 'lb0vzksx',
      componentType: 'Sequence',
      page: '1',
      label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
      conditionFilter: { value: 'true', type: 'VTL' },
      hierarchy: {
        sequence: {
          id: 'lb0vzksx',
          page: '1',
          label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'lcytxi3r',
      componentType: 'Radio',
      mandatory: false,
      page: '2',
      label: {
        value:
          'Bonjour, je suis PRENOM NOM, enquêteur de l’Insee. Vous avez reçu un courrier de l’Insee annonçant une enquête sur l’usage de l’informatique et d’Internet. Le logement situé à l’adresse ADRESSE DE LA LISTE DE GESTION correspond-il à la résidence où vous vivez la plus grande partie de l’année ?',
        type: 'VTL|MD',
      },
      conditionFilter: { value: 'true', type: 'VTL' },
      hierarchy: {
        sequence: {
          id: 'lb0vzksx',
          page: '1',
          label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
        },
      },
      missingResponse: { name: 'RESIDENCE_MISSING' },
      bindingDependencies: ['RESIDENCE_MISSING', 'RESIDENCE'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },

        { value: '9', label: { value: 'Ne sait pas', type: 'VTL|MD' } },
      ],
      response: { name: 'RESIDENCE' },
    },

    {
      id: 'lcytw7yb',
      componentType: 'FilterDescription',
      page: '2',
      filterDescription: false,
      label: {
        value: 'Début de la liste des habitants du ménages',
        type: 'VTL|MD',
      },
      conditionFilter: { value: 'true', type: 'VTL' },
      hierarchy: {
        sequence: {
          id: 'lb0vzksx',
          page: '1',
          label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'ld8pizpc',
      componentType: 'CheckboxOne',
      mandatory: false,
      page: '3',
      label: {
        value:
          'Votre réponse me conduit à arrêter là cet entretien. En effet, l’Insee réalise l’enquête uniquement auprès des ménages dont le numéro d’appel correspond à une résidence principale. Je tiens néanmoins à vous remercier d’avoir accepté de répondre à cette question.',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ld8pdhy4-SI',
          declarationType: 'STATEMENT',
          position: 'BEFORE_QUESTION_TEXT',
          label: {
            value: 'Formule de politesse en cas d’arrêt',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value: '(not(RESIDENCE = "1" or RESIDENCE = "9"))',
        type: 'VTL',
        bindingDependencies: ['RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb0vzksx',
          page: '1',
          label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
        },
      },
      missingResponse: { name: 'POLITES_MISSING' },
      bindingDependencies: ['POLITES_MISSING', 'POLITES'],
      options: [{ value: '1', label: { value: 'ok', type: 'VTL|MD' } }],
      response: { name: 'POLITES' },
    },

    {
      id: 'ld8pifqu',
      componentType: 'FilterDescription',
      page: '3',
      filterDescription: false,
      label: { value: 'Commentaire', type: 'VTL|MD' },
      conditionFilter: {
        value: '(not(RESIDENCE = "1" or RESIDENCE = "9"))',
        type: 'VTL',
        bindingDependencies: ['RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb0vzksx',
          page: '1',
          label: { value: '"I - " || "Type de logement"', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'lcytfx25',
      componentType: 'Sequence',
      page: '4',
      label: {
        value: '"II - " || "Liste des habitants du logement"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'lcytfx25-lcytnq3l',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              '"L’enquête s’adresse à une personne de votre ménage qui va être sélectionnée aléatoirement. Pour cela, nous avons besoin de faire la liste des personnes qui vivent habituellement dans votre logement."',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lcytfx25',
          page: '4',
          label: {
            value: '"II - " || "Liste des habitants du logement"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'lb0wm7jg',
      componentType: 'InputNumber',
      mandatory: false,
      page: '5',
      min: 0,
      max: 20,
      decimals: 0,
      label: {
        value:
          '"Combien de personnes vivent habituellement dans votre logement ?"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'lb0wm7jg-lb0we305',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: '"Inclure les étudiants qui ne rentrent que le week-end."',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      controls: [
        {
          id: 'lb0wm7jg-format-borne-inf-sup',
          typeOfControl: 'FORMAT',
          criticality: 'ERROR',
          control: {
            value: 'not(not(isnull(NBHABT)) and (0>NBHABT or 20<NBHABT))',
            type: 'VTL',
          },
          errorMessage: {
            value: '" La valeur doit être comprise entre 0 et 20."',
            type: 'VTL|MD',
          },
        },

        {
          id: 'lb0wm7jg-format-decimal',
          typeOfControl: 'FORMAT',
          criticality: 'ERROR',
          control: {
            value: 'not(not(isnull(NBHABT))  and round(NBHABT,0)<>NBHABT)',
            type: 'VTL',
          },
          errorMessage: {
            value:
              '"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."',
            type: 'VTL|MD',
          },
        },
      ],
      hierarchy: {
        sequence: {
          id: 'lcytfx25',
          page: '4',
          label: {
            value: '"II - " || "Liste des habitants du logement"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NBHABT_MISSING' },
      bindingDependencies: ['NBHABT_MISSING', 'NBHABT'],
      response: { name: 'NBHABT' },
    },

    {
      id: 'lb0wx140',
      componentType: 'Loop',
      page: '6',
      depth: 1,
      paginatedLoop: false,
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lcytfx25',
          page: '4',
          label: {
            value: '"II - " || "Liste des habitants du logement"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PRENOM_TEL_MISSING' },
      bindingDependencies: ['NBHABT', 'PRENOM_TEL_MISSING', 'PRENOM_TEL'],
      loopDependencies: ['NBHABT'],
      lines: {
        min: { value: 'cast(NBHABT, integer)', type: 'VTL' },
        max: { value: 'cast(NBHABT, integer)', type: 'VTL' },
      },
      components: [
        {
          id: 'lb0wr1kj',
          componentType: 'Subsequence',
          page: '6',
          goToPage: '6',
          label: {
            value: 'Tirage de la personne répondante (Kish)',
            type: 'VTL|MD',
          },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lb0wr1kj',
              page: '6',
              label: {
                value: 'Tirage de la personne répondante (Kish)',
                type: 'VTL|MD',
              },
            },
          },
          bindingDependencies: ['NBHABT'],
        },

        {
          id: 'lb0wslin',
          componentType: 'Input',
          mandatory: false,
          page: '6',
          maxLength: 249,
          label: {
            value: 'Quel est le prénom de la personne ?',
            type: 'VTL|MD',
          },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lb0wr1kj',
              page: '6',
              label: {
                value: 'Tirage de la personne répondante (Kish)',
                type: 'VTL|MD',
              },
            },
          },
          bindingDependencies: ['PRENOM_TEL', 'NBHABT'],
          response: { name: 'PRENOM_TEL' },
        },
      ],
    },

    {
      id: 'ldacu7wa',
      componentType: 'Loop',
      page: '7',
      maxPage: '2',
      depth: 1,
      paginatedLoop: true,
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lcytfx25',
          page: '4',
          label: {
            value: '"II - " || "Liste des habitants du logement"',
            type: 'VTL|MD',
          },
        },
      },
      bindingDependencies: [
        'SEXE_MISSING',
        'DATENAIS_TEL_MISSING',
        'SEXE',
        'DATENAIS_TEL',
      ],
      loopDependencies: ['PRENOM_TEL'],
      components: [
        {
          id: 'ldachcph',
          componentType: 'Subsequence',
          goToPage: '7.1',
          label: { value: 'Sexe et âge', type: 'VTL|MD' },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'ldachcph',
              page: '7.1',
              label: { value: 'Sexe et âge', type: 'VTL|MD' },
            },
          },
          bindingDependencies: ['PRENOM_TEL'],
        },

        {
          id: 'lbngrie4',
          componentType: 'Radio',
          mandatory: false,
          page: '7.1',
          label: {
            value: 'Quel est le sexe de cette personne ?',
            type: 'VTL|MD',
          },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'ldachcph',
              page: '7.1',
              label: { value: 'Sexe et âge', type: 'VTL|MD' },
            },
          },
          missingResponse: { name: 'SEXE_MISSING' },
          bindingDependencies: ['SEXE_MISSING', 'SEXE', 'PRENOM_TEL'],
          options: [
            { value: '1', label: { value: 'Masculin', type: 'VTL|MD' } },

            { value: '2', label: { value: 'Féminin', type: 'VTL|MD' } },
          ],
          response: { name: 'SEXE' },
        },

        {
          id: 'lb0x1ksp',
          componentType: 'Datepicker',
          mandatory: false,
          page: '7.2',
          min: '1900-01-01',
          max: '2023-07-01',
          label: {
            value: 'Quelle est la date de naissance de cette personne ?',
            type: 'VTL|MD',
          },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          controls: [
            {
              id: 'lb0x1ksp-format-borne-inf-sup',
              typeOfControl: 'FORMAT',
              criticality: 'ERROR',
              control: {
                value:
                  'not(not(isnull(DATENAIS_TEL)) and (cast(DATENAIS_TEL, date, "YYYY-MM-DD")>cast("2023-07-01", date, "YYYY-MM-DD") or cast(DATENAIS_TEL, date, "YYYY-MM-DD")<cast("1900-01-01", date, "YYYY-MM-DD")))',
                type: 'VTL',
              },
              errorMessage: {
                value:
                  '"La date saisie doit être comprise entre 1900-01-01 et 2023-07-01."',
                type: 'VTL|MD',
              },
            },
          ],
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'ldachcph',
              page: '7.1',
              label: { value: 'Sexe et âge', type: 'VTL|MD' },
            },
          },
          missingResponse: { name: 'DATENAIS_TEL_MISSING' },
          bindingDependencies: [
            'DATENAIS_TEL_MISSING',
            'DATENAIS_TEL',
            'PRENOM_TEL',
          ],
          dateFormat: 'YYYY-MM-DD',
          response: { name: 'DATENAIS_TEL' },
        },
      ],
      iterations: { value: 'count(PRENOM_TEL)', type: 'VTL' },
    },

    {
      id: 'lda34pg5',
      componentType: 'Loop',
      page: '8',
      maxPage: '2',
      depth: 1,
      paginatedLoop: true,
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lcytfx25',
          page: '4',
          label: {
            value: '"II - " || "Liste des habitants du logement"',
            type: 'VTL|MD',
          },
        },
      },
      bindingDependencies: [
        'NB_POTENTIAL_KISH',
        'PASSER_MISSING',
        'DATENAIS_TEL',
        'PRENOM_TEL',
        'IS_KISH_MISSING',
        'PASSER',
        'IS_KISH',
      ],
      loopDependencies: ['PRENOM_TEL'],
      components: [
        {
          id: 'lda1lzhm',
          componentType: 'Subsequence',
          goToPage: '8.1',
          label: { value: 'Sélection manuelle Kish', type: 'VTL|MD' },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lda1lzhm',
              page: '8.1',
              label: { value: 'Sélection manuelle Kish', type: 'VTL|MD' },
            },
          },
          bindingDependencies: ['PRENOM_TEL'],
        },

        {
          id: 'lda1pegi',
          componentType: 'Radio',
          mandatory: false,
          page: '8.1',
          label: {
            value:
              '"" || if NB_POTENTIAL_KISH > 1 then "Sélection manuelle du Kish (car plusieurs personnes du foyer sont nées le même jour)" else "Le Kish est connu, vous pouvez passer cette étape"',
            type: 'VTL|MD',
          },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lda1lzhm',
              page: '8.1',
              label: { value: 'Sélection manuelle Kish', type: 'VTL|MD' },
            },
          },
          missingResponse: { name: 'PASSER_MISSING' },
          bindingDependencies: [
            'NB_POTENTIAL_KISH',
            'PASSER_MISSING',
            'PASSER',
            'PRENOM_TEL',
          ],
          options: [{ value: '1', label: { value: 'Ok', type: 'VTL|MD' } }],
          response: { name: 'PASSER' },
        },

        {
          id: 'lda1j3kj',
          componentType: 'FilterDescription',
          page: '8.1',
          filterDescription: false,
          label: { value: 'Un seul Kish', type: 'VTL|MD' },
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
            type: 'VTL',
            bindingDependencies: ['POLITES', 'RESIDENCE'],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lda1lzhm',
              page: '8.1',
              label: { value: 'Sélection manuelle Kish', type: 'VTL|MD' },
            },
          },
          bindingDependencies: ['PRENOM_TEL'],
        },

        {
          id: 'lda1xyl8',
          componentType: 'CheckboxOne',
          mandatory: false,
          page: '8.2',
          label: {
            value: '"" || PRENOM_TEL || " est-il le kish ?"',
            type: 'VTL|MD',
          },
          declarations: [
            {
              id: 'lda1xyl8-ldbkqjwy',
              declarationType: 'HELP',
              position: 'AFTER_QUESTION_TEXT',
              label: {
                value:
                  '"La date de naissance de cette personne est : " || cast(DATENAIS_TEL, string) )',
                type: 'VTL|MD',
              },
            },
          ],
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
            type: 'VTL',
            bindingDependencies: [
              'POLITES',
              'RESIDENCE',
              'NB_POTENTIAL_KISH',
              'KISH_INDICATOR',
              'DATENAIS_TEL',
            ],
          },
          hierarchy: {
            sequence: {
              id: 'lcytfx25',
              page: '4',
              label: {
                value: '"II - " || "Liste des habitants du logement"',
                type: 'VTL|MD',
              },
            },
            subSequence: {
              id: 'lda1lzhm',
              page: '8.1',
              label: { value: 'Sélection manuelle Kish', type: 'VTL|MD' },
            },
          },
          missingResponse: { name: 'IS_KISH_MISSING' },
          bindingDependencies: [
            'DATENAIS_TEL',
            'PRENOM_TEL',
            'IS_KISH_MISSING',
            'IS_KISH',
          ],
          options: [
            { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

            { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
          ],
          response: { name: 'IS_KISH' },
        },
      ],
      iterations: { value: 'count(PRENOM_TEL)', type: 'VTL' },
    },

    {
      id: 'lb3gs5kh',
      componentType: 'Sequence',
      page: '9',
      label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
      declarations: [
        {
          id: 'lb3gs5kh-lb6r0syo',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              '"Le Kish est la personne de 15 ans ou plus (au 1er janvier 2023) dont l’anniversaire arrivera en premier à partir du 1er juin. C’est la personne à interroger pour le reste de l’enquête."',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb3gs5kh',
          page: '9',
          label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'lb0yo1jn',
      componentType: 'Loop',
      page: '10',
      maxPage: '1',
      depth: 1,
      paginatedLoop: true,
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb3gs5kh',
          page: '9',
          label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
        },
      },
      bindingDependencies: ['PRENOM_TEL'],
      loopDependencies: ['PRENOM_TEL'],
      components: [
        {
          id: 'lb0x8xj3',
          componentType: 'Subsequence',
          page: '10.1',
          goToPage: '10.1',
          label: {
            value: '"Le Kish sélectionné est " || cast(PRENOM_TEL, string)',
            type: 'VTL|MD',
          },
          declarations: [
            {
              id: 'lb0x8xj3-ldabnbwq',
              declarationType: 'HELP',
              position: 'AFTER_QUESTION_TEXT',
              label: {
                value:
                  '"Nous allons à présent interroger " || cast(PRENOM_TEL, string) || " sur sa disponibilité."',
                type: 'VTL|MD',
              },
            },
          ],
          conditionFilter: {
            value:
              '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(nvl(IS_KISH, "99") = "2" or (NB_POTENTIAL_KISH = 1 and KISH_INDICATOR = 0)))',
            type: 'VTL',
            bindingDependencies: [
              'POLITES',
              'RESIDENCE',
              'IS_KISH',
              'NB_POTENTIAL_KISH',
              'KISH_INDICATOR',
              'DATENAIS_TEL',
              'KISH_MIN',
              'SCORE_KISH_INT',
            ],
          },
          hierarchy: {
            sequence: {
              id: 'lb3gs5kh',
              page: '9',
              label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
            },
            subSequence: {
              id: 'lb0x8xj3',
              page: '10.1',
              label: {
                value: '"Le Kish sélectionné est " || cast(PRENOM_TEL, string)',
                type: 'VTL|MD',
              },
            },
          },
          bindingDependencies: ['PRENOM_TEL'],
        },
      ],
      iterations: { value: 'count(PRENOM_TEL)', type: 'VTL' },
    },

    {
      id: 'ldabkvv2',
      componentType: 'Subsequence',
      goToPage: '11',
      label: { value: 'Disponibilité du Kish', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb3gs5kh',
          page: '9',
          label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
        },
        subSequence: {
          id: 'ldabkvv2',
          page: '11',
          label: { value: 'Disponibilité du Kish', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'lb0xwle1',
      componentType: 'CheckboxOne',
      mandatory: false,
      page: '11',
      label: {
        value:
          '"La personne sélectionnée est-elle disponible pour répondre au questionnaire ?"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb3gs5kh',
          page: '9',
          label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
        },
        subSequence: {
          id: 'ldabkvv2',
          page: '11',
          label: { value: 'Disponibilité du Kish', type: 'VTL|MD' },
        },
      },
      missingResponse: { name: 'PRESAKO_MISSING' },
      bindingDependencies: ['PRESAKO_MISSING', 'PRESAKO'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value:
              'Non, la personne ne peut pas ou ne souhaite pas répondre tout de suite à l’enquête (prise de rendez-vous ultérieur)',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: {
            value:
              'Non, la personne refuse ou est inapte ou est absente jusqu’au 16 mai ou tous les habitants du ménage sont nés après 2008',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'PRESAKO' },
    },

    {
      id: 'lbmhp3oo',
      componentType: 'FilterDescription',
      page: '11',
      filterDescription: false,
      label: {
        value:
          'Si la personne refuse ou est inapte ou est absente jusqu’au 16 mai ou si tous les habitants du ménage sont nés après 2008, c’est la fin du questionnaire.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE'],
      },
      hierarchy: {
        sequence: {
          id: 'lb3gs5kh',
          page: '9',
          label: { value: '"III - " || "Questions_kish"', type: 'VTL|MD' },
        },
        subSequence: {
          id: 'ldabkvv2',
          page: '11',
          label: { value: 'Disponibilité du Kish', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'ks4qe7yy',
      componentType: 'Sequence',
      page: '12',
      label: {
        value: '"IV - " || "Caractéristiques socio-démographiques"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbw8yqwv',
      componentType: 'Radio',
      mandatory: false,
      page: '13',
      label: {
        value: 'Quel est le diplôme le plus élevé que vous ayez obtenu ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kbw8yqwv-l5qr6oee',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Indiquez le niveau de diplôme au moment où vous l’avez obtenu, pas son niveau actuel',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DIPLOME_MISSING' },
      bindingDependencies: ['DIPLOME_MISSING', 'DIPLOME'],
      options: [
        { value: '1', label: { value: 'Aucun diplôme', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value:
              'Un CEP (certificat d’études primaires) ou diplôme étranger de même niveau',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: {
            value:
              'BEPC, brevet élémentaire, brevet des collèges ou diplôme étranger de même niveau',
            type: 'VTL|MD',
          },
        },

        {
          value: '4',
          label: {
            value: 'CAP, BEP ou diplôme de niveau équivalent',
            type: 'VTL|MD',
          },
        },

        {
          value: '5',
          label: {
            value:
              'Baccalauréat (général, technologique ou professionnel), brevet supérieur, brevet professionnel, de technicien ou d’enseignement ou diplôme équivalent',
            type: 'VTL|MD',
          },
        },

        {
          value: '6',
          label: { value: 'Capacité en droit, DAEU, ESEU', type: 'VTL|MD' },
        },

        {
          value: '7',
          label: {
            value:
              'BTS, DUT, Deug, Deust, diplôme de la santé ou du social de niveau Bac+2 ou diplôme équivalent',
            type: 'VTL|MD',
          },
        },

        {
          value: '8',
          label: {
            value:
              'Licence, licence pro, maîtrise ou diplôme équivalent de niveau Bac+3 ou Bac+4',
            type: 'VTL|MD',
          },
        },

        {
          value: '9',
          label: {
            value:
              'Master, DEA, DESS, diplôme de grande école de niveau Bac + 5, doctorat de santé',
            type: 'VTL|MD',
          },
        },

        {
          value: '10',
          label: {
            value: 'Doctorat de recherche (hors santé)',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'DIPLOME' },
    },

    {
      id: 'kbwdhhae',
      componentType: 'FilterDescription',
      page: '13',
      filterDescription: false,
      label: {
        value:
          'Si vous avez renseigné un niveau de diplôme CAP, BEP ou supérieur, passez à la question 5.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbw97gaf',
      componentType: 'Radio',
      mandatory: false,
      page: '14',
      label: { value: 'Quel est votre niveau d’étude ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(DIPLOME = "4" or DIPLOME = "5" or DIPLOME = "6" or DIPLOME = "7" or DIPLOME = "8" or DIPLOME = "9" or DIPLOME = "10" or DIPLOME = "11" or DIPLOME = "12" ))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'DIPLOME'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ETUDE_MISSING' },
      bindingDependencies: ['ETUDE_MISSING', 'ETUDE'],
      options: [
        {
          value: '1',
          label: { value: 'Vous n’avez jamais fait d’études', type: 'VTL|MD' },
        },

        {
          value: '2',
          label: {
            value: 'École primaire (y compris certificat d’études primaires)',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: '6ème à 4ème (collège)', type: 'VTL|MD' },
        },

        { value: '4', label: { value: '3ème (collège)', type: 'VTL|MD' } },

        {
          value: '5',
          label: {
            value:
              'Première, deuxième ou dernière année de CAP-BEP ou d’une formation équivalente',
            type: 'VTL|MD',
          },
        },

        {
          value: '6',
          label: {
            value: 'Seconde, première ou terminale de lycée',
            type: 'VTL|MD',
          },
        },

        {
          value: '7',
          label: {
            value:
              'Vous avez fait des études mais ne savez pas jusqu’à quel niveau',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'ETUDE' },
    },

    {
      id: 'kbw9jgd2',
      componentType: 'Radio',
      mandatory: false,
      page: '15',
      label: { value: 'Êtes-vous actuellement en couple ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'COUPLE_MISSING' },
      bindingDependencies: ['COUPLE_MISSING', 'COUPLE'],
      options: [
        {
          value: '1',
          label: {
            value: 'Oui, avec une personne qui vit dans le logement',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value: 'Oui, avec une personne qui ne vit pas dans le logement',
            type: 'VTL|MD',
          },
        },

        { value: '3', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'COUPLE' },
    },

    {
      id: 'kbw9i35f',
      componentType: 'Radio',
      mandatory: false,
      page: '16',
      label: { value: 'Quel est votre statut matrimonial ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ETAMATRI_MISSING' },
      bindingDependencies: ['ETAMATRI_MISSING', 'ETAMATRI'],
      options: [
        {
          value: '1',
          label: {
            value: 'Célibataire (jamais légalement marié(e))',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value:
              'Marié(e) ou remarié(e), y compris séparé(e) mais non divorcé(e)',
            type: 'VTL|MD',
          },
        },

        { value: '3', label: { value: 'Veuf(ve)', type: 'VTL|MD' } },

        { value: '4', label: { value: 'Divorcé(e)', type: 'VTL|MD' } },
      ],
      response: { name: 'ETAMATRI' },
    },

    {
      id: 'kbwdixht',
      componentType: 'FilterDescription',
      page: '16',
      filterDescription: false,
      label: {
        value:
          'Si vous avez déclaré être marié ou remarié, y compris séparé mais non divorcé, passez à la question 8.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbw9gttr',
      componentType: 'Radio',
      mandatory: false,
      page: '17',
      label: { value: 'Êtes-vous pacsé(e) ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(ETAMATRI = "2"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'ETAMATRI'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PACS_MISSING' },
      bindingDependencies: ['PACS_MISSING', 'PACS'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'PACS' },
    },

    {
      id: 'kbw9rrbt',
      componentType: 'Radio',
      mandatory: false,
      page: '18',
      label: { value: 'Où êtes-vous né(e) ?', type: 'VTL|MD' },
      declarations: [
        {
          id: 'kbw9rrbt-kwm50q4n',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Pays de résidence habituelle de votre mère au moment de l’accouchement, selon les frontières nationales actuelles (et non selon les frontières en place au moment de la naissance)',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'LNAIS_MISSING' },
      bindingDependencies: ['LNAIS_MISSING', 'LNAIS'],
      options: [
        {
          value: '1',
          label: { value: 'En France (métropole - DOM-TOM)', type: 'VTL|MD' },
        },

        { value: '2', label: { value: 'À l’étranger', type: 'VTL|MD' } },
      ],
      response: { name: 'LNAIS' },
    },

    {
      id: 'kbwdact5',
      componentType: 'FilterDescription',
      page: '18',
      filterDescription: false,
      label: {
        value:
          'Si vous avez déclaré être né en France, passez à la question 9.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbwdn99v',
      componentType: 'FilterDescription',
      page: '18',
      filterDescription: false,
      label: {
        value:
          'Vous avez déclaré être né à l’étranger, passez à la question 10',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbwdjze9',
      componentType: 'FilterDescription',
      page: '18',
      filterDescription: false,
      label: {
        value:
          'Si vous ne souhaitez pas répondre à cette question, passez à la question 11',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbw9r169',
      componentType: 'Suggester',
      mandatory: false,
      page: '19',
      label: { value: 'Dans quel département ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'LNAIS'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DEPNAIS_MISSING' },
      storeName: 'L_DEPNAIS-1-1-0',
      bindingDependencies: ['DEPNAIS_MISSING', 'DEPNAIS'],
      options: [
        { value: '1', label: { value: 'Ain', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Aisne', type: 'VTL|MD' } },

        { value: '3', label: { value: 'Allier', type: 'VTL|MD' } },

        {
          value: '4',
          label: { value: 'Alpes-de-Haute-Provence', type: 'VTL|MD' },
        },

        { value: '5', label: { value: 'Hautes-Alpes', type: 'VTL|MD' } },

        { value: '6', label: { value: 'Alpes-Maritimes', type: 'VTL|MD' } },

        { value: '7', label: { value: 'Ardèche', type: 'VTL|MD' } },

        { value: '8', label: { value: 'Ardennes', type: 'VTL|MD' } },

        { value: '9', label: { value: 'Ariège', type: 'VTL|MD' } },

        { value: '10', label: { value: 'Aube', type: 'VTL|MD' } },

        { value: '11', label: { value: 'Aude', type: 'VTL|MD' } },

        { value: '12', label: { value: 'Aveyron', type: 'VTL|MD' } },

        { value: '13', label: { value: 'Bouches-du-Rhône', type: 'VTL|MD' } },

        { value: '14', label: { value: 'Calvados', type: 'VTL|MD' } },

        { value: '15', label: { value: 'Cantal', type: 'VTL|MD' } },

        { value: '16', label: { value: 'Charente', type: 'VTL|MD' } },

        { value: '17', label: { value: 'Charente-Maritime', type: 'VTL|MD' } },

        { value: '18', label: { value: 'Cher', type: 'VTL|MD' } },

        { value: '19', label: { value: 'Corrèze', type: 'VTL|MD' } },

        { value: '2A', label: { value: 'Corse-du-Sud', type: 'VTL|MD' } },

        { value: '2B', label: { value: 'Haute-Corse', type: 'VTL|MD' } },

        { value: '21', label: { value: 'Côte-d’Or', type: 'VTL|MD' } },

        { value: '22', label: { value: 'Côtes d’Armor', type: 'VTL|MD' } },

        { value: '23', label: { value: 'Creuse', type: 'VTL|MD' } },

        { value: '24', label: { value: 'Dordogne', type: 'VTL|MD' } },

        { value: '25', label: { value: 'Doubs', type: 'VTL|MD' } },

        { value: '26', label: { value: 'Drôme', type: 'VTL|MD' } },

        { value: '27', label: { value: 'Eure', type: 'VTL|MD' } },

        { value: '28', label: { value: 'Eure-et-Loir', type: 'VTL|MD' } },

        { value: '29', label: { value: 'Finistère', type: 'VTL|MD' } },

        { value: '30', label: { value: 'Gard', type: 'VTL|MD' } },

        { value: '31', label: { value: 'Haute-Garonne', type: 'VTL|MD' } },

        { value: '32', label: { value: 'Gers', type: 'VTL|MD' } },

        { value: '33', label: { value: 'Gironde', type: 'VTL|MD' } },

        { value: '34', label: { value: 'Hérault', type: 'VTL|MD' } },

        { value: '35', label: { value: 'Ille-et-Vilaine', type: 'VTL|MD' } },

        { value: '36', label: { value: 'Indre', type: 'VTL|MD' } },

        { value: '37', label: { value: 'Indre-et-Loire', type: 'VTL|MD' } },

        { value: '38', label: { value: 'Isère', type: 'VTL|MD' } },

        { value: '39', label: { value: 'Jura', type: 'VTL|MD' } },

        { value: '40', label: { value: 'Landes', type: 'VTL|MD' } },

        { value: '41', label: { value: 'Loir-et-Cher', type: 'VTL|MD' } },

        { value: '42', label: { value: 'Loire', type: 'VTL|MD' } },

        { value: '43', label: { value: 'Haute-Loire', type: 'VTL|MD' } },

        { value: '44', label: { value: 'Loire-Atlantique', type: 'VTL|MD' } },

        { value: '45', label: { value: 'Loiret', type: 'VTL|MD' } },

        { value: '46', label: { value: 'Lot', type: 'VTL|MD' } },

        { value: '47', label: { value: 'Lot-et-Garonne', type: 'VTL|MD' } },

        { value: '48', label: { value: 'Lozère', type: 'VTL|MD' } },

        { value: '49', label: { value: 'Maine-et-Loire', type: 'VTL|MD' } },

        { value: '50', label: { value: 'Manche', type: 'VTL|MD' } },

        { value: '51', label: { value: 'Marne', type: 'VTL|MD' } },

        { value: '52', label: { value: 'Haute-Marne', type: 'VTL|MD' } },

        { value: '53', label: { value: 'Mayenne', type: 'VTL|MD' } },

        { value: '54', label: { value: 'Meurthe-et-Moselle', type: 'VTL|MD' } },

        { value: '55', label: { value: 'Meuse', type: 'VTL|MD' } },

        { value: '56', label: { value: 'Morbihan', type: 'VTL|MD' } },

        { value: '57', label: { value: 'Moselle', type: 'VTL|MD' } },

        { value: '58', label: { value: 'Nièvre', type: 'VTL|MD' } },

        { value: '59', label: { value: 'Nord', type: 'VTL|MD' } },

        { value: '60', label: { value: 'Oise', type: 'VTL|MD' } },

        { value: '61', label: { value: 'Orne', type: 'VTL|MD' } },

        { value: '62', label: { value: 'Pas-de-Calais', type: 'VTL|MD' } },

        { value: '63', label: { value: 'Puy-de-Dôme', type: 'VTL|MD' } },

        {
          value: '64',
          label: { value: 'Pyrénées-Atlantiques', type: 'VTL|MD' },
        },

        { value: '65', label: { value: 'Hautes-Pyrénées', type: 'VTL|MD' } },

        {
          value: '66',
          label: { value: 'Pyrénées-Orientales', type: 'VTL|MD' },
        },

        { value: '67', label: { value: 'Bas-Rhin', type: 'VTL|MD' } },

        { value: '68', label: { value: 'Haut-Rhin', type: 'VTL|MD' } },

        { value: '69', label: { value: 'Rhône', type: 'VTL|MD' } },

        { value: '70', label: { value: 'Haute-Saône', type: 'VTL|MD' } },

        { value: '71', label: { value: 'Saône-et-Loire', type: 'VTL|MD' } },

        { value: '72', label: { value: 'Sarthe', type: 'VTL|MD' } },

        { value: '73', label: { value: 'Savoie', type: 'VTL|MD' } },

        { value: '74', label: { value: 'Haute-Savoie', type: 'VTL|MD' } },

        { value: '75', label: { value: 'Paris', type: 'VTL|MD' } },

        { value: '76', label: { value: 'Seine-Maritime', type: 'VTL|MD' } },

        { value: '77', label: { value: 'Seine-et-Marne', type: 'VTL|MD' } },

        { value: '78', label: { value: 'Yvelines', type: 'VTL|MD' } },

        { value: '79', label: { value: 'Deux-Sèvres', type: 'VTL|MD' } },

        { value: '80', label: { value: 'Somme', type: 'VTL|MD' } },

        { value: '81', label: { value: 'Tarn', type: 'VTL|MD' } },

        { value: '82', label: { value: 'Tarn-et-Garonne', type: 'VTL|MD' } },

        { value: '83', label: { value: 'Var', type: 'VTL|MD' } },

        { value: '84', label: { value: 'Vaucluse', type: 'VTL|MD' } },

        { value: '85', label: { value: 'Vendée', type: 'VTL|MD' } },

        { value: '86', label: { value: 'Vienne', type: 'VTL|MD' } },

        { value: '87', label: { value: 'Haute-Vienne', type: 'VTL|MD' } },

        { value: '88', label: { value: 'Vosges', type: 'VTL|MD' } },

        { value: '89', label: { value: 'Yonne', type: 'VTL|MD' } },

        {
          value: '90',
          label: { value: 'Territoire de Belfort', type: 'VTL|MD' },
        },

        { value: '91', label: { value: 'Essonne', type: 'VTL|MD' } },

        { value: '92', label: { value: 'Hauts-de-Seine', type: 'VTL|MD' } },

        { value: '93', label: { value: 'Seine-St-Denis', type: 'VTL|MD' } },

        { value: '94', label: { value: 'Val-de-Marne', type: 'VTL|MD' } },

        { value: '95', label: { value: 'Val-D’Oise', type: 'VTL|MD' } },

        { value: '971', label: { value: 'Guadeloupe', type: 'VTL|MD' } },

        { value: '972', label: { value: 'Martinique', type: 'VTL|MD' } },

        { value: '973', label: { value: 'Guyane', type: 'VTL|MD' } },

        { value: '974', label: { value: 'La Réunion', type: 'VTL|MD' } },

        { value: '976', label: { value: 'Mayotte', type: 'VTL|MD' } },
      ],
      response: { name: 'DEPNAIS' },
    },

    {
      id: 'kbwdn622',
      componentType: 'FilterDescription',
      page: '19',
      filterDescription: false,
      label: { value: 'Passez à la question 11', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'LNAIS'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbwanueu',
      componentType: 'Suggester',
      mandatory: false,
      page: '20',
      label: { value: 'Dans quel pays ?', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not((LNAIS = "1") and not ((LNAIS = "2"))))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'LNAIS'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PAYSNAIS_MISSING' },
      storeName: 'L_PAYSNAIS-1-1-0',
      bindingDependencies: ['PAYSNAIS_MISSING', 'PAYSNAIS'],
      options: [{ value: 'ESP', label: { value: 'Espagne', type: 'VTL|MD' } }],
      response: { name: 'PAYSNAIS' },
    },

    {
      id: 'kbwafrus',
      componentType: 'CheckboxGroup',
      page: '21',
      label: { value: 'Êtes-vous…', type: 'VTL|MD' },
      declarations: [
        {
          id: 'kbwafrus-kbwataew',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Plusieurs réponses possibles : par exemple, la première réponse et la troisième.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NATIO1N_MISSING' },
      bindingDependencies: [
        'NATIO1N_MISSING',
        'NATIO1N1',
        'NATIO1N2',
        'NATIO1N3',
        'NATIO1N4',
      ],
      responses: [
        {
          id: 'kbwafrus-QOP-kwmb8u5k',
          label: {
            value: 'Français(e) de naissance, y compris par réintégration',
            type: 'VTL|MD',
          },
          response: { name: 'NATIO1N1' },
        },

        {
          id: 'kbwafrus-QOP-kwmatb1k',
          label: {
            value:
              'Français(e) par naturalisation, mariage, déclaration ou option à votre majorité',
            type: 'VTL|MD',
          },
          response: { name: 'NATIO1N2' },
        },

        {
          id: 'kbwafrus-QOP-kwmb49mu',
          label: { value: 'Étranger(ère)', type: 'VTL|MD' },
          response: { name: 'NATIO1N3' },
        },

        {
          id: 'kbwafrus-QOP-kwmay4fv',
          label: { value: 'Apatride', type: 'VTL|MD' },
          response: { name: 'NATIO1N4' },
        },
      ],
    },

    {
      id: 'kbwdnlwu',
      componentType: 'FilterDescription',
      page: '21',
      filterDescription: false,
      label: {
        value:
          'Si vous avez déclaré ne pas être de nationalité étrangère, passez à la question 13.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kbwanqdo',
      componentType: 'Suggester',
      mandatory: false,
      page: '22',
      label: {
        value: '"Quelle est votre " || plusieurnatio || "nationalité ?"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(isnull(NATIO1N3)))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NATIO1N3'],
      },
      hierarchy: {
        sequence: {
          id: 'ks4qe7yy',
          page: '12',
          label: {
            value: '"IV - " || "Caractéristiques socio-démographiques"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NATIO2N_MISSING' },
      storeName: 'L_NATIONETR-1-1-0',
      bindingDependencies: ['plusieurnatio', 'NATIO2N_MISSING', 'NATIO2N'],
      options: [
        { value: 'ESP', label: { value: 'Espagnole', type: 'VTL|MD' } },
      ],
      response: { name: 'NATIO2N' },
    },

    {
      id: 'kc0h2x4z',
      componentType: 'Sequence',
      page: '23',
      label: {
        value: '"V - " || "L’équipement de votre foyer en Internet"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0h2x4z-kc0gvsub',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Abordons les questions sur l’équipement de votre foyer en Internet, quel que soit l’appareil utilisé (ordinateur fixe ou portable, tablette, téléphone mobile ou smartphone, appareils intelligents, etc.).',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h2x4z',
          page: '23',
          label: {
            value: '"V - " || "L’équipement de votre foyer en Internet"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0gq6qv',
      componentType: 'Radio',
      mandatory: true,
      page: '24',
      label: {
        value: 'Votre foyer a-t-il accès à Internet depuis son domicile ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0gq6qv-kc0h5ajs',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Y compris depuis un ordinateur portable, une tablette ou un téléphone portable.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h2x4z',
          page: '23',
          label: {
            value: '"V - " || "L’équipement de votre foyer en Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NET_MISSING' },
      bindingDependencies: ['NET_MISSING', 'NET'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'NET' },
    },

    {
      id: 'kc0s0e7f',
      componentType: 'FilterDescription',
      page: '24',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas accès à Internet depuis votre domicile, passez à la question 17.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h2x4z',
          page: '23',
          label: {
            value: '"V - " || "L’équipement de votre foyer en Internet"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kuznl5ba',
      componentType: 'CheckboxGroup',
      page: '25',
      label: { value: 'Votre connexion à Internet est-elle ?', type: 'VTL|MD' },
      declarations: [
        {
          id: 'kuznl5ba-kuzo2jh2',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NET = "2" ))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NET'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h2x4z',
          page: '23',
          label: {
            value: '"V - " || "L’équipement de votre foyer en Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_DEBITX_MISSING' },
      bindingDependencies: [
        'F_DEBITX_MISSING',
        'F_DEBITX1',
        'F_DEBITX2',
        'F_DEBITX3',
        'F_DEBITX4',
      ],
      responses: [
        {
          id: 'kuznl5ba-QOP-kwmay27w',
          label: {
            value:
              'Une connexion à haut débit au réseau fixe, par l’ADSL, le câble, la fibre optique, le Wi-Fi ou par satellite',
            type: 'VTL|MD',
          },
          response: { name: 'F_DEBITX1' },
        },

        {
          id: 'kuznl5ba-QOP-kwmav7n4',
          label: {
            value:
              'Une connexion à haut débit au réseau mobile (téléphone, tablette ou ordinateur portable) par la 3G, la 4G ou la 5G',
            type: 'VTL|MD',
          },
          response: { name: 'F_DEBITX2' },
        },

        {
          id: 'kuznl5ba-QOP-kwmap7s8',
          label: {
            value:
              'Une connexion fixe à bas débit à l’aide d’un modem (réseau téléphonique classique)',
            type: 'VTL|MD',
          },
          response: { name: 'F_DEBITX3' },
        },

        {
          id: 'kuznl5ba-QOP-kwmatmhv',
          label: {
            value:
              'Une connexion mobile à bas débit sur un téléphone portable (GSM, GPRS, EDGE)',
            type: 'VTL|MD',
          },
          response: { name: 'F_DEBITX4' },
        },
      ],
    },

    {
      id: 'kc0h9y1j',
      componentType: 'Sequence',
      page: '26',
      label: { value: '"VI - " || "Votre usage d’Internet"', type: 'VTL|MD' },
      declarations: [
        {
          id: 'kc0h9y1j-kc0hkapg',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Nous allons aborder maintenant l’usage que vous faites d’Internet. Nous nous intéressons à votre utilisation d’Internet dans tout type de lieu (à votre domicile, au travail ou autre) et sur tout type de support (ordinateurs, tablettes, smartphones, liseuses... ), même pour un usage très occasionnel.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0h7448',
      componentType: 'Radio',
      mandatory: true,
      page: '27',
      label: {
        value:
          'Personnellement, quand avez-vous utilisé Internet pour la dernière fois ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0h7448-kc0htor3',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Quel que soit le lieu ou le type d’accès.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NUSEWEB_MISSING' },
      bindingDependencies: ['NUSEWEB_MISSING', 'NUSEWEB'],
      options: [
        {
          value: '1',
          label: { value: 'Au cours des trois derniers mois', type: 'VTL|MD' },
        },

        {
          value: '2',
          label: { value: 'Entre trois mois et un an', type: 'VTL|MD' },
        },

        { value: '3', label: { value: 'Il y a plus d’un an', type: 'VTL|MD' } },

        {
          value: '4',
          label: {
            value: 'Vous n’avez jamais utilisé Internet',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'NUSEWEB' },
    },

    {
      id: 'kc0s8qyr',
      componentType: 'FilterDescription',
      page: '27',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez jamais utilisé Internet ou si vous n’avez pas utilisé Internet dans les 12 derniers mois, passez à la question 29.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0tb3as',
      componentType: 'FilterDescription',
      page: '27',
      filterDescription: false,
      label: {
        value:
          'Si votre dernière utilisation d’Internet date de 3 à 12 mois, passez à la question 22.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0haj1j',
      componentType: 'Radio',
      mandatory: false,
      page: '28',
      label: {
        value:
          'Au cours des trois derniers mois, en moyenne, à quelle fréquence avez-vous utilisé Internet ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0haj1j-kc0hqlhc',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Quel que soit le lieu ou le type d’accès.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'USEWEB_MISSING' },
      bindingDependencies: ['USEWEB_MISSING', 'USEWEB'],
      options: [
        {
          value: '1',
          label: {
            value: 'Tous les jours, plusieurs fois par jour.',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: { value: 'Tous les jours ou presque.', type: 'VTL|MD' },
        },

        {
          value: '3',
          label: {
            value: 'Au moins une fois par semaine (mais pas tous les jours).',
            type: 'VTL|MD',
          },
        },

        {
          value: '4',
          label: { value: 'Moins d’une fois par semaine.', type: 'VTL|MD' },
        },
      ],
      response: { name: 'USEWEB' },
    },

    {
      id: 'l5qro1vp',
      componentType: 'CheckboxGroup',
      page: '29',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous utilisé Internet sur les appareils suivants ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qro1vp-l5qrv1rs',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DEVICEX_MISSING' },
      bindingDependencies: [
        'DEVICEX_MISSING',
        'DEVICEX1',
        'DEVICEX2',
        'DEVICEX3',
        'DEVICEX4',
        'DEVICEX5',
      ],
      responses: [
        {
          id: 'l5qro1vp-QOP-l5qrjhl8',
          label: { value: 'Un ordinateur fixe', type: 'VTL|MD' },
          response: { name: 'DEVICEX1' },
        },

        {
          id: 'l5qro1vp-QOP-l5qrwn5r',
          label: { value: 'Un ordinateur portable', type: 'VTL|MD' },
          response: { name: 'DEVICEX2' },
        },

        {
          id: 'l5qro1vp-QOP-l5qrxyvy',
          label: { value: 'Une tablette', type: 'VTL|MD' },
          response: { name: 'DEVICEX3' },
        },

        {
          id: 'l5qro1vp-QOP-l5qrhswx',
          label: {
            value: 'Un téléphone portable ou un smartphone',
            type: 'VTL|MD',
          },
          response: { name: 'DEVICEX4' },
        },

        {
          id: 'l5qro1vp-QOP-l5qrof2b',
          label: {
            value:
              'Un autre appareil mobile (console de jeux, lecteur média, liseuse, montre ou enceintes connectées…)',
            type: 'VTL|MD',
          },
          response: { name: 'DEVICEX5' },
        },
      ],
    },

    {
      id: 'kc0hyu5k',
      componentType: 'CheckboxGroup',
      page: '30',
      label: {
        value:
          'Au cours des trois derniers mois, hors usage professionnel, avez-vous utilisé Internet (y compris via des applications) pour les activités suivantes ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0hyu5k-kc0hwdd6',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Quel que soit le lieu d’utilisation',
            type: 'VTL|MD',
          },
        },

        {
          id: 'kc0hyu5k-kc0i0z56',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PRATINTXX_MISSING' },
      bindingDependencies: [
        'PRATINTXX_MISSING',
        'PRATINTXX1',
        'PRATINTXX2',
        'PRATINTXX3',
        'PRATINTXX4',
        'PRATINTXX5',
        'PRATINTXX6',
        'PRATINTXX7',
        'PRATINTXX8',
        'PRATINTXX9',
        'PRATINTXX10',
        'PRATINTXX11',
        'PRATINTXX12',
        'PRATINTXX13',
      ],
      responses: [
        {
          id: 'kc0hyu5k-QOP-lda1fxtf',
          label: { value: 'Envoyer et recevoir des e-mails', type: 'VTL|MD' },
          response: { name: 'PRATINTXX1' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1ld98',
          label: {
            value:
              'Téléphoner (ou passer des appels vidéo) par Internet, par exemple via Skype, Messenger, WhatsApp, Facetime, Viber, Snapchat, Zoom ou Teams...',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX2' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1pon5',
          label: {
            value:
              'Créer un profil ou poster des messages sur les réseaux sociaux (Facebook, Twitter, Youtube, Instagram, Snapchat, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX3' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1j0v7',
          label: {
            value:
              'Utiliser une messagerie instantanée, c’est-à-dire échanger des messages, par exemple via Skype, Messenger, WhatsApp, Viber ou Snapchat',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX4' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1mkk4',
          label: {
            value:
              'Lire des journaux, des magazines ou consulter des sites d’actualité',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX5' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1dk3f',
          label: {
            value:
              'Rechercher des informations liées à la santé (ex : sur une maladie, des blessures, la nutrition ou l’amélioration de la santé)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX6' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1pad6',
          label: {
            value:
              'Rechercher des informations sur des produits et services (horaires de transport, catalogues en ligne, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX7' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1n4ko',
          label: {
            value:
              'Exprimer des opinions sur des questions civiques ou politiques via des sites web ou médias sociaux (Facebook, Twitter, Instagram, YouTube, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX8' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1hy1b',
          label: {
            value:
              'Participer à des consultations ou des votes en ligne sur des questions civiques ou politiques (plan d’urbanisation, signature d’une pétition, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX9' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1m40x',
          label: {
            value: 'Chercher un emploi ou postuler à un emploi',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX10' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1xirr',
          label: {
            value:
              'Vendre des produits et services sur des sites en ligne ou applications (eBay, Leboncoin, Facebook Marketplace, Vinted, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX11' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1tpx4',
          label: { value: 'Accéder à votre compte bancaire', type: 'VTL|MD' },
          response: { name: 'PRATINTXX12' },
        },

        {
          id: 'kc0hyu5k-QOP-lda1io9b',
          label: {
            value: 'Vous n’avez effectué aucune de ces activités',
            type: 'VTL|MD',
          },
          response: { name: 'PRATINTXX13' },
        },
      ],
    },

    {
      id: 'ks4tje5l',
      componentType: 'CheckboxGroup',
      page: '31',
      label: {
        value:
          'Concernant l’apprentissage par Internet (que ce soit pour un usage privé ou professionnel), au cours des trois derniers mois, avez-vous déjà personnellement effectué l’une des activités suivantes ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ks4tje5l-ks4tjwkv',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0h9y1j',
          page: '26',
          label: {
            value: '"VI - " || "Votre usage d’Internet"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'EDUPROX_MISSING' },
      bindingDependencies: [
        'EDUPROX_MISSING',
        'EDUPROX1',
        'EDUPROX2',
        'EDUPROX3',
        'EDUPROX4',
      ],
      responses: [
        {
          id: 'ks4tje5l-QOP-l5qsbjcn',
          label: { value: 'Suivre des cours en ligne', type: 'VTL|MD' },
          response: { name: 'EDUPROX1' },
        },

        {
          id: 'ks4tje5l-QOP-l5qss6oe',
          label: {
            value:
              'Utiliser des supports de formation autres que des cours en ligne (supports audiovisuels, logiciels d’apprentissage en ligne, manuels électroniques, applications d’apprentissage etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'EDUPROX2' },
        },

        {
          id: 'ks4tje5l-QOP-l5qsqkz5',
          label: {
            value:
              'Échanger avec des enseignants ou des étudiants à l’aide d’outils audio ou vidéo en ligne (Zoom, MS Teams, Google Classroom, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'EDUPROX3' },
        },

        {
          id: 'ks4tje5l-QOP-l5qsepmx',
          label: {
            value:
              'Vous n’avez pratiqué aucune activité de formation sur Internet.',
            type: 'VTL|MD',
          },
          response: { name: 'EDUPROX4' },
        },
      ],
    },

    {
      id: 'kc0i2t9p',
      componentType: 'Sequence',
      page: '32',
      label: {
        value: '"VII - " || "Votre utilisation des services administratifs"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0i2t9p-kc0ie0xd',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Poursuivons avec votre utilisation des services administratifs sur Internet, pour vous-même ou pour une autre personne, hors usage professionnel. Ces questions vous concernent même si vous n’avez pas utilisé Internet au cours de l’année.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0i0jec',
      componentType: 'CheckboxGroup',
      page: '33',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous utilisé le site Web ou l’application d’une administration ou d’un service public pour l’une des raisons suivantes ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0i0jec-kc0ik811',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Exclure les e-mails.', type: 'VTL|MD' },
        },

        {
          id: 'kc0i0jec-kc0i9s2a',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ADMX_MISSING' },
      bindingDependencies: ['ADMX_MISSING', 'ADMX1', 'ADMX2', 'ADMX3', 'ADMX4'],
      responses: [
        {
          id: 'kc0i0jec-QOP-kwmazv3k',
          label: {
            value:
              'Accéder à vos données personnelles conservées par les autorités ou les services publics (informations sur vos droits à pension, sur votre santé, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ADMX1' },
        },

        {
          id: 'kc0i0jec-QOP-kwmb4o86',
          label: {
            value:
              'Accéder à des informations dans des bases de données ou des registres publics (disponibilité de livres dans les bibliothèques, registres cadastraux, registres d’entreprises, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ADMX2' },
        },

        {
          id: 'kc0i0jec-QOP-kwmb6i3d',
          label: {
            value:
              'Obtenir des informations administratives (services, avantages, droits, articles de loi, heures d’ouverture, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ADMX3' },
        },

        {
          id: 'kc0i0jec-QOP-kwmaw31m',
          label: {
            value: 'Vous n’avez effectué aucune de ces actions.',
            type: 'VTL|MD',
          },
          response: { name: 'ADMX4' },
        },
      ],
    },

    {
      id: 'ks5vgahz',
      componentType: 'Radio',
      mandatory: false,
      page: '34',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous téléchargé ou imprimé des formulaires officiels depuis le site Web ou l’application d’une administration ou d’un service public ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'IMPADM_MISSING' },
      bindingDependencies: ['IMPADM_MISSING', 'IMPADM'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'IMPADM' },
    },

    {
      id: 'ks5vqq6b',
      componentType: 'Radio',
      mandatory: false,
      page: '35',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous pris un rendez-vous ou effectué une réservation via un site Web ou une application auprès d’une administration ou d’un service public (réservation d’un livre dans une bibliothèque municipale, rendez-vous en mairie, en préfecture, à l’hôpital public, etc.) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'RDVADM_MISSING' },
      bindingDependencies: ['RDVADM_MISSING', 'RDVADM'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'RDVADM' },
    },

    {
      id: 'ks5vhf4w',
      componentType: 'Radio',
      mandatory: false,
      page: '36',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous reçu des messages ou documents officiels des autorités publiques via votre compte sur le site Web ou l’application d’une administration ou d’un service public (notification d’amendes ou de factures, lettres, convocation au tribunal, documents judiciaires, etc.) ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ks5vhf4w-kwmchqix',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Exclure les messages automatiques de notification qu’un document est disponible.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'MESADM_MISSING' },
      bindingDependencies: ['MESADM_MISSING', 'MESADM'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'MESADM' },
    },

    {
      id: 'ks5vgp57',
      componentType: 'Radio',
      mandatory: false,
      page: '37',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous déclaré vos impôts via un site Web ou une application ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DECLADMX_MISSING' },
      bindingDependencies: ['DECLADMX_MISSING', 'DECLADMX'],
      options: [
        {
          value: '1',
          label: {
            value: 'Oui, j’ai renseigné moi-même ma déclaration',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value:
              'Oui, j’ai corrigé ou complété ma déclaration pré-remplie (par l’administration fiscale, l’employeur ou une autre autorité)',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: {
            value:
              'Non, la déclaration a été renseignée et validée automatiquement (par l’administration fiscale, l’employeur ou une autre autorité)',
            type: 'VTL|MD',
          },
        },

        {
          value: '4',
          label: {
            value:
              'Non, je l’ai remise à l’administration fiscale sous un format papier',
            type: 'VTL|MD',
          },
        },

        {
          value: '5',
          label: {
            value:
              'Non, quelqu’un l’a fait en mon nom (un membre de la famille, un conseiller fiscal)',
            type: 'VTL|MD',
          },
        },

        {
          value: '6',
          label: {
            value: 'Non, pour une autre raison (non imposable, etc.)',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'DECLADMX' },
    },

    {
      id: 'ks5vdqs4',
      componentType: 'CheckboxGroup',
      page: '38',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous effectué l’une des actions suivantes via le site Web ou l’application d’une administration ou d’un service public ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ks5vdqs4-ks5vrixr',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'RAIADMX_MISSING' },
      bindingDependencies: [
        'RAIADMX_MISSING',
        'RAIADMX1',
        'RAIADMX2',
        'RAIADMX3',
        'RAIADMX4',
      ],
      responses: [
        {
          id: 'ks5vdqs4-QOP-l5qsic6y',
          label: {
            value:
              'Demander des documents officiels ou des certificats (diplôme, acte de naissance, de mariage ou de décès, certificat de divorce, attestation de domicile, extrait du casier judiciaire, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'RAIADMX1' },
        },

        {
          id: 'ks5vdqs4-QOP-l5qs9n5l',
          label: {
            value:
              'Demander des prestations ou des droits (pension de retraite, chômage, allocations familiales, inscription à l’école ou l’université, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'RAIADMX2' },
        },

        {
          id: 'ks5vdqs4-QOP-l5qsrxdz',
          label: {
            value:
              'Formuler d’autres demandes, réclamations ou plaintes (signaler un vol à la police, déposer plainte devant la Justice, demander une aide juridique, engager une procédure civile devant un tribunal, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'RAIADMX3' },
        },

        {
          id: 'ks5vdqs4-QOP-l5qsc84x',
          label: {
            value: 'Vous n’avez effectué aucune de ces actions',
            type: 'VTL|MD',
          },
          response: { name: 'RAIADMX4' },
        },
      ],
    },

    {
      id: 'kwmcjtzx',
      componentType: 'FilterDescription',
      page: '38',
      filterDescription: false,
      label: {
        value:
          'Si l’une des demandes précédentes a été formulée, passez à la question 29.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'NUSEWEB'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'ks5vnmgt',
      componentType: 'CheckboxGroup',
      page: '39',
      label: {
        value:
          'Pour quelles raisons n’avez-vous pas demandé de documents officiels ni fait de demande à une administration ou un service public par Internet au cours des douze derniers mois ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ks5vnmgt-ks5vxjm4',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="")) and (not(nvl(RAIADMX1,false)=true or nvl(RAIADMX2,false)=true or nvl(RAIADMX3,false)=true))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'RAIADMX1',
          'RAIADMX2',
          'RAIADMX3',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DEMADMX_MISSING' },
      bindingDependencies: [
        'DEMADMX_MISSING',
        'DEMADMX1',
        'DEMADMX2',
        'DEMADMX3',
        'DEMADMX4',
        'DEMADMX5',
      ],
      responses: [
        {
          id: 'ks5vnmgt-QOP-kwmcigfw',
          label: {
            value:
              'Vous n’avez pas eu besoin de demander de document ni de faire de réclamation',
            type: 'VTL|MD',
          },
          response: { name: 'DEMADMX1' },
        },

        {
          id: 'ks5vnmgt-QOP-kwmckybs',
          label: {
            value:
              'Vous manquez de compétence ou de connaissance (vous ne saviez pas comment vous servir du site Web ou il était trop compliqué à utiliser)',
            type: 'VTL|MD',
          },
          response: { name: 'DEMADMX2' },
        },

        {
          id: 'ks5vnmgt-QOP-kwmckiz6',
          label: {
            value:
              'Vous avez des inquiétudes concernant la sécurité de vos données personnelles ou vous refusez de payer en ligne (crainte d’une fraude à la carte bancaire, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'DEMADMX3' },
        },

        {
          id: 'ks5vnmgt-QOP-kwmcylnt',
          label: {
            value:
              'Une autre personne l’a fait en votre nom (un conseiller, un parent, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'DEMADMX4' },
        },

        {
          id: 'ks5vnmgt-QOP-kwmcs5mx',
          label: { value: 'Pour une autre raison', type: 'VTL|MD' },
          response: { name: 'DEMADMX5' },
        },
      ],
    },

    {
      id: 'kc0i7d8t',
      componentType: 'CheckboxGroup',
      page: '40',
      label: {
        value:
          'Au cours des douze derniers mois, avez-vous demandé de l’aide pour effectuer une démarche administrative sur Internet (par exemple pour prendre un RDV, obtenir une information, faire une demande de droit, toucher une allocation ou une prestation sociale, accéder à un compte personnel, etc. ) ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0i7d8t-kc0is7qk',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_AIDADMX_MISSING' },
      bindingDependencies: [
        'F_AIDADMX_MISSING',
        'F_AIDADMX1',
        'F_AIDADMX2',
        'F_AIDADMX3',
        'F_AIDADMX4',
        'F_AIDADMX5',
      ],
      responses: [
        {
          id: 'kc0i7d8t-QOP-lda1oc8w',
          label: {
            value: 'Oui, auprès de ma famille, d’amis ou de voisins',
            type: 'VTL|MD',
          },
          response: { name: 'F_AIDADMX1' },
        },

        {
          id: 'kc0i7d8t-QOP-lda1dru4',
          label: {
            value:
              'Oui, auprès d’un agent de l’administration (France Services, agents de mairie…)',
            type: 'VTL|MD',
          },
          response: { name: 'F_AIDADMX2' },
        },

        {
          id: 'kc0i7d8t-QOP-lda1e85n',
          label: {
            value: 'Oui, auprès d’un travailleur social ou d’une association',
            type: 'VTL|MD',
          },
          response: { name: 'F_AIDADMX3' },
        },

        {
          id: 'kc0i7d8t-QOP-lda1mm18',
          label: { value: 'Oui, auprès d’une autre personne', type: 'VTL|MD' },
          response: { name: 'F_AIDADMX4' },
        },

        {
          id: 'kc0i7d8t-QOP-lda1kwag',
          label: { value: 'Non', type: 'VTL|MD' },
          response: { name: 'F_AIDADMX5' },
        },
      ],
    },

    {
      id: 'kc0is12p',
      componentType: 'CheckboxGroup',
      page: '41',
      label: {
        value:
          'Au cours des douze derniers mois, avez-vous renoncé à faire des démarches administratives sur Internet ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0is12p-l5qshzbr',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Un refus de l’administration à l’issue d’une démarche ne compte pas comme un renoncement à cette démarche.',
            type: 'VTL|MD',
          },
        },

        {
          id: 'kc0is12p-lda0vuce',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_RENADMX_MISSING' },
      bindingDependencies: [
        'F_RENADMX_MISSING',
        'F_RENADMX1',
        'F_RENADMX2',
        'F_RENADMX3',
        'F_RENADMX4',
        'F_RENADMX5',
        'F_RENADMX6',
        'F_RENADMX7',
        'F_RENADMX8',
        'F_RENADMX9',
      ],
      responses: [
        {
          id: 'kc0is12p-QOP-l5qsr5vo',
          label: {
            value: 'Oui, car le site Internet était en panne ou bloquait',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX1' },
        },

        {
          id: 'kc0is12p-QOP-l5qsgsly',
          label: {
            value:
              'Oui, car je n’ai pas eu accès à un ordinateur ou à Internet',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX2' },
        },

        {
          id: 'kc0is12p-QOP-l5qsm2gh',
          label: {
            value:
              'Oui, car je n’ai pas pu demander ou obtenir de l’aide auprès de mon entourage',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX3' },
        },

        {
          id: 'kc0is12p-QOP-l5qsyby7',
          label: {
            value: 'Oui, car l’administration n’a pas répondu à mes questions',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX4' },
        },

        {
          id: 'kc0is12p-QOP-l5qsshvt',
          label: {
            value: 'Oui, je n’ai même pas essayé car je m’en sentais incapable',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX5' },
        },

        {
          id: 'kc0is12p-QOP-l5qsrllz',
          label: {
            value:
              'Oui, car cela n’en valait pas la peine (inutile, gain attendu trop faible)',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX6' },
        },

        {
          id: 'kc0is12p-QOP-l5qsuktj',
          label: {
            value:
              'Oui, car les démarches étaient trop complexes (trop de pièces justificatives, procédure longue)',
            type: 'VTL|MD',
          },
          response: { name: 'F_RENADMX7' },
        },

        {
          id: 'kc0is12p-QOP-l5qshfk9',
          label: { value: 'Oui, pour une autre raison', type: 'VTL|MD' },
          response: { name: 'F_RENADMX8' },
        },

        {
          id: 'kc0is12p-QOP-l5qsvqkb',
          label: { value: 'Non', type: 'VTL|MD' },
          response: { name: 'F_RENADMX9' },
        },
      ],
    },

    {
      id: 'kc0tpgsj',
      componentType: 'FilterDescription',
      page: '41',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas renoncé à faire des démarches en ligne et que vous avez utilisé Internet dans les 12 derniers mois, passez à la question 32.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kebbvyk4',
      componentType: 'FilterDescription',
      page: '41',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas accédé à Internet au cours de l’année, passez à la question 58.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0iso1a',
      componentType: 'Radio',
      mandatory: false,
      page: '42',
      label: {
        value:
          'Avez-vous pu effectuer ces démarches d’une autre façon (sur place, par téléphone, etc.) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_AUTADM_MISSING' },
      bindingDependencies: ['F_AUTADM_MISSING', 'F_AUTADM'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'F_AUTADM' },
    },

    {
      id: 'kc0u0vjt',
      componentType: 'FilterDescription',
      page: '42',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas accédé à Internet au cours de l’année, passez à la question 58.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0i2t9p',
          page: '32',
          label: {
            value:
              '"VII - " || "Votre utilisation des services administratifs"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qsdqfp',
      componentType: 'Sequence',
      page: '43',
      label: {
        value:
          '"VIII - " || "Votre utilisation de l’identification électronique"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qsdqfp-l5qspprb',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Nous abordons maintenant votre utilisation de l’identification électronique avancée (eID). L’identification électronique avancée permet d’identifier sans aucun doute possible et de manière unique une personne pour qu’elle accède de façon sécurisée à des services en ligne. Il s’agit par exemple d’une signature en ligne avec envoi d’une copie de document d’identité.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qtic0h',
      componentType: 'Radio',
      mandatory: false,
      page: '44',
      label: {
        value:
          'Au cours des douze derniers mois, hors usage professionnel, avez-vous utilisé une identification électronique pour accéder à un service en ligne (impots.gouv.fr, AMELI, L’Identitié numérique La Poste, FranceConnect, etc.) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'IDUSE_MISSING' },
      bindingDependencies: ['IDUSE_MISSING', 'IDUSE'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'IDUSE' },
    },

    {
      id: 'latwnbq0',
      componentType: 'FilterDescription',
      page: '44',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas utilisé d’identification électronique, passez à la question 34.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qtwn7l',
      componentType: 'CheckboxGroup',
      page: '45',
      label: {
        value:
          'Pour quels types de services en ligne avez-vous utilisé votre identification électronique au cours des 12 derniers mois ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qtwn7l-l5qtvdfr',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)))) and (not(IDUSE = "2" or isnull(IDUSE)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'IDUSE',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'IDTYPEX_MISSING' },
      bindingDependencies: [
        'IDTYPEX_MISSING',
        'IDTYPEX1',
        'IDTYPEX2',
        'IDTYPEX3',
      ],
      responses: [
        {
          id: 'l5qtwn7l-QOP-l5qu1ybb',
          label: {
            value:
              'Des services fournis par les autorités ou les services publics français (pour déclarer vos impôts, demander des prestations sociales, demander des documents officiels, accéder à vos données de santé...)',
            type: 'VTL|MD',
          },
          response: { name: 'IDTYPEX1' },
        },

        {
          id: 'l5qtwn7l-QOP-l5qtvt42',
          label: {
            value:
              'Des services fournis par les autorités ou les services publics d’autres pays européens (pour déclarer vos impôts, demander des documents ou des certificats...)',
            type: 'VTL|MD',
          },
          response: { name: 'IDTYPEX2' },
        },

        {
          id: 'l5qtwn7l-QOP-l5qtucq5',
          label: {
            value:
              'Des services fournis par le secteur privé (banques, assurances, notaires...)',
            type: 'VTL|MD',
          },
          response: { name: 'IDTYPEX3' },
        },
      ],
    },

    {
      id: 'l5qty2kg',
      componentType: 'FilterDescription',
      page: '45',
      filterDescription: false,
      label: { value: 'Passez à la question 35.', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)))) and (not(IDUSE = "2" or isnull(IDUSE)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'IDUSE',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qu75nv',
      componentType: 'CheckboxGroup',
      page: '46',
      label: {
        value:
          'Pour quelles raisons n’avez-vous pas utilisé une identification électronique au cours des 12 derniers mois ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qu75nv-l5qu66vt',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)))) and (not((IDUSE="1") and not ((IDUSE = "2" or isnull(IDUSE)))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'IDUSE',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsdqfp',
          page: '43',
          label: {
            value:
              '"VIII - " || "Votre utilisation de l’identification électronique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'IDNOX_MISSING' },
      bindingDependencies: [
        'IDNOX_MISSING',
        'IDNOX1',
        'IDNOX2',
        'IDNOX3',
        'IDNOX4',
        'IDNOX5',
        'IDNOX6',
        'IDNOX7',
      ],
      responses: [
        {
          id: 'l5qu75nv-QOP-l5qu4lpe',
          label: {
            value:
              'Je ne connaissais pas l’existence de l’identification électronique',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX1' },
        },

        {
          id: 'l5qu75nv-QOP-l5quna8x',
          label: {
            value:
              'Je n’ai pas créé de compte sur les sites permettant une identification électronique',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX2' },
        },

        {
          id: 'l5qu75nv-QOP-l5qu5q6q',
          label: {
            value:
              'Je n’ai pas eu besoin d’accéder à un service en ligne nécessitant une identification électronique',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX3' },
        },

        {
          id: 'l5qu75nv-QOP-l5qu7oab',
          label: {
            value:
              'J’ai une identification électronique mais je ne me sens pas suffisamment protégé(e) lorsque je l’utilise (craintes liées à la sécurité, à la protection des données personnelles)',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX4' },
        },

        {
          id: 'l5qu75nv-QOP-l5qujlj5',
          label: {
            value:
              'Je n’ai pas pu utiliser mon identification électronique en raison de problèmes techniques ou de fonctionnalité (processus trop complexe ou pas assez intuitif, manque d’un lecteur de carte approprié, incompatibilité logicielle, refus de mon eID par le(s) service(s) dont j’avais besoin)',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX5' },
        },

        {
          id: 'l5qu75nv-QOP-l5qu3ylv',
          label: {
            value:
              'Je n’ai pas pu utiliser mon identification électronique pour accéder au service via un smartphone ou une tablette',
            type: 'VTL|MD',
          },
          response: { name: 'IDNOX6' },
        },

        {
          id: 'l5qu75nv-QOP-l5quinuj',
          label: { value: 'Pour une autre raison', type: 'VTL|MD' },
          response: { name: 'IDNOX7' },
        },
      ],
    },

    {
      id: 'kc0ir8tk',
      componentType: 'Sequence',
      page: '47',
      label: {
        value: '"IX - " || "Vos habitudes de consommation sur Internet "',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0ir8tk-kc0ixcd2',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Abordons les questions concernant vos achats ou commandes sur Internet à titre privé, c’est-à-dire pour votre usage ou celui d’une tierce personne mais hors usage professionnel.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0iuqho',
      componentType: 'Radio',
      mandatory: false,
      page: '48',
      label: {
        value:
          'Personnellement, quand avez-vous pour la dernière fois acheté ou commandé des produits ou des services sur Internet pour un usage privé (c’est-à-dire hors usage professionnel) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DATECOM_MISSING' },
      bindingDependencies: ['DATECOM_MISSING', 'DATECOM'],
      options: [
        {
          value: '1',
          label: { value: 'Au cours des trois derniers mois', type: 'VTL|MD' },
        },

        {
          value: '2',
          label: { value: 'Entre trois mois et un an', type: 'VTL|MD' },
        },

        { value: '3', label: { value: 'Il y a plus d’un an', type: 'VTL|MD' } },

        {
          value: '4',
          label: {
            value: 'Vous n’avez jamais acheté ou commandé sur Internet.',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'DATECOM' },
    },

    {
      id: 'kc0ulekq',
      componentType: 'FilterDescription',
      page: '48',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas acheté sur Internet au cours des trois derniers mois, passez à la question 45.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0ijn79',
      componentType: 'CheckboxGroup',
      page: '49',
      label: {
        value:
          'Au cours des trois derniers mois, hors usage professionnel, avez-vous personnellement acheté ou commandé sur Internet ou via une application les biens ou services suivants ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0ijn79-kc0ivga8',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Inclure les articles de seconde main.',
            type: 'VTL|MD',
          },
        },

        {
          id: 'kc0ijn79-kc0ipy1a',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ACHATXX_MISSING' },
      bindingDependencies: [
        'ACHATXX_MISSING',
        'ACHATXX1',
        'ACHATXX2',
        'ACHATXX3',
        'ACHATXX4',
        'ACHATXX5',
        'ACHATXX6',
        'ACHATXX7',
        'ACHATXX8',
        'ACHATXX9',
        'ACHATXX10',
        'ACHATXX11',
        'ACHATXX12',
        'ACHATXX13',
        'ACHATXX14',
        'ACHATXX15',
        'ACHATXX16',
      ],
      responses: [
        {
          id: 'kc0ijn79-QOP-kwupeu2i',
          label: {
            value:
              'Des vêtements (y compris vêtements de sport), chaussures ou accessoires (sacs, bijoux, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX1' },
        },

        {
          id: 'kc0ijn79-QOP-kwupe2qk',
          label: {
            value: 'Des articles de sport (hors vêtements)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX2' },
        },

        {
          id: 'kc0ijn79-QOP-kwupg7jl',
          label: {
            value:
              'Des jouets ou des articles pour enfants (couches, biberons, poussettes, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX3' },
        },

        {
          id: 'kc0ijn79-QOP-kwupe8bt',
          label: {
            value:
              'Des meubles, accessoires pour la maison (tapis, rideaux, etc.) ou des articles de jardinage (outils, plantes, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX4' },
        },

        {
          id: 'kc0ijn79-QOP-kwupebf0',
          label: { value: 'De la musique (CD, vinyles, etc.)', type: 'VTL|MD' },
          response: { name: 'ACHATXX5' },
        },

        {
          id: 'kc0ijn79-QOP-kwup8d0x',
          label: {
            value: 'Des films ou séries (DVD, Blu-Ray, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX6' },
        },

        {
          id: 'kc0ijn79-QOP-kwupc7rg',
          label: {
            value: 'Des livres, magazines ou journaux papier',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX7' },
        },

        {
          id: 'kc0ijn79-QOP-kwup7ypp',
          label: {
            value:
              'Des ordinateurs, tablettes, téléphones mobiles ou accessoires informatiques',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX8' },
        },

        {
          id: 'kc0ijn79-QOP-kwupano6',
          label: {
            value:
              'Des appareils électroniques (téléviseurs, chaînes stéréo, appareils photos, etc.) ou des appareils électroménagers (machine à laver, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX9' },
        },

        {
          id: 'kc0ijn79-QOP-kwupoumf',
          label: {
            value:
              'Des médicaments ou des compléments alimentaires (hors renouvellement d’ordonnance en ligne)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX10' },
        },

        {
          id: 'kc0ijn79-QOP-kwupgv2m',
          label: {
            value:
              'Des plats livrés à domicile (via Just Eat, Deliveroo, UberEats, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX11' },
        },

        {
          id: 'kc0ijn79-QOP-kwupan7f',
          label: {
            value:
              'Des produits alimentaires (y compris drive et kits-repas à cuisiner)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX12' },
        },

        {
          id: 'kc0ijn79-QOP-kwupnha4',
          label: {
            value: 'Des cosmétiques, des articles de beauté ou de bien-être',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX13' },
        },

        {
          id: 'kc0ijn79-QOP-kwupkctn',
          label: {
            value:
              'Des produits de nettoyage ou d’hygiène corporelle (brosses à dents, mouchoirs, produits de lessive, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX14' },
        },

        {
          id: 'kc0ijn79-QOP-kwupng9b',
          label: {
            value:
              'Des vélos, motos, voitures ou d’autres véhicules ou leurs pièces détachées',
            type: 'VTL|MD',
          },
          response: { name: 'ACHATXX15' },
        },

        {
          id: 'kc0ijn79-QOP-kwup636i',
          label: { value: 'D’autres articles', type: 'VTL|MD' },
          response: { name: 'ACHATXX16' },
        },
      ],
    },

    {
      id: 'kc0iq8u1',
      componentType: 'CheckboxGroup',
      page: '50',
      label: {
        value:
          'Auprès de qui avez-vous effectué ces achats au cours des trois derniers mois ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0iq8u1-kc0isx9s',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ORIGINEX_MISSING' },
      bindingDependencies: [
        'ORIGINEX_MISSING',
        'ORIGINEX1',
        'ORIGINEX2',
        'ORIGINEX3',
        'ORIGINEX4',
      ],
      responses: [
        {
          id: 'kc0iq8u1-QOP-kwup9an5',
          label: { value: 'Des vendeurs français', type: 'VTL|MD' },
          response: { name: 'ORIGINEX1' },
        },

        {
          id: 'kc0iq8u1-QOP-kwup5x5h',
          label: {
            value: 'Des vendeurs d’autres pays de l’Union européenne',
            type: 'VTL|MD',
          },
          response: { name: 'ORIGINEX2' },
        },

        {
          id: 'kc0iq8u1-QOP-kwupi7sb',
          label: { value: 'Des vendeurs du reste du monde', type: 'VTL|MD' },
          response: { name: 'ORIGINEX3' },
        },

        {
          id: 'kc0iq8u1-QOP-kwup93wt',
          label: {
            value: 'Des vendeurs dont vous ne connaissez pas le pays d’origine',
            type: 'VTL|MD',
          },
          response: { name: 'ORIGINEX4' },
        },
      ],
    },

    {
      id: 'kc0jc05z',
      componentType: 'Radio',
      mandatory: false,
      page: '51',
      label: {
        value:
          'Avez-vous acheté certains de ces produits auprès de particuliers sur Internet ou via une application (LeBonCoin, Vinted, eBay, Facebook Marketplace, etc.) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PARTACHA_MISSING' },
      bindingDependencies: ['PARTACHA_MISSING', 'PARTACHA'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'PARTACHA' },
    },

    {
      id: 'kc0jcnvt',
      componentType: 'CheckboxGroup',
      page: '52',
      label: {
        value:
          'Au cours des trois derniers mois, hors usage professionnel, avez-vous souscrit à un abonnement ou téléchargé un des produits suivants sur Internet ou via une application ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0jcnvt-kc0j9km0',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NUMACHAX_MISSING' },
      bindingDependencies: [
        'NUMACHAX_MISSING',
        'NUMACHAX1',
        'NUMACHAX2',
        'NUMACHAX3',
        'NUMACHAX4',
        'NUMACHAX5',
        'NUMACHAX6',
        'NUMACHAX7',
        'NUMACHAX8',
      ],
      responses: [
        {
          id: 'kc0jcnvt-QOP-kisptdmr',
          label: {
            value: 'De la musique (streaming ou téléchargements)',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX1' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq3jjm',
          label: {
            value: 'Des films ou séries (streaming ou téléchargements)',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX2' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq29q2',
          label: {
            value:
              'Des livres électroniques, des magazines ou des journaux en ligne',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX3' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq5wld',
          label: {
            value:
              'Des jeux (en ligne ou téléchargés, sur smartphones, tablettes, ordinateurs ou consoles)',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX4' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq1igi',
          label: {
            value: 'Des logiciels téléchargés, y compris les mises à jour',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX5' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq1y9v',
          label: {
            value:
              'Des applications payantes liées à la santé ou à la forme physique',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX6' },
        },

        {
          id: 'kc0jcnvt-QOP-kispvqo8',
          label: {
            value:
              'D’autres applications payantes (apprentissage de langues, voyages, météo, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'NUMACHAX7' },
        },

        {
          id: 'kc0jcnvt-QOP-kisq4lwf',
          label: { value: 'Aucun de ces produits', type: 'VTL|MD' },
          response: { name: 'NUMACHAX8' },
        },
      ],
    },

    {
      id: 'kc0ix4pz',
      componentType: 'CheckboxGroup',
      page: '53',
      label: {
        value:
          'Au cours des trois derniers mois, hors usage professionnel, avez-vous acheté sur un site Internet ou via une application un des produits suivants ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0ix4pz-kc0jflg6',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'SERVACHAX_MISSING' },
      bindingDependencies: [
        'SERVACHAX_MISSING',
        'SERVACHAX1',
        'SERVACHAX2',
        'SERVACHAX3',
        'SERVACHAX4',
        'SERVACHAX5',
        'SERVACHAX6',
      ],
      responses: [
        {
          id: 'kc0ix4pz-QOP-kwupcje9',
          label: {
            value: 'Des billets pour des manifestations sportives',
            type: 'VTL|MD',
          },
          response: { name: 'SERVACHAX1' },
        },

        {
          id: 'kc0ix4pz-QOP-kwuprbuy',
          label: {
            value:
              'Des billets pour des manifestations culturelles ou autres (cinéma, concerts, foires, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'SERVACHAX2' },
        },

        {
          id: 'kc0ix4pz-QOP-kwupgqfz',
          label: {
            value: 'Un abonnement à Internet ou de téléphonie mobile',
            type: 'VTL|MD',
          },
          response: { name: 'SERVACHAX3' },
        },

        {
          id: 'kc0ix4pz-QOP-kwuped2p',
          label: {
            value:
              'Une souscription à un contrat d’abonnement en électricité, eau ou chauffage, services d’élimination de déchets ou services similaires',
            type: 'VTL|MD',
          },
          response: { name: 'SERVACHAX4' },
        },

        {
          id: 'kc0ix4pz-QOP-kwup9bch',
          label: {
            value:
              'Des services domestiques (ménage, garde d’enfants, bricolage ou jardinage) y compris proposés par des particuliers (Facebook Marketplace, LeBonCoin, Youpijob, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'SERVACHAX5' },
        },

        {
          id: 'kc0ix4pz-QOP-kwuplm4q',
          label: { value: 'Aucun de ces produits', type: 'VTL|MD' },
          response: { name: 'SERVACHAX6' },
        },
      ],
    },

    {
      id: 'kc0jjdn7',
      componentType: 'CheckboxGroup',
      page: '54',
      label: {
        value:
          'Au cours des trois derniers mois, à titre privé, avez-vous fait appel à un service de transport via un site Web ou une application ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0jjdn7-kc0j5qds',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'SHARTX_MISSING' },
      bindingDependencies: ['SHARTX_MISSING', 'SHARTX1', 'SHARTX2', 'SHARTX3'],
      responses: [
        {
          id: 'kc0jjdn7-QOP-kispuav9',
          label: {
            value:
              'Oui, auprès d’une entreprise de transport telle que la compagnie de bus local, train, avion, taxi (SNCF, Uber, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'SHARTX1' },
        },

        {
          id: 'kc0jjdn7-QOP-kisptbjd',
          label: {
            value: 'Oui, auprès d’un particulier (Blablacar, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'SHARTX2' },
        },

        {
          id: 'kc0jjdn7-QOP-kisprnk4',
          label: { value: 'Non', type: 'VTL|MD' },
          response: { name: 'SHARTX3' },
        },
      ],
    },

    {
      id: 'kc0ja8z6',
      componentType: 'CheckboxGroup',
      page: '55',
      label: {
        value:
          'Au cours des trois derniers mois, à titre privé, avez-vous loué un logement via un site web ou une application ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0ja8z6-kc0jfsm5',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'SHARAX_MISSING' },
      bindingDependencies: ['SHARAX_MISSING', 'SHARAX1', 'SHARAX2', 'SHARAX3'],
      responses: [
        {
          id: 'kc0ja8z6-QOP-kispz15e',
          label: {
            value:
              'Oui, auprès d’entreprises telles que les hôtels ou les agences de voyages',
            type: 'VTL|MD',
          },
          response: { name: 'SHARAX1' },
        },

        {
          id: 'kc0ja8z6-QOP-kispo7ut',
          label: {
            value: 'Oui, auprès d’un particulier (Airbnb, PAP vacances, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'SHARAX2' },
        },

        {
          id: 'kc0ja8z6-QOP-kisq2k00',
          label: { value: 'Non', type: 'VTL|MD' },
          response: { name: 'SHARAX3' },
        },
      ],
    },

    {
      id: 'l5quauoy',
      componentType: 'Radio',
      mandatory: false,
      page: '56',
      label: {
        value:
          'Au cours des trois derniers mois, combien de fois avez-vous acheté des produits ou des services à titre privé sur Internet ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NBCOM_MISSING' },
      bindingDependencies: ['NBCOM_MISSING', 'NBCOM'],
      options: [
        { value: '1', label: { value: '"1 à 2 fois" || ""', type: 'VTL|MD' } },

        { value: '2', label: { value: '"3 à 5 fois" || ""', type: 'VTL|MD' } },

        { value: '3', label: { value: '"6 à 10 fois" || ""', type: 'VTL|MD' } },

        { value: '4', label: { value: 'Plus de 10 fois', type: 'VTL|MD' } },
      ],
      response: { name: 'NBCOM' },
    },

    {
      id: 'l5qu845k',
      componentType: 'CheckboxGroup',
      page: '57',
      label: {
        value:
          'Au cours des trois derniers mois, lors de vos achats ou commandes sur internet ou via une application, avez-vous rencontré les problèmes suivants ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qu845k-l5qudlb9',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'DATECOM',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PBACHAXX_MISSING' },
      bindingDependencies: [
        'PBACHAXX_MISSING',
        'PBACHAXX1',
        'PBACHAXX2',
        'PBACHAXX3',
        'PBACHAXX4',
        'PBACHAXX5',
        'PBACHAXX6',
        'PBACHAXX7',
        'PBACHAXX8',
        'PBACHAXX9',
        'PBACHAXX10',
      ],
      responses: [
        {
          id: 'l5qu845k-QOP-l5queeax',
          label: {
            value:
              'Un site web difficile à utiliser ou fonctionnant de manière insatisfaisante (trop compliqué, confus, fonctionnait mal techniquement, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX1' },
        },

        {
          id: 'l5qu845k-QOP-l5quacpu',
          label: {
            value:
              'Des difficultés à trouver les informations concernant les conditions générales de vente ',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX2' },
        },

        {
          id: 'l5qu845k-QOP-l5qu4w6x',
          label: {
            value: 'Une livraison plus longue que prévu',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX3' },
        },

        {
          id: 'l5qu845k-QOP-l5qumvxp',
          label: {
            value:
              'Un coût plus élevé que prévu (frais de livraison inattendus, frais de garantie injustifiés, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX4' },
        },

        {
          id: 'l5qu845k-QOP-l5qu500v',
          label: {
            value:
              'Une erreur sur le produit ou service, ou un produit endommagé',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX5' },
        },

        {
          id: 'l5qu845k-QOP-l5qu6awx',
          label: {
            value:
              'Une fraude (produit non reçu, utilisation abusive des données de votre carte bancaire, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX6' },
        },

        {
          id: 'l5qu845k-QOP-l5quf2b4',
          label: {
            value:
              'Des réclamations et recours difficiles ou une absence de réponse satisfaisante après recours',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX7' },
        },

        {
          id: 'l5qu845k-QOP-l5qujg2p',
          label: {
            value: 'Un fournisseur étranger ne vendant pas en France',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX8' },
        },

        {
          id: 'l5qu845k-QOP-l5quaguo',
          label: { value: 'Un autre problème', type: 'VTL|MD' },
          response: { name: 'PBACHAXX9' },
        },

        {
          id: 'l5qu845k-QOP-l5qukar0',
          label: {
            value: 'Vous n’avez pas rencontré de problème',
            type: 'VTL|MD',
          },
          response: { name: 'PBACHAXX10' },
        },
      ],
    },

    {
      id: 'kc0juxed',
      componentType: 'CheckboxGroup',
      page: '58',
      label: {
        value:
          'Au cours des trois derniers mois, dans un but privé, avez-vous effectué les activités financières suivantes sur un site Internet ou une application :',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0juxed-kc0jlwsz',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'FINANCEX_MISSING' },
      bindingDependencies: [
        'FINANCEX_MISSING',
        'FINANCEX1',
        'FINANCEX2',
        'FINANCEX3',
        'FINANCEX4',
      ],
      responses: [
        {
          id: 'kc0juxed-QOP-kwupchpe',
          label: {
            value:
              'Souscrire à une assurance (y compris une assurance voyage lors de l’achat d’un billet d’avion).',
            type: 'VTL|MD',
          },
          response: { name: 'FINANCEX1' },
        },

        {
          id: 'kc0juxed-QOP-kwupd9tf',
          label: {
            value:
              'Contracter un prêt, une hypothèque ou un emprunt auprès d’une banque ou d’un autre fournisseur financier',
            type: 'VTL|MD',
          },
          response: { name: 'FINANCEX2' },
        },

        {
          id: 'kc0juxed-QOP-kwupqb7v',
          label: {
            value:
              'Acheter ou vendre des actions, obligations, parts de fonds de placement ou d’autres actifs financiers',
            type: 'VTL|MD',
          },
          response: { name: 'FINANCEX3' },
        },

        {
          id: 'kc0juxed-QOP-kwupdwz9',
          label: {
            value: 'Aucune de ces activités financières',
            type: 'VTL|MD',
          },
          response: { name: 'FINANCEX4' },
        },
      ],
    },

    {
      id: 'kc1x9j53',
      componentType: 'FilterDescription',
      page: '58',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas accédé à Internet au cours des trois derniers mois, passez à la question 58.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0ir8tk',
          page: '47',
          label: {
            value: '"IX - " || "Vos habitudes de consommation sur Internet "',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qt5sgw',
      componentType: 'Sequence',
      page: '59',
      label: {
        value: '"X - " || "Vos compétences en informatique"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qt5sgw-l5qt59cv',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Nous arrivons aux questions sur vos compétences liées à l’informatique et aux technologies mobiles. Les questions concernent les activités menées à des fins professionnelles, privées ou de formation, via n’importe quel appareil (ordinateur de bureau, ordinateur portable, tablette, téléphone mobile ou smartphone, appareils intelligents, etc.)',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qukoa2',
      componentType: 'CheckboxGroup',
      page: '60',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous effectué une des activités suivantes ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qukoa2-l5quqojp',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'COMPINFX_MISSING' },
      bindingDependencies: [
        'COMPINFX_MISSING',
        'COMPINFX1',
        'COMPINFX2',
        'COMPINFX3',
        'COMPINFX4',
        'COMPINFX5',
        'COMPINFX6',
        'COMPINFX7',
        'COMPINFX8',
        'COMPINFX9',
      ],
      responses: [
        {
          id: 'l5qukoa2-QOP-lb0mgofz',
          label: {
            value:
              'Copié ou déplacé des fichiers (des documents, des données, images, vidéo) entre des dossiers ou des appareils (par exemple par e-mail, Messenger, WhatsApp, USB, câble) ou sur le cloud',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX1' },
        },

        {
          id: 'l5qukoa2-QOP-lb0mm7u7',
          label: {
            value: 'Téléchargé ou installé des logiciels ou des applications',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX2' },
        },

        {
          id: 'l5qukoa2-QOP-lb0mek64',
          label: {
            value:
              'Modifié des paramètres d’un logiciel, d’une application ou d’un appareil (par exemple le réglage de la langue, des couleurs, du contraste, de la taille du texte, barres d’outils/menu)',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX3' },
        },

        {
          id: 'l5qukoa2-QOP-lb0ma7av',
          label: {
            value:
              'Utilisé un logiciel de traitement de texte (Word, Writer, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX4' },
        },

        {
          id: 'l5qukoa2-QOP-lb0md7wv',
          label: {
            value:
              'Créé des fichiers (document, image, vidéo, etc.) intégrant plusieurs éléments comme du texte, une image, un tableau, un graphique, une animation, un son, etc.',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX5' },
        },

        {
          id: 'l5qukoa2-QOP-lb0mdelv',
          label: {
            value: 'Utilisé un tableur (Excel, Calc, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX6' },
        },

        {
          id: 'l5qukoa2-QOP-lb0mcyb0',
          label: {
            value: 'Modifié des photos, des fichiers vidéos ou audios',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX7' },
        },

        {
          id: 'l5qukoa2-QOP-lb0magfb',
          label: {
            value: 'Écrit un programme en langage informatique',
            type: 'VTL|MD',
          },
          response: { name: 'COMPINFX8' },
        },

        {
          id: 'l5qukoa2-QOP-lb0mg9ho',
          label: { value: 'Aucune de ces activités', type: 'VTL|MD' },
          response: { name: 'COMPINFX9' },
        },
      ],
    },

    {
      id: 'l5quzuhr',
      componentType: 'FilterDescription',
      page: '60',
      filterDescription: false,
      label: {
        value:
          'Si vous ne vous êtes pas servi d’un tableur, passez à la question 48.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qutfe5',
      componentType: 'Radio',
      mandatory: false,
      page: '61',
      label: {
        value:
          'Lorsque vous vous êtes servi(e) d’un tableur au cours des trois derniers mois, avez-vous utilisé des fonctionnalités avancées (fonctions, formules, macros, Visual Basic) pour organiser, analyser, structurer ou modifier les données ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'COMPINFX6',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'EXCEL_MISSING' },
      bindingDependencies: ['EXCEL_MISSING', 'EXCEL'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'EXCEL' },
    },

    {
      id: 'l5qv6hx9',
      componentType: 'Radio',
      mandatory: false,
      page: '62',
      label: {
        value:
          'Avez-vous vu des informations ou du contenu (par exemple, des vidéos, des images) que vous considérez comme faux ou peu fiables sur des sites d’information ou des médias sociaux (par exemple, Facebook, Instagram, YouTube, Twitter) au cours des trois derniers mois ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'INFOX_MISSING' },
      bindingDependencies: ['INFOX_MISSING', 'INFOX'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'INFOX' },
    },

    {
      id: 'lawg8o2y',
      componentType: 'FilterDescription',
      page: '62',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas vu d’infox dans les trois derniers mois, passez à la question 52.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qwlbt6',
      componentType: 'Radio',
      mandatory: false,
      page: '63',
      label: {
        value:
          'Avez-vous vérifié la fiabilité de ces informations ou contenus ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'INFOX',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'VERIFINFO_MISSING' },
      bindingDependencies: ['VERIFINFO_MISSING', 'VERIFINFO'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'VERIFINFO' },
    },

    {
      id: 'lawgcxad',
      componentType: 'FilterDescription',
      page: '63',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas vérifié la fiabilité de ces informations, passez à la question 51.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'INFOX',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qwqc2t',
      componentType: 'CheckboxGroup',
      page: '64',
      label: {
        value:
          'Comment avez-vous vérifié la véracité de ces informations ou contenus ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qwqc2t-l5qwu1ru',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX))) and (not(VERIFINFO = "2" or isnull(VERIFINFO)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'INFOX',
          'VERIFINFO',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'MOYINFOX_MISSING' },
      bindingDependencies: [
        'MOYINFOX_MISSING',
        'MOYINFOX1',
        'MOYINFOX2',
        'MOYINFOX3',
        'MOYINFOX4',
      ],
      responses: [
        {
          id: 'l5qwqc2t-QOP-l5qwbzwl',
          label: {
            value:
              'En vérifiant les sources ou en trouvant d’autres informations sur Internet (par exemple, d’autres sites d’information, Wikipédia, etc.)',
            type: 'VTL|MD',
          },
          response: { name: 'MOYINFOX1' },
        },

        {
          id: 'l5qwqc2t-QOP-l5qwu0fm',
          label: {
            value:
              'En suivant ou participant à des discussions sur Internet relatives à ces informations',
            type: 'VTL|MD',
          },
          response: { name: 'MOYINFOX2' },
        },

        {
          id: 'l5qwqc2t-QOP-l5qwblm4',
          label: {
            value:
              'En discutant des informations hors Internet avec d’autres personnes ou en utilisant des sources qui ne sont pas sur Internet',
            type: 'VTL|MD',
          },
          response: { name: 'MOYINFOX3' },
        },

        {
          id: 'l5qwqc2t-QOP-l5qwqs0y',
          label: { value: 'Par un autre moyen', type: 'VTL|MD' },
          response: { name: 'MOYINFOX4' },
        },
      ],
    },

    {
      id: 'lawggtzk',
      componentType: 'FilterDescription',
      page: '64',
      filterDescription: false,
      label: {
        value:
          'Si vous avez vérifié la véracité d’une infox, passez à la question 52.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX))) and (not(VERIFINFO = "2" or isnull(VERIFINFO)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'INFOX',
          'VERIFINFO',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qwcw2p',
      componentType: 'CheckboxGroup',
      page: '65',
      label: {
        value:
          'Pourquoi n’avez-vous pas vérifié la véracité de ces informations ou contenus ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qwcw2p-l5qwerza',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX))) and (not((VERIFINFO="1") and not ((VERIFINFO = "2" or isnull(VERIFINFO)))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'INFOX',
          'VERIFINFO',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'RAISINFOX_MISSING' },
      bindingDependencies: [
        'RAISINFOX_MISSING',
        'RAISINFOX1',
        'RAISINFOX2',
        'RAISINFOX3',
      ],
      responses: [
        {
          id: 'l5qwcw2p-QOP-l5qwhwz9',
          label: {
            value:
              'Vous saviez déjà que l’information, le contenu ou la source n’étaient pas fiables',
            type: 'VTL|MD',
          },
          response: { name: 'RAISINFOX1' },
        },

        {
          id: 'l5qwcw2p-QOP-l5qwuxw8',
          label: {
            value:
              'Vous manquez de compétences ou de connaissances (par exemple, vous ne saviez pas comment vérifier les informations sur Internet ou c’était trop compliqué à faire)',
            type: 'VTL|MD',
          },
          response: { name: 'RAISINFOX2' },
        },

        {
          id: 'l5qwcw2p-QOP-l5qwox9b',
          label: { value: 'Pour une autre raison', type: 'VTL|MD' },
          response: { name: 'RAISINFOX3' },
        },
      ],
    },

    {
      id: 'l5qwgkxg',
      componentType: 'Radio',
      mandatory: false,
      page: '66',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous vu des messages en ligne que vous jugez hostiles ou dégradants envers certains groupes ou individus (par exemple, dans des vidéos, sur des blogs, sur les réseaux sociaux ou dans des médias en ligne, y compris dans la section des commentaires) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'HOSTILE_MISSING' },
      bindingDependencies: ['HOSTILE_MISSING', 'HOSTILE'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'HOSTILE' },
    },

    {
      id: 'lawh1zvy',
      componentType: 'FilterDescription',
      page: '66',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas vu de message hostile, passez à la question 54.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qwip4r',
      componentType: 'CheckboxGroup',
      page: '67',
      label: {
        value:
          'Pour quelles raisons ces groupes ou ces individus étaient-ils attaqués ou ciblés ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qwip4r-l5qwn2aw',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(HOSTILE = "2" or isnull(HOSTILE)))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
          'HOSTILE',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qt5sgw',
          page: '59',
          label: {
            value: '"X - " || "Vos compétences en informatique"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'CIBLEX_MISSING' },
      bindingDependencies: [
        'CIBLEX_MISSING',
        'CIBLEX1',
        'CIBLEX2',
        'CIBLEX3',
        'CIBLEX4',
        'CIBLEX5',
        'CIBLEX6',
        'CIBLEX7',
      ],
      responses: [
        {
          id: 'l5qwip4r-QOP-l5qwtd90',
          label: {
            value: 'Pour leurs opinions politiques ou sociales',
            type: 'VTL|MD',
          },
          response: { name: 'CIBLEX1' },
        },

        {
          id: 'l5qwip4r-QOP-l5qwjncn',
          label: {
            value:
              'Pour leur orientation sexuelle ou leur identité de genre (appartenance LGBTQI+)',
            type: 'VTL|MD',
          },
          response: { name: 'CIBLEX2' },
        },

        {
          id: 'l5qwip4r-QOP-l5qx1a6i',
          label: { value: 'Pour leur sexe', type: 'VTL|MD' },
          response: { name: 'CIBLEX3' },
        },

        {
          id: 'l5qwip4r-QOP-l5qwyji4',
          label: { value: 'Pour leur origine ethnique', type: 'VTL|MD' },
          response: { name: 'CIBLEX4' },
        },

        {
          id: 'l5qwip4r-QOP-l5qwxb5q',
          label: {
            value: 'Pour leur religion ou leurs croyances',
            type: 'VTL|MD',
          },
          response: { name: 'CIBLEX5' },
        },

        {
          id: 'l5qwip4r-QOP-l5qwymmx',
          label: { value: 'Pour leur handicap', type: 'VTL|MD' },
          response: { name: 'CIBLEX6' },
        },

        {
          id: 'l5qwip4r-QOP-l5qwpsuo',
          label: { value: 'Pour d’autres raisons', type: 'VTL|MD' },
          response: { name: 'CIBLEX7' },
        },
      ],
    },

    {
      id: 'l5qsok3j',
      componentType: 'Sequence',
      page: '68',
      label: {
        value: '"XI - " || "Confidentialité et protection de la vie privée"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qsok3j-l5qsxxx0',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Voici à présent quelques questions concernant la mise à disposition et la protection des données personnelles en lien avec vos activités sur Internet.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsok3j',
          page: '68',
          label: {
            value:
              '"XI - " || "Confidentialité et protection de la vie privée"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qwkxzs',
      componentType: 'CheckboxGroup',
      page: '69',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous effectué une ou plusieurs des actions suivantes pour gérer l’accès à vos données personnelles (nom, date de naissance, numéro de carte d’identité, coordonnées, numéro de carte de crédit, photos, situation géographique, etc.) sur Internet ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5qwkxzs-l5qx77k5',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsok3j',
          page: '68',
          label: {
            value:
              '"XI - " || "Confidentialité et protection de la vie privée"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ACCESX_MISSING' },
      bindingDependencies: [
        'ACCESX_MISSING',
        'ACCESX1',
        'ACCESX2',
        'ACCESX3',
        'ACCESX4',
        'ACCESX5',
        'ACCESX6',
        'ACCESX7',
      ],
      responses: [
        {
          id: 'l5qwkxzs-QOP-l5qwqu8m',
          label: {
            value:
              'Lire la politique de confidentialité du site avant de fournir des informations personnelles',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX1' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qwy0mo',
          label: {
            value:
              'Restreindre ou refuser l’accès à votre position géographique',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX2' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qwnoof',
          label: {
            value:
              'Limiter l’accès au profil ou aux contenus que vous avez postés sur les réseaux sociaux ou au stockage en ligne partagé',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX3' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qwuz6x',
          label: {
            value:
              'Refuser l’usage de données personnelles dans un but publicitaire',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX4' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qx5gkj',
          label: {
            value:
              'Vérifier que le site Internet sur lequel vous avez fourni des données personnelles était sécurisé (site commençant par « https », certificats ou logos de sécurité)',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX5' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qwwx3r',
          label: {
            value:
              'Demander la modification ou la suppression des données personnelles auprès d’un administrateur ou fournisseur d’accès',
            type: 'VTL|MD',
          },
          response: { name: 'ACCESX6' },
        },

        {
          id: 'l5qwkxzs-QOP-l5qx5uas',
          label: { value: 'Aucune de ces actions', type: 'VTL|MD' },
          response: { name: 'ACCESX7' },
        },
      ],
    },

    {
      id: 'l5rz6xk6',
      componentType: 'Radio',
      mandatory: false,
      page: '70',
      label: {
        value:
          'Avez-vous changé les paramètres de votre navigateur Internet afin d’interdire ou de limiter les cookies (fichier enregistrant des informations sur la navigation effectuée sur les pages d’un site Web) sur l’un de vos appareils ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsok3j',
          page: '68',
          label: {
            value:
              '"XI - " || "Confidentialité et protection de la vie privée"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'SECUNAV_MISSING' },
      bindingDependencies: ['SECUNAV_MISSING', 'SECUNAV'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'SECUNAV' },
    },

    {
      id: 'l5rzafy6',
      componentType: 'Radio',
      mandatory: false,
      page: '71',
      label: {
        value:
          'Êtes-vous préoccupé(e) par le fait que vos activités en ligne soient enregistrées pour vous proposer des publicités ciblées ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsok3j',
          page: '68',
          label: {
            value:
              '"XI - " || "Confidentialité et protection de la vie privée"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PREOCC_MISSING' },
      bindingDependencies: ['PREOCC_MISSING', 'PREOCC'],
      options: [
        {
          value: '1',
          label: { value: 'Oui, très préoccupé(e)', type: 'VTL|MD' },
        },

        {
          value: '2',
          label: { value: 'Oui, en partie préoccupé(e)', type: 'VTL|MD' },
        },

        {
          value: '3',
          label: { value: 'Non, je ne suis pas préoccupé(e)', type: 'VTL|MD' },
        },
      ],
      response: { name: 'PREOCC' },
    },

    {
      id: 'l5rzfd5i',
      componentType: 'Radio',
      mandatory: false,
      page: '72',
      label: {
        value:
          'Utilisez-vous un logiciel de protection contre le tracking (logiciel qui limite la capacité à suivre vos actions sur Internet) sur l’un de vos appareils ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'NUSEWEB',
          'F_RENADMX9',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'l5qsok3j',
          page: '68',
          label: {
            value:
              '"XI - " || "Confidentialité et protection de la vie privée"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'TRACKING_MISSING' },
      bindingDependencies: ['TRACKING_MISSING', 'TRACKING'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'TRACKING' },
    },

    {
      id: 'kc0mpozo',
      componentType: 'Sequence',
      page: '73',
      label: {
        value: '"XII - " || "Votre utilisation du téléphone"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0mpozo-kc0mf1y0',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Poursuivons par des questions concernant votre usage du téléphone fixe et mobile.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0mpb1o',
      componentType: 'Radio',
      mandatory: false,
      page: '74',
      label: {
        value:
          'De combien de numéros de téléphone fixe disposez-vous dans votre ménage (numéros commençant par 01 à 05 ou par 09) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_NUMEROS_MISSING' },
      bindingDependencies: ['F_NUMEROS_MISSING', 'F_NUMEROS'],
      options: [
        { value: '0', label: { value: 'Aucun', type: 'VTL|MD' } },

        { value: '1', label: { value: 'Un numéro', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Deux numéros', type: 'VTL|MD' } },

        {
          value: '3',
          label: { value: 'Trois numéros ou plus', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_NUMEROS' },
    },

    {
      id: 'kc1y4a2a',
      componentType: 'FilterDescription',
      page: '74',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas de numéro de téléphone fixe, passez à la question 60.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'ks4u5tn9',
      componentType: 'Radio',
      mandatory: false,
      page: '75',
      label: {
        value:
          'Disposez-vous d’une box Internet comprenant une ligne de téléphone fixe à votre domicile ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(F_NUMEROS = "0" or isnull(F_NUMEROS) ))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'F_NUMEROS'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_BOX_MISSING' },
      bindingDependencies: ['F_BOX_MISSING', 'F_BOX'],
      options: [
        {
          value: '1',
          label: {
            value: 'Oui et vous avez un téléphone fixe branché dessus',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value: 'Oui mais vous n’avez pas de téléphone fixe branché dessus',
            type: 'VTL|MD',
          },
        },

        { value: '3', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'F_BOX' },
    },

    {
      id: 'kc0mzowl',
      componentType: 'CheckboxGroup',
      page: '76',
      label: {
        value: 'Pour votre usage privé, utilisez-vous ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0mzowl-kc0n7j03',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Plusieurs réponses possibles', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_SMARTPHONEX_MISSING' },
      bindingDependencies: [
        'F_SMARTPHONEX_MISSING',
        'F_SMARTPHONEX1',
        'F_SMARTPHONEX2',
        'F_SMARTPHONEX3',
      ],
      responses: [
        {
          id: 'kc0mzowl-QOP-l5s01nq2',
          label: { value: 'Un smartphone', type: 'VTL|MD' },
          response: { name: 'F_SMARTPHONEX1' },
        },

        {
          id: 'kc0mzowl-QOP-l5s0d01s',
          label: {
            value: 'Un téléphone mobile hors smartphone',
            type: 'VTL|MD',
          },
          response: { name: 'F_SMARTPHONEX2' },
        },

        {
          id: 'kc0mzowl-QOP-l5s03ili',
          label: { value: 'Aucun de ces appareils', type: 'VTL|MD' },
          response: { name: 'F_SMARTPHONEX3' },
        },
      ],
    },

    {
      id: 'kc1yr70e',
      componentType: 'FilterDescription',
      page: '76',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas de smartphone et que vous n’avez pas utilisé Internet dans les 12 derniers mois, passez à la question 72.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kybmv9md',
      componentType: 'FilterDescription',
      page: '76',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas de smartphone et que vous avez utilisé Internet dans les 12 derniers mois, passez à la question 62.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5qsrjw9',
      componentType: 'Radio',
      mandatory: false,
      page: '77',
      label: {
        value:
          'En moyenne, hors usage professionnel, à quelle fréquence consultez-vous votre smartphone ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_FREQTEL_MISSING' },
      bindingDependencies: ['F_FREQTEL_MISSING', 'F_FREQTEL'],
      options: [
        {
          value: '1',
          label: {
            value: 'Toutes les 5 minutes ou en continu',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: { value: 'Toutes les 15 minutes', type: 'VTL|MD' },
        },

        { value: '3', label: { value: 'Toutes les heures', type: 'VTL|MD' } },

        {
          value: '4',
          label: { value: 'Toutes les 3 ou 4 heures', type: 'VTL|MD' },
        },

        { value: '5', label: { value: 'Moins souvent', type: 'VTL|MD' } },
      ],
      response: { name: 'F_FREQTEL' },
    },

    {
      id: 'lb0szym4',
      componentType: 'FilterDescription',
      page: '77',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas utilisé Internet dans les 12 derniers mois, passez à la questions 72.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'kc0mpozo',
          page: '73',
          label: {
            value: '"XII - " || "Votre utilisation du téléphone"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'ks4tv406',
      componentType: 'Sequence',
      page: '78',
      label: {
        value: '"XIII - " || "Votre exposition aux écrans"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'ks4tv406-ks4u5ja1',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Nous nous intéressons à présent au temps que vous passez devant les écrans pour un usage personnel, quel que soit le type de support (ordinateur, smartphone, tablette, télévision, console de jeu...).',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'l5rzyvgt',
      componentType: 'Radio',
      mandatory: false,
      page: '79',
      label: {
        value:
          'Au cours des trois derniers mois, pour un usage personnel, combien de temps en moyenne avez-vous passé devant un écran par jour travaillé (jour d’école, jour de semaine...) ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5rzyvgt-l5s02roq',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Pour les personnes en emploi ou en cursus scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_FRESEC_MISSING' },
      bindingDependencies: ['F_FRESEC_MISSING', 'F_FRESEC'],
      options: [
        { value: '1', label: { value: 'Moins d’une heure', type: 'VTL|MD' } },

        {
          value: '2',
          label: { value: 'Entre une et deux heures', type: 'VTL|MD' },
        },

        {
          value: '3',
          label: { value: 'Entre deux et quatre heures', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Entre quatre et six heures', type: 'VTL|MD' },
        },

        { value: '5', label: { value: 'Plus de six heures', type: 'VTL|MD' } },

        { value: '6', label: { value: 'Non concerné', type: 'VTL|MD' } },
      ],
      response: { name: 'F_FRESEC' },
    },

    {
      id: 'l5s0eko9',
      componentType: 'Radio',
      mandatory: false,
      page: '80',
      label: {
        value:
          'Au cours des trois derniers mois, pour un usage personnel, combien de temps en moyenne avez-vous passé devant un écran par jour non-travaillé (week-end, congés...) ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5s0eko9-lda147rv',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_FREWEC_MISSING' },
      bindingDependencies: ['F_FREWEC_MISSING', 'F_FREWEC'],
      options: [
        { value: '1', label: { value: 'Moins d’une heure', type: 'VTL|MD' } },

        {
          value: '2',
          label: { value: 'Entre une et deux heures', type: 'VTL|MD' },
        },

        {
          value: '3',
          label: { value: 'Entre deux et quatre heures', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Entre quatre et six heures', type: 'VTL|MD' },
        },

        {
          value: '5',
          label: { value: 'Entre six et huit heures', type: 'VTL|MD' },
        },

        { value: '6', label: { value: 'Plus de huit heures', type: 'VTL|MD' } },
      ],
      response: { name: 'F_FREWEC' },
    },

    {
      id: 'l5s07kdp',
      componentType: 'Radio',
      mandatory: false,
      page: '81',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous réduit votre temps de sommeil pour rester devant un écran ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'l5s07kdp-l5s0k7m2',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_SOMEC_MISSING' },
      bindingDependencies: ['F_SOMEC_MISSING', 'F_SOMEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_SOMEC' },
    },

    {
      id: 'la8fn5gy',
      componentType: 'Radio',
      mandatory: false,
      page: '82',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous négligé des activités de loisir pour être devant un écran ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8fn5gy-la8frpuk',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_LOIEC_MISSING' },
      bindingDependencies: ['F_LOIEC_MISSING', 'F_LOIEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_LOIEC' },
    },

    {
      id: 'la8fqs9p',
      componentType: 'Radio',
      mandatory: false,
      page: '83',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous eu des conflits avec vos proches (amis, famille) à cause de votre usage d’un écran ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8fqs9p-la8g4eu6',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_FAMEC_MISSING' },
      bindingDependencies: ['F_FAMEC_MISSING', 'F_FAMEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_FAMEC' },
    },

    {
      id: 'la8g7mqq',
      componentType: 'Radio',
      mandatory: false,
      page: '84',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous eu des problèmes au travail ou à l’école à cause de votre usage d’un écran (mauvais résultats, retards, manque de concentration, tensions, etc.) ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_TRAEC_MISSING' },
      bindingDependencies: ['F_TRAEC_MISSING', 'F_TRAEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_TRAEC' },
    },

    {
      id: 'la8fqhkc',
      componentType: 'Radio',
      mandatory: false,
      page: '85',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous déjà eu une envie obsédante d’être sur un écran (par exemple, vous pensiez sans arrêt à une série, à vos réseaux sociaux, à un jeu sur ordinateur...) ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8fqhkc-la8fvw5g',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_OBSEC_MISSING' },
      bindingDependencies: ['F_OBSEC_MISSING', 'F_OBSEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_OBSEC' },
    },

    {
      id: 'la8g259c',
      componentType: 'Radio',
      mandatory: false,
      page: '86',
      label: {
        value:
          'Au cours des trois derniers mois, vous êtes-vous senti mal ou déprimé à cause de votre usage des écrans ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8g259c-la8fug27',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_DEPEC_MISSING' },
      bindingDependencies: ['F_DEPEC_MISSING', 'F_DEPEC'],
      options: [
        { value: '1', label: { value: 'Jamais', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Environ une fois par mois ou moins',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Une fois par semaine', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: { value: 'Plusieurs fois par semaine', type: 'VTL|MD' },
        },
      ],
      response: { name: 'F_DEPEC' },
    },

    {
      id: 'la8g0u5s',
      componentType: 'Radio',
      mandatory: false,
      page: '87',
      label: {
        value:
          'Au cours des trois derniers mois, avez-vous tenté de limiter votre temps devant un écran ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8g0u5s-la8fxxes',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_LIMEC_MISSING' },
      bindingDependencies: ['F_LIMEC_MISSING', 'F_LIMEC'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'F_LIMEC' },
    },

    {
      id: 'la8g7ihr',
      componentType: 'FilterDescription',
      page: '87',
      filterDescription: false,
      label: {
        value:
          'Si vous n’avez pas tenté de limiter votre temps passé devant un écran, veuillez passer à la question 72.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'la8g00u8',
      componentType: 'Radio',
      mandatory: false,
      page: '88',
      label: {
        value: 'Êtes-vous parvenu à limiter votre temps devant un écran ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'la8g00u8-la8fyh1t',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value: 'Hors usage professionnel ou scolaire',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
        type: 'VTL',
        bindingDependencies: [
          'POLITES',
          'RESIDENCE',
          'PRESAKO',
          'F_SMARTPHONEX1',
          'NUSEWEB',
          'F_LIMEC',
        ],
      },
      hierarchy: {
        sequence: {
          id: 'ks4tv406',
          page: '78',
          label: {
            value: '"XIII - " || "Votre exposition aux écrans"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_RESEC_MISSING' },
      bindingDependencies: ['F_RESEC_MISSING', 'F_RESEC'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'Oui mais pas autant que vous l’auriez souhaité',
            type: 'VTL|MD',
          },
        },

        { value: '3', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'F_RESEC' },
    },

    {
      id: 'kc0n110n',
      componentType: 'Sequence',
      page: '89',
      label: {
        value: '"XIV - " || "Votre situation professionnelle"',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0n110n-kc0mziaq',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Terminons par quelques questions plus générales sur votre situation professionnelle.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0n6snm',
      componentType: 'Radio',
      mandatory: false,
      page: '90',
      label: {
        value:
          'Quelle est actuellement votre situation principale vis-à-vis du travail ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'kc0n6snm-kc0my1wg',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Une seule réponse possible', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'SITUA_MISSING' },
      bindingDependencies: ['SITUA_MISSING', 'SITUA'],
      options: [
        {
          value: '1',
          label: {
            value: 'Occupe un emploi (salarié(e) ou indépendant(e))',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value: 'En contrat d’apprentissage ou de professionnalisation',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: {
            value: 'Étudiant(e), élève en formation, en stage non rémunéré',
            type: 'VTL|MD',
          },
        },

        {
          value: '4',
          label: {
            value: 'Chômeur(euse), inscrit(e) ou non à Pôle Emploi',
            type: 'VTL|MD',
          },
        },

        {
          value: '5',
          label: {
            value: 'Retraité(e) ou préretraité(e), retiré(e) des affaires',
            type: 'VTL|MD',
          },
        },

        {
          value: '6',
          label: {
            value:
              'Au foyer, occupé(e) à des tâches d’entretien de la maison ou de garde d’enfants',
            type: 'VTL|MD',
          },
        },

        {
          value: '7',
          label: {
            value: 'Au foyer, en incapacité permanente de travail',
            type: 'VTL|MD',
          },
        },

        { value: '8', label: { value: 'En service civique', type: 'VTL|MD' } },

        { value: '9', label: { value: 'Autre, inactif(ve)', type: 'VTL|MD' } },
      ],
      response: { name: 'SITUA' },
    },

    {
      id: 'kc0nbhww',
      componentType: 'Radio',
      mandatory: false,
      page: '91',
      label: { value: '"Dans votre " || emploi || " ?"', type: 'VTL|MD' },
      declarations: [
        {
          id: 'kc0nbhww-kc0nojf1',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: { value: 'Une seule réponse possible', type: 'VTL|MD' },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'STATUT_MISSING' },
      bindingDependencies: ['emploi', 'STATUT_MISSING', 'STATUT'],
      options: [
        {
          value: '1',
          label: {
            value: 'Salarié(e) d’une entreprise privée ou d’une association',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value:
              'Salarié(e) d’une entreprise publique (EDF, La Poste, SNCF, etc.)',
            type: 'VTL|MD',
          },
        },

        {
          value: '3',
          label: { value: 'Salarié(e) de l’État', type: 'VTL|MD' },
        },

        {
          value: '4',
          label: {
            value: 'Salarié(e) des collectivités territoriales',
            type: 'VTL|MD',
          },
        },

        {
          value: '5',
          label: { value: 'Salarié(e) des hôpitaux publics', type: 'VTL|MD' },
        },

        {
          value: '6',
          label: {
            value: 'Salarié(e) d’un organisme de Sécurité Sociale',
            type: 'VTL|MD',
          },
        },

        {
          value: '7',
          label: { value: 'Salarié(e) d’un particulier', type: 'VTL|MD' },
        },

        {
          value: '8',
          label: {
            value:
              'Chef(fe) d’entreprise salarié(e), PDG, gérant(e) minoritaire, associé(e)',
            type: 'VTL|MD',
          },
        },

        {
          value: '9',
          label: { value: 'Indépendant(e) ou à votre compte', type: 'VTL|MD' },
        },

        {
          value: '10',
          label: {
            value:
              'Vous travaill(i)ez pour un ou avec un membre de votre famille sans être salarié(e)',
            type: 'VTL|MD',
          },
        },

        {
          value: '11',
          label: { value: 'Vous n’avez jamais travaillé.', type: 'VTL|MD' },
        },
      ],
      response: { name: 'STATUT' },
    },

    {
      id: 'kc1z5ca8',
      componentType: 'FilterDescription',
      page: '91',
      filterDescription: false,
      label: {
        value:
          'Si vous dirigez une entreprise, êtes indépendant ou si vous travaillez pour un membre de votre famille, passez à la question 77.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc1z8v6j',
      componentType: 'FilterDescription',
      page: '91',
      filterDescription: false,
      label: {
        value: 'Si vous n’avez jamais travaillé, passez à la question 81.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0nuukd',
      componentType: 'Radio',
      mandatory: false,
      page: '92',
      label: {
        value:
          '"Votre tâche principale " || emploi2 || "-elle de superviser le travail d’autres salariés (hors apprentis et stagiaires) ?"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ENCADR_MISSING' },
      bindingDependencies: ['emploi2', 'ENCADR_MISSING', 'ENCADR'],
      options: [
        { value: '1', label: { value: 'Oui', type: 'VTL|MD' } },

        { value: '2', label: { value: 'Non', type: 'VTL|MD' } },
      ],
      response: { name: 'ENCADR' },
    },

    {
      id: 'kc0o78n2',
      componentType: 'Radio',
      mandatory: false,
      page: '93',
      label: {
        value: '"Quel " || emploi2 || " votre type d’emploi ?"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'CONTRAT_MISSING' },
      bindingDependencies: ['emploi2', 'CONTRAT_MISSING', 'CONTRAT'],
      options: [
        {
          value: '1',
          label: {
            value:
              'Emploi sans limite de durée (CDI ou titulaire de la fonction publique)',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value:
              'Emploi à durée déterminée (CDD, intérim, saisonnier, apprentissage, contrat d’avenir, etc.)',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'CONTRAT' },
    },

    {
      id: 'kc0nwzzp',
      componentType: 'Radio',
      mandatory: false,
      page: '94',
      label: { value: 'emploi3 || "-vous ?"', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'CLASSIF_MISSING' },
      bindingDependencies: ['emploi3', 'CLASSIF_MISSING', 'CLASSIF'],
      options: [
        {
          value: '1',
          label: {
            value: 'Manœuvre ou ouvrier(ière) spécialisé(e)',
            type: 'VTL|MD',
          },
        },

        {
          value: '2',
          label: {
            value:
              'Ouvrier(ière) qualifié(e) ou ouvrier(ière) hautement qualifié(e) ou technicien(ne) d’atelier',
            type: 'VTL|MD',
          },
        },

        { value: '3', label: { value: 'Technicien(ne)', type: 'VTL|MD' } },

        {
          value: '4',
          label: {
            value: 'Personnel de catégorie B ou assimilé',
            type: 'VTL|MD',
          },
        },

        {
          value: '5',
          label: {
            value:
              'Agent de maîtrise, maîtrise administrative ou commerciale, VRP (non cadre)',
            type: 'VTL|MD',
          },
        },

        {
          value: '6',
          label: {
            value: 'Personnel de catégorie A ou assimilé',
            type: 'VTL|MD',
          },
        },

        {
          value: '7',
          label: {
            value:
              'Ingénieur(e) ou cadre (à l’exception des directeurs généraux ou de ses adjoints directs)',
            type: 'VTL|MD',
          },
        },

        {
          value: '8',
          label: {
            value: 'Personnel de catégorie C ou assimilé',
            type: 'VTL|MD',
          },
        },

        {
          value: '9',
          label: {
            value: 'Employé(e) de bureau, de commerce, personnel de services',
            type: 'VTL|MD',
          },
        },

        {
          value: '10',
          label: {
            value: 'Directeur(trice) général(e), adjoint(e) direct(e)',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'CLASSIF' },
    },

    {
      id: 'kc0o6lj8',
      componentType: 'Radio',
      mandatory: false,
      page: '95',
      label: { value: 'emploi4 || "-vous ?"', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'DUREE_EMP_MISSING' },
      bindingDependencies: ['emploi4', 'DUREE_EMP_MISSING', 'DUREE_EMP'],
      options: [
        { value: '1', label: { value: 'À temps complet', type: 'VTL|MD' } },

        {
          value: '2',
          label: {
            value: 'À temps partiel ou incomplet (mi-temps, 90%, 80%, etc.)',
            type: 'VTL|MD',
          },
        },
      ],
      response: { name: 'DUREE_EMP' },
    },

    {
      id: 'kc0ofjt7',
      componentType: 'Input',
      mandatory: false,
      page: '96',
      maxLength: 50,
      label: {
        value: '"Quelle " || emploi2 || " " || emploi5 || " ?"',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'PROFESSION_MISSING' },
      bindingDependencies: [
        'emploi2',
        'emploi5',
        'PROFESSION_MISSING',
        'PROFESSION',
      ],
      response: { name: 'PROFESSION' },
    },

    {
      id: 'kc0p4jga',
      componentType: 'Input',
      mandatory: false,
      page: '97',
      maxLength: 50,
      label: { value: '"Quelle " || emploi6 || " ?"', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'ACTILIB_MISSING' },
      bindingDependencies: ['emploi6', 'ACTILIB_MISSING', 'ACTILIB'],
      response: { name: 'ACTILIB' },
    },

    {
      id: 'kc1zacnn',
      componentType: 'FilterDescription',
      page: '97',
      filterDescription: false,
      label: {
        value:
          'Si vous ne dirigez pas une entreprise, n’êtes pas indépendant ou si vous ne travaillez pas pour un membre de votre famille, passez à la question 81.',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'kc0qftls',
      componentType: 'Radio',
      mandatory: false,
      page: '98',
      label: { value: 'emploi7 || " ?"', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT= "1" or STATUT= "2" or STATUT= "3" or STATUT= "4" or STATUT= "5" or STATUT= "6" or STATUT= "7" or STATUT= "11" or isnull(STATUT)))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'STATUT'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'NOMBRSAL_MISSING' },
      bindingDependencies: ['emploi7', 'NOMBRSAL_MISSING', 'NOMBRSAL'],
      options: [
        { value: '1', label: { value: 'Aucun salarié', type: 'VTL|MD' } },

        { value: '2', label: { value: 'De 1 à 2 salariés', type: 'VTL|MD' } },

        { value: '3', label: { value: 'De 3 à 9 salariés', type: 'VTL|MD' } },

        {
          value: '4',
          label: { value: '"10 salariés ou plus" || ""', type: 'VTL|MD' },
        },
      ],
      response: { name: 'NOMBRSAL' },
    },

    {
      id: 'ks4txhy9',
      componentType: 'Radio',
      mandatory: false,
      page: '99',
      label: {
        value:
          'Êtes-vous limité(e) depuis au moins six mois, à cause d’un problème de santé, dans les activités que les gens font habituellement ?',
        type: 'VTL|MD',
      },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'F_SANTE_MISSING' },
      bindingDependencies: ['F_SANTE_MISSING', 'SANTE'],
      options: [
        {
          value: '1',
          label: { value: 'Oui, fortement limité(e)', type: 'VTL|MD' },
        },

        {
          value: '2',
          label: { value: 'Oui, limité(e) mais pas fortement', type: 'VTL|MD' },
        },

        {
          value: '3',
          label: { value: 'Non, pas limité(e) du tout', type: 'VTL|MD' },
        },
      ],
      response: { name: 'SANTE' },
    },

    {
      id: 'lda236av',
      componentType: 'InputNumber',
      mandatory: false,
      page: '100',
      min: 0,
      max: 99999,
      decimals: 0,
      label: {
        value:
          'Une dernière question, quel est le revenu mensuel de votre ménage en euros ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'lda236av-ldafiafh',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Il s’agit du revenu net (de cotisations sociales et de C.S.G.) avant impôts (y compris impôts sur le revenu prélevé à la source). Prenez en compte tous les types de revenus perçus durant le mois par votre ménage (salaires, pensions de retraite, minima sociaux, allocations chômage, prestations familiales, revenus du patrimoine, etc.)',
            type: 'VTL|MD',
          },
        },

        {
          id: 'lda236av-ldafvw14',
          declarationType: 'HELP',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Si les revenus sont fluctuants d’un mois sur l’autre, faites une moyenne.',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      controls: [
        {
          id: 'lda236av-format-borne-inf-sup',
          typeOfControl: 'FORMAT',
          criticality: 'ERROR',
          control: {
            value: 'not(not(isnull(REVENU)) and (0>REVENU or 99999<REVENU))',
            type: 'VTL',
          },
          errorMessage: {
            value: '" La valeur doit être comprise entre 0 et 99999."',
            type: 'VTL|MD',
          },
        },

        {
          id: 'lda236av-format-decimal',
          typeOfControl: 'FORMAT',
          criticality: 'ERROR',
          control: {
            value: 'not(not(isnull(REVENU))  and round(REVENU,0)<>REVENU)',
            type: 'VTL',
          },
          errorMessage: {
            value:
              '"Le nombre doit comporter au maximum 0 chiffre(s) après la virgule."',
            type: 'VTL|MD',
          },
        },
      ],
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'REVENU_MISSING' },
      bindingDependencies: ['REVENU_MISSING', 'REVENU'],
      unit: '€',
      response: { name: 'REVENU' },
    },

    {
      id: 'ldafxx0d',
      componentType: 'FilterDescription',
      page: '100',
      filterDescription: false,
      label: { value: 'Revenu mensuel obtenu.', type: 'VTL|MD' },
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
    },

    {
      id: 'lda1xtqh',
      componentType: 'Radio',
      mandatory: false,
      page: '101',
      label: {
        value:
          'Pouvez-vous, néanmoins, le situer dans une des tranches suivantes ?',
        type: 'VTL|MD',
      },
      declarations: [
        {
          id: 'lda1xtqh-lda1xmdi',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Il s’agit du revenu net (de cotisations sociales et de C.S.G.) avant impôts (y compris avant impôt sur le revenu prélevé à la source). Prenez en compte tous les types de revenus perçus durant le mois par le ménage : salaires, pensions de retraite, minima sociaux, allocations chômage, prestations familiales, revenus du patrimoine, etc.',
            type: 'VTL|MD',
          },
        },

        {
          id: 'lda1xtqh-lda1n0c4',
          declarationType: 'INSTRUCTION',
          position: 'AFTER_QUESTION_TEXT',
          label: {
            value:
              'Si les revenus sont fluctuants d’un mois sur l’autre, faites une moyenne. ',
            type: 'VTL|MD',
          },
        },
      ],
      conditionFilter: {
        value:
          '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(REVENU, "") >= 0))',
        type: 'VTL',
        bindingDependencies: ['POLITES', 'RESIDENCE', 'PRESAKO', 'REVENU'],
      },
      hierarchy: {
        sequence: {
          id: 'kc0n110n',
          page: '89',
          label: {
            value: '"XIV - " || "Votre situation professionnelle"',
            type: 'VTL|MD',
          },
        },
      },
      missingResponse: { name: 'TRANCHREVENU_MISSING' },
      bindingDependencies: ['TRANCHREVENU_MISSING', 'TRANCHREVENU'],
      options: [
        { value: '1', label: { value: 'Moins de 800 €', type: 'VTL|MD' } },

        { value: '2', label: { value: 'De 800 à 999 €', type: 'VTL|MD' } },

        { value: '3', label: { value: 'De 1 000 à 1 199 €', type: 'VTL|MD' } },

        { value: '4', label: { value: 'De 1 200 à 1 499 €', type: 'VTL|MD' } },

        { value: '5', label: { value: 'De 1 500 à 1 999 €', type: 'VTL|MD' } },

        { value: '6', label: { value: 'De 2 000 à 2 499 €', type: 'VTL|MD' } },

        { value: '7', label: { value: 'De 2 500 à 2 999 €', type: 'VTL|MD' } },

        { value: '8', label: { value: 'De 3 000 à 3 999 €', type: 'VTL|MD' } },

        { value: '9', label: { value: 'De 4 000 à 5 999 €', type: 'VTL|MD' } },

        {
          value: '10',
          label: { value: '"6 000 € ou plus" || ""', type: 'VTL|MD' },
        },
      ],
      response: { name: 'TRANCHREVENU' },
    },

    {
      id: 'COMMENT-SEQ',
      componentType: 'Sequence',
      page: '102',
      label: { value: '"Commentaire"', type: 'VTL|MD' },
      conditionFilter: { value: 'true', type: 'VTL' },
      hierarchy: {
        sequence: {
          id: 'COMMENT-SEQ',
          page: '102',
          label: { value: '"Commentaire"', type: 'VTL|MD' },
        },
      },
    },

    {
      id: 'COMMENT-QUESTION',
      componentType: 'Textarea',
      mandatory: false,
      page: '103',
      maxLength: 2000,
      label: {
        value:
          '"Avez-vous des remarques concernant l\'enquête ou des commentaires ?"',
        type: 'VTL|MD',
      },
      conditionFilter: { value: 'true', type: 'VTL' },
      hierarchy: {
        sequence: {
          id: 'COMMENT-SEQ',
          page: '102',
          label: { value: '"Commentaire"', type: 'VTL|MD' },
        },
      },
      bindingDependencies: ['COMMENT_QE'],
      response: { name: 'COMMENT_QE' },
    },
  ],
  suggesters: [
    {
      name: 'L_DEPNAIS-1-1-0',
      fields: [
        { name: 'label', rules: 'soft' },

        { name: 'id', rules: 'soft' },
      ],
      queryParser: { type: 'soft' },
      version: '1',
    },

    {
      name: 'L_PAYSNAIS-1-1-0',
      fields: [{ name: 'label', rules: 'soft' }],
      queryParser: { type: 'soft' },
      version: '1',
    },

    {
      name: 'L_NATIONETR-1-1-0',
      fields: [{ name: 'label', rules: 'soft' }],
      queryParser: { type: 'soft' },
      version: '1',
    },
  ],
  variables: [
    {
      variableType: 'COLLECTED',
      name: 'COMMENT_QE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RESIDENCE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RESIDENCE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'POLITES',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'POLITES_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NBHABT',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NBHABT_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRENOM_TEL_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRENOM_TEL',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SEXE',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SEXE_MISSING',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DATENAIS_TEL',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DATENAIS_TEL_MISSING',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PASSER',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PASSER_MISSING',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IS_KISH',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IS_KISH_MISSING',
      values: {
        PREVIOUS: [null],
        COLLECTED: [null],
        FORCED: [null],
        EDITED: [null],
        INPUTED: [null],
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRESAKO',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRESAKO_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DIPLOME',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DIPLOME_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ETUDE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ETUDE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COUPLE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COUPLE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ETAMATRI',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ETAMATRI_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PACS',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PACS_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'LNAIS',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'LNAIS_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEPNAIS',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEPNAIS_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PAYSNAIS',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PAYSNAIS_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO1N1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO1N2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO1N3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO1N4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO1N_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO2N',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NATIO2N_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NET',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NET_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEBITX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEBITX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEBITX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEBITX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEBITX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUSEWEB',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUSEWEB_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'USEWEB',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'USEWEB_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEVICEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX9',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX10',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX11',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX12',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX13',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PRATINTXX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EDUPROX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EDUPROX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EDUPROX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EDUPROX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EDUPROX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ADMX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ADMX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ADMX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ADMX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IMPADM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IMPADM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RDVADM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RDVADM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MESADM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MESADM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DECLADMX',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DECLADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAIADMX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAIADMX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAIADMX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAIADMX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAIADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DEMADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AIDADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX9',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RENADMX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AUTADM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_AUTADM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDUSE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDUSE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDTYPEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDTYPEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDTYPEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDTYPEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'IDNOX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DATECOM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DATECOM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX9',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX10',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX11',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX12',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX13',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX14',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX15',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX16',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACHATXX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ORIGINEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ORIGINEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ORIGINEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ORIGINEX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ORIGINEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PARTACHA',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PARTACHA_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NUMACHAX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SERVACHAX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARTX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARTX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARTX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARTX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARAX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARAX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARAX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SHARAX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NBCOM',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NBCOM_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX9',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX10',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PBACHAXX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'FINANCEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'FINANCEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'FINANCEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'FINANCEX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'FINANCEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX8',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX9',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'COMPINFX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EXCEL',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'EXCEL_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'INFOX',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'INFOX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'VERIFINFO',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'VERIFINFO_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MOYINFOX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MOYINFOX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MOYINFOX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MOYINFOX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'MOYINFOX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAISINFOX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAISINFOX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAISINFOX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'RAISINFOX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'HOSTILE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'HOSTILE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CIBLEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX4',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX5',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX6',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX7',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACCESX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SECUNAV',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SECUNAV_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PREOCC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PREOCC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'TRACKING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'TRACKING_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_NUMEROS',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_NUMEROS_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_BOX',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_BOX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SMARTPHONEX1',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SMARTPHONEX2',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SMARTPHONEX3',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SMARTPHONEX_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FREQTEL',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FREQTEL_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FRESEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FRESEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FREWEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FREWEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SOMEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SOMEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_LOIEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_LOIEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FAMEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_FAMEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_TRAEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_TRAEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_OBSEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_OBSEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEPEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_DEPEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_LIMEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_LIMEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RESEC',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_RESEC_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SITUA',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SITUA_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'STATUT',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'STATUT_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ENCADR',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ENCADR_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CONTRAT',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CONTRAT_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CLASSIF',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'CLASSIF_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DUREE_EMP',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'DUREE_EMP_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PROFESSION',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'PROFESSION_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACTILIB',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'ACTILIB_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NOMBRSAL',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'NOMBRSAL_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'SANTE',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'F_SANTE_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'REVENU',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'REVENU_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'TRANCHREVENU',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'COLLECTED',
      name: 'TRANCHREVENU_MISSING',
      values: {
        PREVIOUS: null,
        COLLECTED: null,
        FORCED: null,
        EDITED: null,
        INPUTED: null,
      },
    },

    {
      variableType: 'CALCULATED',
      name: 'AGEMILLESIME',
      expression: {
        value: 'cast(ANNEEENQ,integer) - cast(ANNEE_NAISSANCE_STR,integer)',
        type: 'VTL',
      },
      bindingDependencies: ['ANNEEENQ', 'ANNEE_NAISSANCE_STR', 'DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'FUTURANNIVERSAIRE',
      expression: {
        value:
          'cast((MOISENQ || JOURENQ),integer) < cast((cast(MOIS_NAISSANCE_INT,string) || JOUR_NAISSANCE_STR),integer)',
        type: 'VTL',
      },
      bindingDependencies: [
        'MOISENQ',
        'JOURENQ',
        'MOIS_NAISSANCE_INT',
        'JOUR_NAISSANCE_STR',
        'DATENAIS_TEL',
      ],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'AGE',
      expression: {
        value:
          'if (FUTURANNIVERSAIRE) then cast((cast(AGEMILLESIME,integer) - 1),integer) else cast(AGEMILLESIME,integer)',
        type: 'VTL',
      },
      bindingDependencies: [
        'FUTURANNIVERSAIRE',
        'AGEMILLESIME',
        'DATENAIS_TEL',
      ],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'MOIS_NAISSANCE_INT',
      expression: {
        value:
          'cast( cast( cast(DATENAIS_TEL, date, "YYYY-MM-DD"), string, "MM"), integer)',
        type: 'VTL',
      },
      bindingDependencies: ['DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'JOUR_NAISSANCE_STR',
      expression: {
        value: 'cast(cast(DATENAIS_TEL, date, "YYYY-MM-DD"),string, "DD")',
        type: 'VTL',
      },
      bindingDependencies: ['DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'SCORE_KISH',
      expression: {
        value:
          'cast( if MOIS_NAISSANCE_INT < 6 then MOIS_NAISSANCE_INT + 12 else (if AGE < 15 then MOIS_NAISSANCE_INT + 24 else MOIS_NAISSANCE_INT), string) || "." || JOUR_NAISSANCE_STR',
        type: 'VTL',
      },
      bindingDependencies: [
        'MOIS_NAISSANCE_INT',
        'AGE',
        'JOUR_NAISSANCE_STR',
        'DATENAIS_TEL',
      ],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'KISH_INDICATOR',
      expression: {
        value: 'if KISH_MIN = SCORE_KISH_INT then 1 else 0',
        type: 'VTL',
      },
      bindingDependencies: ['KISH_MIN', 'SCORE_KISH_INT', 'DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'SCORE_KISH_INT',
      expression: { value: 'cast(SCORE_KISH, number)', type: 'VTL' },
      bindingDependencies: ['SCORE_KISH', 'DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'ANNEE_NAISSANCE_STR',
      expression: {
        value: 'cast(cast(DATENAIS_TEL, date, "YYYY-MM-DD"),string, "YYYY")',
        type: 'VTL',
      },
      bindingDependencies: ['DATENAIS_TEL'],
      shapeFrom: 'PRENOM_TEL',
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi',
      expression: {
        value:
          'if (isnull(SITUA)) then "emploi ou dernier emploi, êtes-vous " else (if (SITUA = "1" or SITUA = "2" ) then "emploi actuel, êtes-vous " else "dernier emploi, étiez-vous")',
        type: 'VTL',
      },
      bindingDependencies: ['SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi2',
      expression: {
        value:
          'if (isnull(SITUA)) then "est ou était" else (if (SITUA = "1" or SITUA = "2" ) then "est" else "était")',
        type: 'VTL',
      },
      bindingDependencies: ['SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi3',
      expression: {
        value:
          'if (isnull(SITUA)) then "Êtes ou étiez" else (if (SITUA = "1" or SITUA = "2" ) then "Êtes" else "Étiez")',
        type: 'VTL',
      },
      bindingDependencies: ['SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi4',
      expression: {
        value:
          'if (isnull(SITUA)) then "Travaillez ou travailliez" else (if (SITUA = "1" or SITUA = "2" ) then "Travaillez" else "Travailliez")',
        type: 'VTL',
      },
      bindingDependencies: ['SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi5',
      expression: {
        value:
          'if (isnull(STATUT)) then "Quelle est (ou était) votre profession principale (ou celle de la personne que vous aidez (ou aidiez))" else (if (STATUT = "10" and (SITUA = "1" or SITUA = "2")) then "la profession principale de la personne que vous aidez" else ( if(STATUT = "10" and (SITUA > "2" or isnull(SITUA)) ) then "la profession principale de la personne que vous aidiez" else "votre profession principale"))',
        type: 'VTL',
      },
      bindingDependencies: ['STATUT', 'SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi6',
      expression: {
        value:
          'if (isnull(STATUT) and isnull(SITUA)) then "est (ou était) l\'activité de l\'établissement ou du site où vous travaillez (ou travailliez)/ que vous dirigez" else (if (not(isnull(STATUT)) and STATUT < "8" and (SITUA = "1" or SITUA = "2")) then "est l\'activité de l\'établissement ou du site où vous travaillez" else ( if(not(isnull(STATUT)) and STATUT < "8" and ( SITUA > "2" or isnull(SITUA))) then "était l\'activité de l\'établissement ou du site où vous travailliez" else ( if((STATUT = "8" or STATUT = "9") and (SITUA = "1" or SITUA = "2")) then "est l\'activité de l\'établissement ou du site que vous dirigez" else ( if((STATUT = "8" or STATUT = "9") and (SITUA > "2" or isnull(SITUA))) then "était l\'activité de l\'établissement ou du site que vous dirigiez" else ( if(STATUT = "10" and (SITUA = "1" or SITUA = "2")) then "est l\'activité de l\'établissement ou du site que dirige la personne que vous aidez" else ( if(STATUT = "10" and (SITUA > "2" or isnull(SITUA))) then "était l\'activité de l\'établissement ou du site que dirige la personne que vous aidiez" else ( if( isnull(STATUT) and (SITUA = "1" or SITUA = "2")) then "est l\'activité de l\'établissement ou du site où vous travaillez" else ( if( isnull(STATUT) and (not(isnull(SITUA)) and SITUA > "2")) then "était l\'activité de l\'établissement ou du site où vous travailliez" else "était l\'activité de l\'établissement ou du site où vous travailliez"))))))))',
        type: 'VTL',
      },
      bindingDependencies: ['STATUT', 'SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'emploi7',
      expression: {
        value:
          'if (isnull(STATUT)) then "Si vous êtes (ou étiez) indépendant(e) ou à votre compte, chef(fe) d\'entreprise salarié(e) ou PDG, combien de salariés employez-vous (ou employiez-vous)" else (if ((STATUT = "8" or STATUT = "9") and (SITUA = "1" or SITUA = "2")) then "Combien de salariés employez-vous" else ( if((STATUT = "8" or STATUT = "9" ) and (SITUA > "2" or isnull(SITUA)) ) then "Combien de salariés employiez-vous" else ( if(STATUT = "10" and ( SITUA = "1" or SITUA = "2" )) then "Combien de salariés emploie la personne que vous aidez" else ( if(STATUT = "10" and ( SITUA > "2" or isnull(SITUA))) then "Combien de salariés employait la personne que vous aidiez" else ""))))',
        type: 'VTL',
      },
      bindingDependencies: ['STATUT', 'SITUA'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'plusieurnatio',
      expression: {
        value:
          'if (isnull(NATIO1N1) and isnull(NATIO1N2)) then "" else (if ( nvl(NATIO1N1, false) =true or nvl(NATIO1N2, false)= true ) then "autre " else "")',
        type: 'VTL',
      },
      bindingDependencies: ['NATIO1N1', 'NATIO1N2'],
      inFilter: 'false',
    },

    {
      variableType: 'CALCULATED',
      name: 'ANNEEENQ',
      expression: { value: 'cast(current_date(),string,"YYYY")', type: 'VTL' },
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'JOURENQ',
      expression: { value: 'cast(current_date(),string,"DD")', type: 'VTL' },
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'MOISENQ',
      expression: { value: 'cast(current_date(), date, "MM")', type: 'VTL' },
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'KISH_MIN',
      expression: { value: 'min(SCORE_KISH_INT)', type: 'VTL' },
      bindingDependencies: ['SCORE_KISH_INT', 'DATENAIS_TEL'],
      inFilter: 'true',
    },

    {
      variableType: 'CALCULATED',
      name: 'NB_POTENTIAL_KISH',
      expression: { value: 'sum(KISH_INDICATOR)', type: 'VTL' },
      bindingDependencies: ['KISH_INDICATOR', 'DATENAIS_TEL'],
      inFilter: 'true',
    },
  ],
  cleaning: {
    RESIDENCE: {
      POLITES: '(not(RESIDENCE = "1" or RESIDENCE = "9"))',
      NBHABT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      PRENOM_TEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      SEXE: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      DATENAIS_TEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      PASSER:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      IS_KISH:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
      PRESAKO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      DIPLOME:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETUDE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(DIPLOME = "4" or DIPLOME = "5" or DIPLOME = "6" or DIPLOME = "7" or DIPLOME = "8" or DIPLOME = "9" or DIPLOME = "10" or DIPLOME = "11" or DIPLOME = "12" ))',
      COUPLE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETAMATRI:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      PACS: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(ETAMATRI = "2"))',
      LNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      DEPNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
      PAYSNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not((LNAIS = "1") and not ((LNAIS = "2"))))',
      NATIO2N:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(isnull(NATIO1N3)))',
      NET: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      NUSEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      USEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
      IMPADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      RDVADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      MESADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      DECLADMX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      F_AUTADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
      IDUSE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
      DATECOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
      INFOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
      HOSTILE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      SECUNAV:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      PREOCC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      TRACKING:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      F_NUMEROS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      F_BOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(F_NUMEROS = "0" or isnull(F_NUMEROS) ))',
      F_FREQTEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
      F_FRESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FREWEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_SOMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LOIEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FAMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_TRAEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_OBSEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_DEPEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LIMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
      SITUA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      STATUT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ENCADR:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CONTRAT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CLASSIF:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      DUREE_EMP:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      PROFESSION:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      ACTILIB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      NOMBRSAL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT= "1" or STATUT= "2" or STATUT= "3" or STATUT= "4" or STATUT= "5" or STATUT= "6" or STATUT= "7" or STATUT= "11" or isnull(STATUT)))',
      SANTE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      REVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      TRANCHREVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(REVENU, "") >= 0))',
    },
    POLITES: {
      NBHABT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      PRENOM_TEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      SEXE: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      DATENAIS_TEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      PASSER:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      IS_KISH:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
      PRESAKO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9"))))',
      DIPLOME:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETUDE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(DIPLOME = "4" or DIPLOME = "5" or DIPLOME = "6" or DIPLOME = "7" or DIPLOME = "8" or DIPLOME = "9" or DIPLOME = "10" or DIPLOME = "11" or DIPLOME = "12" ))',
      COUPLE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETAMATRI:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      PACS: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(ETAMATRI = "2"))',
      LNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      DEPNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
      PAYSNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not((LNAIS = "1") and not ((LNAIS = "2"))))',
      NATIO2N:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(isnull(NATIO1N3)))',
      NET: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      NUSEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      USEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
      IMPADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      RDVADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      MESADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      DECLADMX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      F_AUTADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
      IDUSE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
      DATECOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
      INFOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
      HOSTILE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      SECUNAV:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      PREOCC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      TRACKING:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      F_NUMEROS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      F_BOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(F_NUMEROS = "0" or isnull(F_NUMEROS) ))',
      F_FREQTEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
      F_FRESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FREWEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_SOMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LOIEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FAMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_TRAEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_OBSEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_DEPEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LIMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
      SITUA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      STATUT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ENCADR:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CONTRAT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CLASSIF:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      DUREE_EMP:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      PROFESSION:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      ACTILIB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      NOMBRSAL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT= "1" or STATUT= "2" or STATUT= "3" or STATUT= "4" or STATUT= "5" or STATUT= "6" or STATUT= "7" or STATUT= "11" or isnull(STATUT)))',
      SANTE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      REVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      TRANCHREVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(REVENU, "") >= 0))',
    },
    NB_POTENTIAL_KISH: {
      IS_KISH:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
    },
    KISH_INDICATOR: {
      IS_KISH:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
    },
    DATENAIS_TEL: {
      IS_KISH:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(NB_POTENTIAL_KISH < 2))',
    },
    PRESAKO: {
      DIPLOME:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETUDE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(DIPLOME = "4" or DIPLOME = "5" or DIPLOME = "6" or DIPLOME = "7" or DIPLOME = "8" or DIPLOME = "9" or DIPLOME = "10" or DIPLOME = "11" or DIPLOME = "12" ))',
      COUPLE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ETAMATRI:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      PACS: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(ETAMATRI = "2"))',
      LNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      DEPNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
      PAYSNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not((LNAIS = "1") and not ((LNAIS = "2"))))',
      NATIO2N:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(isnull(NATIO1N3)))',
      NET: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      NUSEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      USEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
      IMPADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      RDVADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      MESADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      DECLADMX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      F_AUTADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
      IDUSE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
      DATECOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
      INFOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
      HOSTILE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      SECUNAV:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      PREOCC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      TRACKING:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      F_NUMEROS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      F_BOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(F_NUMEROS = "0" or isnull(F_NUMEROS) ))',
      F_FREQTEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
      F_FRESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FREWEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_SOMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LOIEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FAMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_TRAEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_OBSEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_DEPEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LIMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
      SITUA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      STATUT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      ENCADR:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CONTRAT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CLASSIF:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      DUREE_EMP:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      PROFESSION:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      ACTILIB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      NOMBRSAL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT= "1" or STATUT= "2" or STATUT= "3" or STATUT= "4" or STATUT= "5" or STATUT= "6" or STATUT= "7" or STATUT= "11" or isnull(STATUT)))',
      SANTE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      REVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3"))',
      TRANCHREVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(REVENU, "") >= 0))',
    },
    DIPLOME: {
      ETUDE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(DIPLOME = "4" or DIPLOME = "5" or DIPLOME = "6" or DIPLOME = "7" or DIPLOME = "8" or DIPLOME = "9" or DIPLOME = "10" or DIPLOME = "11" or DIPLOME = "12" ))',
    },
    ETAMATRI: {
      PACS: '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(ETAMATRI = "2"))',
    },
    LNAIS: {
      DEPNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not(LNAIS = "2"))',
      PAYSNAIS:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(LNAIS = "")) and (not((LNAIS = "1") and not ((LNAIS = "2"))))',
    },
    NATIO1N3: {
      NATIO2N:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(isnull(NATIO1N3)))',
    },
    NUSEWEB: {
      USEWEB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB ="") or (NUSEWEB = "2")))',
      IMPADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      RDVADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      MESADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      DECLADMX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(NUSEWEB = "3" or NUSEWEB ="4" or NUSEWEB =""))',
      F_AUTADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
      IDUSE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
      DATECOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
      INFOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
      HOSTILE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      SECUNAV:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      PREOCC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      TRACKING:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      F_FREQTEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
      F_FRESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FREWEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_SOMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LOIEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FAMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_TRAEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_OBSEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_DEPEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LIMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
    },
    F_RENADMX9: {
      F_AUTADM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or ((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))))',
      IDUSE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not(((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ) or (NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB))))',
      DATECOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) ))))',
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
      INFOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
      HOSTILE:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      SECUNAV:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      PREOCC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
      TRACKING:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4"))',
    },
    DATECOM: {
      PARTACHA:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
      NBCOM:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(cast(DATECOM,integer) > 1 or isnull(DATECOM)))',
    },
    COMPINFX6: {
      EXCEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(nvl(COMPINFX6,false)=false))',
    },
    INFOX: {
      VERIFINFO:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((NUSEWEB="3" or NUSEWEB= "4" or isnull(NUSEWEB)) and nvl(F_RENADMX9, false))) and (not((NUSEWEB ="3" or NUSEWEB = "4" or isnull(NUSEWEB)) and not (((NUSEWEB="1" or NUSEWEB="2") and nvl(F_RENADMX9, false) )))) and (not(NUSEWEB = "2" or NUSEWEB = "3" or NUSEWEB = "4")) and (not(INFOX= "2" or isnull(INFOX)))',
    },
    F_NUMEROS: {
      F_BOX:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(F_NUMEROS = "0" or isnull(F_NUMEROS) ))',
    },
    F_SMARTPHONEX1: {
      F_FREQTEL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4")) or (nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))',
      F_FRESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FREWEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_SOMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LOIEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_FAMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_TRAEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_OBSEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_DEPEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_LIMEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2")))))',
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
    },
    F_LIMEC: {
      F_RESEC:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="3" or NUSEWEB="4"))) and (not((NUSEWEB= "3" or NUSEWEB = "4" ) and not ((nvl(F_SMARTPHONEX1,false)=false and (NUSEWEB="1" or NUSEWEB="2"))))) and (not(nvl(F_LIMEC, "") = "2" ))',
    },
    STATUT: {
      ENCADR:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CONTRAT:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      CLASSIF:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT = "8" or STATUT = "9" or STATUT = "10"))',
      DUREE_EMP:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      PROFESSION:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      ACTILIB:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11"))',
      NOMBRSAL:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(STATUT = "11")) and (not(STATUT= "1" or STATUT= "2" or STATUT= "3" or STATUT= "4" or STATUT= "5" or STATUT= "6" or STATUT= "7" or STATUT= "11" or isnull(STATUT)))',
    },
    REVENU: {
      TRANCHREVENU:
        '(not((POLITES = "1") and not ((RESIDENCE = "1" or RESIDENCE = "9")))) and (not(PRESAKO = "3")) and (not(nvl(REVENU, "") >= 0))',
    },
  },
  missingBlock: {
    RESIDENCE_MISSING: ['RESIDENCE'],
    RESIDENCE: ['RESIDENCE_MISSING'],
    POLITES_MISSING: ['POLITES'],
    POLITES: ['POLITES_MISSING'],
    NBHABT_MISSING: ['NBHABT'],
    NBHABT: ['NBHABT_MISSING'],
    PRENOM_TEL_MISSING: ['PRENOM_TEL'],
    PRENOM_TEL: ['PRENOM_TEL_MISSING'],
    SEXE_MISSING: ['SEXE'],
    SEXE: ['SEXE_MISSING'],
    DATENAIS_TEL_MISSING: ['DATENAIS_TEL'],
    DATENAIS_TEL: ['DATENAIS_TEL_MISSING'],
    PASSER_MISSING: ['PASSER'],
    PASSER: ['PASSER_MISSING'],
    IS_KISH_MISSING: ['IS_KISH'],
    IS_KISH: ['IS_KISH_MISSING'],
    PRESAKO_MISSING: ['PRESAKO'],
    PRESAKO: ['PRESAKO_MISSING'],
    DIPLOME_MISSING: ['DIPLOME'],
    DIPLOME: ['DIPLOME_MISSING'],
    ETUDE_MISSING: ['ETUDE'],
    ETUDE: ['ETUDE_MISSING'],
    COUPLE_MISSING: ['COUPLE'],
    COUPLE: ['COUPLE_MISSING'],
    ETAMATRI_MISSING: ['ETAMATRI'],
    ETAMATRI: ['ETAMATRI_MISSING'],
    PACS_MISSING: ['PACS'],
    PACS: ['PACS_MISSING'],
    LNAIS_MISSING: ['LNAIS'],
    LNAIS: ['LNAIS_MISSING'],
    DEPNAIS_MISSING: ['DEPNAIS'],
    DEPNAIS: ['DEPNAIS_MISSING'],
    PAYSNAIS_MISSING: ['PAYSNAIS'],
    PAYSNAIS: ['PAYSNAIS_MISSING'],
    NATIO1N_MISSING: ['NATIO1N1', 'NATIO1N2', 'NATIO1N3', 'NATIO1N4'],
    NATIO1N1: ['NATIO1N_MISSING'],
    NATIO1N2: ['NATIO1N_MISSING'],
    NATIO1N3: ['NATIO1N_MISSING'],
    NATIO1N4: ['NATIO1N_MISSING'],
    NATIO2N_MISSING: ['NATIO2N'],
    NATIO2N: ['NATIO2N_MISSING'],
    NET_MISSING: ['NET'],
    NET: ['NET_MISSING'],
    F_DEBITX_MISSING: ['F_DEBITX1', 'F_DEBITX2', 'F_DEBITX3', 'F_DEBITX4'],
    F_DEBITX1: ['F_DEBITX_MISSING'],
    F_DEBITX2: ['F_DEBITX_MISSING'],
    F_DEBITX3: ['F_DEBITX_MISSING'],
    F_DEBITX4: ['F_DEBITX_MISSING'],
    NUSEWEB_MISSING: ['NUSEWEB'],
    NUSEWEB: ['NUSEWEB_MISSING'],
    USEWEB_MISSING: ['USEWEB'],
    USEWEB: ['USEWEB_MISSING'],
    DEVICEX_MISSING: [
      'DEVICEX1',
      'DEVICEX2',
      'DEVICEX3',
      'DEVICEX4',
      'DEVICEX5',
    ],
    DEVICEX1: ['DEVICEX_MISSING'],
    DEVICEX2: ['DEVICEX_MISSING'],
    DEVICEX3: ['DEVICEX_MISSING'],
    DEVICEX4: ['DEVICEX_MISSING'],
    DEVICEX5: ['DEVICEX_MISSING'],
    PRATINTXX_MISSING: [
      'PRATINTXX1',
      'PRATINTXX2',
      'PRATINTXX3',
      'PRATINTXX4',
      'PRATINTXX5',
      'PRATINTXX6',
      'PRATINTXX7',
      'PRATINTXX8',
      'PRATINTXX9',
      'PRATINTXX10',
      'PRATINTXX11',
      'PRATINTXX12',
      'PRATINTXX13',
    ],
    PRATINTXX1: ['PRATINTXX_MISSING'],
    PRATINTXX2: ['PRATINTXX_MISSING'],
    PRATINTXX3: ['PRATINTXX_MISSING'],
    PRATINTXX4: ['PRATINTXX_MISSING'],
    PRATINTXX5: ['PRATINTXX_MISSING'],
    PRATINTXX6: ['PRATINTXX_MISSING'],
    PRATINTXX7: ['PRATINTXX_MISSING'],
    PRATINTXX8: ['PRATINTXX_MISSING'],
    PRATINTXX9: ['PRATINTXX_MISSING'],
    PRATINTXX10: ['PRATINTXX_MISSING'],
    PRATINTXX11: ['PRATINTXX_MISSING'],
    PRATINTXX12: ['PRATINTXX_MISSING'],
    PRATINTXX13: ['PRATINTXX_MISSING'],
    EDUPROX_MISSING: ['EDUPROX1', 'EDUPROX2', 'EDUPROX3', 'EDUPROX4'],
    EDUPROX1: ['EDUPROX_MISSING'],
    EDUPROX2: ['EDUPROX_MISSING'],
    EDUPROX3: ['EDUPROX_MISSING'],
    EDUPROX4: ['EDUPROX_MISSING'],
    ADMX_MISSING: ['ADMX1', 'ADMX2', 'ADMX3', 'ADMX4'],
    ADMX1: ['ADMX_MISSING'],
    ADMX2: ['ADMX_MISSING'],
    ADMX3: ['ADMX_MISSING'],
    ADMX4: ['ADMX_MISSING'],
    IMPADM_MISSING: ['IMPADM'],
    IMPADM: ['IMPADM_MISSING'],
    RDVADM_MISSING: ['RDVADM'],
    RDVADM: ['RDVADM_MISSING'],
    MESADM_MISSING: ['MESADM'],
    MESADM: ['MESADM_MISSING'],
    DECLADMX_MISSING: ['DECLADMX'],
    DECLADMX: ['DECLADMX_MISSING'],
    RAIADMX_MISSING: ['RAIADMX1', 'RAIADMX2', 'RAIADMX3', 'RAIADMX4'],
    RAIADMX1: ['RAIADMX_MISSING'],
    RAIADMX2: ['RAIADMX_MISSING'],
    RAIADMX3: ['RAIADMX_MISSING'],
    RAIADMX4: ['RAIADMX_MISSING'],
    DEMADMX_MISSING: [
      'DEMADMX1',
      'DEMADMX2',
      'DEMADMX3',
      'DEMADMX4',
      'DEMADMX5',
    ],
    DEMADMX1: ['DEMADMX_MISSING'],
    DEMADMX2: ['DEMADMX_MISSING'],
    DEMADMX3: ['DEMADMX_MISSING'],
    DEMADMX4: ['DEMADMX_MISSING'],
    DEMADMX5: ['DEMADMX_MISSING'],
    F_AIDADMX_MISSING: [
      'F_AIDADMX1',
      'F_AIDADMX2',
      'F_AIDADMX3',
      'F_AIDADMX4',
      'F_AIDADMX5',
    ],
    F_AIDADMX1: ['F_AIDADMX_MISSING'],
    F_AIDADMX2: ['F_AIDADMX_MISSING'],
    F_AIDADMX3: ['F_AIDADMX_MISSING'],
    F_AIDADMX4: ['F_AIDADMX_MISSING'],
    F_AIDADMX5: ['F_AIDADMX_MISSING'],
    F_RENADMX_MISSING: [
      'F_RENADMX1',
      'F_RENADMX2',
      'F_RENADMX3',
      'F_RENADMX4',
      'F_RENADMX5',
      'F_RENADMX6',
      'F_RENADMX7',
      'F_RENADMX8',
      'F_RENADMX9',
    ],
    F_RENADMX1: ['F_RENADMX_MISSING'],
    F_RENADMX2: ['F_RENADMX_MISSING'],
    F_RENADMX3: ['F_RENADMX_MISSING'],
    F_RENADMX4: ['F_RENADMX_MISSING'],
    F_RENADMX5: ['F_RENADMX_MISSING'],
    F_RENADMX6: ['F_RENADMX_MISSING'],
    F_RENADMX7: ['F_RENADMX_MISSING'],
    F_RENADMX8: ['F_RENADMX_MISSING'],
    F_RENADMX9: ['F_RENADMX_MISSING'],
    F_AUTADM_MISSING: ['F_AUTADM'],
    F_AUTADM: ['F_AUTADM_MISSING'],
    IDUSE_MISSING: ['IDUSE'],
    IDUSE: ['IDUSE_MISSING'],
    IDTYPEX_MISSING: ['IDTYPEX1', 'IDTYPEX2', 'IDTYPEX3'],
    IDTYPEX1: ['IDTYPEX_MISSING'],
    IDTYPEX2: ['IDTYPEX_MISSING'],
    IDTYPEX3: ['IDTYPEX_MISSING'],
    IDNOX_MISSING: [
      'IDNOX1',
      'IDNOX2',
      'IDNOX3',
      'IDNOX4',
      'IDNOX5',
      'IDNOX6',
      'IDNOX7',
    ],
    IDNOX1: ['IDNOX_MISSING'],
    IDNOX2: ['IDNOX_MISSING'],
    IDNOX3: ['IDNOX_MISSING'],
    IDNOX4: ['IDNOX_MISSING'],
    IDNOX5: ['IDNOX_MISSING'],
    IDNOX6: ['IDNOX_MISSING'],
    IDNOX7: ['IDNOX_MISSING'],
    DATECOM_MISSING: ['DATECOM'],
    DATECOM: ['DATECOM_MISSING'],
    ACHATXX_MISSING: [
      'ACHATXX1',
      'ACHATXX2',
      'ACHATXX3',
      'ACHATXX4',
      'ACHATXX5',
      'ACHATXX6',
      'ACHATXX7',
      'ACHATXX8',
      'ACHATXX9',
      'ACHATXX10',
      'ACHATXX11',
      'ACHATXX12',
      'ACHATXX13',
      'ACHATXX14',
      'ACHATXX15',
      'ACHATXX16',
    ],
    ACHATXX1: ['ACHATXX_MISSING'],
    ACHATXX2: ['ACHATXX_MISSING'],
    ACHATXX3: ['ACHATXX_MISSING'],
    ACHATXX4: ['ACHATXX_MISSING'],
    ACHATXX5: ['ACHATXX_MISSING'],
    ACHATXX6: ['ACHATXX_MISSING'],
    ACHATXX7: ['ACHATXX_MISSING'],
    ACHATXX8: ['ACHATXX_MISSING'],
    ACHATXX9: ['ACHATXX_MISSING'],
    ACHATXX10: ['ACHATXX_MISSING'],
    ACHATXX11: ['ACHATXX_MISSING'],
    ACHATXX12: ['ACHATXX_MISSING'],
    ACHATXX13: ['ACHATXX_MISSING'],
    ACHATXX14: ['ACHATXX_MISSING'],
    ACHATXX15: ['ACHATXX_MISSING'],
    ACHATXX16: ['ACHATXX_MISSING'],
    ORIGINEX_MISSING: ['ORIGINEX1', 'ORIGINEX2', 'ORIGINEX3', 'ORIGINEX4'],
    ORIGINEX1: ['ORIGINEX_MISSING'],
    ORIGINEX2: ['ORIGINEX_MISSING'],
    ORIGINEX3: ['ORIGINEX_MISSING'],
    ORIGINEX4: ['ORIGINEX_MISSING'],
    PARTACHA_MISSING: ['PARTACHA'],
    PARTACHA: ['PARTACHA_MISSING'],
    NUMACHAX_MISSING: [
      'NUMACHAX1',
      'NUMACHAX2',
      'NUMACHAX3',
      'NUMACHAX4',
      'NUMACHAX5',
      'NUMACHAX6',
      'NUMACHAX7',
      'NUMACHAX8',
    ],
    NUMACHAX1: ['NUMACHAX_MISSING'],
    NUMACHAX2: ['NUMACHAX_MISSING'],
    NUMACHAX3: ['NUMACHAX_MISSING'],
    NUMACHAX4: ['NUMACHAX_MISSING'],
    NUMACHAX5: ['NUMACHAX_MISSING'],
    NUMACHAX6: ['NUMACHAX_MISSING'],
    NUMACHAX7: ['NUMACHAX_MISSING'],
    NUMACHAX8: ['NUMACHAX_MISSING'],
    SERVACHAX_MISSING: [
      'SERVACHAX1',
      'SERVACHAX2',
      'SERVACHAX3',
      'SERVACHAX4',
      'SERVACHAX5',
      'SERVACHAX6',
    ],
    SERVACHAX1: ['SERVACHAX_MISSING'],
    SERVACHAX2: ['SERVACHAX_MISSING'],
    SERVACHAX3: ['SERVACHAX_MISSING'],
    SERVACHAX4: ['SERVACHAX_MISSING'],
    SERVACHAX5: ['SERVACHAX_MISSING'],
    SERVACHAX6: ['SERVACHAX_MISSING'],
    SHARTX_MISSING: ['SHARTX1', 'SHARTX2', 'SHARTX3'],
    SHARTX1: ['SHARTX_MISSING'],
    SHARTX2: ['SHARTX_MISSING'],
    SHARTX3: ['SHARTX_MISSING'],
    SHARAX_MISSING: ['SHARAX1', 'SHARAX2', 'SHARAX3'],
    SHARAX1: ['SHARAX_MISSING'],
    SHARAX2: ['SHARAX_MISSING'],
    SHARAX3: ['SHARAX_MISSING'],
    NBCOM_MISSING: ['NBCOM'],
    NBCOM: ['NBCOM_MISSING'],
    PBACHAXX_MISSING: [
      'PBACHAXX1',
      'PBACHAXX2',
      'PBACHAXX3',
      'PBACHAXX4',
      'PBACHAXX5',
      'PBACHAXX6',
      'PBACHAXX7',
      'PBACHAXX8',
      'PBACHAXX9',
      'PBACHAXX10',
    ],
    PBACHAXX1: ['PBACHAXX_MISSING'],
    PBACHAXX2: ['PBACHAXX_MISSING'],
    PBACHAXX3: ['PBACHAXX_MISSING'],
    PBACHAXX4: ['PBACHAXX_MISSING'],
    PBACHAXX5: ['PBACHAXX_MISSING'],
    PBACHAXX6: ['PBACHAXX_MISSING'],
    PBACHAXX7: ['PBACHAXX_MISSING'],
    PBACHAXX8: ['PBACHAXX_MISSING'],
    PBACHAXX9: ['PBACHAXX_MISSING'],
    PBACHAXX10: ['PBACHAXX_MISSING'],
    FINANCEX_MISSING: ['FINANCEX1', 'FINANCEX2', 'FINANCEX3', 'FINANCEX4'],
    FINANCEX1: ['FINANCEX_MISSING'],
    FINANCEX2: ['FINANCEX_MISSING'],
    FINANCEX3: ['FINANCEX_MISSING'],
    FINANCEX4: ['FINANCEX_MISSING'],
    COMPINFX_MISSING: [
      'COMPINFX1',
      'COMPINFX2',
      'COMPINFX3',
      'COMPINFX4',
      'COMPINFX5',
      'COMPINFX6',
      'COMPINFX7',
      'COMPINFX8',
      'COMPINFX9',
    ],
    COMPINFX1: ['COMPINFX_MISSING'],
    COMPINFX2: ['COMPINFX_MISSING'],
    COMPINFX3: ['COMPINFX_MISSING'],
    COMPINFX4: ['COMPINFX_MISSING'],
    COMPINFX5: ['COMPINFX_MISSING'],
    COMPINFX6: ['COMPINFX_MISSING'],
    COMPINFX7: ['COMPINFX_MISSING'],
    COMPINFX8: ['COMPINFX_MISSING'],
    COMPINFX9: ['COMPINFX_MISSING'],
    EXCEL_MISSING: ['EXCEL'],
    EXCEL: ['EXCEL_MISSING'],
    INFOX_MISSING: ['INFOX'],
    INFOX: ['INFOX_MISSING'],
    VERIFINFO_MISSING: ['VERIFINFO'],
    VERIFINFO: ['VERIFINFO_MISSING'],
    MOYINFOX_MISSING: ['MOYINFOX1', 'MOYINFOX2', 'MOYINFOX3', 'MOYINFOX4'],
    MOYINFOX1: ['MOYINFOX_MISSING'],
    MOYINFOX2: ['MOYINFOX_MISSING'],
    MOYINFOX3: ['MOYINFOX_MISSING'],
    MOYINFOX4: ['MOYINFOX_MISSING'],
    RAISINFOX_MISSING: ['RAISINFOX1', 'RAISINFOX2', 'RAISINFOX3'],
    RAISINFOX1: ['RAISINFOX_MISSING'],
    RAISINFOX2: ['RAISINFOX_MISSING'],
    RAISINFOX3: ['RAISINFOX_MISSING'],
    HOSTILE_MISSING: ['HOSTILE'],
    HOSTILE: ['HOSTILE_MISSING'],
    CIBLEX_MISSING: [
      'CIBLEX1',
      'CIBLEX2',
      'CIBLEX3',
      'CIBLEX4',
      'CIBLEX5',
      'CIBLEX6',
      'CIBLEX7',
    ],
    CIBLEX1: ['CIBLEX_MISSING'],
    CIBLEX2: ['CIBLEX_MISSING'],
    CIBLEX3: ['CIBLEX_MISSING'],
    CIBLEX4: ['CIBLEX_MISSING'],
    CIBLEX5: ['CIBLEX_MISSING'],
    CIBLEX6: ['CIBLEX_MISSING'],
    CIBLEX7: ['CIBLEX_MISSING'],
    ACCESX_MISSING: [
      'ACCESX1',
      'ACCESX2',
      'ACCESX3',
      'ACCESX4',
      'ACCESX5',
      'ACCESX6',
      'ACCESX7',
    ],
    ACCESX1: ['ACCESX_MISSING'],
    ACCESX2: ['ACCESX_MISSING'],
    ACCESX3: ['ACCESX_MISSING'],
    ACCESX4: ['ACCESX_MISSING'],
    ACCESX5: ['ACCESX_MISSING'],
    ACCESX6: ['ACCESX_MISSING'],
    ACCESX7: ['ACCESX_MISSING'],
    SECUNAV_MISSING: ['SECUNAV'],
    SECUNAV: ['SECUNAV_MISSING'],
    PREOCC_MISSING: ['PREOCC'],
    PREOCC: ['PREOCC_MISSING'],
    TRACKING_MISSING: ['TRACKING'],
    TRACKING: ['TRACKING_MISSING'],
    F_NUMEROS_MISSING: ['F_NUMEROS'],
    F_NUMEROS: ['F_NUMEROS_MISSING'],
    F_BOX_MISSING: ['F_BOX'],
    F_BOX: ['F_BOX_MISSING'],
    F_SMARTPHONEX_MISSING: [
      'F_SMARTPHONEX1',
      'F_SMARTPHONEX2',
      'F_SMARTPHONEX3',
    ],
    F_SMARTPHONEX1: ['F_SMARTPHONEX_MISSING'],
    F_SMARTPHONEX2: ['F_SMARTPHONEX_MISSING'],
    F_SMARTPHONEX3: ['F_SMARTPHONEX_MISSING'],
    F_FREQTEL_MISSING: ['F_FREQTEL'],
    F_FREQTEL: ['F_FREQTEL_MISSING'],
    F_FRESEC_MISSING: ['F_FRESEC'],
    F_FRESEC: ['F_FRESEC_MISSING'],
    F_FREWEC_MISSING: ['F_FREWEC'],
    F_FREWEC: ['F_FREWEC_MISSING'],
    F_SOMEC_MISSING: ['F_SOMEC'],
    F_SOMEC: ['F_SOMEC_MISSING'],
    F_LOIEC_MISSING: ['F_LOIEC'],
    F_LOIEC: ['F_LOIEC_MISSING'],
    F_FAMEC_MISSING: ['F_FAMEC'],
    F_FAMEC: ['F_FAMEC_MISSING'],
    F_TRAEC_MISSING: ['F_TRAEC'],
    F_TRAEC: ['F_TRAEC_MISSING'],
    F_OBSEC_MISSING: ['F_OBSEC'],
    F_OBSEC: ['F_OBSEC_MISSING'],
    F_DEPEC_MISSING: ['F_DEPEC'],
    F_DEPEC: ['F_DEPEC_MISSING'],
    F_LIMEC_MISSING: ['F_LIMEC'],
    F_LIMEC: ['F_LIMEC_MISSING'],
    F_RESEC_MISSING: ['F_RESEC'],
    F_RESEC: ['F_RESEC_MISSING'],
    SITUA_MISSING: ['SITUA'],
    SITUA: ['SITUA_MISSING'],
    STATUT_MISSING: ['STATUT'],
    STATUT: ['STATUT_MISSING'],
    ENCADR_MISSING: ['ENCADR'],
    ENCADR: ['ENCADR_MISSING'],
    CONTRAT_MISSING: ['CONTRAT'],
    CONTRAT: ['CONTRAT_MISSING'],
    CLASSIF_MISSING: ['CLASSIF'],
    CLASSIF: ['CLASSIF_MISSING'],
    DUREE_EMP_MISSING: ['DUREE_EMP'],
    DUREE_EMP: ['DUREE_EMP_MISSING'],
    PROFESSION_MISSING: ['PROFESSION'],
    PROFESSION: ['PROFESSION_MISSING'],
    ACTILIB_MISSING: ['ACTILIB'],
    ACTILIB: ['ACTILIB_MISSING'],
    NOMBRSAL_MISSING: ['NOMBRSAL'],
    NOMBRSAL: ['NOMBRSAL_MISSING'],
    F_SANTE_MISSING: ['SANTE'],
    SANTE: ['F_SANTE_MISSING'],
    REVENU_MISSING: ['REVENU'],
    REVENU: ['REVENU_MISSING'],
    TRANCHREVENU_MISSING: ['TRANCHREVENU'],
    TRANCHREVENU: ['TRANCHREVENU_MISSING'],
  },
  resizing: {
    NBHABT: {
      size: 'cast(NBHABT, integer)',
      variables: ['PRENOM_TEL', 'SEXE', 'DATENAIS_TEL', 'PASSER', 'IS_KISH'],
    },
  },
} as any as LunaticSource
