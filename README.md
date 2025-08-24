# node-react-todo-app
A demo ToDo app created in NodeJs backend, React frontend and MySQL db

Running the project locally
-------------

1. Clone the repo in your machine.
2. In the root folder, go to the directory ``ui`` and run ```npm install```
3. Go to the directory ``server`` and run ```npm install```
4. Make sure docker service is running.
5. Use ```docker-compose up``` to build the frontend and backend services.
6. Copy the database host from docker mysql container and paste it in ```server/src/index.js``` line 22.
7. Run the app frontend using ```http://localhost:3000/```
8. Run the backend using ```http://localhost:8080/```
