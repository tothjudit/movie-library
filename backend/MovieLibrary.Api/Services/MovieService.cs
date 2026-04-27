using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MovieLibrary.Api.Models;

namespace MovieLibrary.Api.Services;

public class MovieService
{
    private readonly IMongoCollection<Movie> _moviesCollection;

    public MovieService(IOptions<MongoDbSettings> mongoDbSettings)
    {
        var mongoClient = new MongoClient(mongoDbSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);

        _moviesCollection = mongoDatabase.GetCollection<Movie>(
            mongoDbSettings.Value.MoviesCollectionName);
    }

    public async Task<List<Movie>> GetAsync() =>
        await _moviesCollection.Find(_ => true).ToListAsync();

    public async Task<Movie?> GetAsync(string id) =>
        await _moviesCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Movie newMovie)
    {
        if (string.IsNullOrWhiteSpace(newMovie.Id))
        {
            var movies = await _moviesCollection.Find(_ => true).ToListAsync();

            var maxId = movies
                .Select(m => int.TryParse(m.Id, out var parsedId) ? parsedId : 0)
                .DefaultIfEmpty(0)
                .Max();

            newMovie.Id = (maxId + 1).ToString();
        }

        await _moviesCollection.InsertOneAsync(newMovie);
    }

    public async Task UpdateAsync(string id, Movie updatedMovie) =>
        await _moviesCollection.ReplaceOneAsync(x => x.Id == id, updatedMovie);

    public async Task RemoveAsync(string id) =>
        await _moviesCollection.DeleteOneAsync(x => x.Id == id);
}