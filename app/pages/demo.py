from flask import Blueprint, render_template, url_for, request, redirect
import tempfile
import db.books
import images.faces
import images.learn
import cv2
from pathlib import Path
import os.path

demo = Blueprint('demo', __name__)
temp = Path('./tmp').resolve()

@demo.route("/demo")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('demo/index.html', books=books, panel_count=panel_count)

def save(storage):
    (_, path) = tempfile.mkstemp(prefix='ejs')
    storage.save(path)
    return path

def mktemp():
    return tempfile.mktemp(dir=temp.as_posix(), suffix='.jpg')

@demo.route("/detect", methods=['POST'])
def detect():
    id = request.form['book']
    file = request.files['image']
    path = save(file)

    image = cv2.imread(path)

    book = db.books.find(id)
    tags = db.models.tags(id)

    crops = list(images.faces.detect(path))

    faces = []
    for (x,y,w,h) in crops:
        face_path = mktemp()
        face = image[y:y+h, x:x+w]
        cv2.imwrite(face_path, face)

        prediction = images.learn.infer(
                db.models.path_for(id).as_posix(),
                len(tags),
                face_path)
        for character in book['characters']:
            if character['tag'] == tags[prediction]:
                faces.append((os.path.basename(face_path), character['name']))
                break

    for (x,y,w,h) in crops:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
    detect_path = mktemp()
    cv2.imwrite(detect_path, image)

    return render_template('demo/detect.html', faces=faces, detect_path=os.path.basename(detect_path))

