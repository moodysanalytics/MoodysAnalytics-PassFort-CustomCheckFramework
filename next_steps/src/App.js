import React from 'react';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';


const App = () => {
    const images = [
       "./diagramJPEGs/Slide1.jpeg",
       "./diagramJPEGs/Slide2.jpeg",
       "./diagramJPEGs/Slide3.jpeg",
       "./diagramJPEGs/Slide4.jpeg",
       "./diagramJPEGs/Slide5.jpeg",
       "./diagramJPEGs/Slide6.jpeg",
       "./diagramJPEGs/Slide7.jpeg",
       "./diagramJPEGs/Slide8.jpeg",
       "./diagramJPEGs/Slide9.jpeg",
       "./diagramJPEGs/Slide10.jpeg",
       "./diagramJPEGs/Slide11.jpeg",
       "./diagramJPEGs/Slide12.jpeg",
       "./diagramJPEGs/Slide13.jpeg",
    ];

    return (
        <Zoom autoplay={false} indicators={true}>
        {images.map((image) => {
          return (
            
              <div className="each-slide-effect">
                <div className="slide" style={{ 'backgroundImage': `url(${image})` }}>
                </div>
              </div>
          )
        })}
        </Zoom>

    );
};

export default App;

{/* <img src="./diagramJPEGs/Slide1.jpeg"/> */}