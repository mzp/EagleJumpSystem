# EagleJumpSystem
## Features
### Search
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/search.png)

### Text detection
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/text_detection.png)

### Character detection
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/character_detection.png)

## Prepare

 * Obtain API key(server key) for [Google Vision API](https://cloud.google.com/vision/), and save as `/path/to/auth.json`.
 * Install Python3 and OpenCV

## How to install

```
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/auth.json"
pip install --require requirements.txt
npm install
$(npm bin)/gulp
python app/main.py
```

and open http://localhost:5000


