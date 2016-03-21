import sys
import cv2
import numpy as np
import math
import tensorflow as tf
from machine import *
import os.path

def detect(filename, path, cascade_file = "./lbpcascade_animeface.xml"):
    if not os.path.isfile(cascade_file):
        raise RuntimeError("%s: not found" % cascade_file)

    cascade = cv2.CascadeClassifier(cascade_file)
    image = cv2.imread(filename)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.equalizeHist(gray)

    faces = cascade.detectMultiScale(gray,
                                     # detector options
                                     scaleFactor = 1.1,
                                     minNeighbors = 5,
                                     minSize = (24, 24))
    i = 1
    for (x, y, w, h) in faces:
        crop = image[y:y+h, x:x+w]
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)

        name = infer(crop)
        font = cv2.FONT_HERSHEY_PLAIN
        cv2.putText(image, str(name),(x, y), font, 2, (0, 0, 255), 2)


    cv2.imwrite(path, image)

def write(path):
  detect(path, path + '.output.jpeg')

images_placeholder = tf.placeholder("float", shape=(None, IMAGE_PIXELS))
labels_placeholder = tf.placeholder("float", shape=(None, NUM_CLASSES))
keep_prob = tf.placeholder("float")

logits = inference(images_placeholder, keep_prob)
sess = tf.InteractiveSession()

def infer(image):
  image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  image = cv2.resize(image, (IMAGE_SIZE, IMAGE_SIZE))
  image = np.asarray(image.flatten().astype(np.float32)/255.0)

  pred = np.argmax(logits.eval(feed_dict={
      images_placeholder: [image],
      keep_prob: 1.0 })[0])
  if pred == 0:
      return 'cocoa'
  elif pred == 1:
      return 'rize'
  elif pred == 2:
      return 'chiya'
  elif pred == 3:
      return 'chino'
  elif pred == 4:
      return 'syaro'
  else:
      return None

if __name__ == '__main__':
    test_image = []
    for path in sys.argv[1:]:
        write(path)

