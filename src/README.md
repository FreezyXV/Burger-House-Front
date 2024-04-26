# Deployment Procedure for Burger Town Application

This README provides detailed instructions for deploying the back-end and front-end components of the Burger Town application.

## Front-end deployment

The front-end of the application is written in React.js.

Make sure to add your own `.env` file. All the environment variables you will need are listed in the file `env.sample`.

#### To run the project locally:

Install the dependencies:

```
npm install
```

Run the project:

```
npm run dev
```

#### To deploy the project:

To deploy the app, we are going to use Vercel hosting service.

- Commit your react app to a repository on github.com
- Create an account on Vercel.com
- Create a new project called burger-town-front
- In the secrets section add the environment variable called `VITE_API_URL=https://your-backend-url.domain`
- Link the project to your github repository corresponding to burger-town-front
- Whenever you will push to your github repository, your app will be automatically deployed on vercel.
