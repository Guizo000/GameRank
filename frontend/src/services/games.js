import request from "./client.js"

export function addGame(gameData, token)
{
    request("/game", {
        method: "POST",
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