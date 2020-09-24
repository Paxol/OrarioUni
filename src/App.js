import React, { useState, useEffect } from 'react';

import { Provider } from 'react-redux';
import { store } from './redux';

import ContainerOrari from './ContainerOrari';

import CategorieLezioni, { CategorieLezioniContext } from './context/categorieLezioni';

function App() {
  const [categorieLezioni] = useState(new CategorieLezioni())

  useEffect(() => {
    categorieLezioni && categorieLezioni.getData();
  })

  return (
    <CategorieLezioniContext.Provider value={categorieLezioni}>
      <Provider store={store}>
        <ContainerOrari />
      </Provider>
    </CategorieLezioniContext.Provider>
  );
}

export default App;
