import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// import Immutable from 'immutable';

import configureStore from '../common/utils/configureStore';
// import { ProductState, ProductRecord, CartState, convertMapToImmutable } from '../common/constants/Types';
import routes from '../common/routes';

// Enable/Disable Redux Devtools
window.$REDUX_DEVTOOL = false;

let state = undefined;
if ( window.$REDUX_STATE ) {

	// 解開 server 預先傳來的資料包，稍後會放入 store 成為 initState
	state = window.$REDUX_STATE;

	// begin marshalling data into Immutable types
	// state.products = new ProductState( {
	// 	$fetched: document.location.pathname == '/',
	// 	productsById: convertMapToImmutable( state.products.productsById, ProductRecord ),
	// 	total: state.products.total,
	// } );
  //
	// state.carts = new CartState( {
	// 	cartsById: Immutable.List.of( ...state.carts.cartsById ),
	// } );

	// console.log( 'server-rendering state restored: ', state );
}

// TODO configureStore
const store = configureStore(state);
// TODO I'm not sure if this is the right place to do this. Maybe should be in
// configureStore
const history = syncHistoryWithStore(browserHistory, store);

// Watch routing in console
// history.listen(location => console.log(location.pathname));

ReactDOM.render(
  (
    <Provider store={ store }>
      <Router history={ history } routes={ routes }/>
    </Provider>
  ),
  document.getElementById('cancerBrowser')
)