# EagleJumpSystem :sparkles:

EagleJumpSystem is a yonkoma manga management system.

## Features
### Search
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/search.png)

Search koma(panel) with script and characters.

### Text detection
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/text_detection.png)

Automatic text detection by [Google Cloud Vision API](https://cloud.google.com/vision/).  Also, you could fix it by hands.

### Character detection
![](https://raw.githubusercontent.com/mzp/EagleJumpSystem/master/doc_images/character_detection.png)

Half-automatic character detection by machine-learning. Once you annotate some pages(e.g. 100 for each characters), your machine annotate the rest pages.

## Usage
### Prepare
#### Install Python3 and OpenCV.
Install Python3 and OpenCV. I recomend use pyenv and anaconda like following:

```
pyenv install anaconda3-2.4.0
pyenv virtualenv anaconda3-2.4.0 gochiusa
pyenv local anaconda3-2.4.0/envs/gochiusa
conda install -c https://conda.binstar.org/menpo opencv3
```

#### Obtain Google API Key
Obtain API key(server key) for [Google Vision API](https://cloud.google.com/vision/), and save as `/path/to/auth.json`.

### Run

```
export GOOGLE_APPLICATION_CREDENTIALS="/path/to/auth.json"
pip install -r requirements.txt
npm install
npm run gulp build
python app/main.py
```

and open [http://localhost:5000](http://localhost:5000)

### Tips
#### Share data with other machines.
All data is stored at `./data`. So, use Dropbox.

```
mv ./data ~/Dropbox/
ln -s ~/Dropbox/ data
```
