import { createAction } from 'redux-actions';

export default {
  script: createAction('query.script'),
  tag: createAction('query.tag', (tag, value) => ({ tag, value })),
  silence: createAction('query.silence'),
  restore: createAction('query.restore')
}
