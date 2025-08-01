# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Step 1:
install and setup react project with vite and  all necassary package
- npm create vite@latest [for React Project]
- npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form[packages]

Step 2:
- Environment variables - because we have to manage all the api keys and system variables in production.
- just add .env file in root context (outside src)
- and in .env file write your variable in key value pairs
- there are different way to access these variable in backend and front end.
  
1. if you create react app with react create app then your .env file will have REACT_APP_VARIABLENAME prefix
   - example : REACT_APP_VARIABLENAME = "TEST VALUE"
   - to access: console.log(process.env.REACT_APP_VARIABLENAME)
2. if you create react app with vite then .env file will have VITE_VARIABLENAME prefix
   - example : VITE_VARIABLENAME = "TEST VALUE"
   - to access: console.log(import.meta.env.VITE_APPWRITE_URL)

step 3
1. create appwrite account
2. create new project 
3. goto setting and copy endpoint which is act as your appwrite project url and copy project id too
4. goto database and create database and copy its id as database id
5. create collection and copy its id as collection id
6. in collection goto settings and give permission to all users for create read write and update.
7. then create storage bucket and copy paste his id.

step 4 : (industry practise)
- create separate conf folder and conf file to access all env variable easily
- define separte conf object and access all env variable as string for backend validations.
- access this file in you other react app.

step 5 : Setup Authentication 
- create authService class for idustry level development
- appwrite/ auth.js 
- and create further authentication services in this file 
- signup, signin, logout, getCurrentUser Like that so all of your services comes under one hood.


step 6 : setup appwrite configuration with storage and bucket
- config.js
- same as authentication step setup with class structure.