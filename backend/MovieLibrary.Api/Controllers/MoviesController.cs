using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Api.Models;

namespace MovieLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private static readonly List<Movie> Movies =
    [
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
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Movie>> GetAll()
    {
        return Ok(Movies);
    }

    [HttpGet("{id}")]
    public ActionResult<Movie> GetById(string id)
    {
        var movie = Movies.FirstOrDefault(m => m.Id == id);

        if (movie is null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    [HttpPost]
    public ActionResult<Movie> Create(Movie movie)
    {
        movie.Id = (Movies.Count + 1).ToString();
        Movies.Add(movie);

        return CreatedAtAction(nameof(GetById), new { id = movie.Id }, movie);
    }

    [HttpPut("{id}")]
    public ActionResult<Movie> Update(string id, Movie updatedMovie)
    {
        var movie = Movies.FirstOrDefault(m => m.Id == id);

        if (movie is null)
        {
            return NotFound();
        }

        movie.Title = updatedMovie.Title;
        movie.Director = updatedMovie.Director;
        movie.Genre = updatedMovie.Genre;
        movie.ReleaseYear = updatedMovie.ReleaseYear;
        movie.Rating = updatedMovie.Rating;
        movie.Description = updatedMovie.Description;

        return Ok(movie);
    }
    [HttpDelete("{id}")]
public IActionResult Delete(string id)
{
    var movie = Movies.FirstOrDefault(m => m.Id == id);

    if (movie is null)
    {
        return NotFound();
    }

    Movies.Remove(movie);

    return NoContent();
}
}