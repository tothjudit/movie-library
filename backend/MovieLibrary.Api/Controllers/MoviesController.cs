using Microsoft.AspNetCore.Mvc;
using MovieLibrary.Api.Models;
using MovieLibrary.Api.Services;

namespace MovieLibrary.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MoviesController : ControllerBase
{
    private readonly MovieService _movieService;

    public MoviesController(MovieService movieService)
    {
        _movieService = movieService;
    }

    [HttpGet]
    public async Task<ActionResult<List<Movie>>> GetAll()
    {
        var movies = await _movieService.GetAsync();
        return Ok(movies);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Movie>> GetById(string id)
    {
        var movie = await _movieService.GetAsync(id);

        if (movie is null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    [HttpPost]
    public async Task<ActionResult<Movie>> Create(Movie movie)
    {
        await _movieService.CreateAsync(movie);

        return CreatedAtAction(nameof(GetById), new { id = movie.Id }, movie);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, Movie updatedMovie)
    {
        var existingMovie = await _movieService.GetAsync(id);

        if (existingMovie is null)
        {
            return NotFound();
        }

        updatedMovie.Id = id;

        await _movieService.UpdateAsync(id, updatedMovie);

        return Ok(updatedMovie);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var movie = await _movieService.GetAsync(id);

        if (movie is null)
        {
            return NotFound();
        }

        await _movieService.RemoveAsync(id);

        return NoContent();
    }
}