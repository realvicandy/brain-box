import {Component} from 'react';
import ParticlesBg from 'particles-bg'
import Clarifai from 'clarifai';
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

// *****Initializing Clarifai API*****
const app = new Clarifai.App({
 apiKey: '5606a5b884484899a1a4b28c96834f08'
});
// *****Initializing Clarifai API*****

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onButtonSubmit = () => {
  this.setState({imageUrl: this.state.input});
  // *****Integrating Clarifai API*****
  const USER_ID = 'realvicandy';
  const PAT = '33c27a0a3f2547f789bc36bbdec57dcc';
  const APP_ID = 'my-first-application';
  const MODEL_ID = 'face-detection';
  const MODEL_VERSION_ID = '45fb9a671625463fa646c3523a3087d5';    
  const IMAGE_URL = this.state.input;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };

  // NOTE: MODEL_VERSION_ID is optional, you can also call prediction with the MODEL_ID only
  // https://api.clarifai.com/v2/models/{YOUR_MODEL_ID}/outputs
  // this will default to the latest version_id

  fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result.outputs[0].data.regions[0].region_info.bounding_box))
      .catch(error => console.log('error', error));
  // *****Integrating Clarifai API*****

  // *****Andrei Code*****
  // app.models.predict(Clarifai.COLOR_MODEL, 'https://samples.clarifai.com/face-det.jpg').then(
  //   function(response) {
  //     console.log(response);
  //   },
  //   function(err) {
  //     console.log(err);
  //   }
  // );
  // *****Andrei Code*****
}

  render() {
    return (
      <div className="App">
        <> {/*particles-bg NPM package*/}
          <div>...</div>
          <ParticlesBg type="cobweb" num={200} bg={true} />
        </> {/*particles-bg NPM package*/}
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} /> 
      </div>
    );
  }
}

export default App;