// Add the code to call the Azure AI Vision service Image Analysis 4.0 API to a React application as a function 'analyzeImage' 
function analyzeImage(imgURL) {
    var subscriptionKey = process.env.REACT_APP_VISION_KEY;
    var uriBase = process.env.REACT_APP_VISION_ENDPOINT + "computervision/imageanalysis:analyze";
    var params = {
        // "visualFeatures": "Categories,Description,Color",
        // "details": "",
        "features":"caption,read",
        "model-version":"latest",
        "language": "en",
        "api-version": "2023-02-01-preview"
    };
    var sourceImageUrl = imgURL;
    return fetch(uriBase + "?" + new URLSearchParams(params), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey
        },
        body: '{"url": "' + sourceImageUrl + '"}'
    })
        .then(response => response.json())
        .then(json => json)
}
export default analyzeImage