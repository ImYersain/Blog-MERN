import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import styles from './Login.module.scss';


export const Registration = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { 
    register, 
    handleSubmit, 
    setError, 
    formState: {errors, isValid}
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: 'onChange'
  });


  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));
    if(!data.payload){
      return alert('failed to registration')
    }
    if('token' in data.payload){
      window.localStorage.setItem('token', data.payload.token);
    }
  }


  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Create account
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField  
            className={styles.field} 
            label="Full name" 
            fullWidth
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'enter your full name'})}  />
        <TextField  
            className={styles.field} 
            type="email"
            label="E-Mail" 
            fullWidth
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message} 
            {...register('email', { required: 'enter your email'})}  />
        <TextField  
            className={styles.field} 
            type="password"
            label="Password" 
            fullWidth
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message} 
            {...register('password', { required: 'enter your password'})} />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Registration
        </Button>
      </form>
    </Paper>
  );
};
