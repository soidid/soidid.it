import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import IssueController from '../../components/IssueController/IssueController.js';

import PartyPositionGroup from '../../components/PartyPositionGroup/PartyPositionGroup.js';
import PositionLegislatorGroup from '../../components/PositionLegislatorGroup/PositionLegislatorGroup.js';
import PositionPartyGroup from '../../components/PositionPartyGroup/PositionPartyGroup.js';

import {getAllRecords} from '../../ducks/records';
import parseToPartyView from '../../utils/parseToPartyView';
import parseToLegislatorView from '../../utils/parseToLegislatorView';
import parseToPositionView from '../../utils/parseToPositionView';

@connect(
    state => ({ 
                issues: state.issues,
                records: state.records,
                parties: state.parties,
                uiStates: state.uiStates
              }),
    dispatch => bindActionCreators({}, dispatch))

export default class StaticIssue extends Component {
    static propTypes = {
        records: PropTypes.object.isRequired
    }

    constructor(props){ super(props)
        this.state = {
           partyView: parseToPartyView(props.records, props.issues),
           legislatorView: parseToLegislatorView(props.records, props.issues),
           positionView: parseToPositionView(props.records, props.issues)
        }
    }

    render(){
      const styles = require('./StaticIssue.scss'); 
      const {issues, uiStates} = this.props; 
     
      const currentIssue = issues[uiStates.currentIssueUrl];
      const currentIssueName = uiStates.currentIssueUrl;
     
      const {parties} = this.props;
      const {partyView, legislatorView, positionView, userPosition} = this.state;


      if(!partyView[currentIssue.titleEng]) return <div></div>
      if(!legislatorView[currentIssue.titleEng]) return <div></div>
      if(!positionView[currentIssue.titleEng]) return <div></div>
     
      // 結果圖表

      // 1. 看政黨
      const currentPartyView = partyView[currentIssue.titleEng];
      let partyPositionGroups = currentPartyView.partyPositions.map((value, index)=>{
          //console.log(value);
          return <PartyPositionGroup data={value} 
                                     issueStatement={currentPartyView.statement} 
                                     issueURL={currentIssueName}
                                     parties={parties}
                                     key={index} />;
      });
  
  
      // 2. 看立委
      const currentLegislatorView = legislatorView[currentIssue.titleEng];
      let positionLegislatorGroups = currentLegislatorView.positions.map((value, index)=>{
          return <PositionLegislatorGroup data={value} 
                                          issueStatement={currentPartyView.statement} 
                                          issueURL={currentIssueName}
                                          parties={parties}
                                          key={index}/>;
      });
  
      // 3. 看表態
      const currentPositionView = positionView[currentIssue.titleEng];//只拿: 目前頁面議題的表態資料
      let positionPartyGroups = currentPositionView.positions.map((value, index)=>{
          //console.log(value);
          return <PositionPartyGroup data={value} 
                                     issueStatement={currentPartyView.statement}
                                     issueURL={currentIssueName}
                                     parties={parties}
                                     key={index} />;
      });
  
      let currentViewGroups, currentViewStatement;
      
     
      switch(uiStates.currentView){
        case 'parties': 
          currentViewStatement = `${currentIssue.statement}，政黨的態度是？`;
          currentViewGroups = partyPositionGroups;
          break;
        case 'legislators':
          currentViewStatement = `${currentIssue.statement}，委員的態度是？`;
          currentViewGroups = positionLegislatorGroups;
          break;
        case 'positions':
          currentViewStatement = `${currentIssue.statement}，委員有哪些具體表態行動？`;
          currentViewGroups = positionPartyGroups;
          break;
        
        default:
          currentViewGroups = partyPositionGroups;
        
      }

      return (
          <div className={styles.wrap}>
              <div className={styles.issueTitle}>{currentIssue.title}</div>
              <div className={styles.issueController}>
                <IssueController/>
              </div>
              <div className={styles.issueStatement}>{currentViewStatement}</div>
              <div className={styles.records}>
                  {currentViewGroups}
              </div>
          
          </div>
          );

     
    }
}