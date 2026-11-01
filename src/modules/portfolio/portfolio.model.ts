import mongoose, { Schema } from 'mongoose';

export const defaultPortfolioData = {
  siteName: 'Pronoy Banik Portfolio',
  header: {
    variant: 'glass',
    imageUrl: '',
    badge: 'Welcome to my portfolio',
    name: 'Pronoy Banik',
    typedWords: ['FRONTEND DEVELOPER', 'MERN STACK DEVELOPER', 'WEB DEVELOPER'],
    description:
      'I architect scalable, user-centric web applications by breaking down intricate UX challenges into intuitive, performance-driven solutions.',
    resumeUrl:
      'https://drive.google.com/uc?export=download&id=1pGrRdhRI1KTy7MWKWDB13_lKXRr3ChdN',
    socialLinks: [
      { label: 'Facebook', url: 'https://www.facebook.com/pronoy.banik.7' },
      { label: 'GitHub', url: 'https://github.com/pronoybanik' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/pronoy-banik-1b5a3125a/' },
    ],
  },
  sectionStyles: {
    header: 'glass',
    education: 'timeline',
    experience: 'timeline',
    skills: 'category',
  },
  education: [
    {
      degree: 'Diploma in Computer Engineering',
      institute: 'Institute of Computer Science and Technology (ICST)',
      duration: '2018 - 2022 : Completed',
      description:
        'Focused on fundamentals of programming, electronics, and computer hardware. Developed several practical projects including a mini ATM system and IoT-based sensor projects.',
    },
    {
      degree: 'BSc in Computer Science',
      institute: 'Southeast University (SEU)',
      duration: '2023 - Present',
      description:
        'In-depth study of software engineering, data structures, algorithms, and web development. Built full-stack projects using MERN stack and deployed them on cloud platforms.',
    },
  ],
  experience: [
    {
      title: 'Backend Developer',
      company: 'Taqua Tech',
      type: 'Remote',
      location: 'Remote',
      duration: 'Jan 2026 – Present',
      period: 'Ongoing',
      responsibilities: [
        'Developed scalable backend architecture and RESTful APIs.',
        'Implemented JWT authentication and role-based authorization.',
        'Designed and managed MongoDB/SQL databases.',
      ],
      skills: ['Node.js', 'Express.js', 'MongoDB', 'SQL', 'JWT'],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Freelance Web Developer',
      company: 'Self-Employed',
      type: 'Freelance',
      location: 'Remote',
      duration: '2022 – Present',
      period: 'Ongoing',
      responsibilities: [
        'Building custom web applications and websites for clients across various industries.',
        'Providing end-to-end development services from requirement analysis to deployment and maintenance.',
      ],
      skills: ['React.js', 'Next.js', 'Node.js', 'MongoDB', 'Full Stack'],
      gradient: 'from-green-500 to-emerald-500',
    },
  ],
  skills: [
    {
      category: 'Front-End',
      skills: [
        { name: 'HTML5', level: 'Advanced', percentage: 85, imageUrl: '' },
        { name: 'CSS3', level: 'Advanced', percentage: 85, imageUrl: '' },
        { name: 'JavaScript', level: 'Advanced', percentage: 80, imageUrl: '' },
        { name: 'React.js', level: 'Advanced', percentage: 85, imageUrl: '' },
        { name: 'Next.js', level: 'Advanced', percentage: 82, imageUrl: '' },
      ],
    },
    {
      category: 'Back-End',
      skills: [
        { name: 'Express.js', level: 'Advanced', percentage: 82, imageUrl: '' },
        { name: 'Node.js', level: 'Advanced', percentage: 80, imageUrl: '' },
        { name: 'MongoDB', level: 'Advanced', percentage: 85, imageUrl: '' },
      ],
    },
    {
      category: 'Tools & Deployment',
      skills: [
        { name: 'GitHub', level: 'Advanced', percentage: 85, imageUrl: '' },
        { name: 'Vercel', level: 'Advanced', percentage: 80, imageUrl: '' },
        { name: 'Docker', level: 'Basic', percentage: 35, imageUrl: '' },
      ],
    },
  ],
  softSkills: ['Project Management', 'Git Management', 'Team Collaboration', 'Problem Solving', 'Communication'],
};

const portfolioSettingsSchema = new Schema(
  {
    data: {
      type: Object,
      required: true,
      default: defaultPortfolioData,
    },
  },
  { timestamps: true },
);

const PortfolioSettings = mongoose.model('PortfolioSettings', portfolioSettingsSchema);

export default PortfolioSettings;
