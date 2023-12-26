
const app = require('./app')


//Configuration
const dotenv = require('dotenv')
dotenv.config({path: "./config.env"})

const PORT = process.env.RUNNING_PORT || 5000


//Running the server
    app.listen(PORT, () => {
            console.log("Server is running on " + PORT)
        })


