using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Api.Models;

namespace MovieLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetAll()
    {
        var movies = new List<Movie>
        {
            new Movie
            {
                Id = "1",
                Title = "Inception",
                Director = "Christopher Nolan",
                Genre = "Sci-Fi",
                ReleaseYear = 2010,
                Rating = 8.8,
                Description = "A skilled thief enters dreams to steal secrets."
            },
            new Movie
            {
                Id = "2",
                Title = "The Matrix",
                Director = "The Wachowskis",
                Genre = "Sci-Fi",
                ReleaseYear = 1999,
                Rating = 8.7,
                Description = "A hacker discovers the nature of reality."
            }
        };

        return Ok(movies);
    }
}