import { RollerCoaster } from "lucide-react";

export type CalloutData = typeof calloutData;

export const calloutData = {
  introCallout: "Hi! I'm Lennard!",
  secondCallout:
    "I'm a Technical Product Manager focusing the combination of Product Management and Software Engineering.",
  skills: [
    "Product Management",
    "Software Engineering",
    "Digital Innovation",
    "Machine Learning",
    "Data Science",
    "Scrum & Agile",
    "Software Architecture",
    "Product Development",
  ],
  tech: [
    "Python",
    "Java",
    "Typescript",
    "React",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "AWS",
  ],
  focusProject: {
    desc: "tempus productivity",
    link: "/tempus",
    category: "Fullstack Product",
    text: "a time based ToDo App inspired by GTD and Pomodoro.",
  },
  focusJob: {
    desc: "Technical PM",
    link: "/about",
    text: "a technical product manager CHECK24 Flug in Berlin.",
    category: "Fullstack Product",
  },
  news: "",
  spotify:
    "https://open.spotify.com/playlist/4yJfh8Pp3A5qdYuzKmQZlV?si=1723654c72014989",
};

interface Role {
  title: string;
  range: string;
  text: string[];
  skills: string[];
}

interface Experience {
  company: string;
  location: string;
  url: string;
  roles: Role[];
}

export type ExperienceData = typeof experienceData;
export const experienceData: Experience[] = [
  {
    company: "CHECK24 - Flug",
    location: "Berlin, Germany",
    url: "https://flug.check24.de",
    roles: [
      {
        title: "Product Manager",
        range: "March 2024 - ...",
        text: [
          "Handled Sprint planning, backlog refinement and release management for the main backend team.",
          "Did Technical Product Management and quality assurance as part of the PM team. With a focus on payment.",
          "Managed final development and launch of several new product features within payment and risk protection.",
        ],
        skills: [
          "Technical Product Management",
          "Agile Development",
          "Scrum",
          "Backend Development",
          "CI/CD",
          "Jira",
          "Confluence",
        ],
      },
      {
        title: "Student Product Manager",
        range: "September 2023 - March 2024",
        text: [
          "Handled Sprint planning, backlog refinement and release management for the main backend team.",
          "Did Technical Product Management and quality assurance as part of the PM team. With a focus on payment.",
          "Managed final development and launch of several new product features within payment and risk protection.",
        ],
        skills: [
          "Technical Product Management",
          "Agile Development",
          "Scrum",
          "Backend Development",
          "CI/CD",
          "Jira",
          "Confluence",
        ],
      },
    ],
  },
  {
    company: "Hypoport - Insurance Segment",
    location: "Berlin, Germany",
    url: "https://hypoport.de",
    roles: [
      {
        title: "Product Strategy Intern",
        range: "August 2022 - Februar 2023",
        text: [
          "Supported product management of a subsidiaries new software development project.",
          "Led product analysis for the next software generation.",
          "Supported product strategy in the segment through analysis, research, conception, and execution with the CPO.",
        ],
        skills: [
          "Product Management",
          "Product Strategy",
          "Agile Development",
          "Tableau",
          "Scrum",
          "Jira",
        ],
      },
    ],
  },
  {
    company: "Hypoport - Step Innovation Hub",
    location: "Berlin, Germany",
    url: "https://hypoport.de",
    roles: [
      {
        title: "Innovation Manager (Working Student)",
        range: "May 2019 - September 2021",
        text: [
          "Set up and led internal governance, tooling, and operations, and ran administrative activities of the hub.",
          "Supported innovation processes through customer research as well as research & intelligence.",
          "Was involved in numerous new venture development cases and ran the internal business case development tool.",
        ],
        skills: [
          "Innovation Management",
          "Business Development",
          "Business Case Development",
          "Business Intelligence",
          "Customer Research",
          "Business Model Development",
          "Innovation Processes",
        ],
      },
    ],
  },
];

export type techStackData = typeof techStackData;
export const techStackData = [
  {
    name: "Java",
    icon: "java",
  },
  {
    name: "Python",
    icon: "python",
  },
  {
    name: "Typescript",
    icon: "typescript",
  },
  {
    name: "Spring Boot",
    icon: "springboot",
  },
  {
    name: "React.js",
    icon: "reactjs",
  },
  {
    name: "Huggingface Ecosystem",
    icon: "huggingface",
  },
  {
    name: "PostgreSQL",
    icon: "postgresql",
  },
  {
    name: "AWS",
    icon: "aws",
  },
  {
    name: "Docker",
    icon: "docker",
  },
  {
    name: "IntelliJ",
    icon: "intellij",
  },
  {
    name: "Jira",
    icon: "jira",
  },
  {
    name: "Figma",
    icon: "figma",
  },
];

export type softSkillsData = typeof softSkillsData;

export const softSkillsData = {};
