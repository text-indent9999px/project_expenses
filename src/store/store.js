import { createStore, applyMiddleware } from 'redux';
import rootReducer from "../reducers/reducers";
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from "../App";

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(/* middleware 들 */))
);

const AppWithStore = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

export default AppWithStore;

