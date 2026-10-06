# Student Management REST API

Express.js REST API with in-memory student data (no database).

## Run
```
npm install
npm start
```
Server runs at http://localhost:3000

## Endpoints
| Method | URL | Body | Success |
|---|---|---|---|
| GET | /students | - | 200 |
| GET | /students/:id | - | 200 |
| POST | /students | `{"name":"Neha","course":"BCA"}` | 201 |
| PUT | /students/:id | `{"name":"Neha","course":"BTech"}` | 200 |
| DELETE | /students/:id | - | 200 |

Errors: 400 (invalid input/ID), 404 (not found), 500 (server error).

## Structure
```
app.js
routes/studentRoutes.js
middleware/logger.js
data/students.js
```
