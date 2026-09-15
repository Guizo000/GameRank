import { useState } from "react";
import { useNavigate, Link } from "react-router"
import './style/Login.css'

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
            localStorage.setItem('token', data.token);    

            alert("Login succesful!")

            navigate("/home");

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
        <div className="login">
            {error && <div className="login__error">{error}</div>}

            <form className="login__form" onSubmit={handleLogin} noValidate>
                <h2 className="login__title">Welcome Back</h2>

                <div className="login__field">
                    <label className="login__label" htmlFor="email">Email:</label>
                    <input 
                        className="login__input"
                        id="email"
                        type="email"
                        placeholder="Insert your email"
                        value={email}
                        onChange= {(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </div>

                <div className="login__field">
                    <label className="login__label" htmlFor="password">Password:</label>
                    <input 
                        className="login__input"
                        id="password"
                        type="password"
                        placeholder="Insert your password"
                        value={password}
                        onChange= {(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />
                </div>

                <button className="login__submit" disabled={isLoading}>
                    {isLoading ? "Logging in" : "Log in"}
                </button>

                <p className="login__switch">
                    Doesn't have an account? <Link to="/register" className="login__link">Register</Link>
                </p>

            </form>         
        </div>
    )
}