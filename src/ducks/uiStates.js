const SET_ISSUE = 'SET_ISSUE';
const SET_VIEW = 'SET_VIEW';
const SET_ACTIVE_RECORD = 'SET_ACTIVE_RECORD';

const initialState = {
  currentIssueUrl: "marriage-equality",
  currentView: "parties",
  activeRecord: "1"
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ISSUE:
      return {
        currentIssueUrl: action.value,
        currentView: state.currentView,
        activeRecord: state.activeRecord
      };
      
    case SET_VIEW:
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: action.value,
        activeRecord: state.activeRecord
      };

    case SET_ACTIVE_RECORD:
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: state.currentView,
        activeRecord: action.value
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