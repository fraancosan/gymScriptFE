# GymScript | FrontEnd

This project started as a final project for the “Software Development” course at the UTN FRRO university. The main objective of this project is to create a web application that allows the management of a gym.

It was originally developed by a team of 5 students, after finishing the project, I decided to continue working on it to improve it and add more features. **The original project can be found in this [branch](https://github.com/fraancosan/gymScriptFE/tree/facultad)**.

## Repositories

- [**FrontEnd (Current)**](https://github.com/fraancosan/gymScriptFE)
- [**BackEnd**](https://github.com/fraancosan/gymScriptBE)

## Take a Look

- [**Web**](https://gymscript.francosanchez.com.ar)
- [**Video**](https://www.youtube.com/watch?v=REjqzzRXUvY)

> [!IMPORTANT]
> It is possible that data from the DB may take a while to load. This is because after a period of inactivity, the DB enters hibernation mode and must be reactivated.

## Setup

When running locally, the server will be available at: **`http://localhost:4200/`**

> [!IMPORTANT]
> The server will not work properly if the backend is not running.
>
> The backend must be running on **`http://localhost:3000/`**

## Useful Commands

> [!NOTE]
> If you want to run angular commands without using `npx` before every command, you can install the CLI globally.

- Install dependencies: `npm install`
- Run server:
  - Choose environment:
    - Dev: `npm run start`
    - Prod: `npm run prod`
  - It will be available at: **`http://localhost:4200/`**
- Tests:
  - Unit Testing: `npm run test`
  - E2E Testing:
    - With GUI: `npm run test:e2e`
    - Without GUI: `npm run test:e2e-f`
