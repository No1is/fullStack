import type { CoursePart } from "../types/types";
import { assertNever } from "../types/types";

interface PartProp {
    coursePart: CoursePart
}

const Part = (props: PartProp) => {
    const coursePart = props.coursePart
    switch(coursePart.kind) {
        case 'basic':
            return (
                <p>
                  <strong>
                    {coursePart.name} {coursePart.exerciseCount}
                  </strong>
                  <div>
                    <i>{coursePart.description}</i>
                  </div>
                </p>         
            );
        case 'group':
            return (
                <p>
                  <strong>
                    {coursePart.name} {coursePart.exerciseCount}
                  </strong>
                  <div>
                    project exercises {coursePart.groupProjectCount}
                  </div>
                </p>
            );
        case 'background':
            return (
                <p>
                  <strong>
                    {coursePart.name} {coursePart.exerciseCount}
                  </strong>
                  <div>
                    <i>{coursePart.description}</i>
                  </div>
                  <div>
                    {coursePart.backgroundMaterial}
                  </div>
                </p>
            );
        case "special":
            return (
                <p>
                  <strong>
                    {coursePart.name} {coursePart.exerciseCount}
                  </strong>
                  <div>
                    <i>{coursePart.description}</i>
                  </div>
                  <div>
                    required skills: {coursePart.requirements}
                  </div>
                </p>
            );
        default:
            assertNever(coursePart)
            
    }
}

export default Part