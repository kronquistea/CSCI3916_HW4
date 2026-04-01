# Assignment Four
## Postman Test Details
### Testing Requirements
All requests require an JWT authorization token.

### Postman Tests and Routes
#### Fork Postman Collection
[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/51837676-392744f8-288c-4e8e-b972-2deeb3406586?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D51837676-392744f8-288c-4e8e-b972-2deeb3406586%26entityType%3Dcollection%26workspaceId%3D0d67b894-4771-4b4b-b3f6-e723f831f409#?env%5Bkronquist-hw4%5D=W3sia2V5IjoidG9rZW4iLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiJKV1QuLi4iLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6IkpXVCBleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJalk1WTJJME56ZzRObVV4TW1KalpERmhOREV4WW1ObU5pSXNJblZ6WlhKdVlXMWxJam9pYm5WdE1TSXNJbWxoZENJNk1UYzNOVEEyTnpjNU5YMC45c1pyTWlQWEExaGpfZExaRWExZmpWS25tWHRYZ1BwVG9FUTY0M3R0S3kwIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6Im1vdmllSWQiLCJ2YWx1ZSI6IiIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJhbnkiLCJzZXNzaW9uVmFsdWUiOiI2OWI0YzI2ZDBkNzM1NWVkNTM4Yjc1YTciLCJjb21wbGV0ZVNlc3Npb25WYWx1ZSI6IjY5YjRjMjZkMGQ3MzU1ZWQ1MzhiNzVhNyIsInNlc3Npb25JbmRleCI6MX0seyJrZXkiOiJyZXZpZXdJZCIsInZhbHVlIjoiIiwiZW5hYmxlZCI6dHJ1ZSwidHlwZSI6ImFueSIsInNlc3Npb25WYWx1ZSI6IjY5Y2Q2Mjk2Njg1NWNhMDAzZTAxMzFkYSIsImNvbXBsZXRlU2Vzc2lvblZhbHVlIjoiNjljZDYyOTY2ODU1Y2EwMDNlMDEzMWRhIiwic2Vzc2lvbkluZGV4IjoyfV0=)

#### For Render Deployed Testing
1. Test Signup - `/signup` (POST) // Unnecessary to test
2. Test Signin - `/signin` (POST)
3. Get all Movies and their Reviews - `/movies?reviews=true` (POST)
4. Get Movie by ID - `/The Martian` (GET)
5. **REQUIRED TEST** Add Review by movieId - `/movies/:movieId/reviews` (POST)
6. Get Reviews for Movie by movieId - `/movies/:movieId/reviews` (GET)
7. **REQUIRED TEST** Get reviews for Movie by movieId via query parameters - `https://csci3916-hw4-nj5l.onrender.com/movies/The Martian?reviews=true` (GET) 
8. **REQUIRED TEST** Test add review for Movie that does not exist by movieId - `/movies/69bf3f6417a0a10050f29347/reviews` (POST)
9.  Delete all reviews for Movie by movieId - `/movies/:movieId/reviews` (DELETE)
10. **REQUIRED TEST** Add new Review for Movie by movieId- `/movies/:movieId/reviews` (POST)
11. Delete specific Review for Movie by movieId - `/reviews/:reviewId` - (DELETE)
12. **REQUIRED TEST** Test get movie that does not exist by movieId - `/movies/Not a Movie` (GET)
13. **REQUIRED TEST** New review - `/movies/:movieId/reviews` (POST)

#### For Localhost testing:
1. Test Signup on Localhost - `/signup` (POST)
2. Test Signin on Localhost - `/signin` (POST)
3. Test get movies on Localhost - `/movies` (GET)
4. New Review on Localhost - `/movies/:movieId/reviews` (POST)

### Postman Tests Environment Variables
1. Token - Populated through `Test Signin` POST request
2. movieId - Populated through `Get Movie by movieId` GET request
3. reviewId - Populated through `Add new Review for Movie by movieId` POST request

## Render Details
### Environment Varibles
1. `DB` = Key to connect mongodb to backend node
2. `GA_KEY` = Google Analytics Measurement ID
3. `GA_SECRET` = Google Analytics secret API key
4. `SECRET_KEY` = Secret key for JWT auth

## Google Analytics Extra Credit
[General Report Snapshot](Reports_snapshot.pdf)<br>
[Review Count Event Report](Events.pdf)