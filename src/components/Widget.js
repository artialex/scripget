/** @jsx h */
import { h, Component } from 'preact'
import css from '../themes/default.useable.css'
import { addPrefix as x } from '../constants'
import { as } from '../modules/globals'
import { Select } from './Select'
import * as API from '../modules/api'

export class Widget extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.state = {
      css: css,
      users: [],
      selectedUser: null
    }

    // -- Use styles
    if (!document.getElementById(x`styles`)) {
      css.use()
    }

    // -- Load theme
    if (props.theme !== 'default') {
      import(`../themes/${props.theme}.useable.css`).then(
        ({ default: theme }) => {
          for (const key of Object.keys(theme.locals)) {
            css.locals[key] += ` ${theme.locals[key]}`
          }

          this.setState({ css })
          theme.use()
        }
      )
    }
  }

  componentDidMount() {
    // -- Fetch users
    API.fetchUsers(users => this.setState({ users }))
  }

  handleChange(selectedUser) {
    this.setState({ selectedUser })
  }

  render() {
    const { css } = this.state

    return (
      <div {...as(css, 'widget')}>
        <Select
          value={this.state.selectedUser}
          options={this.state.users}
          onChange={this.handleChange}
          css={css}
        />
        <p>
          Selected: <b>{this.state.selectedUser}</b>
        </p>
      </div>
    )
  }
}
