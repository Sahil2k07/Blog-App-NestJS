# Blog App with Auth - NestJS/server

## About

This is the backend of the Blog App. In this app, the user can create, update, read and delete
his/her created Blog posts. The user can also see the posts of different users.

This is my first project using `NestJS` Framework.

The Blog App has Authentication features

- `Signup` signup is done through an OTP verification, which is done by sending an email to the user
- `Login` login by the same email and password.

## Tech Used

- `Typescript` JS superset
- `Nest JS` Backend Framework Based on ExpressJS
- `Prisma` TS ORM
- `MySQL` SQL Database
- `Nodemailer` NodeJS Library for sending Mails
- `Zod` TS Schema Validation Library for Pipes

## Set-Up this project locally

1. First clone this project locally.

   ```bash
   git clone https://github.com/Sahil2k07/Blog-App-NestJS.git
   ```

2. Move to the project directory.

   ```bash
   cd Blog-App-NestJS
   ```

3. Make sure you have Typescript installed globally

   ```bash
   npm i -g typescript
   ```

4. Install all the dependencies.

   ```bash
   npm i
   ```

5. Set up all the required env variable by making a `.env` file. An example file for it is given.

   ```dotenv
   DATABASE_URL="mysql://user:password@localhost:3306/Blog-App"

   JWT_SECRET=

   # Nodemailer Details
   MAIL_HOST=
   MAIL_USER=
   MAIL_PASS=
   ```

6. Run the command to `CREATE TABLES` in your Database.

   ```bash
   npx prisma migrate dev --name init
   ```

7. Run the command to generate `Prisma Client`.

   ```bash
   npx prisma generate
   ```

8. Run the command to Start the project in Watch Mode.

   ```bash
   npm run start:dev
   ```

9. Run the command to Bootstrap the Project.

   ```bash
   npm run start
   ```
