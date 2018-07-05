import React, { Component } from 'react';
import './QuestionEditionView.css';
import ReactModal from 'react-modal';

class QuestionEditionView extends Component {
	constructor(props){
        super(props);
        //default state
     	this.state = {
     		title: 'Title of the question',
     		rows: [{name:'Row1',file:'', preview:''},{name:'Row2',file:'', preview:''}],
     		cols: [{name:'Col1',file:'', preview:''},{name:'Col2',file:'', preview:''}],
     		tmpImg: {showModal: false, activeCellName:''}
     		
     	};
     	this.addNewRow = this.addNewRow.bind(this);
     	this.addNewColumn = this.addNewColumn.bind(this);
     	this.removeRow = this.removeRow.bind(this);
     	this.removeColumn = this.removeColumn.bind(this);

     	this.handleOpenModal = this.handleOpenModal.bind(this);
    	this.handleSubmitAndCloseModal = this.handleSubmitAndCloseModal.bind(this);
    	this.fileChangedHandler = this.fileChangedHandler.bind(this);
    	this.textChange = this.textChange.bind(this);
    	this.titleChange = this.titleChange.bind(this);
	}
	componentDidMount() {
        // pass default state to summary component
	    this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to change title
	* */
	titleChange (event){
		this.setState({title: event.target.innerHTML});
        // pass state to summary component
		this.props.getStateData(this.state);
	}
    /*
    * @description
    * function to change text of row or column
    * */
	textChange (event, cell){
	    // column text changes
      	if(cell.name.includes('Col')){
	    	const cols = this.state.cols;
	    	cols.forEach((col) => {
	    		if(col.name === cell.name){
	    		    //set the changed value to column text
	    			col.name = event.target.innerHTML;
	    		}
	    	});
	    	this.setState({cols: cols});
	    }
	    // row text changes
	    if(cell.name.includes('Row')){
	    	const rows = this.state.rows;
	    	rows.forEach((row) => {
	    		if(row.name === cell.name){
	    		    // set the changed value to row text
	    			row.name = event.target.innerHTML;
	    		}
	    	});
	    	this.setState({rows: rows});
	    }
	    // pass state to summary component
	    this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to add new row in table
	* */
	addNewRow () {
		const len = this.state.rows.length+1;
		const rows = this.state.rows;
		rows.push({name:'Row'+len, file:'', preview:''});
		this.setState({rows: rows});
        // pass state to summary component
		this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to add new column in table
	* */
	addNewColumn () {
		const len = this.state.cols.length+1;
		const cols = this.state.cols;
		cols.push({name:'Col'+len, file:'', preview:''});
		this.setState({cols: cols});
        // pass state to summary component
		this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to remove row from table
	* */
	removeRow () {
		const rows = this.state.rows;
		const len = this.state.rows.length;
		rows.splice(len-1,1);
		this.setState({rows: rows});
        // pass state to summary component
		this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to remove column from table
	* */
	removeColumn () {
		const cols = this.state.cols;
		const len = this.state.cols.length;
		cols.splice(len-1,1);
		this.setState({cols: cols});
        // pass state to summary component
		this.props.getStateData(this.state);
	}
    /*
    * @description
    * function to set active cell to open modal for
    * */
	handleOpenModal (colname) {
    	this.setState({ tmpImg: {showModal: true, activeCellName: colname }});
	}
    /*
    * @description
    * function to close the modal
    * */
	handleSubmitAndCloseModal () {
	    this.setState({ tmpImg: {showModal: false} });
        // pass state to summary component
	    this.props.getStateData(this.state);
	}
	/*
	* @description
	* function to set image file and preview url in row or column
	* */
	fileChangedHandler (event,cell) {
		event.preventDefault();
	    let reader = new FileReader();
	    // uploaded file
	    let file = event.target.files[0];
	    //upload image to column
	    if(cell.name.includes('Col')){
	    	const cols = this.state.cols;
	    	cols.forEach((col) => {
	    		if(col.name === cell.name){
	    			reader.onloadend = () => {
				      	col.file = file;
				      	col.preview = reader.result;
				    }			
	    		}
	    	});
	    	this.setState({cols: cols});
	    	
	    }
	    // upload image to row
	    if(cell.name.includes('Row')){
	    	const rows = this.state.rows;
	    	rows.forEach((row) => {
	    		if(row.name === cell.name){
	    			reader.onloadend = () => {
				      	row.file = file;
				      	row.preview = reader.result;
				    }			
	    		}
	    	});
	    	this.setState({rows: rows});
	    }
	    reader.readAsDataURL(file);
        // pass state to summary component
	    this.props.getStateData(this.state);
	}
  render() {
    const customStyles = {
	  content : {
	    top : '50%',
	    left : '50%',
	    right : 'auto',
	    bottom : 'auto',
	    width : '30%',
	    transform : 'translate(-50%, -50%)'
	  }
	};

    return (
      	<div className="container">
      		<h3><b>Question Edition View</b></h3>
      		<div className="border">
				<i><div className="title" onInput={(e)=>this.titleChange(e)} suppressContentEditableWarning="true" contentEditable="true">{this.state.title}</div></i>
				<table cellPadding="5" >
	                <tbody>
	                	<tr>
	                		<td></td>
			                <td></td>
	                		{
		                        this.state.cols.map((col) =>        
			                		<td key={col.name}>
			                			<div className="imgDiv" onClick={()=>this.handleOpenModal(col)}>
			                				{col.preview ? <img src={col.preview} alt='' /> : <i className="fa fa-plus"></i>}
			                			</div>
			                		</td>
								)
	                    	}
	                    	<td><i className="fa fa-plus add" onClick={()=> {this.addNewColumn()}}></i></td>
	                    	<td><i className="fa fa-minus remove" onClick={()=> {this.removeColumn()}}></i></td>
	                	</tr>
	                	<tr>
	                		<td></td>
			                <td></td>
	                		{
		                        this.state.cols.map((col) =>        
			                		<td key={col.name}><i><div onInput={(e)=>this.textChange(e,col)} suppressContentEditableWarning="true" contentEditable="true">{col.name}</div></i></td>
								)
	                    	}
	                	</tr>
	                	{
	                        this.state.rows.map((row) =>
	                            <tr key={row.name}>
	                            	<td>
			                			<div className="imgDiv" onClick={()=>this.handleOpenModal(row)}>
			                				{row.preview ? <img src={row.preview} alt='' /> : <i className="fa fa-plus"></i>}
			                			</div>
			                		</td>
	                            	<td><div suppressContentEditableWarning="true" contentEditable="true"><i>{row.name}</i></div></td>
	                            	{
				                        this.state.cols.map((col) =>        
					                		<td key={col.name}><input type="radio" /></td>
										)
			                    	}
	                            </tr>
							)
	                    }
	                    <tr>
	                        <td><i className="fa fa-plus add" onClick={()=> {this.addNewRow()}}></i></td>
	                    </tr>
	                    <tr>
	                        <td><i className="fa fa-minus remove" onClick={()=> {this.removeRow()}}></i></td>
	                    </tr>
	                </tbody>
				</table>
				
				<ReactModal isOpen={this.state.tmpImg.showModal} ariaHideApp={false} style={customStyles}>
		          <input type="file" onChange={(e)=>this.fileChangedHandler(e,this.state.tmpImg.activeCellName)} />
		          <button onClick={this.handleSubmitAndCloseModal}>Upload</button>
		        </ReactModal>
      		</div>
      	</div>
    );
  }
}

export default QuestionEditionView;
