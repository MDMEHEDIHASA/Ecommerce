import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap';
import {useDispatch,useSelector} from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {getUserDetails,updateUser} from '../actions/index';
import {USER_UPDATE_RESET} from '../components/constants/userConstant'
import Meta from '../components/Meta';


const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState('')

  
    const dispatch = useDispatch()
  
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails


    const userUpdate = useSelector((state) => state.userUpdate)
    const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
    } = userUpdate
  
    useEffect(() => {
      if (successUpdate) {
        dispatch({ type: USER_UPDATE_RESET })
        history.push('/admin/userlist')
      }else{
        if (!user.name || user._id !== userId) {
          dispatch(getUserDetails(userId))
        } else {
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      }
      
    }, [dispatch,history,userId,user])
  
    const submitHandler = (e) => {
      e.preventDefault()
     dispatch(updateUser({_id:userId,name,email,isAdmin}))
    }
  
    return (
      <div>
        <Link to='/admin/userList' className="btn btn-light y-3">Go Back</Link>
        <Meta title="Admin Edit User"></Meta>
        <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message error={errorUpdate}></Message>}
        {loading ? <Loader/> : error ? <Message error={error}></Message> : (
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='name'>
             <Form.Label>Name</Form.Label>
             <Form.Control
               type='name'
               placeholder='Enter name'
               value={name}
               onChange={(e) => setName(e.target.value)}
             ></Form.Control>
           </Form.Group>
   
           <Form.Group controlId='email'>
             <Form.Label>Email Address</Form.Label>
             <Form.Control
               type='email'
               placeholder='Enter email'
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             ></Form.Control>
           </Form.Group>

            <Form.Group controlId='isadmin'>
            <Form.Label>Is Admin</Form.Label>
             <Form.Control
               type='isadmin'
               placeholder='true or false'
               value={isAdmin}
               onChange={(e) => setIsAdmin(e.target.value)}
             ></Form.Control>
            </Form.Group>
   
           <Button type='submit' variant='primary'>
             Update
           </Button>
         </Form>
        )}
       
      </FormContainer>

      </div>
    )
  }
  
  export default UserEditScreen



























