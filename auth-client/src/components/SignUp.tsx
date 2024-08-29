import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { AuthContext } from '../context/AuthContext';

interface SignUpFormInputs {
  email: string;
  name: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().email('Invalid email format').required('Email is required'),
  name: yup.string().required('Name is required'),
  password: yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/.*[A-Za-z].*/, 'Password must contain at least one letter')
    .matches(/.*\d.*/, 'Password must contain at least one number')
    .matches(/.*\W.*/, 'Password must contain at least one special character')
    .required('Password is required'),
}).required();

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const authContext = useContext(AuthContext);


  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    try {
      const response = await authService.signUp(data);
      authContext?.login(response.accessToken);
        navigate('/application');
    } catch (error) {
      console.error('Sign-up error', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Name</label>
        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
