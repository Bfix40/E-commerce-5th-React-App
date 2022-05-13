import {useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services";


const Signup = () => {
    const { handleSubmit, register } = useForm();
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState({});
    const [alert, setAlert] = useState(false)

    const onSubmit = (data) => {
        setUserObj(data);
    };

    useEffect(() => {
        if (userObj.email) {
            createUser(userObj)
                .then(() => {
                    setAlert(true)
                    navigate("/login");
                });
        }
    }, [userObj, navigate]);

    return (
        <div>
            {alert ? <div data-aos="zoom-in">'Cuenta creada'</div> : ""}
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="first_name">Email</label>
                <input
                    id="first_name"
                    placeholder="Jhon"
                    type="text"
                    {...register("first_name")}
                />
                <label htmlFor="last_name">Email</label>
                <input
                    id="last_name"
                    placeholder="Doe"
                    type="text"
                    {...register("last_name")}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    placeholder="example@example.com"
                    type="email"
                    {...register("email")}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password")}
                />
                <label htmlFor="submit">Submit</label>
                <input id="submit" type="submit" />
            </form>
        </div>
    );
};

export default Signup