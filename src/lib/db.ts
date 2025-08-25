import mongoose from "mongoose";

function ConnectMongoDb(){ 
mongoose.connect(process.env.MONGO_DB_URI||"",{dbName:"quizwise"}).then(()=>{
console.log("Mongo Db Connected")
}).catch((error)=>{console.log(error)})
}

export default ConnectMongoDb