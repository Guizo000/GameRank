import request from "./client.js"

export async function addGame(gameData, token)
{
    request("/game", {
        method: "POST",
        body: gameData,
        token
    });
}