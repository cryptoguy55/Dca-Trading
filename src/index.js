import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import Spinner from './components/spinner'
import reportWebVitals from './reportWebVitals';
import "./index.scss"
const LazyApp = lazy(() => import("./App"))

ReactDOM.render(
    <Provider store={store}>
      <Suspense fallback={<Spinner />}>
        <LazyApp />
      </Suspense>
    </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
