import { useState, useEffect } from "react"
import { addGame, searchGameById, updateGame } from "../../services/games"
import styles from "./Game.module.css"
import clsx from "clsx"

const initialFormState = {
    name: "",
    genre: "",
    description: "",
    releaseDate: "",
    image: ""
}

export default function AddGameForm({ token, gameId })
{
    const isUpdating = Boolean(gameId);

    const [formData, setFormData] = useState(initialFormState);
    

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            try
            {
                if(isUpdating)
                {
                    const game = await searchGameById(gameId);    
                    setFormData({
                        name: game.name || "",
                        genre: game.genre || "",
                        description: game.description || "",
                        releaseDate: game.releaseDate || "",
                        image: game.image || ""
                    });  
                }
            }   
            catch(err)
            {
                console.log(err)
            } 
        }

        fetch()
    }, [gameId])

    const handleFormChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if(!formData.name.trim())
        {
            setError("Name is Required");
            return;
        }

        if(!formData.genre.trim())
        {
            setError("Genre is Required");
            return;
        }

        const payload = {
            ...formData,
            releaseDate: formData.releaseDate || null,
            image: formData.image || null,
            description: formData.description || null,
            ...(isUpdating && { id: gameId })
        };

        setIsLoading(true);

        try
        {   
            if(isUpdating)
            {
                await updateGame(payload, token);
                alert("Game updated with success!");
            }
            else
            {
                await addGame(payload, token);
                alert("Game added with success!");
                setFormData(initialFormState);
            } 
        }
        catch (err)
        {
            console.log(err.message)
            setError(err.message || "Failed to connect to the server.")
        }
        finally
        {
            setIsLoading(false);
        }

    }

    return(
        <div className={clsx("center gap8", styles.formContainer)}>
            {error && <div className="center error-container">{error}</div>}

            <form className="center container gap6" onSubmit={(e) => handleSubmit(e)}>
                {isUpdating ? <h2 className="title">Update Game</h2> : <h2 className="title">Add Game</h2>}

                <div className="center">
                    <label className="text" htmlFor="name">Name: </label>
                    <input 
                        className="input"
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>
                

                <div className="center">
                    <label className="text" htmlFor="genre">Genre: </label>
                    <input 
                        className="input"
                        id="genre"
                        type="text"
                        value={formData.genre}
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>

                <div className="center">
                    <label className="text" htmlFor="description">Description: </label>
                    <textarea
                        id="description"
                        className="input"
                        value={formData.description}
                        onChange={(e) => handleFormChange(e)}                    
                    />
                </div>


                <div className="center">
                    <label className="text" htmlFor="releaseDate">ReleaseDate: </label>
                    <input 
                        id="releaseDate"
                        type="date"
                        className="input"
                        value={formData.releaseDate}
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>

                <div className="center">
                    <label className="text" htmlFor="image">Image: </label>
                    <input 
                        id="image"
                        type="url"
                        className="input"
                        value={formData.image}
                        onChange={(e) => handleFormChange(e)}
                    />
                </div>

                <button className="button" type="submit" disabled={isLoading}>
                   { isUpdating ? "Update" : "Add"}
                </button>
            </form>
        </div>
    )
}