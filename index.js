import express from "express";
import mongoose from "mongoose";
import router from "./src/Routers/authRouter.js"


const PORT = process.env.PORT || 3000
const app = express()
const db = "mongodb+srv://timur:autent@cluster0.esnundj.mongodb.net/?retryWrites=true&w=majority"


app.use(express.json() )
app.use('/auth', router)
mongoose
  .connect(db)
  .then(() => console.log(`Connect to MongoDB`))
  .catch(err => console.log(err))



app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})



