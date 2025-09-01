interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDesc extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CoursePartDesc {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDesc {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDesc {
  requirements: string[];
  kind: "special"
}

export const assertNever = (value: never): never => {
    throw new Error(`unhandled descriminated union member: ${JSON.stringify(value)}` )
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

export type CourseParts = CoursePart[]
