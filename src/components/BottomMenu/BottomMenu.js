import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

import parseToPartyView from '../../utils/parseToPartyView';
import parseToLegislatorView from '../../utils/parseToLegislatorView';
import parseToPositionView from '../../utils/parseToPositionView';
import parseToPartyPosition from '../../utils/parseToPartyPosition';

import {setActiveRecord} from '../../ducks/uiStates';

@connect(
    state => ({ 
                issues: state.issues,
                records: state.records,
                parties: state.parties,
                uiStates: state.uiStates
              }),
    dispatch => bindActionCreators({setActiveRecord}, dispatch))
export default class BottomMenu extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
    this.state = {
        viewWidth: "",
        partyView: parseToPartyView(props.records, props.issues),
        partyPosition: parseToPartyPosition(props.records, props.issues),
        legislatorView: parseToLegislatorView(props.records, props.issues),
        positionView: parseToPositionView(props.records, props.issues)
    }
  }
  _updateViewWidth(){
    if(window){
        this.setState({
           viewWidth: window.innerWidth
        })
    }
  }
  componentDidMount(){
    this._updateViewWidth();
    window.addEventListener('resize', this._updateViewWidth.bind(this));
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this._updateViewWidth.bind(this));
  }
  render() {
    const styles = require('./BottomMenu.scss');
    const {issues, parties, uiStates, setActiveRecord} = this.props;
    const {partyView, legislatorView, positionView, partyPosition} = this.state;
    
    let currentViewEng = issues[uiStates.currentIssueUrl].titleEng;
    console.log(uiStates.currentPartyId)
    let positionRecords = partyPosition[uiStates.currentPartyId].positions[currentViewEng];
    if(!positionRecords) return <div></div>

    let records = positionRecords.records.map((data,index)=>{
      
        let date = moment.unix(data.date);
        
        //是否為黨團
        let isCaucus = (data.legislator.indexOf("黨團")!== -1);
        let caucusStyle = isCaucus ? styles.caucus : "";
        let activeStyle = (uiStates.activeRecordId === data.id) ? styles.active : "";

        return (
          <div className={` ${styles.positionCube} ${styles[data.position]} ${caucusStyle} ${activeStyle}`}
               key={index}
               onClick={setActiveRecord.bind(null, data.id)}>
          </div>
          
        )
    
    });
    let containerStyle = {
      width: `${positionRecords.records.length * 60}px`
    }
   
    return (
      <div>
        <div className={styles.title}>{parties[uiStates.currentPartyId].name} 的表態</div>
        <div className={styles.wrap}>
          <div style={containerStyle}>
            {records}
          </div>
        </div>
      </div>
    )
  }

 
}
