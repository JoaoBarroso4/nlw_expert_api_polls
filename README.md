
# Polling App

This is a polling application built with TypeScript, PostgresSQL and Prisma. This app was developed during the Next Level Week Expert event, hosted by Rocketseat.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- PostgreSQL
- Typescript

### Installing

1. Clone the repository
```bash
git clone https://github.com/JoaoBarroso4/nlw_expert_api_polls.git
```

2. Install dependencies
```bash
npm install
```

3. Set up your `.env` file with your PostgreSQL connection string `DATABASE_URL`

4. Run the migrations
```bash
npx prisma migrate dev
```

5. Run docker compose
```bash
docker-compose up -d
```

4. Run the application
```bash
npm start
```

The server will start running at `http://localhost:3333`.

## API Endpoints
- `POST /poll`: Create a new poll
- `GET /poll/:id`: Get a poll by id
- `POST /poll/:id/vote`: Vote on a poll
- `WS /poll/:id`: Subscribe to a poll

## Features

- Create a new poll
- Vote on a poll
- Retrieve a poll
- View poll results in real-time

## Built With

- [TypeScript](https://www.typescriptlang.org/)
- [PostgresSQL](https://www.postgresql.org/)
- [Prisma](https://prisma.io/)
