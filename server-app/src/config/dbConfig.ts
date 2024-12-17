import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);

    console.log("Connection Established sucessfully");

    console.log(connect.connection.host);
  } catch (err) {
    console.log((err as Error).message);
    process.exit(0);
  }
};
export default connectDB;
