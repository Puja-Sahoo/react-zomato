import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '3px',
        backgroundColor: 'brown',
        border: 'solid 2px brown'
    }
};



class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isUserLoggedIn: false,
            userName: undefined,
            email:undefined,
            password:undefined,
            message:undefined,
            signUpModalIsOpen: false,
            signIn:false,
            first_name: undefined,
            last_name: undefined,
            messageModalIsOpen:false
        }
    }
    componentDidMount() {
        sessionStorage.clear();
    }
    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value })
    
    }

    handleClick = (state, value) => {

        this.setState({ [state]: value })
    }


    Navigate = () => {
        this.props.history.push("/");
    }

    responseGoogle = (response) => {
        if (response && response.profileObj && response.profileObj.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.profileObj.name , email:response.profileObj.email}); //profileobj contains the detalssend by th google
        } else {
            this.setState({ loginModalIsOpen: false });
        }
    }

    responseFacebook = (response) => {
        if (response && response.name) {
            this.setState({ loginModalIsOpen: false, isUserLoggedIn: true, userName: response.name });
        }
        else {
            this.setState({ loginModalIsOpen: false });
        }
    }
    // sign up
    handleSignup=(event) =>{
        event.preventDefault()
        const{first_name,last_name,userName,email,password,message}=this.state
        if(first_name==undefined && last_name==undefined && userName==undefined && email==undefined && password==undefined )
        {
            this.setState({message:"Please enter the details", messageModalIsOpen: true})

        }
        else{
            axios({
                method: 'POST',
                url: 'https://afternoon-beach-59724.herokuapp.com/usersignup ',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    first_name: first_name,
                    last_name:last_name,
                    userName:userName,
                    email: email,
                    password: password
                   
                }
            }).then(res => {
                console.log(res.status);

                this.setState({email:email,password:password, message:res.data.message, signUpModalIsOpen: false,
                    signIn:true,messageModalIsOpen:true,isUserLoggedIn:true})
           
            }).catch(err =>console.log(err))

        }
        

      
    }

    handleLogout = () => {
        
        sessionStorage.clear();
        this.setState({ isUserLoggedIn: false, userName: undefined,email:undefined,first_name:undefined,last_name:undefined,password:undefined, message:"Logout Successfully", messageModalIsOpen:true})
    }
    loginManually = (event) => {
        event.preventDefault()
        //  the api call for login into the page
        const { email, password,userName, message } = this.state;
        if(userName==undefined && email==undefined && password==undefined )
        {
            this.setState({message:"Please enter the details", messageModalIsOpen: true})

        }
        else{
            axios({
                method: 'POST',
                url: 'https://afternoon-beach-59724.herokuapp.com/login',
                headers: { 'Content-Type': 'application/json' },
                data: {

                    userName:userName,
                    email: email,
                    password: password
                   
                }
            }).then(res => {
                this.setState({isUserLoggedIn:res.data.IsLoggedIn, message:res.data.message, messageModalIsOpen:true,loginModalIsOpen:false})
            // console.log(message);
            }).catch(err =>{
                this.setState({message:err.data.message,messageModalIsOpen:true})
            })
            //this.props.history.push(`/filter/?mealtype=${mealtype}&cuisine=${cuisine}&area=${location}&costlessthan=${lcost}&costmorethan=${hcost}&sort=${sort}`)
  
        }  
  
    }  
  
  
  
    render() {  
        const { loginModalIsOpen, isUserLoggedIn, userName ,email, password ,signUpModalIsOpen,message,messageModalIsOpen} = this.state;
        return (
            
            <div style={{ backgroundColor: '#ce0505', height: '50px' }}>
                <div className="header-logo" onClick={this.Navigate}>
                    <p>e!</p>
                </div>
                {isUserLoggedIn ? <div style={{ float: 'right', marginTop: '10px' }}>
                    <div style={{ display: 'inline-block' }} className="header-login" >{userName}</div>
                    <div style={{ display: 'inline-block' }} className="header-account" onClick={this.handleLogout}>Logout</div>
                </div> :
                    <div style={{ float: 'right', marginTop: '10px' }}>
                        <div style={{ display: 'inline-block' }} className="header-login" onClick={() => this.handleClick('loginModalIsOpen', true)}>Login</div>
                        <div style={{ display: 'inline-block' }} className="header-account" onClick={() => this.handleClick('signUpModalIsOpen', true)}>Create an account</div>
                    </div>}
                    <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >

                     {/*login form */}
                        <div>
                        <div className='container'>
                        <div style={{ textAlign: "right" }} onClick={() => this.handleClick('loginModalIsOpen', false)}><i class="fa fa-times fa-2x" aria-hidden="true" style={ {color: 'white'} } ></i></div>

                            <div className='form-div' style={{ padding:"20px 20px 20px 20px"}}>

                                <form onSubmit={this.loginManually}>
                                    <table>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                            <input type='text'
                                             placeholder='user name'
                                             onChange={(event) => this.handleInputChange(event, 'userName')}
                                              value={this.state.userName}
                                             className='form-control form-group'
                                             />
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>
                                            <input type='email'
                                             placeholder='email '
                                             onChange={(event) => this.handleInputChange(event, 'email')}
                                             value={this.state.email}
                                             className='form-control form-group'
                                            />  
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Password</td>
                                            <td>
                                            <input type='password'
                                             placeholder='Password'
                                             onChange={(event) => this.handleInputChange(event, 'password')}
                                             value={this.state.password}
                                             className='form-control form-group'
                                             />  
                                            </td>
                                            
                                        </tr>



                                    </table>
                                   
                                    <input type='submit'className='btn btn-danger btn-block' value='submit'/>

                                    




                                </form>

                            </div>

                        </div>
                    </div>






                    {/* login form
                    <div>
                        <div style={{ textAlign: "right" }} onClick={() => this.handleClick('loginModalIsOpen', false)}><i class="fa fa-times fa-2x" aria-hidden="true" style={ {color: 'white'} } ></i></div>

                       
                        <form onSubmit={this.loginManually}>
                            <table>
                                <tr>
                                    <td>Name</td>
                                    <td>
                                    <input type='text'
                                    placeholder='user name'
                                    onChange={(event) => this.handleInputChange(event, 'userName')}
                                    value={this.state.userName}
                                    className='form-control form-group'
                                    />

                                     </td>
                                </tr>

                                <tr>
                                    <td>Email</td>
                                    <td><input type="text" value={email} onChange={(event) => this.handleInputChange(event, 'email')} /></td>
                                </tr>
                                <tr>
                                    <td>password</td>
                                    <td><input type="password" value={password} onChange={(event) => this.handleInputChange(event, 'password')} /></td>
                                </tr>
                            </table>
                            <input type="submit" className="btn btn-danger" value="Login" onClick={() => this.handleClick('loginModalIsOpen', false)} />
                        </form>
                    </div> */}


                    {/*social media handles */}
                    <div style={{marginLeft:"10px"}} >
                        <div>
                        <GoogleLogin
                            clientId="636632982617-1v2d8stt4ulin896cd1osqpksrntehfa.apps.googleusercontent.com"
                            buttonText={<div className="google bttn" style={{ padding: "0px 87px 2px 22px",width: "100%",fontWeight:"500"}}>Continue with Gmail</div>}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br style={{height:"5px"}} />
                            
                        </div>



                        <div  style={{    marginTop: "8px", marginBottom: "14px"}}>
                        <FacebookLogin
                            appId="280504193516125"
                            textButton={<div className="fb bttn"> <i class="fa fa-facebook fa-fw"></i> Continue with facebook</div>}
                            size="metro"
                            fields="name,email,picture"
                            callback={this.responseFacebook}
                            cssClass="btn-md fb "
                           //icon="fa-facebook-square"
                        />
                        </div>

                    </div>
                </Modal>
                {/*signUp modal*/}
                <Modal
                    isOpen={signUpModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className='container'>
                        <div style={{ textAlign: "right" }} onClick={() => this.handleClick('signUpModalIsOpen', false)}><i class="fa fa-times fa-2x" aria-hidden="true" style={ {color: 'white'} } ></i></div>

                            <div className='form-div' style={{ padding:"20px 20px 20px 20px"}}>
                                <form onSubmit={this.handleSignup}>
                                    <input type='text'
                                    placeholder='First Name'
                                    onChange={(event) => this.handleInputChange(event, 'first_name')}
                                    value={this.state.first_name}
                                    className='form-control form-group'
                                    />

                                    <input type='text'
                                    placeholder='last name'
                                    onChange={(event) => this.handleInputChange(event, 'last_name')}
                                    value={this.state.last_name}
                                    className='form-control form-group'
                                    />

                                    <input type='text'
                                    placeholder='user name'
                                    onChange={(event) => this.handleInputChange(event, 'userName')}
                                    value={this.state.userName}
                                    className='form-control form-group'
                                    />

                                   <input type='email'
                                    placeholder='email '
                                    onChange={(event) => this.handleInputChange(event, 'email')}
                                    value={this.state.email}
                                    className='form-control form-group'
                                    />    

                                    <input type='password'
                                    placeholder='password'
                                    onChange={(event) => this.handleInputChange(event, 'password')}
                                    value={this.state.password}
                                    className='form-control form-group'
                                    />  

                                    <input type='submit'className='btn btn-danger btn-block' value='submit'/>




                                </form>

                            </div>

                        </div>
                    </div>



                </Modal>
                 {/*message modal*/}
                 <Modal
                    isOpen={messageModalIsOpen}
                    style={customStyles}
                >
                    <div style={{ textAlign: "right" }} onClick={() => this.handleClick('messageModalIsOpen', false)}><i class="fa fa-times fa-2x" aria-hidden="true" style={ {color: 'white'} } ></i></div>

                    <div style={{color:"white", padding:"20px 20px 20px 20px"}}><b><u>{message}</u></b></div>

                </Modal>
                



            </div>
        )
    }
}

export default withRouter(Header);











