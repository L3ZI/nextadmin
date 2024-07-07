import styles from '@/app/ui/login/login.module.css';

const Login = () => {
    return (
        <div className={styles.container}>
            <form className={styles.form} action=''>
                <h1>Login</h1>
                <input type='text' placeholder='username'/>
                <input type='password' placeholder='password'/>
                <button>Login</button>
            </form>
        </div>
    );
}

export default Login;