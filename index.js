
import { createRoot } from 'react-dom/client'; // Import createRoot
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

// Get the root element
const container = document.getElementById('root');

// Create the root and render the app
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
