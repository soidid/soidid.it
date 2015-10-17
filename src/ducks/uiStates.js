const SET_ISSUE = 'SET_ISSUE';
const SET_VIEW = 'SET_VIEW';

const initialState = {
  currentIssueUrl: "marriage-equality",
  currentView: "parties"
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_ISSUE:
      return {
        currentIssueUrl: action.value,
        currentView: state.currentView
      };
    case SET_VIEW:
      return {
        currentIssueUrl: state.currentIssueUrl,
        currentView: action.value
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