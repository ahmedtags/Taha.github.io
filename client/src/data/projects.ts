/**
 * Projects Data
 * Edit this file to add, remove, or modify your projects
 * Each project will automatically appear on your portfolio
 */

export interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  tags: string[];
  results: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FitTrack - Mobile Fitness Application",
    description:
      "A mobile fitness application aligned with UN Sustainable Development Goals, featuring real-time fitness tracking using React Native and Firebase.",
    fullDescription:
      "Led group innovation project to create a comprehensive mobile fitness tracking application that promotes health and well-being in alignment with UN Sustainable Development Goals.",
    challenge:
      "Creating a mobile app that effectively tracks fitness activities in real-time while maintaining scalability and user engagement.",
    solution:
      "Designed mobile app architecture using React Native and Firebase for real-time fitness tracking. Conducted competitor analysis and developed comprehensive project proposal documentation.",
    tags: ["React Native", "Firebase", "Mobile Development", "UX/UI"],
    results: [
      "Real-time fitness tracking",
      "UN SDG alignment",
      "Comprehensive project documentation",
    ],
  },
  {
    id: 2,
    title: "T-Shirt Shop E-Commerce Website",
    description:
      "A full-featured e-commerce system built with Java, featuring product management, cart system, and secure checkout flow.",
    fullDescription:
      "Led the development of a complete e-commerce retail application with robust backend architecture and seamless user experience.",
    challenge:
      "Building a comprehensive e-commerce system that handles product management, transactions, and provides smooth user interaction.",
    solution:
      "Designed and implemented core features including product management, cart system, and checkout flow. Built backend logic using Java and database integration for storing products and transactions. Handled majority of the system architecture, coding, and testing.",
    tags: ["Java", "E-Commerce", "Full-Stack", "Database"],
    results: [
      "Complete e-commerce system",
      "Secure transaction handling",
      "Smooth user interaction",
    ],
  },
  {
    id: 3,
    title: "3D Animated Logo - Computer Graphics",
    description:
      "Interactive 3D animations using WebGL with complex transformation sequences and user-controlled animation features.",
    fullDescription:
      "Developed sophisticated 3D animations with comprehensive user controls and detailed technical documentation.",
    challenge:
      "Creating complex 3D animations with smooth transformations and intuitive user controls for play/pause, speed control, and reset functionality.",
    solution:
      "Developed interactive 3D animations using WebGL with complex transformation sequences. Implemented user-controlled animation features including play/pause, speed control, and reset functionality. Created comprehensive technical documentation with detailed code commenting.",
    tags: ["WebGL", "Computer Graphics", "3D Animation", "JavaScript"],
    results: [
      "Complex transformation sequences",
      "User-controlled animations",
      "Comprehensive documentation",
    ],
  },
  {
    id: 4,
    title: "Python Computer Vision Finger Detection App",
    description:
      "A real-time computer vision application that detects and counts fingers using Python and OpenCV with advanced image processing techniques.",
    fullDescription:
      "Built a computer vision application using Python and OpenCV that opens the camera and detects how many fingers are shown in real-time.",
    challenge:
      "Accurately detecting and counting fingers in real-time from camera input with varying lighting conditions and hand positions.",
    solution:
      "Program opens the camera and detects how many fingers are shown. Displays the number of fingers in real-time. Involves contour detection, thresholding, and hand segmentation techniques.",
    tags: ["Python", "OpenCV", "Computer Vision", "Real-time Processing"],
    results: [
      "Real-time finger detection",
      "Accurate contour detection",
      "Hand segmentation implementation",
    ],
  },
  {
    id: 5,
    title: "Video Editing with After Effects",
    description:
      "Professional video editing showcasing advanced transitions, motion graphics, and visual effects to create engaging content.",
    fullDescription:
      "Demonstrated expertise in Adobe After Effects for creating high-quality video content with advanced visual effects and motion graphics.",
    challenge:
      "Creating engaging video content that captures and retains audience attention through high-quality edits and visual storytelling.",
    solution:
      "Experienced with Adobe After Effects for advanced transitions, motion graphics, and visual effects. Skilled in color grading, timing, pacing, and storytelling to boost audience engagement. Demonstrated ability to grow and retain an online audience through high-quality edits.",
    tags: ["After Effects", "Video Editing", "Motion Graphics", "Visual Effects"],
    results: [
      "Advanced visual effects",
      "Increased audience engagement",
      "Professional motion graphics",
    ],
  },
];