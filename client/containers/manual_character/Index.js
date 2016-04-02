import React from 'react';
import volumeAction from 'actions/volume';
import connect from 'containers/supports/connect';
import volumeSync from 'containers/supports/volumeSync';
import Index from 'components/panel-form/Index';

export default connect({ volumeAction })(volumeSync('manual/characters', Index));
