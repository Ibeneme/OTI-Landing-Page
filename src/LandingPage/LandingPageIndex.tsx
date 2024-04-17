import React from "react";
//import Hero from "./HeroPage/Hero";
import SectionA from "./Section/Section.a/Section.a";
import SectionB from "./Section/Section.b/Section.b";
//import SectionC from "./Section/Section.c/SectionC";
// import SectionD from "./Section/Section.d/SectionD";
import Footer from "./Footer/Footer";
import NewHero from "./HeroPage/NewHero";

const LandingPageIndex: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#FFF0E5" }}>
      {/* <div style={{ backgroundColor: "#fff3e4" }}></div> */}
      <div style={{ zIndex: 1 }}>
        {/* <Hero /> */}
        <NewHero />
      </div>
      <div style={{ zIndex: 1 }}>
        <SectionA />
      </div>
      <div style={{ zIndex: 1 }}>
        <SectionB />
      </div>
      {/*    <div style={{ zIndex: 1 }}>
        <SectionC />
      </div>
 <div style={{ zIndex: 1 }}>
        <SectionD />
      </div> */}
      <div style={{ zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPageIndex;
