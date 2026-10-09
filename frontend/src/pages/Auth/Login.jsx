import { useState } from "react";
import { useNavigate, Link } from "react-router"
import { getDecodedJWT } from "../../helpers/auth";
import styles from './Auth.module.css'
import clsx from "clsx";

export default function Login()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("")

        //Security validation to avoid useless calls to the backend api
        //Lacking validation of email format
        if(!email.trim())
        {
            setError("Email is required");
            return;
        }

        if(!password.trim())
        {
            setError("Password is required");
            return;
        }

        setIsLoading(true);

        try
        {
            const response = await fetch("https://localhost:7242/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if(!response.ok)
            {
                const errorData = await response.json().catch(() => ({}));
                let errorMessage = "Failed to login"

                if(errorData.message)
                {
                    errorMessage = errorData.message;
                }
                else if(errorData.errors)
                {
                    const firstKey = Object.keys(errorData.errors)[0];
                    errorMessage = errorData.errors[firstKey][0];
                }
                else if(errorData.title)
                {
                    errorMessage = errorData.title;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();   
            const decodedJWT = getDecodedJWT(data.token);

            localStorage.setItem('token', data.token); 

            alert("Login succesful!")
            if(decodedJWT.role === "Admin")
            {
                navigate("/admin");
            }
            else if(decodedJWT.role === "User")
            {
                //To-Do
            }
            

        }
        catch(err)
        {
            setError(err.message || "Failed to connect to the server.");
        }
        finally
        {
            setIsLoading(false);
        }

    };

    return(
        <div className="center full-height gap6">
            {error && <div className={clsx("center", "error-container")}>{error}</div>}

            <form className={clsx("center container gap6", styles.authForm)} onSubmit={handleLogin} noValidate>
                <h2 className="title">Welcome Back</h2>

                <div className="center input-container gap1">
                    <label className={clsx("text", styles.authLabel)} htmlFor="email">Email:</label>
                    <input 
                        className="input"
                        id="email"
                        type="email"
                        placeholder="Insert your email"
                        value={email}
                        onChange= {(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="center input-container gap1">
                    <label className={clsx("text", styles.authLabel)} htmlFor="password">Password:</label>
                    <input 
                        className="input"
                        id="password"
                        type="password"
                        placeholder="Insert your password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <button className="button" disabled={isLoading}>
                    {isLoading ? "Logging in" : "Log in"}
                </button>

                <p className="text">
                    Doesn't have an account? <Link to="/register" className="link">Register</Link>
                </p>

            </form>         
        </div>
    )
}