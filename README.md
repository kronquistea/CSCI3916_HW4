# Assignment Four
## Postman Test Details
### Testing Requirements
All requests require an JWT authorization token.

### Postman Tests and Routes
1. Test Signup - `/signup` (POST)
2. Test Signin - `/signin` (POST)
3. Get Movie by ID - `/The Martian` (GET)
4. Add review - `/movies/{{movieId}}/reviews` (POST)
5. Get Reviews for Movie - `/movies/{{movieId}}/reviews` (GET)
6. Get reviews for movie via query parameters - `https://csci3916-hw4-nj5l.onrender.com/movies/The Martian?reviews=true` (GET)
7. Test adding a review for a movie that does not exist in DB - `/movies/69bf3f6417a0a10050f29347/reviews` (POST)
8. Get specific review for Movie - `/movies/{{movieId}}/reviews` (GET)
9. Delete all reviews for Movie - `/movies/{{movieId}}/reviews` (DELETE)
10. Add new Review - `/movies/{{movieId}}/reviews` (POST)
11. Delete specific Review - `/reviews/{{reviewId}}` - (DELETE)
12. Test get movie that does not exist in DB - `/movies/Not a Movie` (GET)

### Postman Tests Environment Variables
1. Token - Populated through `Test Signin` POST request
2. movieId - Populated through `Get Movie by movieId` GET request
3. reviewId - Populated through `Add new Review for Movie by movieId` POST request
