import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';
//import Video from '../../components/Video/Video.js';

@connect(
    state => ({
                issues: state.issues
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Explorer extends Component {
  render() {
    const styles = require('./Explorer.scss');
    const {issues} = this.props;

    

    return (
      <div className={styles.wrap}>
          LET's Explore!
      </div>
    );
  }
}
