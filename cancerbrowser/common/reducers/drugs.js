
import { SET_FILTERED_DRUGS, CHANGE_DRUG_VIEW, SET_DRUG_COUNTS } from '../actions/drug';

const INITIAL_STATE = {
  filtered: [],
  isFetching: false,
  counts: {}
};

function drugs(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_FILTERED_DRUGS:
      return Object.assign({}, state, {
        isFetching: false,
        filtered: action.drugs
      });

    case CHANGE_DRUG_VIEW:
      return Object.assign({}, state, {
        drugView: action.drugView
      });

    case SET_DRUG_COUNTS:
      return Object.assign({}, state, {
        counts: action.counts
      });

    default:
      return state;
  }
}

export default drugs;