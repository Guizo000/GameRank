using System.ComponentModel.DataAnnotations;

namespace BackendAPI.Dtos
{

    public class CreateGameRequestDto
    {
        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(64)]
        public string Genre { get; set; } = string.Empty;

        [MaxLength(1024)]
        public string? Description { get; set; }

        public DateOnly? ReleaseDate { get; set; }

        [Url]
        [MaxLength(2048)]
        public string? Image { get; set; }
    }

    public class GameSummaryDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;

        public DateOnly? ReleaseDate { get; set; }

        public string? Image { get; set; }
    }

    public class GameDetailDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Genre { get; set; } = string.Empty;

        public string? Description { get; set; }

        public DateOnly? ReleaseDate { get; set; }

        public string? Image { get; set; }
    }
}
