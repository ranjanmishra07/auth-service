import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

interface SignInFormInputs {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit } = useForm<SignInFormInputs>();
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);


  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    try {
      const response = await authService.signIn(data);
      authContext?.login(response.accessToken);
      navigate('/application');
    } catch (error) {
      console.error('Sign-in error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;
