import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AUTH_USER } from './actions/types'
import Header from './components/header'
import Welcome from './components/welcome'
import injectTapEventPlugin from 'react-tap-event-plugin'
import Signin from './components/auth/signin'
import Signout from './components/auth/signout'
import Signup from './components/auth/signup'
import NewListing from './components/listings/ListingNew';
import Listings from './components/listings/ListingList';
import EditListing from './components/listings/EditListing';
import { PrivateRoute } from './components/auth/require_auth'
import Feature from './components/feature'
import reducers from './reducers'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { composeWithDevTools } from 'redux-devtools-extension';


// Needed for onTouchTap with material-ui
// http://stackoverflow.com/a/34015469/988941

injectTapEventPlugin()

// const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
// const store = createStoreWithMiddleware(reducers)
// const token = localStorage.getItem('token')



const store = createStore(reducers,composeWithDevTools(
    applyMiddleware(reduxThunk)   
));

const token = localStorage.getItem('token')


if (token) {
  store.dispatch({type: AUTH_USER})
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div>
          <Header/>
          <div className="body container">
            <Route path="/" exact={true} component={Welcome}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/signup" component={Signup}/>
            <PrivateRoute path="/feature" component={Feature}/>
            <PrivateRoute path="/create-listing" component={NewListing}/>
            <PrivateRoute path="/listings" component={Listings}/>
            <PrivateRoute path="/listing/:listingId" component={EditListing}/>
          </div>
        </div>
      </MuiThemeProvider>
    </Router>
  </Provider>
  , document.getElementById('root'))
