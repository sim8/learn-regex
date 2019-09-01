import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import configureStore from "../lib/configureStore";
import { fromJS } from "immutable";
import "../style.css";
import { mapKeys } from "../utils/objectUtils";

class LearnRegexApp extends App {
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

export default withRedux(configureStore, {
  serializeState: state => mapKeys(state, slice => slice.toJS()),
  deserializeState: state => mapKeys(state, slice => fromJS(slice))
})(LearnRegexApp);
