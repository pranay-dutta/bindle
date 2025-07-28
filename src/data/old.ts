//TODO: migrate this file no need for complex structure
export type Topic =
  | "ARTS"
  | "ANIMALS"
  | "FICTION"
  | "SCIENCE_MATH"
  | "BUSINESS_FINANCE"
  | "CHILDRENS"
  | "HISTORY"
  | "HEALTH_WELLNESS"
  | "BIOGRAPHY"
  | "SOCIAL_SCIENCES"
  | "PLACES"
  | "TEXTBOOKS"
  | "BOOKS_BY_LANGUAGE";

export type ARTS =
  | "Architecture"
  | "Art_Instruction"
  | "Art_History"
  | "Dance"
  | "Design"
  | "Fashion"
  | "Film"
  | "Graphic_Design"
  | "Music"
  | "Music_Theory"
  | "Painting"
  | "Photography";
export type ANIMALS = "Bears" | "Cats" | "Kittens" | "Dogs" | "Puppies";
export type FICTION =
  | "Fantasy"
  | "Historical_Fiction"
  | "Horror"
  | "Humor"
  | "Literature"
  | "Magic"
  | "Mystery_and_detective_stories"
  | "Plays"
  | "Poetry"
  | "Romance"
  | "Science_Fiction"
  | "Short_Stories"
  | "Thriller"
  | "Young_Adult";
export type SCIENCE_MATH = "Biology" | "Chemistry" | "Mathematics" | "Physics" | "Programming";
export type BUSINESS_FINANCE =
  | "Management"
  | "Entrepreneurship"
  | "Business_Economics"
  | "Business_Success"
  | "Finance";
export type CHILDRENS = "Kids_Books" | "Stories_in_Rhyme" | "Baby_Books" | "Bedtime_Books" | "Picture_Books";
export type HISTORY =
  | "Ancient_Civilization"
  | "Archaeology"
  | "Anthropology"
  | "World_War_II"
  | "Social_Life_and_Customs";
export type HEALTH_WELLNESS =
  | "Cooking"
  | "Cookbooks"
  | "Mental_Health"
  | "Exercise"
  | "Nutrition"
  | "Self_help";
export type BIOGRAPHY =
  | "Autobiographies"
  | "History"
  | "Politics_and_Government"
  | "World_War_II"
  | "Women"
  | "Kings_and_Rulers"
  | "Composers"
  | "Artists";
export type SOCIAL_SCIENCES = "Anthropology" | "Religion" | "Political_Science" | "Psychology";
export type PLACES = "Brazil" | "India" | "Indonesia" | "United_States";
export type TEXTBOOKS =
  | "History"
  | "Mathematics"
  | "Geography"
  | "Psychology"
  | "Algebra"
  | "Education"
  | "Business_and_Economics"
  | "Science"
  | "Chemistry"
  | "English_Language"
  | "Physics"
  | "Computer_Science";
export type BOOKS_BY_LANGUAGE =
  | "English"
  | "French"
  | "Spanish"
  | "German"
  | "Russian"
  | "Italian"
  | "Chinese"
  | "Japanese";

export type Subject =
  | ARTS
  | ANIMALS
  | FICTION
  | SCIENCE_MATH
  | BUSINESS_FINANCE
  | CHILDRENS
  | HISTORY
  | HEALTH_WELLNESS
  | BIOGRAPHY
  | SOCIAL_SCIENCES
  | PLACES
  | TEXTBOOKS
  | BOOKS_BY_LANGUAGE;

// Structure for the subjects object
type TransformedSubjects = {
  ARTS: Record<ARTS, string>;
  ANIMALS: Record<ANIMALS, string>;
  FICTION: Record<FICTION, string>;
  SCIENCE_MATH: Record<SCIENCE_MATH, string>;
  BUSINESS_FINANCE: Record<BUSINESS_FINANCE, string>;
  CHILDRENS: Record<CHILDRENS, string>;
  HISTORY: Record<HISTORY, string>;
  HEALTH_WELLNESS: Record<HEALTH_WELLNESS, string>;
  BIOGRAPHY: Record<BIOGRAPHY, string>;
  SOCIAL_SCIENCES: Record<SOCIAL_SCIENCES, string>;
  PLACES: Record<PLACES, string>;
  TEXTBOOKS: Record<TEXTBOOKS, string>;
  BOOKS_BY_LANGUAGE: Record<BOOKS_BY_LANGUAGE, string>;
};

export const subjects: TransformedSubjects = {
  ARTS: {
    Architecture: "Architecture",
    Art_Instruction: "Art Instruction",
    Art_History: "Art History",
    Dance: "Dance",
    Design: "Design",
    Fashion: "Fashion",
    Film: "Film",
    Graphic_Design: "Graphic Design",
    Music: "Music",
    Music_Theory: "Music Theory",
    Painting: "Painting",
    Photography: "Photography"
  },
  ANIMALS: {
    Bears: "Bears",
    Cats: "Cats",
    Kittens: "Kittens",
    Dogs: "Dogs",
    Puppies: "Puppies"
  },
  FICTION: {
    Fantasy: "Fantasy",
    Historical_Fiction: "Historical Fiction",
    Horror: "Horror",
    Humor: "Humor",
    Literature: "Literature",
    Magic: "Magic",
    Mystery_and_detective_stories: "Mystery and detective stories",
    Plays: "Plays",
    Poetry: "Poetry",
    Romance: "Romance",
    Science_Fiction: "Science Fiction",
    Short_Stories: "Short Stories",
    Thriller: "Thriller",
    Young_Adult: "Young Adult"
  },
  SCIENCE_MATH: {
    Biology: "Biology",
    Chemistry: "Chemistry",
    Mathematics: "Mathematics",
    Physics: "Physics",
    Programming: "Programming"
  },
  BUSINESS_FINANCE: {
    Management: "Management",
    Entrepreneurship: "Entrepreneurship",
    Business_Economics: "Business Economics",
    Business_Success: "Business Success",
    Finance: "Finance"
  },
  CHILDRENS: {
    Kids_Books: "Kids Books",
    Stories_in_Rhyme: "Stories in Rhyme",
    Baby_Books: "Baby Books",
    Bedtime_Books: "Bedtime Books",
    Picture_Books: "Picture Books"
  },
  HISTORY: {
    Ancient_Civilization: "Ancient Civilization",
    Archaeology: "Archaeology",
    Anthropology: "Anthropology",
    World_War_II: "World War II",
    Social_Life_and_Customs: "Social Life and Customs"
  },
  HEALTH_WELLNESS: {
    Cooking: "Cooking",
    Cookbooks: "Cookbooks",
    Mental_Health: "Mental Health",
    Exercise: "Exercise",
    Nutrition: "Nutrition",
    Self_help: "Self-help"
  },
  BIOGRAPHY: {
    Autobiographies: "Autobiographies",
    History: "History",
    Politics_and_Government: "Politics and Government",
    World_War_II: "World War II",
    Women: "Women",
    Kings_and_Rulers: "Kings and Rulers",
    Composers: "Composers",
    Artists: "Artists"
  },
  SOCIAL_SCIENCES: {
    Anthropology: "Anthropology",
    Religion: "Religion",
    Political_Science: "Political Science",
    Psychology: "Psychology"
  },
  PLACES: {
    Brazil: "Brazil",
    India: "India",
    Indonesia: "Indonesia",
    United_States: "United States"
  },
  TEXTBOOKS: {
    History: "History",
    Mathematics: "Mathematics",
    Geography: "Geography",
    Psychology: "Psychology",
    Algebra: "Algebra",
    Education: "Education",
    Business_and_Economics: "Business & Economics",
    Science: "Science",
    Chemistry: "Chemistry",
    English_Language: "English Language",
    Physics: "Physics",
    Computer_Science: "Computer Science"
  },
  BOOKS_BY_LANGUAGE: {
    English: "English",
    French: "French",
    Spanish: "Spanish",
    German: "German",
    Russian: "Russian",
    Italian: "Italian",
    Chinese: "Chinese",
    Japanese: "Japanese"
  }
};

// Utility to get all subjects as a flat array
export const getAllSubjects = (): string[] => {
  return Object.values(subjects).flatMap((category) => Object.values(category));
};

// Utility to get all subject keys as a flat array
export const getAllSubjectKeys = (): string[] => {
  return Object.values(subjects).flatMap((category) => Object.keys(category));
};

// Utility to find a subject by key across all categories
export const findSubjectByKey = (subjectKey: string): string | undefined => {
  for (const category of Object.values(subjects)) {
    if (subjectKey in category) {
      return category[subjectKey as keyof typeof category];
    }
  }
  return undefined;
};
