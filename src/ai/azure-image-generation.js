function generateImage(prompt){
    //Open api endpoint to generate image
    const url = `https://api.openai.com/v1/images/generations`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };
    const data = {
        "model":"dall-e-3",
        "prompt": prompt,
        // "n": 1,
    };
    return fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data)
    }).then(response => response.json());
}

function isConfigured(){
    //check if variables are set
    return process.env.REACT_APP_OPENAI_API_KEY !== undefined;
}

export default generateImage
export {isConfigured}