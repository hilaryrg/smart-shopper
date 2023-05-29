## Smart Shopper

Description: Welcome to Smart Shopper This app helps users create, organize and manage their shopping lists.

## Author
Hilary Gould

## Site
https://localhost:3000/

## Technologies
- Javascript
- Express
- React
- Foundations CSS
- PostgreSQL

## Installation
At first clone from github to get the app up and running with these steps:
- Clone the project from github with : `git clone https://github.com/hilaryrg/smart-shopper`
- Navigate to the server folder : `cd smart-shopper/server`
- Create the PostgreSQL database with : `createdb smart-shopper_development`
- Yarn install with this command before running your migrations : `yarn install` 
- Run these commands to make sure that your migrations are up to date : `yarn migrate:latest`
- Seed the database with initial data : `yarn db:seed`
- Start the server with : `yarn dev`
- Users may log in as `hilary@example.com` and the password 123 to view and create lists

## Usage
Navigate to https://localhost:3000/