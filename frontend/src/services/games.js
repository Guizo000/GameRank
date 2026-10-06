import request from "./client.js"

export function addGame(gameData, token)
{
    request("/game", {
        method: "POST",
        body: gameData,
        token
    });
}

export function updateGame(gameData, token)
{
    console.log(gameData.id)
    request(`/game/${gameData.id}`, {
        method: "PUT",
        body: gameData,
        token
    });
}

export function searchGame(query, token)
{
    const searchParams = new URLSearchParams({
        name: query.trim()
    })

    return request(`/game/search?${searchParams}`, {
        method: "GET",
        token
    })
}

export function searchGameById(id, token)
{
    return request(`/game/${id}`, {
        method: "GET",
        token
    })
}

