import { StrictMode, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import './App.scss';
import Store from './store/store';
import ObservedApp from './App.tsx';

interface State {
  store: Store;
}

const store = new Store();

export const Context = createContext<State>({
  store
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Context.Provider value={{ store }}>
      <ObservedApp />
    </Context.Provider>
  </StrictMode>
);
