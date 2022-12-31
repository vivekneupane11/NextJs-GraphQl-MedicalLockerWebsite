import type { NextPage } from "next";
import FeaturesBlocks from "./components/FeatureBlocks";
import Features from "./components/FeatureHome";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroHome from "./components/HeroHome";
import Newsletter from "./components/NewsLetter";
import Testimonials from "./components/Testimonial";

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">


    {/*  Site header */}
    <Header />

    {/*  Page content */}
    <main className="flex-grow">

      {/*  Page sections */}
      <HeroHome />
      <Features />
      <FeaturesBlocks />
      <Testimonials />
      <Newsletter />

    </main>

    {/*  Site footer */}
    <Footer />

  </div>
  );
};

export default HomePage;
