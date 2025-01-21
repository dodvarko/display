import { Plants, Sensors, Weather } from './components';
import { useEffect, useRef, useState } from 'react';


function App() {
  const intervalRef = useRef<number>();
  const [screen, setScreen] = useState<number>(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setScreen((screen) => {
        return screen === 1 ? 0 : 1;
      });
    }, 30000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };

  }, []);

  return (
    <section className="grid grid-cols-5 items-center justify-center h-screen">
      {
        screen === 1 &&
        <>
          <Sensors/>
          <Weather/>
        </>
      }
      {
        screen === 0 &&
        <Plants/>
      }
    </section>
  );
}

export default App;
