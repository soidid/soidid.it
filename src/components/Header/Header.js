import React, {Component, PropTypes} from 'react';
import {Router, Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setToProecessing} from '../../ducks/processingState';
import {setIssue} from '../../ducks/uiStates';

@connect(
    state => ({
                issues: state.issues,
                uiStates: state.uiStates
              }),
    dispatch => bindActionCreators({setToProecessing, setIssue}, dispatch))

export default class Header extends Component {
  constructor(props){ super(props)
    const {params} = props;
    this.state = {
        showMenu: false
    }
  }
  _onClickIssue(){
    this._hideMenu();
    this.props.setToProecessing();
  }
  _toggleShowMenu(){
    this.setState({
        showMenu: !this.state.showMenu
    });
  }
  _hideMenu(){
    this.setState({
        showMenu: false
    });
  }
  render() {

    const styles = require('./Header.scss');
    const siteLogo = require('./images/logo-big-1.svg');
    const {showMenu} = this.state;
    const {issues, uiStates, setIssue} = this.props;
    const {processing} = this.props;

    let showStyle = (showMenu) ? styles.showMenu : "";

    let issueItems = Object.keys(issues).map((issueId, index)=>{

      let activeStyle = (uiStates.currentIssueUrl===issueId) ? styles.active : "";
      let symbol = require('./images/symbols_' + issues[issueId].titleEng + '.svg');

      return (
        <li key={index}
            onClick={setIssue.bind(null,issueId)}>
            <Link className={`${styles.navItem} ${activeStyle}`}
                  to={`/`}
                  onClick={this._onClickIssue.bind(this)}>
                    <img src={symbol} className={styles.symbol}/>
                    <span>{issues[issueId].title}</span>
            </Link>
        </li>
      )
    })

    
    let symbol_parties = require('./images/symbols_parties.svg');
    let symbol_about = require('./images/symbols_about.svg');
    let menu = require('./images/menu.svg');

    return (
      <nav className={`${styles.appbar} ${showStyle}`}>
          <div className={styles.inner}>
              
              <ul className={`${styles.lists} ${showStyle}`}>
                {issueItems}
              </ul>

              <div className={styles.rightToggle} onClick={this._toggleShowMenu.bind(this)}>
                <img src={menu}/>
              </div>
          </div>
      </nav>
    );
  }




}
