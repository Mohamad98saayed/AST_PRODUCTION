import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks";
import { signoutAsync } from "../state/features/user/userSlice";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.user);
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useAppDispatch();

  //hooks
  const navigate = useNavigate();

  return (
    <nav>
      <h1>LOGO</h1>

      <div>
        <Link to="/">home</Link>
        <Link to="/about">about</Link>
        <Link to="/contact">contact</Link>
        <div>
          {isAuthenticated ? (
            <div onClick={() => setShowMenu(!showMenu)} className="menu">
              <img alt="" src={user?.user?.image.url} />
              <div className="menu-items">
                <button
                  className="create-car"
                  onClick={() => navigate("/cars/new")}
                  style={{ display: showMenu ? "block" : "none" }}
                >
                  new car
                </button>
                <button
                  onClick={() => dispatch(signoutAsync())}
                  style={{ display: showMenu ? "block" : "none" }}
                >
                  signout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                className="signin-btn"
                onClick={() => navigate("/signin")}
              >
                signin
              </button>
              <button
                className="signup-btn"
                onClick={() => navigate("/signup")}
              >
                signup
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
