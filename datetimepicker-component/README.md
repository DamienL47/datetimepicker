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
