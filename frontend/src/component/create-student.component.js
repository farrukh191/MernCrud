import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const CreateStudent = () => {

  const [state, setstate] = useState({
    Fname: '',
    Lname: '',
    Phone: '',
    Address: ''
  });

  const handleChange =(e)=> {
    const value = e.target.value;
   
    setstate({
      ...state,
      [e.target.name]: value,
    });
  }


  const onSubmit = (e) => {
    e.preventDefault()
      axios.post('http://localhost:4000/create-student', state)
      .then(res => console.log(res.data));

    setstate({
      Fname: '',
      Lname: '',
      Phone: '',
      Address: '',
    });
  }


  return (<div className="form-wrapper">
    <Form  onSubmit={onSubmit}>
        <Form.Group controlId="Name">
          <Form.Label>Fname</Form.Label>
          <Form.Control type="text" name="Fname" value={state.Fname} onChange={handleChange}  />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Lname</Form.Label>
          <Form.Control type="text" name="Lname" value={state.Lname} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name="Phone" value={state.Phone} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="Name">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="Address" value={state.Address} onChange={handleChange} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
  </div>);

}

export default CreateStudent;