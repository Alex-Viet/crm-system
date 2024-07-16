import { HashRouter, BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routing/Routes';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
