import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../context/Modal";
import { login } from "../../store/session";


import "./LoginSignupModal.css"

const LoginSignupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [hideModal1, setHideModal1] = useState(false);
  const [hideModal2, setHideModal2] = useState(true);
  const [hideModal3, setHideModal3] = useState(true);
  const [email, setEmail] = useState("");
  const users = useSelector((state) => state.users?.users?.users);
  const dispatch = useDispatch();


  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const userEmails = users?.map((user => user.email))

    if (userEmails.includes(email)) {
      setHideModal1(true)
      setHideModal2(false)
    }
    else {
      setHideModal1(true);
      setHideModal3(false);
    }
  }

  return (
    <>
      <button className="login-button" onClick={() => setShowModal(true)}>
        Log in
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
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
                  </div>
                </form>
              </div>
              <div className="modal-login-2" hidden={hideModal2}>
                <form className="modal-login-form-2">
                  <input
                    className="modal-password-input"
                    type="text"
                    placeholder="Password"
                  ></input>
                  <div className="modal-submit-btn-container">
                    <button className="modal-submit-btn">Login</button>
                  </div>
                </form>
              </div>
              <div className="modal-signup" hidden={hideModal3}>
                <form className="modal-signup-form">
                  <input
                    className="modal-password-input"
                    type="text"
                    placeholder="Password"
                  ></input>
                  <div className="modal-submit-btn-container">
                    <button className="modal-submit-btn">Sign Up</button>
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