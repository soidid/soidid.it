import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import DocumentMeta from 'react-document-meta';
import {connect} from 'react-redux';

import BottomMenu from '../../components/BottomMenu/BottomMenu.js';

@connect(
    state => ({
                issues: state.issues,
                records: state.records,
                uiStates: state.uiStates   
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class Explorer extends Component {
  render() {
    const styles = require('./Explorer.scss');
    const {issues, records, uiStates} = this.props;
   // console.log(records)
    console.log(uiStates)
    return (
      <div className={styles.wrap}>
          {records[uiStates.activeRecord]}
          <BottomMenu/>
      </div>
    );
  }
}
