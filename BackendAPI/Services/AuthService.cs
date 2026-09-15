using BackendAPI.Data;
using BackendAPI.DTOS;
using BackendAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BackendAPI.Services
{
    public class AuthService(ProjectDbContext _context, IPasswordHasher<User> _passwordHasher, IConfiguration _configuration) : IAuthService
    {
        async public Task<string?> RegisterAsync(RegisterRequestDto registerRequestDto)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Email == registerRequestDto.Email);
            
            if(userExists)
            {
                return null;
            }

            User user = new User
            {
                Email = registerRequestDto.Email,
                Name = registerRequestDto.Name
            };

            user.HashedPassword = _passwordHasher.HashPassword(user, registerRequestDto.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreateToken(user);
        }

        async public Task<string?> LoginAsync(LoginRequestDto loginRequestDto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == loginRequestDto.Email);
     
            if (user is null)
            {
                return null;
            }

            var verificationResult = _passwordHasher.VerifyHashedPassword(user, user.HashedPassword, loginRequestDto.Password);

            switch (verificationResult)
            {
                case PasswordVerificationResult.Failed:
                    return null;

                case PasswordVerificationResult.SuccessRehashNeeded:
                    user.HashedPassword = _passwordHasher.HashPassword(user, loginRequestDto.Password);
                    await _context.SaveChangesAsync();
                    break;
            }

            return CreateToken(user);
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken
            (
                issuer: _configuration.GetValue<string>("AppSettings:Issuer"),
                audience: _configuration.GetValue<string>("AppSettings:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds

            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }
    }
}
