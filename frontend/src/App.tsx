import "./App.css";
import InformationCard from "./components/InformationCard.tsx";
import HeroImage from "./pages/HeroImage/HeroImage.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <>
        <Header />
      <div>
        <HeroImage />
      </div>

      <div style={{ padding: "20px" }}>
        <InformationCard
          title="Auto Waschanlage und Detailing"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget dictum magna, ac lobortis tortor. Mauris ut lorem eu auctor eleifend."
        />
      </div>

    </>
  );
}

export default App;
