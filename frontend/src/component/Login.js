// import React, { Component } from "react";
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';

// export default class Login extends Component {

//   constructor(props) {
//     super(props)

//     // Setting up functions
//     this.onChangeStudentName = this.onChangeStudentName.bind(this);
//     this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);

//     // Setting up state
//     this.state = {
//       name: '',
//       email: '',
    
//     }
//   }

//   onChangeStudentName(e) {
//     this.setState({ name: e.target.value })
//   }

//   onChangeStudentEmail(e) {
//     this.setState({ email: e.target.value })
//   }


//   onSubmit(e) {
//     e.preventDefault()

//     const studentObject = {
//       name: this.state.name,
//       email: this.state.email
//     };
    

//     axios.post('http://localhost:4000/students/login', studentObject)
//       .then(res => console.log(res.data)).catch((err)=>{
//           console.log(err);
//       });

//     this.setState({
//       name: '',
//       email: '',
//     });
//   }

//   render() {
//     return (<div className="form-wrapper">
//         <h1>this is login page</h1>
//       <Form onSubmit={this.onSubmit}>
//         <Form.Group controlId="Name">
//           <Form.Label>Name</Form.Label>
//           <Form.Control type="text" value={this.state.name} onChange={this.onChangeStudentName} />
//         </Form.Group>

//         <Form.Group controlId="Email">
//           <Form.Label>Email</Form.Label>
//           <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
//         </Form.Group>


//         <Button variant="danger" size="lg" block="block" type="submit">
//           Login
//         </Button>
//       </Form>
//     </div>);
//   }
// }

import React, {useState} from 'react';
import axios from 'axios';
// import {useHistory} from 'react-router-dom';
import '../App.css'
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();
axios.defaults.withCredentials = true;


const Login = () =>{

//   cookies.set('myCat', 'Pacman', { path: '/' });
// console.log(cookies.get('myCat'));

// const history = useHistory();

const [lgin, setlogin]=useState({ 
    name:"",
    email:""
});


const loginclick =(event)=>{
    setlogin({...lgin, [event.target.name] : event.target.value});
}


const handlesubmit =(event)=>{
    event.preventDefault();
    axios.post("http://localhost:4000/students/login",lgin,{withCredentials:true })
    .then(res => console.log(res.data));
}

// const handlesubmit = async (event)=>{
//     event.preventDefault();
//     // const res = await fetch("http://localhost:4000/students/login",{
//     //     method:"POST",
//     //     headers:{
//     //         "Content-Type" : "application/json"
//     //     },
//     //     body: JSON.stringify(lgin)
//     // });
  

// }

    return (
        <div className="body">
        <div className="signup-form" >
<form onSubmit={handlesubmit} method="POST" className="loginform" >
    <h2>Sign Up</h2>
    <p>Please fill in this form to create an account!</p>
    <hr />
   
    <div className="form-group">
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fa fa-paper-plane"></i>
                </span>                    
            </div>
            <input type="text" className="form-control" name="name" onChange={loginclick} value={lgin.name} placeholder="name Address" />
        </div>
    </div>
    <div className="form-group">
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className="fa fa-lock"></i>
                </span>                    
            </div>
            <input type="email" className="form-control" name="email" onChange={loginclick} value={lgin.email} placeholder="Email" />
        </div>
    </div>
   
    
    <div className="form-group">
        <button className="btn btn-primary btn-lg">SignIn</button>
    </div>
</form>
<div className="text-center">Already have an account? </div>  Login
</div>
        
    </div>
    );
}

export default Login;

