// Reducer：reducer 的作用就是根据传入的 Action行为和旧的 state对象，
// 返回一个新的 state ，然后组件会根据 state 刷新。
// 当我们确定了组件的 state 对象结构 和 action 行为的时候就可以编写 reducer 中的内容。写法
/**
 *  function testReducer(state, action) {
        let key1 = action.key1;
        switch(action.type) {
            case TEST_ACTION:
                return {
                ...state,
                key1: key1 + '变化'
            };

            default:
                return state;
        }
    };

    export default testReducer;
 */

import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';

// Start with two routes: The Main screen, with the Login screen on top.
/**
 * Returns an optional navigation action that should be used 
 * when the user navigates to this path 
 * and provides optional query parameters
 */
const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
/** this should return a navigation state, with the following form
 * 得到如下格式的state
 * {
  index: 1, // identifies which route in the routes array is active
  routes: [
    {
      // Each route needs a name to identify the type.
      routeName: 'MyRouteName',

      // A unique identifier for this route in the routes array:
      key: 'myroute-123',
      // (used to specify the re-ordering of routes)

      // Routes can have any data, as long as key and routeName are correct
      ...randomRouteData,
    },
    ...moreRoutes,
  ]
}
 */
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Login');

/**
  * The reducer that outputs the new navigation state for a given action, with
  * an optional previous state. When the action is considered handled but the
  * state is unchanged, the output state is null.
  */
const initialNavState = AppNavigator.router.getStateForAction(
    secondAction,
    tempNavState
);

function nav(state = initialNavState, action) {
    console.log('2-----------');
    console.log(state);
    console.log(action);
    console.log(action.type);
    console.log('2-----------');
    let nextState;
    switch (action.type) {
        case 'Login':
            console.log('Login');
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.back(),
                state
            );
            break;
        case 'Logout':
            console.log('LogOut');
            nextState = AppNavigator.router.getStateForAction(
                NavigationActions.navigate({ routeName: 'Login' }),
                state
            );
            break;
        default:
            console.log('Default');
            nextState = AppNavigator.router.getStateForAction(action, state);
            break;
    }
    // Simply return the original `state` if `nextState` is null or undefined.
   console.log(nextState);
   console.log(state);
    return nextState || state;
}


const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
    case 'Login':
      return { ...state, isLoggedIn: true };
    case 'Logout':
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

/**
 * All combineReducers() does is generate a function 
 * that calls your reducers with the slices of state selected according to
 *  their keys, and combining their results into a single object again. 
 * It's not magic. And like other reducers, 
 * combineReducers() does not create a new object 
 * if all of the reducers provided to it do not change state
 */
//然我们的工程中可能会有多个 reducer 的情况，
// 通过 combineReducers 可以将多个 reducer 合成统一管理。

const AppReducer = combineReducers({
    nav,
    auth,
  });

  export default AppReducer;