import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Home from './components/Home';
import CardView from './components/CardView';
import ParticlesBackground from './components/ParticlesBackground';
import { users } from './data/users';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleLogin = (name) => {
    const foundUser = users.find((user) => user.name.toLowerCase() === name.toLowerCase().trim());
    if (foundUser) {
      setCurrentUser(foundUser);
      setIsError(false);
    } else {
      setIsError(true);
      setTimeout(() => setIsError(false), 3000); // Reset error state after 3s
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-primary">
      <ParticlesBackground />
      
      <main className="relative z-10 w-full px-4 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          {!currentUser ? (
            <Home 
              key="home" 
              onLogin={handleLogin} 
              isError={isError} 
            />
          ) : (
            <CardView 
              key="card" 
              user={currentUser} 
              onBack={handleLogout} 
            />
          )}
        </AnimatePresence>
      </main>

      <div className="absolute bottom-4 left-0 w-full text-center z-100 pointer-events-none">
        <p className="text-white/30 text-xs tracking-widest font-light">
          by Dandyskie
        </p>
      </div>
    </div>
  );
}

export default App;
