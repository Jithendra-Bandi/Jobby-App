import './index.css'

const TypeLi = props => {
  const {each, typeChange} = props
  const clicked = event => typeChange(event.target.value, event.target.checked)
  return (
    <li className="type-li">
      <input
        onChange={clicked}
        id={each.employmentTypeId}
        value={each.employmentTypeId}
        type="checkbox"
      />
      <label htmlFor={each.employmentTypeId} className="type-label">
        {each.label}
      </label>
    </li>
  )
}

export default TypeLi
