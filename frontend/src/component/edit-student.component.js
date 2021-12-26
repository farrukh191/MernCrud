import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';



const EditStudent =()=>{



  const navigate = useNavigate()
const {id} = useParams();
const [state, setstate] = useState({
  Fname:'',
  Lname:'',
  Phone:'',
  Address:''
});

useEffect(()=>{
  axios.get('http://localhost:4000/edit-student/' + id)
  .then(res => {
    console.log(res);
    setstate({
      Fname: res.data.Fname,
      Lname: res.data.Lname,
      Phone: res.data.Phone,
      Address: res.data.Address
    });
    
  })
  .catch((error) => {
    console.log(error);
  })
},[id]);

 
const handleChange =(e)=> {
  const value = e.target.value;
 
  setstate({
    ...state,
    [e.target.name]: value,
  });
}
// onChange={handleChange}

const onSubmit =async(e)=> {
  e.preventDefault()


  await axios.put('http://localhost:4000/update-student/' + id, state)
    .then((res) => {
      console.log("whweuyuyewuweywiewy",res)
      // console.log('Student successfully updated')
    }).catch((error) => {
      console.log(error)
    })

  // Redirect to Student List
  navigate('/student-list') 
  // props.history.push('/student-list')
}


  return(
    <>
      <h1>thid is {id}</h1>
      <div className="form-wrapper">
     {/* <Form onSubmit={this.onSubmit}> */}
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
    </div>

    </>
  )
}

export default EditStudent;