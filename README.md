DISCLAIMER: This project starts from a full-stack boilerplate. See repo and more info in: https://github.com/4GeeksAcademy/react-flask-hello.

# Introduction
This project is the result of months of work as part of my final project for my master's degree in Website and Application Development. Organizando que es gerundio could be considered as a multifunctional task calendar. It is a project designed for the day-to-day work of translators. You can register your jobs by giving the following data: the total number of words, the approximate number of words per hour you are able to do and the delivery date. With this info, the application will place the task with the approximate total hours before the delivery date so that the client receives his work on time.

# Features
## Frontend
- **ReactJS**: A JavaScript library for building user interfaces.
- **Bootstrap**: A CSS framework for web design and layout.
- **SASS**: A CSS preprocessor that extends CSS functionality with features such as variables, nesting, and mixins.
- **npm**: A JavaScript package manager used to install, share, and manage dependencies in Node.js projects.

## Backend
- **Flask**: A Python framework for building web applications.
- **Psycopg**: A PostgreSQL adapter for Python, used to interact with the PostgreSQL database.
- **pipenv**: A tool that provides virtual environment management and dependency management for Python projects.
- **pip**: The Python package manager used to install and manage Python packages at the system level.

## Database
- **PostgreSQL**: A very powerful open-source relational database management system.

# Relationship Between Features
- **ReactJS** on the frontend communicates with the backend through HTTP requests. Normally, these requests are handled by endpoints defined in **Flask**.
- **Flask**, on the other hand, communicates with the **PostgreSQL** database using **Psycopg** to perform read and write operations.
- The **PostgreSQL** database stores user data and tasks for each user. This data is accessed and manipulated by the backend through SQL queries.

# Frontend Structure
- **ReactJS**: It takes care of the user interface. It uses reusable components to build the application.
- **Bootstrap**: Provides predefined styles and UI components that are used to design and layout the application.
- **SASS**: Used to extend the functionality of CSS, allowing the use of variables, mixins, and other concepts to improve the readability and maintainability of CSS code.
- **npm**: Used to manage project dependencies and build scripts, such as compiling SASS files and managing JavaScript packages.

# Backend Structure
- **Flask**: Acts as the web server that receives client requests and handles them. It defines routes (endpoints) that respond to these requests and perform database operations as needed.
- **Psycopg**: Used to connect and query the PostgreSQL database from Flask.
- **pipenv and pip**: 
  - **pipenv** is used to manage virtual environments and Python dependencies in the project.
  - **pip** is used to install Python packages at the system level.
These tools ensure efficient and consistent handling of Python dependencies.


