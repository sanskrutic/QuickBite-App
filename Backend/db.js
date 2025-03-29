
const mongoose = require('mongoose');

const mongoURI = 'GIVE YOUR MONGODB URI'

async function connectDB() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        mongoose.connection.once('open', async () => {
            console.log('✅ MongoDB connected successfully');

            try {
                // Fetch both collections
                const sampleCollection = mongoose.connection.db.collection("sample");
                const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

                // Fetch data using `await`
                const sampleData = await sampleCollection.find({}).toArray();
                const foodCategoryData = await foodCategoryCollection.find({}).toArray();

                // Store in global variables
                global.sample = sampleData;
                global.foodCategory = foodCategoryData;

                console.log("📌 Sample Data:", global.sample);
                console.log("📌 Food Category Data:", global.foodCategory);
            } catch (err) {
                console.error("❌ Error fetching data:", err);
            }
        });

    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
}

// Call the function to connect and fetch data
connectDB();

module.exports = connectDB;
