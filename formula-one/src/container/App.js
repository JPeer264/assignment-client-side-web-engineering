import React from 'react';
import { Provider } from 'react-redux';

import RootContainer from './RootContainer';
import createStore from '../redux';

const store = createStore();

const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);

export default App;
