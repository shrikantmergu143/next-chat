import { useEffect, useState } from 'react';
import Utils from '../../components/utils';
import LoginLayout from '../../components/layout/LoginLayout';
import InputGroup from '../../components/common/InputGroup';
import Button from '../../components/common/Button';
import AnchorLink from '../../components/common/AnchorLink';
import App_url from '../../components/common/constant';
import Scrollbar from '../../components/common/Scrollbar';
// import { useDispatch, useSelector } from 'react-redux';
// import App_url from '../components/common/constant';
// import { useEffect } from 'react';

export default function Home() {
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
            }
            // if(response?.status){
            //     const resp = await PostRequestCallAPI(API_AUTH_LOGIN,payload);
            //     if(resp?.status === 200){
            //         console.log("resp", resp)
            //         dispatch(setStoreLoginUser(resp?.data?.userDetails));
            //         navigate(App_url.Home)
            //     }else{
            //     dispatch(setShowToast({message:"Invalid credentials", type:"info"}));
            //     }
            // }else{
            //     dispatch(setShowToast({message:"Invalid credentials", type:"info"}));
            // }
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
                                    <h3 className="fw-bold mb-2">Sign In</h3>
                                    <p>Login to your account</p>
                                </div>
                            </div>

                            <div className="col-12 mb-4">
                                <InputGroup
                                    // floatStyle
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
                    <p>Don't have an account yet? <AnchorLink to={App_url.link.Register} >Sign up</AnchorLink></p>
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
  const title = 'Login';
  const description = 'Login';
  return {
    props: {
      title: title,
      description: description,
      env: JSON.stringify(Utils.getCommonEnv(process?.env)),
      localhost_url: Utils.getCurrentURL(context)
    },
  };z
}