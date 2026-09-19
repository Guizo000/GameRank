using BackendAPI.Dtos;
using BackendAPI.Models;

namespace BackendAPI.Services
{
    public interface IGameService
    {
        Task<IReadOnlyList<GameSummaryDto>> GetAllGamesAsync();
        Task<GameDetailDto> CreateGameAsync(CreateGameRequestDto createGameRequest);

    }
}
