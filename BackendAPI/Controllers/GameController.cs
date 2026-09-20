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
    public class GameController(IGameService _gameService) : ControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<GameDetailDto?>> GetGame(int id)
        {
            GameDetailDto? returnedGame = await _gameService.GetGameAsync(id);

            if (returnedGame == null)
            {
                return NotFound(new { message = "Game not found" });
            }

            return Ok(returnedGame);
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<GameSummaryDto>>> GetAllGames()
        {
            IReadOnlyList<GameSummaryDto> allGames = await _gameService.GetAllGamesAsync();

            return Ok(allGames);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGame([FromBody] CreateGameRequestDto gameDto)
        {
            GameDetailDto createdGame = await _gameService.CreateGameAsync(gameDto);

            return CreatedAtAction(nameof(GetGame), new { id = createdGame.Id }, createdGame);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGame(int id)
        {
            bool isDeleted = await _gameService.DeleteGameAsync(id);

            if (!isDeleted)
            {
                return NotFound(new { message = "Game not found" });
            }

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGame(int id, UpdateGameRequestDto updateGameRequestDto)
        {
            if (id != updateGameRequestDto.Id)
            {
                return BadRequest(new { message = "Route ID does not match request body ID." });
            }

            bool isUpdated = await _gameService.UpdateGameAsync(updateGameRequestDto);

            if(!isUpdated)
            {
                return NotFound(new { message = "Game not found" });
            }

            return NoContent();
        }

    }
}
