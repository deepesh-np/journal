/** @format */
// const mongoose = require(
const bcrypt = require('bcryptjs');

// Import models
const User = require('./models/userModel'); // adjust path as per your folder structure
const Journal = require('./models/journalModel');
const Resume = require('./models/resumeModel');

// MongoDB connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/journalDB'; // change DB name if needed

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected');

    // Clear existing data
    await User.deleteMany();
    await Journal.deleteMany();
    await Resume.deleteMany();

    // Create hashed password
    const hashedPassword = await bcrypt.hash('password123', 12);

    // Dummy User
    const user = await User.create({
      name: 'Deepesh Kumar',
      email: 'deepesh@example.com',
      password: hashedPassword,
      role: 'user',
      profile: {
        headline: 'Aspiring Software Engineer',
        currentPosition: 'Computer Science Student',
        skills: ['Java', 'DSA', 'React', 'MongoDB'],
        goals: ['Crack FAANG interview', 'Build scalable apps'],
      },
    });

    // Dummy Resume
    const resume = await Resume.create({
      userId: user._id,
      fileUrl: 'https://example.com/uploads/deepesh_resume.pdf',
      parsedData: {
        name: 'Deepesh Kumar',
        email: 'deepesh@example.com',
        phone: '+91-9876543210',
        education: [
          {
            degree: 'B.Sc. Computer Science',
            institution: 'XYZ University',
            year: 2027,
          },
        ],
        experience: [
          {
            company: 'Startup Hub',
            role: 'Frontend Developer Intern',
            duration: 'May 2025 - Aug 2025',
            achievements: [
              'Built a dashboard with React and Tailwind',
              'Integrated REST APIs with backend team',
            ],
          },
        ],
        skills: ['Java', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
        projects: ['AI Career Journal Web App', 'LeetCode DSA Tracker'],
      },
      analysisReport: {
        score: 82,
        missingSkills: ['Spring Boot', 'Docker'],
        atsCompatibility: 75,
        recommendations: [
          'Add backend project experience',
          'Highlight achievements with metrics',
        ],
      },
    });

    // Dummy Journal
    await Journal.create({
      userId: user._id,
      title: 'Hackathon Preparation Day',
      entry:
        'Spent 6 hours working on frontend in React and Tailwind. Learned component reusability. Backend team synced APIs successfully.',
      tags: ['frontend', 'hackathon', 'teamwork'],
      mood: 'motivated',
      skillsDeveloped: ['React Hooks', 'API Integration', 'Time Management'],
    });

    console.log('✅ Dummy data inserted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting data:', error);
    process.exit(1);
  }
};

seedData();
