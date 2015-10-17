import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {setView} from '../../ducks/uiStates';

const views = [
    {
      'title' : '看政黨',
      'id' : 'VIEW_PARTY',
      'icon': 'IssueController_party',
      'view' : 'parties'
    },
    {
      'title' : '看委員',
      'id' : 'VIEW_LEGISLATOR',
      'icon': 'IssueController_person',
      'view' : 'legislators'
    },
    {
      'title' : '看表態',
      'id' : 'VIEW_POSITION',
      'icon': 'IssueController_position',
      'view' : 'positions'
    }
];
@connect(
    state => ({
      uiStates: state.uiStates
    }),
    dispatch => bindActionCreators({setView}, dispatch))

export default class IssueController extends Component {

  render() {

    const styles = require('./IssueController.scss');
    const {uiStates, setView} = this.props;
    let bindSetView = setView.bind(this);
   
    let viewOptionItems = views.map((data,index)=>{

        let imgURL = require(`./images/${data.icon}.svg`);
        let itemActive = (data.view === uiStates.currentView) ? styles.optionItemActive : styles.optionItemInactive;
        let imgActive  = (data.view === uiStates.currentView) ? styles.optionImgActive : styles.optionImgInactive;
       
        return (
            <div className={`${styles.optionItem} ${itemActive}`}
                 key={index}
                 onClick={setView.bind(null,data.view)}>
                <img className={`${styles.optionImg} ${imgActive}`} src={imgURL} />
                <div className={styles.optionText}>{data.title}</div>
            </div>    
        )
    })

    return (
      <div className={styles.wrap}>
           {viewOptionItems}
      </div>
    );
  }

  props = {
    className: ''
  }
}


