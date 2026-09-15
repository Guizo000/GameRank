using Microsoft.AspNetCore.Mvc;
using BackendAPI.DTOS;
using BackendAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Identity.Client;

namespace BackendAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {

        [HttpPost("register")]
        public async Task<ActionResult<string>> Register([FromBody] RegisterRequestDto registerRequest)
        {
            var token = await authService.RegisterAsync(registerRequest);
            
            if(token is null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            return Ok(new { token });
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginRequestDto loginRequest)
        {
            var token = await authService.LoginAsync(loginRequest);

            if (token is null)
            {
                return BadRequest(new { message = "Invalid email or password!!" });
            }

            return Ok(new { token });
        }
    }
}
