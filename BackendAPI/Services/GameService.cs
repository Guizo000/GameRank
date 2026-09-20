using BackendAPI.Data;
using BackendAPI.Dtos;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BackendAPI.Services
{
    public class GameService(ProjectDbContext _context) : IGameService
    {
        public async Task<GameDetailDto> CreateGameAsync(CreateGameRequestDto createGameRequest)
        {
            var game = new Game()
            {
                Name = createGameRequest.Name,
                Genre = createGameRequest.Genre,
                Description = createGameRequest.Description,
                ReleaseDate = createGameRequest.ReleaseDate,
                Image = createGameRequest.Image
            };

            _context.Games.Add(game);
            await _context.SaveChangesAsync();

            return new GameDetailDto()
            { 
                Id = game.Id,
                Name = game.Name,
                Genre = game.Genre,
                Description = game.Description,
                ReleaseDate = game.ReleaseDate,
                Image = game.Image
            };

        }

        public async Task<bool> DeleteGameAsync(int id)
        {
            Game? gameToBeDeleted = await _context.Games.FindAsync(id);

            if(gameToBeDeleted is null)
            {
                return false;
            }

            _context.Games.Remove(gameToBeDeleted);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IReadOnlyList<GameSummaryDto>> GetAllGamesAsync()
        {
            return await _context.Games
                .AsNoTracking()
                .Select(game => new GameSummaryDto
                {
                    Id = game.Id,
                    Name = game.Name,
                    Genre = game.Genre,
                    ReleaseDate = game.ReleaseDate,
                    Image = game.Image
                })
                .ToListAsync();         
        }

        public async Task<GameDetailDto?> GetGameAsync(int id)
        {
            return await _context.Games
                .AsNoTracking()
                .Select(game => new GameDetailDto
                {
                    Id = game.Id,
                    Name = game.Name,
                    Genre = game.Genre,
                    Description = game.Description,
                    ReleaseDate = game.ReleaseDate,
                    Image = game.Image
                })
                .FirstOrDefaultAsync(g => g.Id == id);
        }
    }
}
