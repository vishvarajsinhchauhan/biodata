export interface PersonalDetailsType {
  birthdate: string
  birthplace: string
  height: string
  weight: string
  education: string
  currentStatus: string
  religion: string
  caste: string
  zodiacSign: string
  bloodGroup: string
  hobbies: string
}

export interface FamilyMemberType {
  relation: string
  name: string
  occupation?: string
}

export interface FamilyType {
  father: {
    name: string
    occupation: string
  }
  mother: {
    name: string
    occupation: string
  }
  siblings: FamilyMemberType[]
}

export interface EducationType {
  degree: string
  institution: string
  year: string
  description: string
  type: "education" | "award" | "experience"
}

export interface ContactType {
  address: string
  phone: string
  fatherPhone: string
  whatsapp: string
  instagram: string
  email: string
}

export interface BiodataType {
  name: string
  intro: string
  profileImage: string
  additionalImages: string[]
  personalDetails: PersonalDetailsType
  family: FamilyType
  education: EducationType[]
  contact: ContactType
}

// This data structure makes it easy to update content without changing the components
export const biodata: BiodataType = {
  name: "Chauhan Vishvarajsinh Vikramsinh",
  intro:
    "Greetings! I am a Computer Engineering graduate currently pursuing my Master's degree in Australia. I come from a traditional Rajput family and value our cultural heritage while embracing modern education and lifestyle.",
  profileImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4350.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
  additionalImages: [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4350.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4351.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4352.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4353.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4354.JPG-lOGP32Ygla7VXlLhFoDCDHlRGputJV.jpeg",
  ],
  personalDetails: {
    birthdate: "June 27, 2003",
    birthplace: "Himmatnagar, Gujarat",
    height: "5'11\"",
    weight: "65kg",
    education: "B.Tech in Computer Engineering",
    currentStatus: "Pursuing Master's degree in Australia",
    religion: "Hindu Rajput",
    caste: "Chauhan",
    zodiacSign: "Taurus (Vrushabh)",
    bloodGroup: "O+",
    hobbies: "Photography, Traveling, Reading, Technology",
  },
  family: {
    father: {
      name: "Chauhan Vikramsinh Natvarsinh",
      occupation: "HDFC Bank Senior Manager",
    },
    mother: {
      name: "Chauhan Daxaba Vikramsinh",
      occupation: "Housewife (From Kukadiya, Previous Surname: Kumpavat)",
    },
    siblings: [
      {
        relation: "Sister",
        name: "Chauhan YuvraniKuvarba Vikramsinh",
      },
    ],
  },
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Deakin University, Melbourne, Australia",
      year: "2025 - Present",
      description: "Currently enrolled for Master's degree with focus on advanced computing technologies.",
      type: "education",
    },
    {
      degree: "Bachelor of Technology in Computer Engineering",
      institution: "Ganpat University, Gujarat",
      year: "2020 - 2024",
      description: "Graduated with First Class Honours. Specialized in software development and database management.",
      type: "education",
    },
    {
      degree: "Academic Excellence Award",
      institution: "Ganpat University",
      year: "2023",
      description:
        "Awarded for outstanding academic performance and leadership qualities demonstrated throughout the degree program.",
      type: "award",
    },
    {
      degree: "Web Developer Intern",
      institution: "Vadodara City Company",
      year: "Summer 2022",
      description: "Worked on developing responsive web applications and contributed to UI/UX improvement projects.",
      type: "experience",
    },
  ],
  contact: {
    address: "Ashapura Society, Near Jalaram Mandir, Himmatnagar, Gujarat",
    phone: "9426341610",
    fatherPhone: "9925141610",
    whatsapp: "https://wa.me/qr/KNTP2PFPIYYUK1",
    instagram: "https://www.instagram.com/mystic.__.vish",
    email: "vishvarajsinh477@gmail.com",
  },
}

