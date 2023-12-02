import mongoose from "mongoose";

const connect = async () => {
    try {
        mongoose.connect(process.env.DATABASE_URI!);
        const connection = mongoose.connection;
        console.log("database connected");

        connection.on("error", (error) => {
            console.log("database connection error. Please check your database is running.", error);
            process.exit(1);
        });
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
};

export default connect;