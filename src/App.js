import {Component} from 'react';
import './App.css';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg'

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    }
  }

onInputChange = (event) => {
  console.log(event.target.value);
}

onButtonSubmit = () => {
  console.log('click');
}

  render() {
    return (
      <div className="App">
        <> {/*particles-bg NPM package*/}
          <div>...</div>
          <ParticlesBg type="cobweb" num={250} bg={true} />
        </> {/*particles-bg NPM package*/}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        {/* 
        <FaceRecognition /> 
        */}
      </div>
    );
  }
}

export default App;
