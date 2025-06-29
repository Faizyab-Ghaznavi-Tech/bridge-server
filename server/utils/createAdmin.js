import User from '../models/User.js';

export const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: 'admin@bridgeb.com' });
    
    if (!adminExists) {
      const admin = new User({
        username: 'Admin',
        email: 'admin@bridgeb.com',
        password: '@dmin-0211',
        role: 'admin',
        institution: 'BRIDGEB Administration',
        bio: 'System Administrator for BRIDGEB Platform'
      });

      await admin.save();
      console.log('✅ Admin user created successfully');
      console.log('📧 Email: admin@bridgeb.com');
      console.log('🔑 Password: @dmin-0211');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  }
};