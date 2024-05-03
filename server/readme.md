## Run Instructions

This app has been made with Express.js.

After cloning the repository and accessed the `server` directory, you need to do the following steps:

### 1. Install the dependencies:
Run the command in the terminal, in the current directory:
```bash
npm install
```
<br>

> **NOTE:** Sometimes the package *`nodemon`* won't install automatically, so consider using the command `npm i nodemon` in order for this to run.

### 2. Set the environment variables:
Create a file named `.env` in the current directory. Then need to write in it the variables mentioned here:
```env
PORT=5000
```

### 3. Run the app:
Use the following command in the current directory to run the server app:
```bash
npm start
```

### 4. Test the app:
You can test the server app by accessing the url http://localhost:5000/hello