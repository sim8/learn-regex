import App from "next/app";
import Router from "next/router";
import React from "react";
import { Provider, connect } from "react-redux";
import withRedux from "next-redux-wrapper";
import configureStore from "../lib/configureStore";
import * as gtag from "../lib/gtag";
import { fromJS } from "immutable";
import "../style.css";
import { mapKeys } from "../utils/objectUtils";
import { appRenderedOnClient } from "../actions/appActions";

Router.events.on("routeChangeComplete", url => gtag.pageview(url));

class LearnRegexApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return { pageProps };
  }

  componentDidMount() {
    this.props.appRenderedOnClient();
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
})(
  connect(
    null,
    {
      appRenderedOnClient
    }
  )(LearnRegexApp)
);
