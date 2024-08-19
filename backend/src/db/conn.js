import mongoose from 'mongoose';

async function main() {
    // const uri = "mongodb://root:example@localhost:27017/mydatabase?authSource=admin";
    // await mongoose.connect(uri); // modelo para dockercompose
     await mongoose.connect('mongodb://127.0.0.1:27017/bellefleur')

    console.log("Conectou ao Mongoose!")
}

main().catch((err) => console.log(err))

export default mongoose;   