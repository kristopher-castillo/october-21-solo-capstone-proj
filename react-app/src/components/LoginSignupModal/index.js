import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Modal } from "../../context/Modal";
import { login, signUp } from "../../store/session";


import "./LoginSignupModal.css"

const LoginSignupModal = ({restrictedAccess}) => {
  const [errors, setErrors] = useState([]);
  const [showModal, setShowModal] = useState(restrictedAccess);
  const [hideModal1, setHideModal1] = useState(false);
  const [hideModal2, setHideModal2] = useState(true);
  const [hideModal3, setHideModal3] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users?.users?.users);
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const restrictedPage = /\d/.test(location);

  useEffect(() => {
    setShowModal(restrictedAccess)
  }, [restrictedAccess])

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const userEmails = users?.map((user) => user.email);

    if (userEmails.includes(email)) {
      setHideModal1(true);
      setHideModal2(false);
    } else {
      setHideModal1(true);
      setHideModal3(false);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const onSignUp = async (e) => {
    e.preventDefault();

    const data = await dispatch(signUp(username, email, newPassword));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = () => {
    dispatch(login("demo@aa.io", "password"))
  }

  const onModalClose = () => {
    if ((!sessionUser && !restrictedPage) || (sessionUser && restrictedPage)) {
      setShowModal(false);
      setHideModal1(false);
      setHideModal2(true);
      setHideModal3(true);
      setEmail("");
      setUsername("");
      setPassword("");
      setNewPassword("");
    }
  };

  const cancelButton = (
    <Link to="/">
      <button
        className="modal-cancel-btn"
        onClick={() => {
          setShowModal(false)
          onModalClose()
        }}>
        Cancel
      </button>
    </Link>
  );

  const demoButton = (
    <button className="demo-btn" onClick={demoLogin}>Demo User</button>
  ) 

  return (
    <>
      <button className="login-btn" onClick={() => setShowModal(true)}>
        Log in
      </button>
      {showModal && (
        <Modal onClose={onModalClose}>
          <div className="modal-container">
            <div className="modal-image-container">
              <img
                className="modal-image"
                src="https://cookingclone.s3.amazonaws.com/modal-image.jpeg"
                alt="modal recipe"
              ></img>
            </div>
            <div className="modal-login-container">
              <div className="modal-login-1" hidden={hideModal1}>
                <form
                  className="modal-login-form-1"
                  onSubmit={handleEmailSubmit}
                >
                  <div className="errors">
                    {errors.map((error, ind) => (
                      <div key={ind}>{error.slice(error.indexOf(":") + 2)}</div>
                    ))}
                  </div>
                  <p className="modal-text">
                    Enter your email address to log in or create an account
                  </p>
                  <input
                    className="modal-email-input"
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <div className="modal-continue-btn-container">
                    <button className="modal-continue-btn">Continue</button>
                    {cancelButton}
                    {demoButton}
                  </div>
                </form>
              </div>
              <div className="modal-login-2" hidden={hideModal2}>
                <form className="modal-login-form-2" onSubmit={onLogin}>
                  <div className="errors">
                    {errors.map((error, ind) => (
                      <div key={ind}>{error.slice(error.indexOf(":") + 2)}</div>
                    ))}
                  </div>
                  <p className="modal-text">Enter your password to log in</p>
                  <input
                    className="modal-password-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <div className="modal-submit-btn-container">
                    <button className="modal-submit-btn">Login</button>
                    {cancelButton}
                  </div>
                </form>
              </div>
              <div className="modal-signup" hidden={hideModal3}>
                <form className="modal-signup-form" onSubmit={onSignUp}>
                  <div className="errors">
                    {errors.map((error, ind) => (
                      <div key={ind}>{error.slice(error.indexOf(":") + 2)}</div>
                    ))}
                  </div>
                  <p className="modal-text">
                    Enter a username and password to sign up
                  </p>
                  <input
                    className="modal-username-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                  <input
                    className="modal-password-input"
                    type="password"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></input>
                  <div className="modal-submit-btn-container">
                    <button className="modal-submit-btn">Sign Up</button>
                    {cancelButton}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default LoginSignupModal;