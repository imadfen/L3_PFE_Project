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
PORT= 5000
TOKEN= <YOUR_RANDOM_64_CHARACTERS_STRING>
```

### 3. Run the app:
#### A. Using direct command:
Use the following command in the current directory to run the server app directly:
```bash
npm run server
```

#### B. Using CLI Tool:
You can run the server app using within the **CLI Tool** by the command:
```bash
npm start
```
once the CLI Tool is on, we can run the server by:
```bash
CLI-Tool> run
```

> **Note:** the CLI Tool is not tested yet on Windows, and my need some configuration on Unix systems, so it is better to use the direct way for now.


### 4. Test the app:
You can test the server app by accessing the url http://localhost:5000/hello
