const SET_ISSUE = 'SET_ISSUE';
const SET_VIEW = 'SET_VIEW';
const SET_ACTIVE_RECORD = 'SET_ACTIVE_RECORD';
const SET_ACTIVE_PARTY = 'SET_ACTIVE_PARTY';

const initialState = {
  currentIssueUrl: "marriage-equality",
  currentView: "parties",
  activeRecordId: "1",
  currentPartyId: "KMT"
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ISSUE:
      return {
        currentIssueUrl: action.value,
        currentView: state.currentView,
        activeRecordId: state.activeRecord,
        currentPartyId: state.currentPartyId
      };

    case SET_VIEW:
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: action.value,
        activeRecordId: state.activeRecord,
        currentPartyId: state.currentPartyId
      };

    case SET_ACTIVE_RECORD:
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: state.currentView,
        activeRecordId: action.value,
        currentPartyId: state.currentPartyId
      };

    case SET_ACTIVE_PARTY:
    console.log(action)
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: state.currentView,
        activeRecordId: state.activeRecord,
        currentPartyId: action.value
      };

    default:
      return state;
  }
}
export function setIssue(value) {
  return {
    type: SET_ISSUE,
    value: value
  };
}
export function setView(value) {
  return {
    type: SET_VIEW,
    value: value
  };
}
export function setActiveRecord(value) {
  return {
    type: SET_ACTIVE_RECORD,
    value: value
  };
}
export function setActiveParty(value) {
  return {
    type: SET_ACTIVE_PARTY,
    value: value
  };
}