## Onion Quest: A fantasy-themed task management application
Author: Jameka Haggins

A fantasy-themed task management application built with the MERN stack. Users (Heroes) can manage their Tasks (Quests) across different Projects (Campaigns) with a secure, RPG-style interface.

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
| Login            | POST   | /api/autho/login                      | Login and receive a Magic Key (JWT) | No            | { username, password }    |
| Get Campaigns    | GET    | /api/campaigns                        | View all Campaigns YOU own          | Yes           | Returns all user projects |
| Create Campaigns | POST   | /api/campaigns                        | Start a new Campaign                | Yes           | { title, description }    |
| Update Campaigns | PUT    | /api/campaigns/:id                    | Update a Campaign's details         | Yes           | { title, description }    |
| Delete Campaigns | DELETE | /api/campaigns/:id                    | Remove a Campaign                   | Yes           | Requires Campaign ID      |
| Add Quest        | POST   | /api/campaigns/:campaignId/quests     | Add a Quest to a Campaign           | Yes           | { title, status }         |
| View Quests      | GET    | /api/campaigns/:campaignId/quests     | View all Quests in a Campaign       | Yes           | Requires Campaign ID      |
| Update Quest     | PUT    | /api/campaigns/:campaignId/quests/:id | Update a Quest within a Campaign    | Yes           | { status }                |
| Delete Quest     | DELETE | /api/campaigns/:campaignId/quests/:id | Delete a Quest within a Campaign    | Yes           | Requires Quest ID         |

---

### Setup Instructions

