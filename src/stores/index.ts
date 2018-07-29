import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createSelector } from 'reselect';
import { TodoAction } from './todo/actions';
import { epics as todoEipcs } from './todo/epics';
import * as fromTodo from './todo/reducer';

export type RootAction = TodoAction;

export interface RootState {
  todo: fromTodo.State;
}

const rootEpic = combineEpics(...todoEipcs);

const rootReducer = combineReducers<RootState>({
  todo: fromTodo.reducer
});

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(initialState?: RootState) {
  const epicMiddleware = createEpicMiddleware<RootAction, RootAction, RootState>();
  // configure middlewares
  const middlewares = [epicMiddleware];

  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));

  const storeInsrance = createStore(rootReducer, initialState!, enhancer);

  epicMiddleware.run(rootEpic);
  return storeInsrance;
}

// pass an optional param to rehydrate state on app start
export const store = configureStore();

/**
 * Data selector
 */
export const getTodoState = (state: RootState) => state.todo;
export const getTodos = createSelector(getTodoState, fromTodo.getTodos);
export const getTodoLoading = createSelector(getTodoState, fromTodo.getLoading);
