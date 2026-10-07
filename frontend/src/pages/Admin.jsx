import { useState, useEffect } from "react"
import { getDecodedJWT } from "../helpers/auth";
import GameForm from "../components/GameForm";
import GameSearch from "../components/GameSearch";
import "./style/Admin.css"


export default function Admin() 
{
    const [action, setAction] = useState("");
    const [selectedGame, setSelectedGame] = useState(null);

    const rawToken = localStorage.getItem('token');
    const token = getDecodedJWT(rawToken);

    const handleSelectGame = (game) => {
        setSelectedGame(game)
    }

    const renderActionContent = () => {
        switch (action) 
        {
            case "Add":
                return (
                    <GameForm token={rawToken} mode="add"/>
                );

            case "Delete":
                return (
                    <p>Delete</p>
                );

            case "Update":
                return (
                    selectedGame ? 
                    <div>
                        <GameForm token={rawToken} gameId={selectedGame.id}/>
                        <button onClick={() => setSelectedGame(null)}>Back</button>
                    </div> 
                     :
                    <GameSearch token={rawToken} onSelectGame={handleSelectGame}/>
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
                <button className="admin__btn" onClick={() => { setAction("Add"); setSelectedGame(null); } }>Add</button>
                <button className="admin__btn" onClick={() => { setAction("Delete"); setSelectedGame(null); }}>Delete</button>
                <button className="admin__btn" onClick={() => { setAction("Update"); setSelectedGame(null); }}>Update</button>
            </div>

            <div className="admin__content">
                {renderActionContent()}
            </div>     
        </div>
    )
}