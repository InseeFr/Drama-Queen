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
