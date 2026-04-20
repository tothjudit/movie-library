FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY MovieLibrary.Api/*.csproj MovieLibrary.Api/
RUN dotnet restore MovieLibrary.Api/MovieLibrary.Api.csproj

COPY MovieLibrary.Api/. MovieLibrary.Api/
WORKDIR /src/MovieLibrary.Api
RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

COPY --from=build /app/publish .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "MovieLibrary.Api.dll"]