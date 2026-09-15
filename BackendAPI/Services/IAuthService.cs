using BackendAPI.DTOS;
using BackendAPI.Models;

namespace BackendAPI.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterRequestDto registerRequest);
        Task<string?> LoginAsync(LoginRequestDto loginRequest);          
    }
}
