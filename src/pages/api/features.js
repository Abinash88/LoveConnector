import mongoose from "mongoose"



export const MongoDb = async() => {
    await mongoose.connect(process.env.MONGODB, {
        dbName:'CrushFinder',
    })
    console.log('Connected to Database');
}

