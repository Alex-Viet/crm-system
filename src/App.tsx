import { HashRouter, BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routing/Routes';
import Header from './components/header/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
