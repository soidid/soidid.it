import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import moment from 'moment';

import eng2cht from '../../utils/eng2cht';
import position2color from '../../utils/position2color';
import rectInCircleLayout from '../../utils/rectInCircleLayout';

import {setActiveParty} from '../../ducks/uiStates';

@connect(
    state => ({}),
    dispatch => bindActionCreators({setActiveParty}, dispatch))
export default class PartyPositionGroup extends Component {
  static propTypes = {
  }
  constructor(props){ super(props)
    this.state = {
       viewWidth: ""
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
    const styles = require('./PartyPositionGroup.scss');
    const {data, issueURL, userPosition, issueStatement} = this.props;
    const {parties, setActiveParty} = this.props;

    let partyTitle = eng2cht(data.party);//KMT->中國國民黨

    let records = data.records.map((item,index)=>{
      return <Record data={item}
                     key={index} />
    });
    

    // 處理有多少人曾經表態，表態做主要的立場為何
    let partyPercentageItem;
    let partyHasPositionPercentage = Math.round((data.hasPositionCount/parties[data.party].hasBeenCount) * 100, 0);
    partyPercentageItem = (
      <div>
        <div className={styles.metaTitle}>{`${partyHasPositionPercentage}%的立委曾經表態`}</div>
        <div className={styles.metaTitle}>表態紀錄中{`${data.dominantPercentage}%${eng2cht(data.dominantPosition)}`}</div>
      </div>
    )

    if(data.hasPositionCount === 0){// 沒有任何表態紀錄
       partyHasPositionPercentage = 0;
       partyPercentageItem = (
          <div>
             <div className={styles.metaTitle}>{`${partyHasPositionPercentage}%的立委曾經表態`}</div>
          </div>
       )
    }

    const layoutStyles = rectInCircleLayout(
      this.state.viewWidth,
      20,
      this.props.data.records.length,
      data.dominantPosition,
      partyHasPositionPercentage,
      data.positionPercentages
    );

    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <div className={`${styles.partyTitle}`}>{partyTitle}</div>
          
          { partyPercentageItem }
          
        </div>
        <div style={layoutStyles.margin}>
          <div style={layoutStyles.baseCircle}>


            <div style={layoutStyles.colorCircleA} key={`A${layoutStyles.colorCircleA.border} ${layoutStyles.colorCircleA.borderColor}`}></div>
            <div style={layoutStyles.colorCircleB} key={`B${layoutStyles.colorCircleB.border} ${layoutStyles.colorCircleB.borderColor}`}></div>
            <div style={layoutStyles.colorCircleC} key={`C${layoutStyles.colorCircleC.border} ${layoutStyles.colorCircleC.borderColor}`}></div>
            
            <div style={layoutStyles.grayCircle} key={`${layoutStyles.grayCircle.border} ${layoutStyles.grayCircle.borderColor}`}></div>
            <div style={layoutStyles.rect}>{records}</div>
            
          </div>
          <Link to={`/explore`} 
                className={styles.exploreButton}
                onClick={setActiveParty.bind(null,data.party)}>Explore</Link>
        </div>

      </div>
    );
  }

  props = {
    className: ''
  }
}
class Record extends Component {
  static propTypes = {
    data : PropTypes.object.isRequired
  }
  render() {
    const styles = require('./PartyPositionGroup.scss');
    const {data} = this.props;
    
    let date = moment.unix(data.date);
    //是否為黨團
    let isCaucus = (data.legislator.indexOf("黨團")!== -1);
    let caucusStyle = isCaucus ? styles.caucus : "";

    return (
      <div className={styles.postionWrap}>
          <div to={`/records/${data.id}`}
               className={` ${styles.positionCube} ${styles[data.position]} ${caucusStyle }`}>
          </div>
      </div>
    )
  }

  props = {
    className: ''
  }
}
