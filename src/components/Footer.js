import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="bottom-section">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h5 className="bottom-h5">
                <div className="nav-bar-logo-foot">My First School</div>
              </h5>
              <a href="/" className="bottom-p">
                About
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Blog
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Contact us
              </a>
              <hr />
            </div>
            <div className="col-sm">
              <h5 className="bottom-h5">FOLLOW US</h5>
              <a href="/" className="bottom-p">
                <img
                  src="/Icons/fb-icon.png"
                  alt="facebook-icon"
                  style={{ width: "33px", height: "25px" }}
                />
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Instagram
              </a>

              <hr />
              <a href="/" className="bottom-p">
                LinkedIn
              </a>
              <hr />
            </div>
            <div className="col-sm">
              <h5 className="bottom-h5">APP</h5>
              <a href="/" className="bottom-p">
                App Store
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Google Play
              </a>
              <hr />
            </div>
            <div className="col-sm">
              <h5 className="bottom-h5">TERMS & CONDITIONS</h5>
              <a href="/" className="bottom-p">
                Support
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Privacy
              </a>
              <hr />
              <a href="/" className="bottom-p">
                Terms
              </a>
              <hr />
            </div>
          </div>
        </div>
        <footer>
          <div id="footer-p">
            <p>
              By: Miguel Tomé & Rodrigo Prudêncio.
              <br /> Copyright © 2020 Ironhack. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
