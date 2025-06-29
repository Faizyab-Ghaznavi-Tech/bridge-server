import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('📍 Connection URI:', process.env.MONGODB_URI || 'mongodb://localhost:27017/bridgeb');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bridgeb');
    console.log('✅ MongoDB connected successfully!');
    
    // Test basic operation
    const testCollection = mongoose.connection.db.collection('test');
    const result = await testCollection.insertOne({ 
      test: 'Hello MongoDB!', 
      timestamp: new Date(),
      from: 'BRIDGEB connection test'
    });
    console.log('✅ Test document inserted with ID:', result.insertedId);
    
    // Clean up test document
    await testCollection.deleteOne({ _id: result.insertedId });
    console.log('✅ Test document cleaned up');
    
    await mongoose.disconnect();
    console.log('✅ MongoDB disconnected successfully!');
    console.log('🎉 Your MongoDB setup is working perfectly!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('Error message:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Make sure MongoDB is installed and running');
      console.log('2. Check if port 27017 is available');
      console.log('3. Try starting MongoDB service:');
      console.log('   - Windows: net start MongoDB');
      console.log('   - macOS: brew services start mongodb/brew/mongodb-community');
      console.log('   - Linux: sudo systemctl start mongod');
    }
  }
};

testConnection();