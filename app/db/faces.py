import cv2
import db.panels
import db.metadata
from pathlib import Path

root = Path('./data/faces')

def __path(panel):
    path = root / panel['book_id'] / panel['volume'] / panel['name']
    path.mkdir(parents=True, exist_ok=True)
    return path

def update(panel, crops):
    image = cv2.imread(panel['path'].as_posix())
    for (i, (x, y, w, h)) in enumerate(crops):
        face_path = __path(panel) / 'face_{0}.jpeg'.format(i)
        face = image[y:y+h, x:x+w]
        cv2.imwrite(face_path.as_posix(), face)

    for (x, y, w, h) in crops:
        cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
    cv2.imwrite((__path(panel) / 'detect.jpeg').as_posix(), image)
