/**
 * Courses Data
 * Edit this file to add, remove, or modify your courses
 * Each course will automatically appear on your portfolio
 */

export interface Course {
  id: number;
  code: string;
  title: string;
  category: string;
  description: string;
}

export const COURSES: Course[] = [
  // Core (T) Courses
  {
    id: 1,
    code: "CPT111",
    title: "PRINCIPLES OF PROGRAMMING",
    category: "Computer Science Courses",
    description: "The main emphasis of the course is on the basic principles of programming using the C++ programming language. This course covers basic concepts of a computer system, introduction to problem-solving techniques, basics of programming, control structures, modular programming, data file processing, reference variable, pointers and one-dimensional array."
  },
  {
    id: 2,
    code: "CPT112",
    title: "DISCRETE STRUCTURES",
    category: "Computer Science Courses",
    description: "Discrete mathematics is the study of mathematical structures that are fundamentally discrete. The discrete structure serves as a fundamental concept which lies at the core of a Computer Science study. A computer system is essentially a finite discrete system in which understanding such a system can be aided by modelling it as a discrete mathematical system."
  },
  {
    id: 3,
    code: "CST131",
    title: "COMPUTER ORGANISATION",
    category: "Computer Science Courses",
    description: "This course introduces the structure and functional units of the computer that are responsible for storing and processing information. It focuses on the functioning of individual components, interaction between components, techniques and technologies used, various number systems and simple digital logic circuits."
  },
  {
    id: 4,
    code: "CPC151",
    title: "FUNDAMENTALS OF LOGIC AND ARTIFICIAL INTELLIGENCE",
    category: "Computer Science Courses",
    description: "This course introduces basic logic concepts and techniques in constructing and evaluating arguments including forming a standard argument, differentiating validity of an argument, applying rules to prove the validity of arguments. It also exposes students to basic approaches of fundamental artificial intelligence, including basic search strategies, basic knowledge representation and reasoning and basic machine learning."
  },
  {
    id: 5,
    code: "CPC152",
    title: "FOUNDATIONS AND PROGRAMMING FOR DATA ANALYTICS",
    category: "Computer Science Courses",
    description: "This course provides foundations in data analytics and programming techniques for data analysis. Students learn programming concepts and methodologies applied to data processing, analysis, and visualization using modern programming languages and tools."
  },
  {
    id: 6,
    code: "CAT201",
    title: "INTEGRATED SOFTWARE DEVELOPMENT WORKSHOP",
    category: "Computer Science Courses",
    description: "This workshop course integrates various software development concepts and practices. Students work on practical projects that combine programming, design, and software engineering principles to develop complete software solutions."
  },
  {
    id: 7,
    code: "CMT221",
    title: "DATABASE ORGANISATION & DESIGN",
    category: "Computer Science Courses",
    description: "This course covers the principles of database design, organization, and management. Students learn about data models, database architecture, normalization, query languages, and practical database implementation techniques."
  },
  {
    id: 8,
    code: "CPT113",
    title: "PROGRAMMING METHODOLOGY & DATA STRUCTURES",
    category: "Computer Science Courses",
    description: "This course exposes students to data structures such as dynamic arrays, lists, stacks, queues, and fundamental binary trees. It strengthens programming skills in C++ using computational thinking methods through topics including recursion, object-oriented design, data abstraction, and classes."
  },
  {
    id: 9,
    code: "CSE241",
    title: "FOUNDATIONS OF SOFTWARE ENGINEERING",
    category: "Computer Science Courses",
    description: "This course describes the foundations of software engineering including aspects of software processes, requirements engineering, system modelling, system design, and software testing. Students learn methodologies and best practices for developing quality software systems."
  },
  {
    id: 10,
    code: "CST232",
    title: "OPERATING SYSTEMS",
    category: "Computer Science Courses",
    description: "This course covers the principles and concepts of operating systems including process management, memory management, file systems, input/output management, and concurrency control. Students learn how operating systems manage computer hardware and software resources."
  },
  {
    id: 11,
    code: "CPC251",
    title: "MACHINE LEARNING AND COMPUTATIONAL INTELLIGENCE",
    category: "Artificial Intelligence Courses",
    description: "This course introduces machine learning algorithms, techniques, and applications. Students learn supervised and unsupervised learning methods, neural networks, and computational intelligence approaches for solving real-world problems."
  },
  {
    id: 12,
    code: "CPT212",
    title: "DESIGN & ANALYSIS OF ALGORITHMS",
    category: "Computer Science Courses",
    description: "This course focuses on the design and analysis of algorithms including algorithm design paradigms, complexity analysis, sorting and searching algorithms, and graph algorithms. Students learn to evaluate algorithm efficiency and choose appropriate algorithms for different problems."
  },
  {
    id: 13,
    code: "CST235",
    title: "PRINCIPLES OF COMPUTER NETWORKS AND INFORMATION SECURITY",
    category: "Computer Science Courses",
    description: "This course covers the principles of computer networks including network architecture, protocols, and communication systems. It also addresses information security concepts including cryptography, authentication, access control, and security threats and countermeasures."
  },
   {
    id: 14,
    code: "CPC354",
    title: "COMPUTER GRAPHICS AND VISUALIZATION",
    category: "Artificial Intelligence Courses",
    description: "This course provides a comprehensive knowledge and an in-depth understanding in computer graphics and basic visualisation. The course introduces graphics systems and models, graphics programming, and input and interaction in interactive graphics. Geometric objects and transformations and viewing transformation are also covered. The course concludes with discussion on shading, discrete techniques, implementation of graphics primitives, modelling and visualization techniques. "
  },
  {
    id: 15,
    code: "CPC353",
    title: "NATURAL LANGUAGE PROCESSING (NLP)",
    category: "Artificial Intelligence Courses",
    description: "Students will be introduced to the approaches in extracting and processing text and speech features, word morphology, syntactic structure, and semantic to be used in problems such as classification, sequence modeling/prediction (e.g., machine translation), etc. Some recent deep learning techniques in NLP will also be discussed."
  },
  {
    id: 16,
    code: "CPC351",
    title: "PRINCIPLES OF DATA ANALYTICS",
    category: "Artificial Intelligence Courses",
    description: "This course introduces basic concepts and techniques in data science and analytics process. It covers theoretical foundations which include machine learning concepts, and the important steps of data analytics process such as collecting data, analysing data, building predictive models, and presenting results to stakeholders. R programming language is also introduced. "
  },
  {
    id: 17,
    code: "CPT316",
    title: "PROGRAMMING LANGUAGE IMPLEMENTATION AND PARADIGMS",
    category: "Computer Science Courses",
    description: "The essence of this course is about the existence of various programming language paradigms and implementation. Knowledge of programming language paradigms and implementation is very important for students in choosing the appropriate programming language to effectively solve programming problems. Students will be exposed to basic concepts of implementation such as components involved in the compilation and interpretation of programming languages. The paradigms of the programming language involved are imperative (object), function, logic and parallel. "
  },

];
