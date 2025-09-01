import type { CourseParts } from "../types/types";
import Part from './Part'

interface ContentProp {
  courseParts: CourseParts
}

const Content = (props: ContentProp) => {
    return (
        <>
          {props.courseParts.map(part => (
            <>
              <Part coursePart={part} />
            </>
          ))}
        </>
    );
};

export default Content