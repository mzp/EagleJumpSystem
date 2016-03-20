# EagleJumpSystem
## Prepare

 * Obtain API key(server key) for [Google Vision API](https://cloud.google.com/vision/), and save as `/path/to/auth.json`.

## How to install

```
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/auth.json"
pip install --require requirements.txt
npm install
$(npm bin)/gulp
python app/main.py
```

and open http://localhost:5000
