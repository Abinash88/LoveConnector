import mongoose from "mongoose"



export const MongoDb = async() => {
    const database = await mongoose.connect(process.env.MONGODB, {
        dbName:'CrushFinder',
    })
    console.log('Connected to Database');
}

