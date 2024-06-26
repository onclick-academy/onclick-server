# onClick-server

onClick-server is a backend repository for an LMS (Learning Management System) project developed by onClick Academy. This project facilitates the management of learning materials, user accounts, and interactions within an educational environment.

## What is an LMS?

A Learning Management System (LMS) is a software application designed to deliver, manage, and track educational content and resources. It provides instructors and learners with tools for creating, delivering, and managing online courses, assessments, and communication.

## Installation

To install onClick-server, you can either clone the repository using Git:

```bash
git clone https://github.com/onclick-academy/onclick-server.git
```

Or download it as a zip file and extract it to your desired location.

## Using Docker and Docker Compose

### Prerequisites

-   **Docker**: Ensure Docker is installed on your machine.
-   **Docker Compose**: Ensure Docker Compose is installed and available for orchestrating multiple containers.

### Steps to Follow

1. **Build and Start Services**:

    - **Initial Setup**: For the first build or when you update the `Dockerfile` or `docker-compose.yml`, use the command:
        ```bash
        docker-compose up --build
        ```
    - **Regular Startup**: For subsequent runs, start the services with:
        ```bash
        docker-compose up
        ```

2. **Stop Services**:

    - When the services are no longer needed, or if your machine is running low on resources, stop all services with:
        ```bash
        docker-compose down
        ```

3. **Connect to PostgreSQL Database**:

    - Connect to the PostgreSQL database using the `psql` command-line interface:
        ```bash
        sudo psql -h localhost -U onclick-user -d onclick
        ```
    - **Note**: The password for `onclick-user` is `password`.

4. **Connect to Redis**:
    - Connect to the Redis server using the `redis-cli` tool:
        ```bash
        redis-cli -h localhost -p 6378
        ```

## Usage and Configurations

1- Setup PostgreSQL Database: Create a PostgreSQL database for the project.
2- Firebase Keys: Obtain Firebase keys for authentication and other related services.
3- Run Script: Execute the run script file using the command:

```bash
./run
```

### Install Dependencies: Install project dependencies using Yarn:

```bash
yarn
```

### Run Development Server: Start the development server using the command:

```bash
yarn dev
```

## Examples

After setting up and running the server, you can use tools like Postman to interact with the API. For example, to register a new user, send a POST request to "http://localhost:3000/api/v1/auth/register" with the required data in the request body. Refer to the DTO (Data Transfer Object) file for authentication registration to know the required fields.

## Technologies Used

-   TypeScript
-   Node.js
-   Express.js
-   Prisma DB
-   PostgreSQL
-   Firebase
-   Redis
-   Joi

## Dependencies:

-   Nodemailer
-   Bcrypt
-   JsonWebToken
-   Cors
-   PubSub-js
-   Multer

# Summary

This project utilizes modern technologies and frameworks to provide a robust backend solution for managing an LMS environment efficiently.

Feel free to explore the repository and contribute to its development!

## License

This project is licensed under the MIT License.
