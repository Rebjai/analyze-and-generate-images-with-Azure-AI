import React, { useState } from 'react';
import analyzeImage from './ai/azure-image-analysis';
import generateImage from './ai/azure-image-generation';
import { isConfigured as analysisIsConfigured } from './ai/azure-image-analysis';
import { isConfigured as generationIsConfigured } from './ai/azure-image-generation';

function App() {
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

  const generate = async () => {
    const prompt = document.getElementById('imageURL').value;

    // Set loading to true when starting the analysis
    setLoading(true);

    try {
      const json = await generateImage(prompt);

      // Display the image analysis results
      const img = document.createElement('img');
      img.src = json.data[0].url;
      document.getElementById('results').appendChild(img);
      const p = document.createElement('p');
      p.innerHTML = JSON.stringify(json, null, 2);
      document.getElementById('results').appendChild(p);
    } finally {
      // Set loading back to false when analysis is complete (whether successful or not)
      setLoading(false);
    }
  }


  if (!analysisIsConfigured() || !generationIsConfigured()) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Image Analysis and Generation
          </h1>
        </header>
        <p>
          Please configure the app with your Azure Cognitive Services and OpenAI API keys in the enviroment variables and restart the server.
        </p>
      </div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Image Analysis and Generation
        </h1>
      </header>
      <p>
        <label htmlFor="imageURL">Image URL or prompt:</label>
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
