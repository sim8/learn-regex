import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import configureStore from "../lib/configureStore";
import { fromJS } from "immutable";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    );
  }
}

const mapKeys = (obj = {}, fn) =>
  Object.keys(obj).reduce(
    (newObj, key) => ({
      ...newObj,
      [key]: fn(obj[key])
    }),
    {}
  );

// export default withRedux(configureStore, {
//   serializeState: state => mapKeys(state, key => key.toJS()),
//   deserializeState: state => mapKeys(state, key => fromJS(key))
// })(MyApp);

export default withRedux(configureStore, {
  serializeState: state => mapKeys(state, slice => slice.toJS()),
  deserializeState: state => mapKeys(state, slice => fromJS(slice))
})(MyApp);
