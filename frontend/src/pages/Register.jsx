import { useState } from "react"
import { useNavigate, Link } from "react-router";
import './style/Register.css'; 

export default function Register()
{
    //User variables
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    //Form variables
    const[error, setError] = useState("");
    const[isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); //Stops page reloading
        setError("");
        
        //Security validation to avoid useless calls to the backend api
        //Lacking validation of email format
        if(!name.trim())
        {
            setError("Name must be at least 1 character long");
            return;
        } 

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if(password.length < 8)
        {
            setError("Password must be at least 8 characters long");
            return;
        }    

        setIsLoading(true);

        //Making api call
        try
        {
            const response = await fetch('https://localhost:7242/api/auth/register', {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ name, email, password }),     
            });

            if(!response.ok)
            {
                const errorData = await response.json().catch(() => ({}));
                let errorMessage = "Something went wrong";

                if(errorData.message)
                {
                    errorMessage = errorData.message;
                }
                else if(errorData.errors)
                {
                    const errorFirstKey = Object.keys(errorData.errors)[0];
                    errorMessage = errorData.errors[errorFirstKey][0];
                }
                else if(errorData.title)
                {
                    errorMessage = errorData.title;
                }

                throw new Error(errorMessage);
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);    

            alert("Register succesful!")

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
        <div className="register">
            {error && <div className="register__error">{error}</div>}

            
            <form method="post" className="register__form" onSubmit={handleSubmit} noValidate>
                <h2 className="register__title">Welcome</h2>

                <div className="register__field">
                    <label className="register__label" htmlFor="name"> Name: </label>
                    <input
                        className="register__input"
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Insert your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}  
                    />
                </div>

                <div className="register__field">
                    <label className="register__label" htmlFor="email"> Email: </label>
                    <input 
                        className="register__input"
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Insert your email" 
                        onChange={(e) => setEmail(e.target.value)} 
                        value={email}
                    />
                </div>

                <div className="register__field">
                    <label className="register__label" htmlFor="password"> Password: </label>   
                    <input 
                        className="register__input"
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Insert your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    /> 
                </div>                

                <button className="register__submit" type="submit" disabled={isLoading}> 
                    {isLoading? "Registering..." : "Register"} 
                </button>

                <p className="register__switch">
                    Already registered? <Link to="/login" className="register__link">Log In</Link>
                </p>

            </form>
        </div>        
    );
}