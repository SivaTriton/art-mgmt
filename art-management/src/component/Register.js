import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, data);
            alert('Registration successful');
        } catch (err) {
            console.error(err);
            alert('Error registering');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Name"
            />
            {errors.name && <span>{errors.name.message}</span>}

            <input
                type="email"
                {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                })}
                placeholder="Email"
            />
            {errors.email && <span>{errors.email.message}</span>}

            <input
                type="password"
                {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                placeholder="Password"
            />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
