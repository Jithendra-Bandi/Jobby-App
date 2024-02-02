import './index.css'

const SalaryLi = props => {
  const {each, salaryChange} = props
  const clicked = event => salaryChange(event.target.value)
  return (
    <li className="type-li">
      <input
        type="radio"
        name="salary"
        onChange={clicked}
        id={each.salaryRangeId}
        value={each.salaryRangeId}
      />
      <label htmlFor={each.salaryRangeId} className="type-label">
        {each.label}
      </label>
    </li>
  )
}

export default SalaryLi
