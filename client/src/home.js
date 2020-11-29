import React, { useState } from "react";
import { useTrail, animated } from "react-spring";
import "./home.css";

const items = ["Hey", "There", <i className="em-svg em-wave" />];
const config = { mass: 5, tension: 2000, friction: 200 };

const Home = () => {
  const [toggle, set] = useState(true);
  const trail = useTrail(items.length, {
    config,
    opacity: toggle ? 1 : 0,
    x: toggle ? 0 : -20,
    height: toggle ? 120 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div>
      <div className="color-div">
        <div className="home-navbar">
          <h3>
            <a href="https://drive.google.com/file/d/1i9ZsCZme1z-ZG-fICJ3lNnChnCsvE_b2/view?usp=sharing">
              Resume
            </a>
          </h3>
          <h3>
            <a href="https://www.github.com/joshuamango">GitHub</a>
          </h3>
          <h3>
            <a href="https://www.joshuaodeyemi.com/spill">Spill</a>
          </h3>
          <h3>
            <a href="https://currency-converter-056.herokuapp.com">
              Currency Converter
            </a>
          </h3>
        </div>
        <div className="trails-main" onClick={() => set(state => !state)}>
          <div>
            {trail.map(({ x, height, ...rest }, index) => (
              <animated.div
                key={items[index]}
                className="trails-text"
                style={{
                  ...rest,
                  transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
                }}
              >
                <animated.div style={{ height }}>{items[index]}</animated.div>
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
