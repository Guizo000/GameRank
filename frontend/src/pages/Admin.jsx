import { useState, useEffect } from "react"
import { getDecodedJWT } from "../helpers/auth";
import { deleteGameById } from "../services/games";
import GameForm from "../components/GameForm";
import GameSearch from "../components/GameSearch"
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

    const handleDeleteGame = async (game) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${game.name}"?`);
  
        if (confirmed) {
            try
            {
                await deleteGameById(game.id, rawToken);
                alert("Game deleted with success!")
            }
            catch(err)
            {
                console.log(err.message);
            }
        }
    }

    const renderActionContent = () => {
        switch (action) 
        {
            case "Add":
                return (
                    <div className="admin__content">
                        <GameForm token={rawToken} mode="add"/>
                    </div>
                );

            case "Delete":
                return (
                    <div className="admin__content">
                        <h2>Delete Game</h2>
                        <GameSearch token={rawToken} onSelectGame={handleDeleteGame}/>
                    </div>
                );

            case "Update":
                return (
                    selectedGame ? 
                    <div className="admin__content">
                        <GameForm token={rawToken} gameId={selectedGame.id}/>
                        <button onClick={() => setSelectedGame(null)}>Back</button>
                    </div> 
                     :
                    <div className="admin__content">
                        <h2>Update Game</h2>
                        <GameSearch token={rawToken} onSelectGame={handleSelectGame}/>
                    </div>
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

            {renderActionContent()}    
        </div>
    )
}