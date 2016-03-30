import { connect as reduxConnect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapValues from 'lodash.mapvalues';

export default function connect(actions) {
  return function(klass) {
    const dispatchToProps = (dispatch) => {
      const props =
        mapValues(actions, (action) => bindActionCreators(action, dispatch));
      return { ...props, dispatch }
    }

    return reduxConnect((state)=> state, dispatchToProps)(klass);
  }
}
