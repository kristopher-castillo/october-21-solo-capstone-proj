import React from "react";

import './Footer.css'

const Footer = () => {

  return (
    <footer>
      <div className="footer-links">
        <p>Follow Me:</p>
        <a className="footer-linkedin"href="https://www.linkedin.com/in/kristopher-c-castillo-a59b7a16b/">
          <p>LinkedIn</p>
        </a>
        <a className="footer-github" href="https://github.com/kristopher-castillo">
          <p>GitHub</p>
        </a>
        <a className="footer-portfolio" href="http://kristophercastillo.com">
          <p>Portfolio</p>
        </a>
      </div>
    </footer>
  );
}

export default Footer;