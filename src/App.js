import {Component} from 'react';
import ParticlesBg from 'particles-bg'
import Navigation from "./components/Navigation/Navigation";
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from "./components/Logo/Logo";
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}

onInputChange = (event) => {
  this.setState({input: event.target.value});
}

onRouteChange = (route) => {
  if (route === 'SignIn') {
    this.setState(initialState)
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
}

/***** MATH FOR THE FACE BOX *****/
calculateFaceLocation = (data) => {
  const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  return {
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width - (clarifaiFace.right_col * width),
    bottomRow: height - (clarifaiFace.bottom_row * height)
  }
}
/***** MATH FOR THE FACE BOX *****/

displayFaceBox = (box) => {
  this.setState({box: box});
}

/***** FETCH IMG, INCREMENT ENTRY COUNT, DISPLAY FACE BOX *****/
onImageSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(res => res.json())
      .then(res => {
        if (res) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(res => res.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(res))
      })
      .catch(err => console.log(err));
  }
  /***** FETCH IMG, INCREMENT ENTRY COUNT, DISPLAY FACE BOX *****/

  render() {
    const { imageUrl, box, route, isSignedIn } = this.state;
    return (
      <div className="App">
        <> {/*particles-bg NPM package*/}
          <div>...</div>
          <ParticlesBg type="cobweb" num={100} bg={true} />
        </> {/*particles-bg NPM package*/}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onImageSubmit={this.onImageSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'SignIn' 
             ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            )
        } 
      </div>
    );
  }
}

export default App;