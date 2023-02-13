import './task.scss'

const Task = ({ taskObj }) => {
  // console.log(taskObj)
  const { title, description, assigndate, deadline } = taskObj
  // const date = new Date(assignedDate)
  // const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  const date1 = new Date(assigndate)
  const date2 = new Date(deadline)

  const formattedDate1 = `${date1.getDate()}/${date1.getMonth() + 1}/${date1.getFullYear()}`
  const formattedDate2 = `${date2.getDate()}/${date2.getMonth() + 1}/${date2.getFullYear()}`
  return (
    <div className='task-container'>
      <h4>{title}</h4>
      <p>{description}</p>
      <span>AssignedDate: {formattedDate1}</span>
      <span>Deadline: {formattedDate2}</span>
    </div>
  )
}

export default Task