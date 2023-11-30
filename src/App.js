import React, { useState } from 'react';
import analyzeImage from './ai/azure-image-analysis';

function App() {

  // A GUI with:
  //  A title
  // A text box to enter the URL of the image to be analyzed or the prompt of the image to generate
  // A button to trigger the image analysis and one to trigger image generation

  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    const imageURL = document.getElementById('imageURL').value;

    // Set loading to true when starting the analysis
    setLoading(true);

    try {
      const json = await analyzeImage(imageURL);

      // Display the image analysis results
      const img = document.createElement('img');
      img.src = imageURL;
      document.getElementById('results').appendChild(img);
      const p = document.createElement('p');
      p.innerHTML = JSON.stringify(json, null, 2);
      document.getElementById('results').appendChild(p);
    } finally {
      // Set loading back to false when analysis is complete (whether successful or not)
      setLoading(false);
    }
  };

  const generate = () => {
  }
  console.log('REACT_APP_VISION_KEY:', process.env.REACT_APP_VISION_KEY);
  console.log('REACT_APP_VISION_ENDPOINT:', process.env.REACT_APP_VISION_ENDPOINT);



  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Image Analysis and Generation
          key: {process.env.REACT_APP_VISION_KEY}
          END: {process.env.REACT_APP_VISION_ENDPOINT}
        </h1>
      </header>
      <p>
        <label htmlFor="imageURL">Image URL:</label>
        <input type="text" id="imageURL"></input>
        <input type="button" id="analyze" value="Analyze" onClick={analyze}></input>
        <input type="button" id="generate" value="Generate" onClick={generate}></input>
      </p>
      <div id="results">
        <h2>Image Analysis</h2>
        {loading && <div>Loading...</div>}
      </div>
    </div>
  );
}


export default App;
