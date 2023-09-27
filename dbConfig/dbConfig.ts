import mongoose from "mongoose";

export async function connect() {
  try {

    // the code mongoose.connect(process.env.MONGO_URL!) connects to a MongoDB database using the connection URL specified in the MONGO_URL environment variable. 

    mongoose.connect(process.env.MONGO_URL!);

    // By assigning mongoose.connection to the connection variable, you are creating a reference to the Mongoose connection object. This reference allows you to interact with and listen for events related to the database connection.
    
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected ");
    });

    connection.on("error", (err) => {
      console.log("mongoDB connection error ");

      process.exit();
    });
  } catch (error) {
    console.log("something going wrong ");
  }
}
