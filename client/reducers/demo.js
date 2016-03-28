import { handleActions } from 'redux-actions';
import { updateSelected } from '../utils';

export default handleActions({
  'demo.run': (state, action) => {
    const { status, text } = action.payload;
    if(status == 200) {
      const { faces, detect_path } = JSON.parse(text);
      return { faces, detect_path };
    } else {
      return state;
    }
  }
}, {});
