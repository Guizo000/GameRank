using System.ComponentModel.DataAnnotations;

namespace BackendAPI.DTOS
{
    public class RegisterRequestDto
    {
        [Required]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(1, ErrorMessage = "Name must be at least 1 character long")]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    //public class UserResponseDto
    //{
    //    public int Id { get; set; }

    //    public string Email { get; set; } = string.Empty;

    //    public string Name { get; set; } = string.Empty;
    //}
}