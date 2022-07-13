import { useState } from 'react';

const initialForm = {
    username: "",
    password: "",
};

const useLogin = () => {
    const [form, setForm] = useState(initialForm);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    console.log('Yoo', form)

    return [form, handleChange];
};

export default useLogin;
