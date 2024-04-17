import React from "react";
// import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../../../LandingPage/Footer/Footer.css";

interface FeedbackFooterProps {
  bgColor: string;
  iconColors: string
}

const FeedbackFooter: React.FC<FeedbackFooterProps> = ({
  bgColor,
  iconColors,
}) => {
  // const handleTwitterClick = () => {
  //   window.open("https://twitter.com/antigravity_ng", "_blank");
  // };

  // const handleLinkedinClick = () => {
  //   window.open(
  //     "https://ng.linkedin.com/company/theantigravitygroup",
  //     "_blank"
  //   );
  // };

  // const handleFacebookClick = () => {
  //   window.open(
  //     "https://m.facebook.com/p/Antigravity-Group-100086364701801/",
  //     "_blank"
  //   );
  // };

  return (
    <footer className="footer-container" style={{ backgroundColor: bgColor }}>
      {/* <div className="social-icons">
        <FaTwitter
          className="icon"
          data-aos="zoom-in"
          style={{ color: iconColors }}
          onClick={handleTwitterClick}
        />
        <FaFacebook
          className="icon"
          data-aos="zoom-in"
          style={{ color: iconColors }}
          onClick={handleFacebookClick}
        />
        <FaLinkedin
          className="icon"
          data-aos="zoom-in"
          style={{ color: iconColors }}
          onClick={handleLinkedinClick}
        />
      </div> */}
      <div className="copyright" data-aos="zoom-in">
        <p style={{ color: `${iconColors}` }}>
          {" "}
          SRM by Antigravity Group &copy; 2024
        </p>
      </div>
    </footer>
  );
};

export default FeedbackFooter;
