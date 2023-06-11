const request = require('request');
const fs = require('fs');

function fetchAndSaveImage(url, filename) {
    request.get(url)
      .on('error', err => {
        console.error(`Error downloading image: ${err}`);
      })
      .pipe(fs.createWriteStream(filename))
      .on('close', () => {
        console.log(`Image saved as ${filename}`);
      });
  }

  const values = {
    greeting: "Hello",
    who: "You",
    width: 400,
    height: 500,
    color: 'Pink',
    size: 100,
  }

  function generateCatImage() {
    const baseUrl = 'https://cataas.com/cat/says/';

    // Fetch the first cat image
    const cat1Url = `${baseUrl}${values.greeting}'?width='${values.width}'&height='${values.height}'&color'${values.color}'&s='${values.size}`;
    const cat1Filename = 'cat1.jpg';
    fetchAndSaveImage(cat1Url, cat1Filename);
  
    // Fetch the second cat image
    const cat2Url = `${baseUrl}${values.who}'?width='${values.width}'&height='${values.height}'&color'${values.color}'&s='${values.size}`;
    const cat2Filename = 'cat2.jpg';
    fetchAndSaveImage(cat2Url, cat2Filename);
  
    // Wait for both images to be downloaded
    // Then bind them together and save the resulting image
    setTimeout(() => {
      const outputFilename = 'mergedCatImage.jpg';
      const mergedImage = fs.createWriteStream(outputFilename);
  
      // Read the first cat image
      const cat1Image = fs.createReadStream(cat1Filename);
      cat1Image.pipe(mergedImage, { end: false });
  
      // Read the second cat image
      const cat2Image = fs.createReadStream(cat2Filename);
      cat2Image.pipe(mergedImage, { end: false });
  
      cat2Image.on('end', () => {
        fs.unlinkSync(cat1Filename);
        fs.unlinkSync(cat2Filename);
      });
    }, 2000);
  }

  generateCatImage();