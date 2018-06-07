import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';
import { initializeListeners } from 'react-navigation-redux-helpers';

import LoginScreen from '../components/LoginScreen';
import MainScreen from '../components/MainScreen';
import ProfileScreen from '../components/ProfileScreen';
import { navigationPropConstructor } from '../utils/redux';

export const AppNavigator = createStackNavigator(
    {
        Main: { screen: MainScreen },
        Login: { screen: LoginScreen },
        
        Profile: { screen: ProfileScreen },
    },
    {
        initialRouteName: 'Main',
    }
)

class AppWithNavigationState extends React.Component {
    componentDidMount() {
        initializeListeners('root', this.props.nav);
        console.log('1------------');
        console.log(this.props.nav);
    }
    render() {
        const { dispatch, nav } = this.props;
        const navigation = navigationPropConstructor(dispatch, nav);
        console.log('3----');
        console.log({dispatch, nav});
        console.log('3----');
        return <AppNavigator  navigation={navigation}/>
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
}
/*
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])：链接 react组件 和 redux store。

参数(mapStateToProps(state, [ownProps]): stateProps)：定义了这个参数，组件会监听 redux store 的变化，在任何情况下，只要 redux store 发送变化， 
mapStateToProps 函数就会被调用。也就是说：mapStateToProps负责返回需要传递给子组件的 state。

这个函数必须返回一个纯对象，这个对象会与组件的props合并，如果省略这个参数，组件将监听不到 redux store 。

如果指定改回调函数中的第二个参数 ownProps，这个参数的值为传递到组件的props，而且只要组件接到新的 props，mapStateToProps 也会被调用。

参数(mapDispatchToProps(dispatch, [ownProps]): dispatchProps)：负责返回一个 dispatchProps，dispatchProps 是actionCreator的key和dispatch(action)的组合
*/
const mapStateToProps = state => ({
    nav: state.nav
})

/**
 * To use connect(), you need to define a special function 
 * called mapStateToProps that tells how to transform 
 * the current Redux store state into the props you want 
 * to pass to a presentational component you are wrapping
 */
//将props应用到渲染的组件 例如：AppWithNavigationState
export default connect(mapStateToProps)(AppWithNavigationState);
/**
 * Technically, a container component is just a React component
 *  that uses store.subscribe() to read a part of the Redux state tree 
 * and supply props to a presentational component it renders.
 *  You could write a container component by hand, 
 * but we suggest instead generating container components 
 * with the React Redux library's connect() function, 
 * which provides many useful optimizations to 
 * prevent unnecessary re-renders
 */