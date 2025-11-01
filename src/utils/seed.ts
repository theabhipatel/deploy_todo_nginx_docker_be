import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Todo from '../models/Todo';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Todo.deleteMany({});
    console.log('Cleared existing data');

    // Create demo user
    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@example.com',
      password: 'password123',
    });
    console.log('Demo user created:', demoUser.email);

    // Create sample todos
    const sampleTodos = [
      {
        title: 'Complete project documentation',
        description: 'Write comprehensive docs for the MERN todo app',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Review code and refactor',
        description: 'Go through the codebase and improve code quality',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment',
        status: 'done',
        userId: demoUser._id,
      },
      {
        title: 'Design new landing page',
        description: 'Create mockups for the marketing website',
        status: 'done',
        userId: demoUser._id,
      },
      {
        title: 'Implement user feedback',
        description: 'Add requested features from user survey',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Optimize database queries',
        description: 'Improve performance by adding indexes and optimizing queries',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Write unit tests',
        description: 'Achieve 80% code coverage with comprehensive tests',
        status: 'done',
        userId: demoUser._id,
      },
      {
        title: 'Update dependencies',
        description: 'Upgrade all npm packages to latest stable versions',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Implement dark mode',
        description: 'Add theme toggle with dark mode support',
        status: 'pending',
        userId: demoUser._id,
      },
      {
        title: 'Set up monitoring',
        description: 'Configure error tracking and performance monitoring',
        status: 'done',
        userId: demoUser._id,
      },
    ];

    await Todo.insertMany(sampleTodos);
    console.log(`Created ${sampleTodos.length} sample todos`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nDemo credentials:');
    console.log('Email: demo@example.com');
    console.log('Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();