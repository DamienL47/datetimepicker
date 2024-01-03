# DateTimePicker React

Un sélecteur de date et d'heure flexible pour React utilisant Moment.js.

## Installation

Pour installer ce composant, utilisez npm ou yarn comme suit :

```bash
npm install react-datetimepicker
```

ou

```bash
yarn add react-datetimepicker
```

## Utilisation

Pour utiliser ce composant dans votre projet React...

```bash
import React, { useState } from 'react';
import { DateTimePicker } from 'nom-du-paquet';
import moment from 'moment';

function App() {
  const [dateTime, setDateTime] = useState({
    date: moment(),
    time: {
      hour: moment().hour(),
      minute: moment().minute(),
      second: moment().second(),
    },
  });

  const handleDateTimeChange = (newDateTime) => {
    setDateTime(newDateTime);
  };

  return (
    <DateTimePicker
      value={dateTime}
      onChange={handleDateTimeChange}
      showTime={true}
      // Autres props si nécessaire
    />
  );
}

export default App;
```

## Props

Les props suivantes sont disponibles pour le `DateTimePicker`

|              Props | Description                                                                                                   |
| -----------------: | ------------------------------------------------------------------------------------------------------------- |
|           language | Langue pour l'affichage du calendrier (utilisée avec moment.locale)                                           |
|              value | L'objet contenant à la fois la date et l'heure sélectionnées.                                                 |
|           onChange | Fonction pour gérer les changements de date et d'heure.                                                       |
|               date | La date actuelle sélectionnée (objet moment ou équivalent).                                                   |
|            setDate | Fonction pour mettre à jour la date sélectionnée                                                              |
|         formatDate | Format de la date pour l'affichage et la saisie (voir fichier Constants.js, utiliser FORMAT_DATE[0])          |
|      disabledDates | Tableau de dates à désactiver (généralement au format YYYY-MM-DD').                                           |
| disabledDaysOfWeek | Tableau des jours de la semaine à désactiver (par exemple, [0, 6] pour désactiver dimanche et samedi).        |
|           showTime | Booléen pour indiquer si le sélecteur d'heure (TimePicker) doit être affiché avec le calendrier.              |
|               time | L'heure actuelle sélectionnée, généralement sous la forme d'un objet avec des propriétés hour, minute, second |
|            setTime | Fonction pour mettre à jour l'heure sélectionnée.                                                             |
|         formatTime | Fomat de l'heure (voir Constant.js utiliser FORMAT_TIME[0])                                                   |
|      disabledHours | Tableau d'heures à désactiver (par exemple, [0, 1, 23] pour désactiver minuit, 1h du matin, et 23h)           |

## Langues et Localisation

Pour changer la langue du composant `DateTimePicker` utiliser :

```bash
import "moment/locale/*"; // "*" = Utiliser en, es, de, etc...
```

puis passer en props comme suit :

```bash
<DateTimePicker language="fr" //... />
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contribution

Les contributions à ce projet sont les bienvenues. Veuillez consulter les issues ouverts ou soumettre des pull requests.
