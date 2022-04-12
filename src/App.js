import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import FirebaseAuthService from './FirebaseAuthService';

function App() {
  // Create user property in state.
  const [user, setUser] = useState(null);

  // Check changes on auth from firebase.
  FirebaseAuthService.subscribeToAuthChanges(setUser);

  // Return markup to render.
  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes Murru</h1>
        <LoginForm existingUser={ user } />
      </div>
    </div>
  );
}

export default App;
