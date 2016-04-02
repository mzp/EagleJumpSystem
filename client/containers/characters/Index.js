import React from 'react';
import volumeAction from 'actions/volume';
import Index from 'components/batch-form/Index';
import connect from 'containers/supports/connect';
import volumeSync from 'containers/supports/volumeSync';

export default connect({ volumeAction })(volumeSync('characters', Index));
