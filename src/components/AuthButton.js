import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-native';
import { NavigationActions } from 'react-navigation';

// const AuthButton = ({ logout, loginScreen, isLoggedIn }) => (
//     <Button
//       title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
//       onPress={isLoggedIn ? logout : loginScreen}
//     />
//   );

class AuthButton extends React.Component {
  render() {
    const { logout, loginScreen, isLoggedIn } = this.props;
    return (
      <Button
        title={isLoggedIn ? 'Log Out' : 'Open Login Screen'}
        onPress={isLoggedIn ? logout : loginScreen}
      />)
  }
}

AuthButton.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  loginScreen: PropTypes.func.isRequired,
};
// 获取 state 变化
/**当 reducer 接收到我们触发的 行为 并进行一系列处理后，
 * 最终会返回一个新的 state，那么 就会自动调用 mapStateToProps 来告诉系统，
 * state 被操作了，那么我们就可以通过 mapStateToProps 来获取 state 状态： */
const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

// 发送行为
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'Logout' }),
  loginScreen: () =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});
// 那么接下来我们 怎么改变文字 呢？前面提到，
// connect 作用就是生成一个新的组件，
// 新的组件的 props 中包含了数据获取和操作数据的函数，
// 所以我们需要让 子组件拿到容器组件中的 props，
// 然后在 子组件 中通过 props 就可以拿到上面 定义的 value 和 mapDispatchToProps
export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
/**
 * To use connect(), 
 * you need to define a special function called mapStateToProps 
 * that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. 
 */