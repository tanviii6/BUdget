import { Form } from "react-router-dom"
import { Link } from 'react-router-dom';

// library
import { UserPlusIcon } from "@heroicons/react/24/solid";

// assets
import illustration from "../assets/illustration.jpg"

const Intro = () => {
  return (
    <div className="intro">
      <img src={illustration} alt="BU logo" width={600} />
      <div>
        <h1>
          Terriers On <span className="accent">BUdget</span>
        </h1>
        <p>
        Money management got you stressed? BUdget is here to help!
        </p>
        <Form method="post">
          <input
            type="text"
            name="userName"
            required
            placeholder="e.g., Rhett" aria-label="Your Name" autoComplete="given-name"
          />
          <input type="hidden" name="_action" value="newUser" />
          <div style={{ display: 'flex' }}>
            <button type="submit" className="btn btn--dark">
              <span>Create Account</span>
            </button>
          
            <Link to="/tips" className="btn">
              Budgeting Tips
            </Link>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default Intro