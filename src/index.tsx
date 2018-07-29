import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/globals';

import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import TodoContainer from './containers/TodoContainer';
import registerServiceWorker from './registerServiceWorker';
import { store } from './stores';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>
        <Nav />
        <Switch>
          <Route exact={true} path="/" component={TodoContainer} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
