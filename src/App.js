import React, { Component } from 'react';
import './App.css';

import QuestionEditionView from './components/QuestionEditionView.js'
import QuestionSummaryView from './components/QuestionSummaryView.js'

class App extends Component {
	constructor(props) {
        super(props);
        this.state = { tableSummary: null };
        this.stateData = this.stateData.bind(this);
    }
	stateData (data){
		this.setState({tableSummary: data});
	}
  render() {
    return (
      <div className="App">
      	<div className="container">
      		<div className="row">
      			<div className="col-md-6"><QuestionEditionView getStateData={this.stateData}/></div>
      			<div className="col-md-6"><QuestionSummaryView summary={this.state.tableSummary} /></div>
      		</div>
      	</div>
        
      </div>
    );
  }
}

export default App;
