export const TMDB_CONFIG = {
    BASE_URL: "https://api.themoviedb.org/3",
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        "Authorization": `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
        "Accept": "application/json",
    },
};
// This is a TypeScript file that defines the configuration for the TMDB API, including the base URL and API key.
// It also defines two functions: fetchMovies and fetchMovieDetails.
// The fetchMovies function fetches a list of movies based on a search query or popularity.
// The fetchMovieDetails function fetches detailed information about a specific movie based on its ID.

export const fetchMovies = async ({ query, }: { query: string }): Promise<Movie[]> => {
    const endpoint = query ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: TMDB_CONFIG.headers,
    });
    if (!response.ok) {
        throw new Error(`Error fetching movies: ${response.statusText}`);
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovieDetails = async (movieId: string): Promise<MovieDetails> => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movieId}`;
    try {
        const response = await fetch(endpoint, {
            method: "GET",
            headers: TMDB_CONFIG.headers,
        });
        if (!response.ok) {
            throw new Error(`Error fetching movie details: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching movie details:", error);
        throw error;
    }
}