import { useState } from "react"
import { addGame } from "../services/games"

const initialFormState = {
    name: "",
    genre: "",
    description: "",
    releaseDate: "",
    image: "",
}

export default function AddGameForm( { token })
{
    const [formData, setFormData] = useState(initialFormState);
    
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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
        };

        setIsLoading(true);

        try
        {
            await addGame(payload, token);
            alert("Game added with success!");
            setFormData(initialFormState);
        }
        catch (err)
        {
            setError(err.message || "Failed to connect to the server.")
        }
        finally
        {
            setIsLoading(false);
        }

    }

    return(
        <div>
            {error && <p>{error}</p>}

            <form onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="name">Name: </label>
                <input 
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFormChange(e)}
                />

                <label htmlFor="genre">Genre: </label>
                <input 
                    id="genre"
                    type="text"
                    value={formData.genre}
                    onChange={(e) => handleFormChange(e)}
                />

                <label htmlFor="description">Description: </label>
                <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleFormChange(e)}                    
                />


                <label htmlFor="releaseDate">ReleaseDate: </label>
                <input 
                    id="releaseDate"
                    type="date"
                    value={formData.releaseDate}
                    onChange={(e) => handleFormChange(e)}
                />


                <label htmlFor="image">Image: </label>
                <input 
                    id="image"
                    type="url"
                    value={formData.image}
                    onChange={(e) => handleFormChange(e)}
                />

                <button type="submit" disabled={isLoading}>
                    Send Request
                </button>
            </form>
        </div>
    )
}