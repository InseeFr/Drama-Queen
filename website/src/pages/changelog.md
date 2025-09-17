### 2.6.1

#### Correction de bugs

- depuis la version 2.5.7, l'authentification ne fonctionnait plus

#### Modifications mineures

- remplacement du logo de l'Insee

### 2.6.0

#### Nouvelles fonctionnalités

- export d'une méthode permettant de récupérer le tableau d'articulation d'une unité enquêtée.

### 2.5.9

#### Correction de bugs

- dans les questions de type liste déroulante ou recherche sur liste, le raccourci de passage à la page suivante ne fonctionnait pas. Corrigé par Lunatic 3.6.14
- lorsqu'une boucle paginée par occurence comporte des questions date/durée/recherche sur liste, le contenu des réponse d'une occurence s'affichait à nouveau sur l'occurence suivante. Corrigé par Lunatic 3.6.15

#### Montée de version Lunatic

Montée de version Lunatic 3.7.0

### 2.5.8

#### Modifications mineures

- amélioration du style des boutons du rond-point en cas de focus
- amélioration du style des infobulles

#### Montée de version Lunatic

Montée de version Lunatic 3.6.13

### 2.5.7

#### Correction de bugs

- lorsqu'un rond-point contenait une seule occurence qui était filtrée, on parcourait tout de-même la boucle pour cette occurence. Désormais elle est bien filtrée. Corrigé par Lunatic 3.6.10
- lorsqu'une modalité de choix unique ou multiple contient une demande de précision, les raccourcis associés aux modalités de réponse empêchaient de remplir correctement le champ de de précision. Corrigé par Lunatic 3.6.10

#### Montée de version Lunatic

Montée de version Lunatic 3.6.10

### 2.5.6

#### Correction de bugs

- une boucle paginée par occurence (une occurence par page) faisait crash l'application

### 2.5.5

#### Correction de bugs

- les contrôles de rond-point se déclenchaient mais ne s'affichaient pas. Corrigé par Lunatic 3.6.6
- les contrôles de boucle paginée ne se déclenchaient parfois pas. Corrigé par Lunatic 3.6.7
- lorsque la première occurence d'une boucle est filtrée, toutes les occurences étaient alors filtrées à tord. Apparu depuis Lunatic 3.5.0, corrigé par 3.6.8

#### Modifications mineures

- ajout de style sur le composant rond-point

#### Montée de version Lunatic

Montée de version Lunatic 3.6.8

### 2.5.4

#### QOL

- les performances des questionnaires ont été largement améliorées. Modifié par Lunatic 3.6.5
- amélioration des espacements entre les questions lorsqu'une page contient plusieurs questions

#### Montée de version Lunatic

Montée de version Lunatic 3.6.5

### 2.5.3

#### QOL

- en mode de visualisation, le téléchargement des données comporte désormais les variables calculées
- ajout d'un autofocus sur le champ de précision après sélection d'une modalité de question à choix unique. Ajouté par Lunatic 3.6.4

#### Montée de version Lunatic

Montée de version Lunatic 3.6.4

### 2.5.2

#### QOL

- les performances des questionnaires ont été améliorées. Modifié par Lunatic 3.6.3

#### Montée de version Lunatic

Montée de version Lunatic 3.6.3

### 2.5.1

#### Nouvelles fonctionnalités

- dans le cas d'une demande de précision pour une question à choix unique, il est désormais possible de définir une taille maximum de la réponse (infini par défaut). Ajouté par Lunatic 3.6.2

#### Correction de bugs

- question de type lien 2 à 2 : lorsque l'on modifie le nombre d'individus, toutes les données déjà renseignées étaient supprimées à tord. Désormais les liens des individus toujours existants sont conservés. Corrigé par Lunatic 3.6.2

#### Montée de version Lunatic

Montée de version Lunatic 3.6.2

### 2.5.0

#### Nouvelles fonctionnalités

- il est désormais possible d'avoir des questions obligatoires (avec contrôles bloquants). Ajouté par Lunatic 3.6.0
- il est désormais possible d'afficher un champ de réponse en lecture seule, selon une condition VTL. Ajouté par Lunatic 3.6.0

#### Modifications mineures

- amélioration des contrôles : affichage et réinitialisation des contrôles, meilleure gestion des NSP/Refus et bouton Continuer
- l'état "null" d'une unité enquêté n'existe plus. Elle n'a donc aucun état (et donc pas de sauvegarde de la page courante) tant qu'aucune donnée n'a été renseignée

#### Correction de bugs

- lorsqu'une question est filtré, les contrôles associés se déclenchaient parfois à tord, empêchant de poursuivre le parcours du questionnaire. Corrigé par Lunatic 3.5.8

#### Montée de version Lunatic

Montée de version Lunatic 3.6.1

### 2.4.3

#### Nouvelles fonctionnalités

- ajout des contrôles Lunatic dans le questionnaire

#### Correction de bugs

- dans une boucle lorsque l'on modifiait le nombre d'occurences, toutes les données de la boucle (hormi la 1e occurence) étaient supprimées. Désormais les données des occurences toujours existantes sont bien conservées. Corrigé par Lunatic 3.5.4
- amélioration de l'accessibilité pour les questions obligatoires. Corrigé par Lunatic 3.5.4
- question de type date : le nombre maximum d'heures était défini à 99 à tord. Il est désormais défini correctement par le questionnaire (infini par défaut). Corrigé par Lunatic 3.5.6
- le passage automatique à la page suivante a été retiré lors de la sélection d'une modalité de question à choix unique, lorsque la modalité requiert l'ajout d'une précision

#### Montée de version Lunatic

Montée de version Lunatic 3.5.6

### 2.4.2

#### Nouvelles fonctionnalités

- question de type date : un datepicker est désormais disponible pour ne plus avoir plusieurs champs
- tableau dynamique : il est désormais possible de filtrer une case du tableau selon une formule. Ajouté par Lunatic 3.5.2

#### Correction de bugs

- question de type nombre : les valeurs possibles respectent désormais correctement le minimum et maximum définis dans le questionnaire. Modifié par Lunatic 3.5.3

#### Montée de version Lunatic

Montée de version Lunatic 3.5.3

### 2.4.1

#### Correction de bugs

- l'url de redirection lors de l'authentification était incorrecte (depuis la v2.3.12)

### 2.4.0

#### QOL

- amélioration des performances des questionnaires. Modifié par Lunatic 3.5.0

#### Montée de version Lunatic

Montée de version Lunatic 3.5.0

### 2.3.12

#### Correction de bugs

- la suppression de ligne dans un tableau dynamique ne fonctionnait plus. Corrigé par Lunatic 3.4.21
- la langue par défaut a été modifiée en français pour éviter des traductions involontaires du navigateur

#### Modifications mineures

- amélioration du style du composant rond-point de Lunatic
- amélioration du style des infobulles Lunatic

#### Montée de version Lunatic

Montée de version Lunatic 3.4.21

### 2.3.11

#### Correction de bugs

- correction de variables d'environnement pour le service worker des ressources externes (bug apporté par la version 2.3.10)

### 2.3.10

#### Nouvelles fonctionnalités

- synchronisation : prise en compte de la réponse 423 comme un succès lors de l'envoi d'une unité enquêtée (la synchronisation ne s'arrête plus)

#### Montée de version Lunatic

Montée de version Lunatic 3.4.20

### 2.3.9

#### Nouvelles fonctionnalités

- question de type texte : ajout d'un compteur de caractères saisis sur la longueur maximale autorisée. Ajouté par Lunatic 3.4.19

#### Correction de bugs

- boucle non paginée : le bouton "Continuer" pour passer à la page suivante était parfois absent même si une réponse était renseignée. Corrigé par Lunatic 3.4.18

#### Montée de version Lunatic

Montée de version Lunatic 3.4.19

### 2.3.8

#### Nouvelles fonctionnalités

- prise en compte des questionnaires Lunatic utilisant le composant Question
- ajout d'une barre de progression des séquences du questionnaire dans la barre latérale de droite
- question de type nombre : ajout d'une description du format attendu (minimum, maximum, unité). Ajouté par Lunatic 3.4.15

#### Modifications mineures

- amélioration de la taille des champs de saisie et du texte pour faciliter la saisie
- séparation de la zone centrale du questionnaire en 3 zones fixes : "Question + réponses", "Ne sait pas / Refus + Continuer", "tableau de navigation interitération de boucle"

#### Correction de bugs

- recherche sur liste : lors de la sélection d'une saisie libre, le bouton "Continuer" pour passer à la page suivante était absent. Corrigé par Lunatic 3.4.17

#### Montée de version Lunatic

Montée de version Lunatic 3.4.17

### 2.3.7

#### Nouvelles fonctionnalités

- question de type texte/nombre : rappel de la valeur saisie au survol du champ de réponse (avec l'unité dans le cas du champ nombre). Ajouté par Lunatic 3.4.13

#### Montée de version Lunatic

Montée de version Lunatic 3.4.13

### 2.3.6

#### Correction de bugs

- la sortie du questionnaire via le menu de gauche provoquait parfois la fermeture involontaire de la fenêtre

### 2.3.5

#### Nouvelles fonctionnalités

- question de type texte/nombre : lorsque la saisie dépasse la taille du champ, ajout d'un '...' lorsque le champ n'est pas focus pour améliorer la lisibilité. Ajouté par Lunatic 3.4.9

#### Correction de bugs

- question de type date : la saisie d'une date au format YYYY-MM-DD avec une année sur 1 ou 2 digits était considérée invalide, et n'était donc pas enregistrée. Corrigé par Lunatic 3.4.9

#### Modifications mineures

- question de type date : modification de l'exemple du mois (07 -> 7) pour être cohérent avec les possibilités de saisie

#### Montée de version Lunatic

Montée de version Lunatic 3.4.12

### 2.3.4

#### Modifications mineures

- retrait des données mockées lors de la synchronisation

### 2.3.3

#### Correction de bugs

- optimisation la synchronisation des ressources externes qui pouvaient faire crash le navigateur (consommation de mémoire excessive)

### 2.3.2

#### Build

- retrait du "drama-queen-container", le sous-projet "drama-queen" est déplacé à la racine du projet

### 2.3.1

#### Correction de bugs

- les stopwords n'étaient pas pris en compte dans la recherche sur liste (suggester). Corrigé par Lunatic 3.4.8

#### Montée de version Lunatic

Montée de version Lunatic 3.4.8

### 2.3.0

#### Nouvelles fonctionnalités

- prise en compte d'un module applicatif externe (gide) :
  - import de script externe
  - récupération de ressources externes lors de la synchronisation (y compris fichiers audio)
  - ajout de variables externes "globale" dans les données d'une unité enquêtée

### 2.2.9

#### Correction de bugs

- le composant CheckboxBoolean n'était pas affiché (dans et hors tableau)

### 2.2.8

#### Correction de bugs

- lors de la synchronisation, les cas d'erreurs réseau (400, 403, 404, 500) n'étaient pas gérés comme attendus, menant à un échec de la synchronisation

### 2.2.7

#### Build

- mise à jour globale des dépendances

### 2.2.6

#### Correction de bugs

- les contrôles n'étaient pas déclenchés dans les boucles non paginées. Corrigé par Lunatic 3.4.3

#### Montée de version Lunatic

Montée de version Lunatic 3.4.3

### 2.2.5

#### Correction de bugs

- les déclarations n'étaient pas affichées pour les questions de type "dropdown" et "suggester". Corrigé par Lunatic 3.4.2

#### Montée de version Lunatic

Montée de version Lunatic 3.4.2

### 2.2.4

#### Correction de bugs

- l'authentification ne se faisait pas correctement lorsque l'application est embarquée dans une application parent

#### Montée de version Lunatic

Montée de version Lunatic 3.4.1

### 2.2.3

### 2.2.2

#### Correction de bugs

- l'application ne se mettait plus à jour lorsqu'elle était lancée en "standalone", dû à l'ancien fonctionnement offline

### 2.2.1

#### Correction de bugs

- lors de la récupération d'unités enquêtées à la synchronisation, les objets de l'attribut "personalization" étaient vidés à tord

#### Modifications

- au chargement d'un questionnaire, le loader est désormais davantage visible

### 2.2.0

#### Correction de bugs

- lorsque l'application est embarquée dans une application parent, la mise à jour ne se faisait pas toujours correctement

#### Modifications

- l'application en "standalone" (non embarquée dans une application parent) ne dispose plus de fonctionnement offline
- l'ouverture d'un questionnaire avec une version du lunaticModel {'<='} 2.2.10 n'est désormais plus possible et renvoie vers une page d'erreur

#### Suppressions

- le module "queen-v1" a été totalement retiré de l'application

#### Refactorisation

- le fonctionnel permettant un fonctionnement offline de l'application lorsqu'elle est embarquée dans une application parent a été déplacé du module "queen-v1" vers Drama-Queen

### 2.1.7

#### Correction de bugs

- typage des données : ajout du format des variables du composant "pairwise" de Lunatic

### 2.1.6

#### Nouvelles fonctionnalités

- ajout d'une pop-up à l'ouverture du questionnaire, proposant de revenir à la première page ou reprendre à la page courante avant la fermeture
- les champs de réponse de type "nombre" sont capables d'afficher une unité "dynamique" calculée par une expression VTL. Ajouté par Lunatic 3.1.2

#### Modifications

- menu : la navigation vers une séquence/sous-séquence est désormais possible uniquement si sa première page se trouve avant la page courante. Elle était auparavant disponible si sa première page se trouvait avant la dernière page atteinte. Modifié par Lunatic 3.2.0

#### Suppressions

- le bouton "Suite de l'entretien" permettant une avance rapide vers la dernière page atteinte (lastReachedPage) a été supprimé. Lorsqu'il était présent, il a été remplacé par le bouton "Continuer"

#### Montée de version Lunatic

Montée de version Lunatic 3.2.0

### 2.1.5

#### Correction de bugs

- lors de la récupération d'une unité enquêtée via l'api, les variables 'personalization' et 'comment' étaient obligatoires, pouvant rendre la synchronisation bloquante

### 2.1.4

#### Correction de bugs

- lors de la récupération d'une unité enquêtée via l'api, les différentes valeurs collectées (COLLECTED, EDITED, FORCED, INPUTED, PREVIOUS) étaient obligatoires, pouvant rendre la synchronisation bloquante
- le type de l'état de questionnaire (stateData.state) n'acceptait pas la valeur 'TOEXTRACT', pouvant rendre la synchronisation bloquante

### 2.1.3

#### Correction de bugs

- menu : la gestion du scroll n'était pas adaptée si l'un ou plusieurs panneaux nécessitent un scroll
- sur les questions à choix unique (radio), la sélection d'une modalité déjà sélectionnée provoquait le passage à la page suivante, au lieu de ne rien faire. Corrigé par Lunatic 3.1.0
- accessibilité : il était impossible de mettre le focus sur les boutons radio tant qu'aucune modalité n'était sélectionnée. Corrigé par Lunatic 3.1.0

#### Montée de version Lunatic

Montée de version Lunatic 3.1.1

### 2.1.2

#### Correction de bugs

- la navigation était bloquée lorsque l'on atteignait une boucle qui n'a aucune itération. Corrigé par Lunatic 3.0.9

#### Montée de version Lunatic

Montée de version Lunatic 3.0.9

### 2.1.1

#### Correction de bugs

- les valeurs minimum et maximum des réponses de type "nombre" ne pouvaient être que des entiers. Corrigé par Lunatic 3.0.3
- la dernière page atteinte était mal calculée à l'intérieur et à la sortie d'une boucle. Corrigé par Lunatic 3.0.5
- les variables calculées depuis une boucle étaient parfois mal calculées. Corrigé par Lunatic 3.0.5

#### Montée de version Lunatic

Montée de version Lunatic 3.0.6

### 2.1.0

#### Nouvelles fonctionnalités

- menu : ajout de la navigation vers les séquences et sous-séquences appartenant à une boucle, grâce aux améliorations de Lunatic 3.0.0

#### Correction de bugs

- meilleure gestion des cas de déclenchement du passage automatique à la page suivante
- synchronisation : la synchronisation s'arrêtait lors de la récupération d'une unité enquêtée en cas de réponse [400, 403, 404, 500]
- queen-v1 : la version de lunaticModel d'un questionnaire pour renvoyer vers l'orchestrateur queen-v1 était erronnée (corrigée à 2.2.10)
- visualisation : l'url de visualisation de questionnaire était doublement encodée, rendant parfois bloquante la visualisation d'un questionnaire

#### Refactorisation

- réinternalisation du style de tous les composants Lunatic, dû à la montée de version Lunatic
- modification de certains types (nomenclature, pages & pageTag), dû à la montée de version Lunatic
- refactorisation de useAutoNext, dû à la montée de version Lunatic
- refactorisation du fil d'Ariane utilisant le composant Overview, dû à la montée de version Lunatic
- suppression des workers pour les suggesters, dû à la montée de version Lunatic

#### Montée de version Lunatic

Montée de version Lunatic 3.0.1

### 2.0.0

à ajouter...
