

import './App.css'
import InformationCard from "./components/InformationCard.tsx";

function App() {

  return (
      <>
          <div style={{padding: '20px'}}>
              <InformationCard
                  title="Auto Waschanlage und Detailing"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget dictum magna, ac lobortis tortor. Mauris ut lorem eu auctor eleifend."
              />
          </div>
      </>
  )
}

export default App
