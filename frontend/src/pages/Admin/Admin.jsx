import { useState, useEffect } from "react"
import { getDecodedJWT } from "../../helpers/auth";
import { deleteGameById } from "../../services/games";
import GameForm from "../../components/Game/GameForm";
import GameSearch from "../../components/Game/GameSearch"
import styles from './Admin.module.css' 
import clsx from "clsx";

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
                    <div>
                        <GameForm token={rawToken} mode="add"/>
                    </div>
                );

            case "Delete":
                return (
                    <div className="center">
                        <h2 className="title">Delete Game</h2>
                        <GameSearch token={rawToken} onSelectGame={handleDeleteGame}/>
                    </div>
                );

            case "Update":
                return (
                    selectedGame ? 
                    <div className="center">
                        <GameForm token={rawToken} gameId={selectedGame.id}/>
                        <button className={clsx("button", styles.backButton)} onClick={() => setSelectedGame(null)}>Back</button>
                    </div> 
                     :
                    <div className="center">
                        <h2 className="title">Update Game</h2>
                        <GameSearch token={rawToken} onSelectGame={handleSelectGame}/>
                    </div>
                );

            default:
                return null;
        }
    };

    return(
        <div className="start full-height gap12">
            <div className={clsx("start gap6", styles.adminSection)}>
                <h2 className="title">Welcome {token.name}</h2>
                <div className={clsx("center container gap6", styles.adminOptions)}>
                    <h3 className="title">Game Management</h3>
                    <button className={clsx("button", styles.adminButton)} onClick={() => { setAction("Add"); setSelectedGame(null); } }>Add</button>
                    <button className={clsx("button", styles.adminButton)} onClick={() => { setAction("Delete"); setSelectedGame(null); }}>Delete</button>
                    <button className={clsx("button", styles.adminButton)} onClick={() => { setAction("Update"); setSelectedGame(null); }}>Update</button>
                </div>
            </div>

            {renderActionContent()}    
        </div>
    )
}