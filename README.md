
# Game Store Website

This is a web application for browsing, searching, and managing video games, built with React. The Game Store Website allows users to explore a curated selection of games, view details, add games to their bag, and manage their personal library.

## Features

- Browse a collection of popular video games
- View game details, ratings, and images
- Add games to your bag and manage your library
- Filter games by categories
- Responsive design for desktop and mobile
- Login or create a new account before entering the app
- New accounts are stored in JSON format in `src/data/usersData.json`

## Project Structure

- `public/` - Static files and assets
  - `api/gamesData.json` - Game data used by the app
  - `assets/games/` - Game background images
- `src/` - Source code
  - `components/` - Reusable UI components (GameCard, GameRating, GameSwiper, SideMenu, etc.)
  - `data/` - Data files for navigation, filters, and social links
  - `images/` - Profile and other images
  - `pages/` - Main pages (Home, Categories, Bag, MyLibrary, Header, Main)

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to launch both the React app and auth API server

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Auth API runs on [http://localhost:5000](http://localhost:5000).

### Scripts

`npm start` - Start React app + auth API together
`npm run client` - Start only React app
`npm run server` - Start only auth API server
`npm test` - Run tests
`npm run build` - Build for production

## Folder Overview

- `public/api/gamesData.json` - Game data
- `src/components/` - UI components
- `src/pages/` - Main pages
- `src/data/` - Data files

## Authentication Data

- Accounts are created from the login page (Create Account mode)
- Account data is stored in `src/data/usersData.json`
- Login uses `username` + `password`

## License

This project is for educational and demonstration purposes.

...existing code...

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
