import React, { Component } from 'react';
import './QuestionSummaryView.css';

class QuestionSummaryView extends Component {

  render() {
  	let summaryData;
  	let count =0;
  	let rowLabelLength, colLabelLength;
  	let rowsNamesLength = [];
  	let colsNamesLength = [];
  	// if props summary is not null/undefined
  	if(this.props.summary){
  		summaryData = this.props.summary;
  		summaryData.rows.forEach((r)=>{
  			rowsNamesLength.push(r.name.length);
  			// if image preview available in row then increase count
  			if(r.preview){
  				count++;
  			}
  		});
  		// get the longest row label number
  		if(rowsNamesLength.length>0){
  			rowLabelLength = Math.max(...rowsNamesLength);	
  		}
  		else{
  		    rowLabelLength = 0;
  		}
  		summaryData.cols.forEach((c)=>{
  			colsNamesLength.push(c.name.length);
            // if image preview available in col then increase count
  			if(c.preview){
  				count++;
  			}
  		});
        // get the longest col label number
  		if(colsNamesLength.length>0){
  			colLabelLength = Math.max(...colsNamesLength);	
  		}
  		else {
  		    colLabelLength = 0;
  		}
  	}
    return (
      	<div className="container">
      		<h3><b>Question Summary View</b></h3>
      		<div className="title"><b>Summary</b></div>
      		{summaryData ?
      			<table className="custom">
      				<tbody>
      					<tr><td>Number of rows</td><td>{summaryData.rows.length}</td></tr>
      					<tr><td>Number of columns</td><td>{summaryData.cols.length}</td></tr>
      					<tr><td>Number of images uploaded</td><td>{count}</td></tr>
      					<tr><td>Longest row label</td><td>{rowLabelLength}</td></tr>
      					<tr><td>Longest column label</td><td>{colLabelLength}</td></tr>
      				</tbody>
      			</table>
      		 : null}
        	
      	</div>
    );
  }
}

export default QuestionSummaryView;
