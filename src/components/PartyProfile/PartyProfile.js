import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from "react-router";
import { connect } from 'react-redux';

@connect(
    state => ({parties: state.parties}),
    dispatch => bindActionCreators({}, dispatch))


export default class Profile extends Component {
  static propTypes = {
    parties: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired

  }

  render () {

    const styles = require('./PartyProfile.scss');

    const {parties, id} = this.props;
    const party = parties[id];

    let {name, seats} = party;


    return (
        <div className={`${styles.wrap} ${styles.partyTitle}`}>
          <header>
            <Link to={`/parties/${id}/records/`}>
              <div className={`${styles.partyFlag} ${styles.large} ${styles[id]}`}></div>
            </Link>
            <h1><Link className={`${styles.ia} ${styles.black} ${styles.big}`} to={`/parties/${id}/records/`}>{name}</Link></h1>
            <div className={styles.detail}>
              <p>第八屆立委席次</p>
              <p>{seats}/112</p>
            </div>
          </header>
        </div>
    );

  }
}
