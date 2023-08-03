import { BrowserRouter } from 'react-router-dom';

// project imports
import ThemeProvider from './theme'
import Router from './routes';


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}
