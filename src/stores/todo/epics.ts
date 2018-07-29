import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { delay, filter, switchMap } from 'rxjs/operators';
import { isActionOf } from 'typesafe-actions';
import { RootAction } from '..';
import { todoActions } from './actions';

const loadTodos: Epic<RootAction> = action$ =>
  action$.pipe(
    filter(isActionOf(todoActions.load)),
    delay(2000),
    switchMap(() => {
      const mockTodo = [{ id: 1, item: 'item1' }];
      return of(todoActions.loadSuccess(mockTodo));
    })
  );

export const epics = [loadTodos];
