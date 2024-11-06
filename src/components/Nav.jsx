// rrd imports
import { Form, NavLink } from "react-router-dom"
import { Link } from "react-router-dom"; // Add this line

// library
import { TrashIcon } from '@heroicons/react/24/solid'

// assets
import logomark from "../assets/logomark.svg"

const Nav = ({ userName }) => {
  return (
    <nav>
      <NavLink
        to="/"
        aria-label="Go to home"
      >
        <img src={logomark} alt="" height={30} />
        <span>BUdget</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="logout"
            onSubmit={(event) => {
              if (!confirm("Delete user and all data?")) {
                event.preventDefault()
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>

          </Form>
        )
      }
      <Link to="/budget-optimization" className="btn btn--primary">
            Optimize Budget
      </Link>
          
    </nav>
  )
}
export default Nav