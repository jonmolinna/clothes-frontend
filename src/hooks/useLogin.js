import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authReducer';

const initialForm = {
    username: "",
    password: "",
};

const useLogin = () => {
    const [form, setForm] = useState(initialForm);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    const handleLogin = () => {
        dispatch(login(form));
        setForm(initialForm);
    };

    return [form, handleChange, handleLogin];
};

export default useLogin;
