/** @jsx h */
import { h, Component } from 'preact'
import { as } from '../modules/globals'

export class Select extends Component {
  constructor(props) {
    super(props)

    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(event) {
    this.props.onChange(event.target.value)
  }

  render() {
    const { options, css, value } = this.props

    return (
      <div {...as(css, 'select')}>
        <label {...as(css, 'label')}>Select</label>
        <select value={value} onChange={this.handleSelect}>
          {options.map(option => (
            <option value={option.value}>{option.name}</option>
          ))}
        </select>
      </div>
    )
  }
}
