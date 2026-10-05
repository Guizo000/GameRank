const BASE_URL = import.meta.env.VITE_API_URL;

export default async function request(endpoint, { method = "GET", body, token } = {})
{
    const config = {
        method,
        headers: {
            "Content-Type": "application/json",
        }
    }

    if(token)
    {
        config.headers.Authorization = `Bearer ${token}`
    }

    if(body)
    {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if(!response.ok)
    {
        const errorData = await response.json().catch(() => ({}));
        let errorMessage = "An error ocurred"

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

    return response.status === 204 ? {} : response.json();
}

