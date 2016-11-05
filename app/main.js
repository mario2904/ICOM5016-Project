import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import NewApp from './NewApp.js';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const Main = () => (
  <MuiThemeProvider>
    <NewApp />
  </MuiThemeProvider>
);
render(<Main />, document.getElementById('app'));
