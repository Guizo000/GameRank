import { useState, useEffect } from "react"
import { searchGame } from "../services/games"

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
        <div>
            <input
                type="search"
                value={query}
                placeholder="Search the Game"
                onChange={(e) => setQuery(e.target.value)}
            />

            {error && <p>{error}</p>}            
            {isLoading && <p>Loading...</p>}

            <div>
                {
                    results.map(game => (
                        <button key={game.id} onClick={() => onSelectGame(game)}>{game.name}</button>
                    ))
                }
            </div>
        </div>
    )
}