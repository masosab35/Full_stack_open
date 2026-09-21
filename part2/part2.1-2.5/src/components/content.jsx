import Part from './part'


const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </div>
)

export default Content