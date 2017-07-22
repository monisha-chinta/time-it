# Description

TimeIt - an application used to manage tasks. User can login using facebook and manage daily tasks. Admin user can view all useres tasks along with managing his own tasks.

Technologies used:
* React for front end and Bootstrap for styling
* ExpressJS for backend and PostgreSQL for database 

## Quick Start
Clone the repository

    git clone https://github.com/monisha-chinta/time-it.git
    cd time-it

Install local NPM packages

*server side

    npm install
    
*front-end
 
    cd react-ui
    npm install
    
Build react-ui
    
    npm run build

The build artifacts will be stored in the `build/` directory.
    
Run Express server

*Note: Install PostgreSQL from [here](https://www.postgresql.org/download/)

    node server

    * This server runs on port: 3001
    * Open localhost:3001 to view the login page
