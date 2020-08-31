# The Shoppies

An app to help manage movie nomination for the upcoming Shoppies

GitHub Pages: placeholder

# 💭 Design Decisions

- Since this is a front-end only app, and I did not want to use any backend code. There is no way to securely store the OMDB API keys, therefore I decided to create a dialog where user can input the API key. Ths API key is stored in local storage so user will only have to input it once. Since OMDB also only has 1,000 daily limit, this also allows users to put in a new key. Solves: secruity issue of pushing API key to gitHub / hitting daily limits
- Use Material-UI library to make it look clean, simple, and modern!
- Use movie icons in front of the list. I was deciding between displaying the poster or using the movie icon. Given that OMDB return movies, series, esposides, using icons can used to differentiate the different types in the future. (currenly only showing movies)

# 💡Features

- Search OMDB and display the results (movies only) - completed Aug 24
- Add a movie from the search results to our nomination list - completed Aug 24
- View the list of films already nominated - completed Aug 24
- Remove a nominee from the nomination list - completed Aug 24
- Save nomination lists if the user leaves the page (using local storage) - completed Aug 24
- Input API key - completed Aug 25
- Added Pagination for research results - completed Aug 30

# 🖥️ Tech

- React (Create-React-App)
- CSS
- HTML
- Material-UI

# 🛠️ Future Improvements

- Load more / Infinite Scroll for more movies
- Animations for loading, adding/deleting movies, notifications
- Create shareable links

# 🚀 License

MIT license
