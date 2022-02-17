# Unfreeze Seattle
## A social networking app that connects local Seattleites to transplants new to the area.

Everyone knows about the so-called "Seattle Freeze". Transplants to Seattle have reported having a difficult time meeting new people when they move here. Part of it might be that making friends as an adult is difficult--period. Part of it might be the city's "cultural introversion". Either way, transplants find themselves on the outside. Unfreeze Seattle aims to change that! By connecting friendly locals with curious transplants, Unfreeze Seattle creates a unique platform for getting to know one another.

## Technologies Used
### Front-End
- React
#### Dependencies
- Axios
- React Router
### Back-End
- JavaScript
- Node
- Express.js
- PostgreSQL
#### Dependencies
- Sequelize ORM
- Bcrypt
- JSON Web Token
- PG and PG-Hstore
- Cookie Parser
- CORS

## Instructions for Setup
### Deployed (Recommended)
Visit [Unfreeze Seattle website](https://unfreeze-seattle-2022.herokuapp.com/)

### Localhost (Not Recommended)
1. Make sure you're on the `master` branch (the development branch for this project)
2. Clone the repository
3. Install PostgreSQL locally on your machine and create a new database called `unfreeze_seattle`.
4. Set up a `.env` file for your `CONFIG_SECRET` variable used to sign and verify users with JSON web tokens
5. Run `npm install`
6. Run `cd client && npm install`
7. Create two files inside of `server/app/config` folder: `auth.config.js` and `db.config.js`
8. In `auth.config.js`: export a module which is an object with key `secret`. Set this key to any `string` value.
9. In `db.config.js`: export a module which is an object with keys `HOST`, `USER`, `PASSWORD`, `DB`, `dialect`, and `pool` (which is an object with keys `max: 5`, `min: 0`, `acquire: 30000`, and `idle: 10000`). This sets up the credentials for connecting to your database.
10. Run `npm start` to run the Express server.
11. Run `cd client && npm start` to start the React app.
12. Have fun meeting other Seattle residents!