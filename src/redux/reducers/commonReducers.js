const INITIAL_STATE = {
  userDetails: {},
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REG':
      return Object.assign({}, state, { userDetails: action.payload });
    case 'REC_LISTING':
      return Object.assign({}, state, { totalRecords: action.payload });
    case 'EDITTASK':
      return Object.assign({}, state, { taskDetails: action.payload });
    default:
      return state;
  }
}
