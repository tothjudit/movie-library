using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace MovieLibrary.Api.Models;

public class Movie
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [Required]
    [MaxLength(120)]
    public string Title { get; set; } = string.Empty;

    public string Director { get; set; } = string.Empty;
    public string Genre { get; set; } = string.Empty;

    [Range(1888, 3000)]
    public int ReleaseYear { get; set; }

    [Range(0, 5)]
    public double? Rating { get; set; }
    public string? Description { get; set; }
    public string? PosterUrl { get; set; }
}