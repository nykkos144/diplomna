import mongoose from 'mongoose';


const MONGO_URL: string | undefined = process.env.MONGO_URL;

const connectDB = async (): Promise<void> => {

  try {

    await mongoose.connect(MONGO_URL!);
    
    if (mongoose.connection.readyState === 1) {
      console.log('MongoDB connected');
    }

  } catch (error: any) {

    console.log('Error connecting to MongoDB');

  }

}


export default connectDB;
