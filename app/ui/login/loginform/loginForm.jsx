"use client";
import styles from "./loginForm.module.css"
import {authenticate} from "@/app/lib/actions";
import {useFormState} from "react-dom";

const LoginForm = () => {
    const [state, formAction] = useFormState(authenticate, undefined);

    return (
        <form className={styles.form} action={formAction}>
            <h1>Login</h1>
            <input type='text' name='username' placeholder='username'/>
            <input type='password' name='password' placeholder='password'/>
            <button>Login</button>
            {state && state}
        </form>
    )
}

export default LoginForm;