## Onion Quest: A fantasy-themed task management application
Author: Jameka Haggins

[Live site: https://onionquest.netlify.app/login ]

Onion Quest is a fantasy-themed, full-stack task management application designed for productivity-focused "Heroes." Built using the MERN stack (MongoDB, Express, React, Node.js), it transforms mundane project management into an immersive campaign experience.

In this realm, users don't just manage "projects" and "tasks"—they embark on Campaigns and forge Quests. The application features a secure authentication system where every Hero has their own private "Guild Hall" to track their progress.


<img width="1916" height="978" alt="Screenshot 2026-04-02 114315" src="https://github.com/user-attachments/assets/15bc7fdb-7dc9-4ab5-924c-350eac7bffea" />

---
### Technologies Used 

* Frontend: React(Vite). React Router, Context API

* Backend: Node.js, Express, MongoDB, Mongoose

* Security: JWT (JSON Web Tokens), Bcrypt.js

* Deployment: Render (Web Service & Static Site)
---

### API Endpoints (The Spellbook)

| Action           | Method | Endpoint                              | Description                         | Auth Required | Body/Params               |
|------------------|--------|---------------------------------------|-------------------------------------|---------------|---------------------------|
| Register         | POST   | /api/auth/register                    | Create a new Hero                   | No            | { username, password }    |
| Login            | POST   | /api/auth/login                      | Login and receive a Magic Key (JWT) | No            | { username, password }    |
| Get Campaigns    | GET    | /api/campaigns                        | View all Campaigns YOU own          | Yes           | Returns all user projects |
| Create Campaigns | POST   | /api/campaigns                        | Start a new Campaign                | Yes           | { title, description }    |
| Update Campaigns | PUT    | /api/campaigns/:id                    | Update a Campaign's details         | Yes           | { title, description }    |
| Delete Campaigns | DELETE | /api/campaigns/:id                    | Remove a Campaign                   | Yes           | Requires Campaign ID      |
| Add Quest        | POST   | /api/campaigns/:campaignId/quests     | Add a Quest to a Campaign           | Yes           | { title, status }         |
| View Quests      | GET    | /api/campaigns/:campaignId/quests     | View all Quests in a Campaign       | Yes           | Requires Campaign ID      |
| Update Quest     | PUT    | /api/campaigns/:campaignId/quests/:id | Update a Quest within a Campaign    | Yes           | { name, description }                |
| Delete Quest     | DELETE | /api/campaigns/:campaignId/quests/:id | Delete a Quest within a Campaign    | Yes           | Requires Quest ID         |

---

### Setup Instructions

1. Clone the Repository

```bash
git clone OnionQuest-capstone
cd capstone
```
2. Backend Setup
   * Navigate to the backend folder: `cd backend`
   * Install dependenceies: `npm install bcrypt cors dotenv express jsonwebtoken mongoose`
   * Create a `.env` file and add your secrets:
     ```Plaintext
     PORT=3001
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_magic_phrase
     ```
   * Start the forge: `npm run dev`
    
3. Frontend Setup
   * Navigate to the frontend folder: `cd frontend`
   * Install dependencies: `npm install axios react-router-dom`
   * start the adventure: `npm run dev`

---

### Key Features

* Quest Annimations: Visual feedback when a quest is "Forged" or "Completed"
* Time Tracking: Every quest is marked with the date it was "Embarked" and "Finished"
* Hero Security: Full user authentication to ensure your campaigns are for your eyes only
* Retro UI: Custom pixel art styling using the "Jersey 25" font for a true RPG feel.

---

### Road Map (Future Dev Quests)

* Leveling System: Earn XP for every quest completed
* Inventory: Unlock items or badges for finishing large campaigns
* Guilds: Share campaigns with other Heroes for Co-op productivity

---
### CREDITS
* Pixel art icons within the UI are all from https://pixelrepo.com/
* Homepage background image is from @Hommet_ on Reddit https://www.reddit.com/r/PixelArt/comments/gs7qvy/cozy_forest_home_animation/
* Color Palette inspo is from https://www.media.io/color-palette/woodland-color-palette.html
