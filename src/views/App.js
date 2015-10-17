import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import DocumentMeta from 'react-document-meta';
import {createTransitionHook} from '../universalRouter';

import Header from '../components/Header/Header.js';
import './normalize.scss';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };
  constructor(props){ super(props)
  }
  componentWillMount() {
    const {router, store} = this.context;
    this.transitionHook = createTransitionHook(store);
    router.addTransitionHook(this.transitionHook);
  }
  componentWillUnmount() {
    const {router} = this.context;
    router.removeTransitionHook(this.transitionHook);
  }

  
  render() {
    const {issues, params} = this.props;
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <div className={styles.spaceBar}/>
        <Header />
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }




}
