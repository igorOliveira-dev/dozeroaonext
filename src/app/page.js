import Header from "./components/Header";
import Begin from "./sections/begin/Begin";
import Benefits from "./sections/benefits/Benefits";
import Contact from "./sections/contact/Contact";
import Course from "./sections/course/Course";
import Faq from "./sections/faq/Faq";
import Modules from "./sections/modules/Modules";

export default function Home() {
  return (
    <div>
      <Header />
      <Begin />
      <Benefits />
      <Course />
      <Modules />
      <Faq />
      <Contact />
    </div>
  );
}
