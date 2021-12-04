import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger'
import reducer from './reducers'
const getMiddleware = () => {
  if (process.env.NODE_ENV === 'production') {
    return applyMiddleware();
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(createLogger())
  }
};

// export default createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default createStore(reducer, getMiddleware());
