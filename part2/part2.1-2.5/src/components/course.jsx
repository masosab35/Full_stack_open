import Header from './header'
import Content from './content'
import Total from './total'
const Course = (props) => {
    return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total
        total={props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
            
        }
      />
    </div>
  )}
export default Course