import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'

function App() {
  return (
    <div className="App">
      <> {/*particles-bg NPM package*/}
        <div>...</div>
        <ParticlesBg type="cobweb" num={250} bg={true} />
      </> {/*particles-bg NPM package*/}
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* 
      <FaceRecognition /> 
      */}
    </div>
  );
}

export default App;
