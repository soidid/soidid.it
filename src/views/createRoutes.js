import React from 'react';
import {Route} from 'react-router';
import App from 'views/App';
import StaticIssue from 'views/StaticIssue/StaticIssue.js';
import Explorer from 'views/Explorer/Explorer.js';

export default function(store) {
  return (
    <Route component={App}>
      <Route path="/" component={StaticIssue}/>
      <Route path="/explorer" component={Explorer}/>
      <Route path="*" component={Explorer}/>
    </Route>
  );
}
