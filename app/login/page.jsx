import styles from '@/app/ui/login/login.module.css';
import LoginForm from "@/app/ui/login/loginform/loginForm";

const Login = () => {
    return (
        <div className={styles.container}>
            <LoginForm/>
        </div>
    );
}

export default Login;