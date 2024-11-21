// /src/app.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppRouter from './pages/AppRouter';

const App: React.FC = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
