# Routing

## Boardgames

| Method | URL | Action | Status |
| --- | --- | --- | --- |
| GET | /boargames | Display all the boardgames | Done |
| POST | /boardgames | Create a new boardgame record | |
| GET | /boardgames/:name | Display a boardgame by name | Done |
| PATCH | /boardgames/:name | Update an existing boardgame | |
| DELETE | /boardgames/:name | Delete a boardgame by name | |

## Age

| Method | URL | Action | Status |
| --- | --- | --- | --- |
| GET | /ages | Display all the boardgames by age | Done |
| POST | /ages | Create a new age category | Done |
| GET | /ages/:age | Display all the boardgame with an age filter | Done |
| PATCH | /ages/:age | Update an age category | ? |
| DELETE | /ages/:age | Delete an age category | Done |

## Author

| Method | URL | Action | Status |
| --- | --- | --- | --- |
| GET | /authors | Display all the boardgames by author | Done |
| POST | /authors | Create a new author | Done |
| GET | /authors/:author | Display all the boardgame with an author filter | Done |
| PATCH | /authors/:author | Update an author | ? |
| DELETE | /authors/:author | Delete an author | Done |