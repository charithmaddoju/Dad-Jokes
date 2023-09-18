
# Dad Jokes React App

Welcome to the Dad Jokes React App! This playful web application fetches a collection of 10 dad jokes from an API and displays them for a good laugh. You can click on the "Add New Joke" button to fetch 10 new jokes, and your preferences, including upvotes and downvotes for each joke, are saved locally using `localStorage`. This means that even after refreshing the page or reopening the app, your jokes and votes will remain intact.

## Technologies Used

- React
- JavaScript
- HTML
- CSS

## How `localStorage` is Used

The app utilizes `localStorage` to persist the state of jokes and votes, ensuring that even after a re-render, the user's preferences remain unchanged. When a new set of jokes is fetched, the app updates the local storage to reflect the latest state of jokes and votes.

## How to Use

1. Clone the repository:

```bash
git clone https://github.com/your-username/dad-jokes-react-app.git
cd dad-jokes-react-app
```

2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

4. Enjoy the jokes and hit "Add New Joke" for more laughter!

## Contribution

If you have any suggestions, issues, or want to contribute, feel free to create an issue or make a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

```
Replace `your-username` with your actual GitHub username in the clone URL.

Feel free to customize and expand upon this README to suit your project's needs!
