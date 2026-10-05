import { useState, useEffect } from "react"
import { getDecodedJWT } from "../helpers/auth";
import AddGameForm from "../components/AddGameForm";
import UpdateGameForm from "../components/UpdateGameForm";
import "./style/Admin.css"


export default function Admin() 
{
    const [action, setAction] = useState("");

    const rawToken = localStorage.getItem('token');
    const token = getDecodedJWT(rawToken)

    const renderActionContent = () => {
        switch (action) 
        {
            case "Add":
                return (
                    <AddGameForm token={rawToken}/>
                );

            case "Delete":
                return (
                    <p>Delete</p>
                );

            case "Update":
                return (
                    <UpdateGameForm token={rawToken}/>
                );

            default:
                return null;
        }
    };

    return(
        <div className="admin">
            <h2 className="admin__header">Welcome {token.name}</h2>
            <div className="admin__game-management">
                <h3 className="admin__game-title">Game Management</h3>
                <button className="admin__btn" onClick={() => setAction("Add")}>Add</button>
                <button className="admin__btn" onClick={() => setAction("Delete")}>Delete</button>
                <button className="admin__btn" onClick={() => setAction("Update")}>Update</button>
            </div>

            <div className="admin__content">
                {renderActionContent()}
            </div>     
        </div>
    )
}