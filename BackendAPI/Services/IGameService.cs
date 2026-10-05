using BackendAPI.Dtos;
using BackendAPI.Models;

namespace BackendAPI.Services
{
    public interface IGameService
    {
        Task<IReadOnlyList<GameSummaryDto>> GetAllGamesAsync();
        Task<GameDetailDto> CreateGameAsync(CreateGameRequestDto createGameRequest);
        Task<GameDetailDto?> GetGameAsync(int id);
        Task<IReadOnlyList<GameSummaryDto>> GetQueryGamesAsync(string name);
        Task<bool> DeleteGameAsync(int id);
        Task<bool> UpdateGameAsync(UpdateGameRequestDto gameDetail);
    }
}
