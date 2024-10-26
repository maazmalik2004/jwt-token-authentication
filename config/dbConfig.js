import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const DBurl = "mongodb://localhost:27017/userAuth";
        await mongoose.connect(DBurl);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error("Could not connect to the database",error);
    }
};

export default connectDB;
