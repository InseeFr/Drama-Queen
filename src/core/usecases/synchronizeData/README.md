# Synchronisation des données (`thunks.ts`)

Ce module gère la synchronisation des données entre le client et le serveur via deux opérations principales :

- **upload** : Envoi des données locales du client vers le serveur.
- **download** : Téléchargement des données du serveur vers le client.

Chaque étape de la synchronisation est suivie par des actions Redux pour permettre le suivi de la progression et la gestion des états.

Dans l'ordre: 
1. **upload**
2. **download**

(**upload** appel la fonction **download** quand **upload** est bien terminée)

---

### 1. Envoi (`upload`)

#### a. Initialisation

- Vérifie que la synchronisation n’est pas déjà en cours.
- Déclenche l’action `runningUpload`.
- Initialise le stockage local pour la synchronisation.

#### b. Envoi des interrogations

- Récupère toutes les interrogations locales.
- Pour chaque interrogation :
  - Tente de l’envoyer via l’API.
  - **Gestion d’erreur** :
    - Si le serveur répond 423, considère comme succès.
    - Si le serveur répond 400, 403, 404 ou 500 :
      - Tente de l’envoyer dans une zone temporaire.
      - Marque l’interrogation comme envoyée en zone temporaire.
      - Supprime le paradata associé.
      - Si l’envoi en zone temporaire échoue, log l’erreur et arrête la synchronisation.
    - Pour toute autre erreur, log et arrête la synchronisation.
  - Supprime l’interrogation locale après envoi (succès ou zone temporaire).
  - Déclenche l’action de progression.

#### c. Envoi des paradata (si la télémétrie n’est pas désactivée)

- Récupère tous les paradata locaux non supprimés.
- Pour chaque paradata :
  - Tente de l’envoyer via l’API.
  - Supprime le paradata local après envoi.
  - Déclenche l’action de progression.
  - **Gestion d’erreur** : Log l’erreur en cas d’échec, mais continue la synchronisation.

#### d. Finalisation

- Déclenche l’action `uploadCompleted`.
- lance un téléchargement pour rafraîchir les données locales.
- **Gestion d’erreur globale** : Si une erreur non gérée survient, marque une erreur dans le stockage local et déclenche l’action `uploadError`.

---

## Fonctionnement étape par étape

### 2. Téléchargement (`download`)

#### a. Initialisation

- Vérifie que la synchronisation n’est pas déjà en cours (`state.stateDescription === 'running'`).
- Déclenche l’action `runningDownload`.

#### b. Récupération des campagnes et questionnaires

- Appelle l’API pour obtenir la liste des campagnes et des questionnaires associés.
- Déduit la liste des questionnaires à télécharger (sans doublons).

#### c. Téléchargement des questionnaires

- Pour chaque questionnaire, tente de le télécharger :
  - En cas de succès, l’ajoute à la liste des questionnaires téléchargés.
  - En cas d’échec, log l’erreur et continue la synchronisation.

#### d. Téléchargement des interrogations

- Pour chaque campagne, récupère les interrogations associées.
- Pour chaque interrogation :
  - Tente de la télécharger et de la stocker localement.
  - Si le questionnaire associé a bien été téléchargé, marque l’interrogation comme réussie.
  - **Gestion d’erreur** : Si l’erreur HTTP est 400, 403, 404 ou 500, log l’erreur et continue la synchronisation. Sinon, lève l’erreur et arrête la synchronisation.

#### e. Téléchargement des nomenclatures

- Pour chaque nomenclature associée aux questionnaires, tente de la télécharger.
- **Gestion d’erreur** : Log l’erreur en cas d’échec, mais continue la synchronisation.

#### f. Synchronisation des ressources externes

- Si une URL de ressources externes est définie :
  - Récupère la liste des questionnaires externes.
  - Filtre ceux qui sont nécessaires ou non.
  - Télécharge les ressources manquantes pour les questionnaires nécessaires.
  - Supprime les caches des questionnaires externes non nécessaires et les caches obsolètes.
  - **Gestion d’erreur** : Log les erreurs HTTP 400, 403, 404, 500 lors de la récupération de la liste ou des ressources, mais continue la synchronisation.

#### g. Finalisation

- Attend la fin de toutes les promesses (interrogations, nomenclatures, ressources externes).
- Déclenche l’action `downloadCompleted`.
- **Gestion d’erreur globale** : Si une erreur non gérée survient, log l’erreur, marque une erreur dans le stockage local, et déclenche l’action `downloadFailed`.



---

## Gestion des erreurs : résumé

- **Erreurs HTTP 400, 403, 404, 500** : Loggées, la synchronisation continue sauf pour l’envoi en zone temporaire où l’échec arrête l’upload.
- **Erreur HTTP 423 (upload interrogation)** : Considérée comme un succès.
- **Autres erreurs** : Loggées et arrêtent la synchronisation.
- **Erreurs sur les ressources externes et nomenclatures** : Loggées, la synchronisation continue.
- **Erreur globale** : Toute erreur non gérée arrête la synchronisation et marque une erreur dans le stockage local.

---

## Points clés

- La synchronisation est robuste : la plupart des erreurs sont loggées et n’arrêtent pas le processus, sauf cas critiques.
- Les actions Redux permettent de suivre la progression et l’état de la synchronisation.
- Les interrogations non envoyées sont placées en zone temporaire pour une tentative ultérieure.
- Les paradata sont envoyés uniquement si la télémétrie est activée.

---

**Pour toute modification, veillez à respecter la gestion fine des erreurs pour garantir la continuité de la synchronisation et la cohérence des données locales et serveur.**
