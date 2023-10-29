import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore } from 'redux';
import rootReducer from "./reducers/reducers";
import AppWithStore from "./store/store";
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(<App />);
root.render(<AppWithStore />);