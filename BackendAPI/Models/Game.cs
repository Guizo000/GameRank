using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackendAPI.Models
{
    [Table("Games")]
    public class Game
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(128)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(64)]
        public string Genre { get; set; } = string.Empty;

        [MaxLength(1024)]
        public string? Description { get; set; }

        public DateOnly? ReleaseDate { get; set; }

        [MaxLength(2048)]
        public string? Image { get; set; }
    }
}
