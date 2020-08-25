# The Shoppies

An app to help manage movie nomination for the upcoming Shoppies

GitHub Pages: placeholder

# 💭 Design Decisions

- Since this is a front-end only app, and I did not want to use any backend code. There is no way to securely store the OMDB API keys, therefore I decided to create a dialog where user can input the API key. Ths API key is stored in local storage so user will only have to input it once. Since OMDB also only has 1,000 daily limit, this also allows users to put in a new key. Solves: pushing API key to gitHub / hitting daily limits
- Use Material-UI library to make it look clean, simple, and modern!

# 💡Features

- Search OMDB and display the results (movies only)
- Add a movie from the search results to our nomination list
- View the list of films already nominated
- Remove a nominee from the nomination list
- Save nomination lists if the user leaves the page (using local storage)
- Input API key

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
