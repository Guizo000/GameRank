import { useState, useEffect } from "react"
import { searchGame } from "../../services/games"
import styles from "./Game.module.css"
import clsx from "clsx";

export default function UpdateGameForm({ token, onSelectGame }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const timeout = setTimeout(async () => {
            setError("")

            if(!query.trim())
            {
                setResults([]);
                return;
            }

            setIsLoading(true)

            try
            {
                const response = await searchGame(query, token);
                setResults(response);
            }
            catch (err)
            {
                setError(err.message || "Failed to connect to the server.")
            }
            finally
            {
                setIsLoading(false);
            }
        }, 500)  

        return () => clearTimeout(timeout);
        
    }, [query, token])

    return (
        <div className="center">
            <input
                className="input margin4"
                type="search"
                value={query}
                placeholder="Search the Game"
                onChange={(e) => setQuery(e.target.value)}
            />

            {error && <div className="center error-container">{error}</div>}            
            {isLoading && <p className="text">Loading...</p>}

            <div className="center gap2">
                {
                    results.map(game => (
                        <button className={clsx("button", styles.game)} key={game.id} onClick={() => onSelectGame(game)}>
                            {game.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}