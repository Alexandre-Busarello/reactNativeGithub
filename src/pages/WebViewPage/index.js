import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';
import { Loading } from './styles';

export default class WebViewPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repository').name,
  });

  state = {
    loading: true,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  hideSpinner() {
    this.setState({ loading: false });
  }

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;

    const uri = navigation.getParam('repository').html_url;

    return (
      <>
        <WebView
          onLoad={() => this.hideSpinner()}
          source={{ uri }}
          style={{ flex: 1 }}
        />
        {loading && (
          <Loading>
            <ActivityIndicator size="large" />
          </Loading>
        )}
      </>
    );
  }
}
