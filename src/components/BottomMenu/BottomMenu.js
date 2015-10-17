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
    const {issues, uiStates, setActiveRecord} = this.props;
    const {partyView, legislatorView, positionView} = this.state;
    
    console.log(partyView) 

    let currentViewEng = issues[uiStates.currentIssueUrl].titleEng;
    let data = partyView[currentViewEng].partyPositions[0];
    let records = data.records.map((data,index)=>{
      
        let date = moment.unix(data.date);
        
        //是否為黨團
        let isCaucus = (data.legislator.indexOf("黨團")!== -1);
        let caucusStyle = isCaucus ? styles.caucus : "";

        return (
          <div className={` ${styles.positionCube} ${styles[data.position]} ${caucusStyle }`}
               key={index}
               onClick={setActiveRecord.bind(null, data.id)}>
          </div>
          
        )
    
    });

    let containerStyle = {
      width: `${data.records.length * 40}px`
    }
    

    return (
      <div className={styles.wrap}>
        <div style={containerStyle}>
          {records}
        </div>
      </div>
    )
  }

 
}
