import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import registerServiceWorker from './registerServiceWorker';

class MasterForm extends Component{
  constructor(props){
    super(props);
    this.state={
      choice:"email"
    };
    this.changeChoice=this.changeChoice.bind(this);
    this.showModal=this.showModal.bind(this);
    this.hideModa=this.hideModal.bind(this);
    this.processCommunication = this.processCommunication.bind(this);
    this.generate_fields=this.generate_fields.bind(this);
  }
  changeChoice(){
    this.setState({
      choice: document.getElementById("choice_").value
    });
  }
  showModal(){
    document.getElementById("mod").style.display="block";
  }
  hideModal(){
    document.getElementById("mod").style.display="none";
  }
  generate_fields(){
    if(this.state.choice=="email"){
      return(
       <div> 
          <p><input class="w3-input w3-border-bottom w3-border-blue" placeholder="Receiver Email Address" id={"to"} required/></p>
          <p><textarea  class="w3-border-bottom w3-border-blue" rows={20} cols={50} placeholder="Your message..." id={"message"} required/></p>
          <div className="w3-center">
            <label className="w3-left">Attachment</label>
            <input className="w3-input w3-border-bottom" type="file" id="attachment" required/>
          </div>
       </div>
      );
    }
    else{
       return(
         <div> 
            <p><input class="w3-input w3-border-bottom w3-border-blue" placeholder="Receiver Phone Number" id={"to"} required/></p>
            <p><textarea  class="w3-border-bottom w3-border-blue " rows={20} cols={50} placeholder="Your message..." id={"message"} required/></p>
         </div>
      );     
    }
    
  }
  /*
  JSON Examples
  {
	  "type" : "sms",
	  "message": "something written in textbox",
	  "to": "01782869957"
  }
  
  {
	  "type":"email",
	  "message": "avash loves cgpa 4",
	  "to": "avash.faculty@gmail.com"
	  "file": file
  }
  */
  
  processCommunication(){
    var file=null;
	if(this.state.choice=="email"){
		var somefile = document.getElementById('attachment');
		if('files' in somefile){
			var indx=0;
			if(somefile.files.length==0){
				file=null;
			}
			else{file=somefile.files[indx];}
		}
		
	}
	
	var formObj = new FormData();
	formObj.append("type",this.state.choice);
	formObj.append("to",document.getElementById("to").value);
	if(this.state.choice != "sms" && file!== null){
		formObj.append("file",file);
	}
    formObj.append("message",document.getElementById("message").value);
	
	console.log(formObj);
	
	// var base="https://api.mawabd.com/";
	// var req="api/admin/input/airline"; //change this
	// var full_url=base+req;
	// $.ajax({
		// url: full_url,
		// type: 'POST',
		// accepts: 'application/json',
		// data:formObj,
		// processData: false,
		// contentType: false,
		// dataType:'json',
		// crossDomain:'true',
		// headers:{
			// "Accept" : 'application/json',
			// "Authorization" : 'Bearer '+this.state.token
		// },
		// success: function(result, status, XHR){
			// console.log(result);
			// if(result.success=="true"){
				// //do something
			
			// }
			// else{
				// //do someting
			// }
		// }.bind(this),
		// error: function(xhr){
			// console.log(xhr);
			// this.setState({
				// err:1,
				// err_msg:"Something Went Wrong, please try again!!"
			// });
		// }.bind(this)
	// });
  }
  render(){
    return(
      <div class="w3-container w3-white w3-padding w3-margin">
        <button class="w3-button w3-round-xlarge w3-blue" onClick={this.showModal.bind(this)}>Show Modal</button>
        <div id={"mod"} class="w3-modal">
              <div class="w3-modal-content w3-animate-right w3-card-4">
                <header class="w3-container w3-sand w3-card"> 
                  <span class="w3-button w3-display-topright" onClick={this.hideModal.bind(this)}>&times;</span>
                  <h2>MawaBD Mail/SMS System</h2>
                </header>
                <div class="w3-container w3-red w3-center w3-card">
                    <p><select class="w3-select" id="choice_" onChange={this.changeChoice.bind(this)}>
                      <option value="email">Email</option>
                      <option value="sms"> SMS </option>
                    </select> </p>
                  <form class="w3-container w3-transparent" onSubmit={function(event){event.preventDefault(); this.processCommunication();}.bind(this)}>   
                    {this.generate_fields()}
                    <p><button class="w3-button w3-round w3-green" type="submit"> {"Send " + (this.state.choice==="email" ? "Email" : "SMS")} </button></p>
                  </form>
                </div>
                <footer class="w3-container w3-sand w3-card">
                <p class="w3-tiny">MawaBD Communication Portal</p>
                </footer>
              </div>
            </div>
        </div>
      );
    }
  
}

ReactDOM.render(<MasterForm />, document.getElementById('root'));
registerServiceWorker();
