import { useEffect, useState } from 'react';
import Utils from '../../components/utils';
import LoginLayout from '../../components/layout/LoginLayout';
import InputGroup from '../../components/common/InputGroup';
import Button from '../../components/common/Button';
import AnchorLink from '../../components/common/AnchorLink';
import App_url from '../../components/common/constant';
import Scrollbar from '../../components/common/Scrollbar';
import { PostRequestAPI } from '../../components/api/PostRequest';
import { useDispatch } from 'react-redux';
import { setStoreAccessToken } from '../../store/Actions';
import { useRouter } from 'next/router';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
    const navigate = useRouter()
    const dispatch = useDispatch();
  const [formData, setFormData] = useState({
        email:"",
        password:""
    });
    const [errors, setErrors] = useState({
        email:"",
        password:""
    });
    const onChange = (e) =>{
        let value = e.target.value
        if(e.target.name === "email"){
            e.target.value = value?.toLowerCase()
        }
        setFormData((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }))
        setErrors((data)=>({
            ...data,
            [e.target.name]:""
        }))
    }
    const validation = () =>{
        let value = true
        if(Utils.ValidateEmail(formData?.email)){
            errors.email = Utils.ValidateEmail(formData?.email);
            value = false
        }
        if(formData?.password === ""){
            errors.password = "Enter your password";
            value = false
        }
        setErrors((data)=>({
            ...data,
            ...errors
        }))
        return value
    }
    const callSubmitForm = async (e) =>{
        e.preventDefault();
        if(validation()){
            const payload = {
                email:formData?.email,
                password:formData?.password,
                first_name:formData?.first_name,
                last_name:formData?.last_name,
                username:formData?.username,
            }
                const response = await PostRequestAPI(`${App_url.api.API_REGISTER}`,payload);
                console.log("resp", response)
                if(response?.status === 200){
                    console.log("response", response)
                    dispatch(setStoreAccessToken(response?.data?.access_token));
                    navigate.push(App_url.link.Home)
                }else{
                    if(response?.data?.errors){
                        setErrors((errors)=>({
                            ...errors,
                            ...response?.data?.errors
                        }))
                    }
                    if(response?.data?.error){
                        setErrors((errors)=>({
                            ...errors,
                            email: response?.data?.error
                        }))
                    }
                }
        }
    }
  return (
    <LoginLayout>
      <Scrollbar style={{height:"100vh"}}>
      <div className="container">
        <div className="row align-items-center justify-content-center min-vh-100 gx-0">
            <div className="col-12 col-md-5 col-lg-5">
                <div className="card card-shadow border-0 pt-5 pb-3 mb-3">
                    <div className="card-body">
                        <form onSubmit={callSubmitForm} className="row m-0 g-6">
                            <div className="col-12 mb-4">
                                <div className="text-center">
                                    <h3 className="fw-bold mb-2">Sign Up</h3>
                                    <p>Create new account</p>
                                </div>
                            </div>

                            <div className="col-12 mb-4">
                                <InputGroup
                                    floatStyle
                                    placeholder={"First Name"}
                                    label={"First Name"}
                                    name='first_name'
                                    onChange={onChange}
                                    value={formData?.first_name}
                                    error={errors?.first_name}
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <InputGroup
                                    floatStyle
                                    placeholder={"last_name"}
                                    label={"Last Name"}
                                    name='last_name'
                                    onChange={onChange}
                                    value={formData?.last_name}
                                    error={errors?.last_name}
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <InputGroup
                                    floatStyle
                                    placeholder={"UserName"}
                                    label={"Username"}
                                    name='username'
                                    onChange={onChange}
                                    value={formData?.username}
                                    error={errors?.username}
                                />
                            </div>
                            <div className="col-12 mb-4">
                                <InputGroup
                                    floatStyle
                                    placeholder={"Email"}
                                    label={"Email"}
                                    name='email'
                                    onChange={onChange}
                                    value={formData?.email}
                                    error={errors?.email}
                                />
                            </div>

                            <div className="col-12 mb-4">
                                <InputGroup
                                    floatStyle
                                    placeholder={"Password"}
                                    label={"Password"}
                                    name='password'
                                    type='password'
                                    onChange={onChange}
                                    value={formData?.password}
                                    error={errors?.password}
                                />
                            </div>

                            <div className="col-12 mb-4">
                              <Button size={"md"} className=" w-100" onClick={callSubmitForm} variant={"primary"}  type="submit">Sign In</Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <p>Do you have an account? <AnchorLink to={App_url.link.Login} >Sign In</AnchorLink></p>
                    {/* <p><AnchorLink >Forgot Password?</AnchorLink></p> */}
                </div>
            </div>
        </div> 
      </div>
      </Scrollbar>
    </LoginLayout>
  );
}
export async function getServerSideProps(context) {
  const title = 'Register';
  const description = 'Register';
  return {
    props: {
      title: title,
      description: description,
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context)
    },
  };z
}