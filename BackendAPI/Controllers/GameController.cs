using BackendAPI.Dtos;
using BackendAPI.Models;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController(IGameService gameService) : ControllerBase
    {
        [HttpGet("games")]
        public async Task<ActionResult<IReadOnlyList<GameSummaryDto>>> GetAllGames()
        {
            IReadOnlyList<GameSummaryDto> allGames = await gameService.GetAllGamesAsync(); 

            return Ok(allGames);
        }

        [HttpPost("games")]
        public async Task<IActionResult> CreateGame([FromBody] CreateGameRequestDto gameDto)
        {
            GameDetailDto createdGame = await gameService.CreateGameAsync(gameDto);

            return StatusCode(201, createdGame);
        }
    }
}
