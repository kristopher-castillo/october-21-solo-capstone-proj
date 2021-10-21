import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import recipesReducer from './recipe';
import imagesReducer from './image';
import ingredientsReducer from './ingredient';
import instructionsReducer from './instructions';
import usersReducer from './user';

const rootReducer = combineReducers({
  session,
  users: usersReducer,
  recipes: recipesReducer,
  images: imagesReducer,
  ingredients: ingredientsReducer,
  instructions: instructionsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
