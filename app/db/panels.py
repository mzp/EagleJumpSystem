import cv2
import db.metadata
from pathlib import Path

root = Path('./data/panel')

def __path_for(book_id, volume):
    path = root / book_id / 'vol{0}'.format(volume)
    path.mkdir(parents=True, exist_ok=True)
    return path

def __make(path):
    metadata = db.metadata.find(path.as_posix())
    return { 'path': path, 'metadata': metadata }

def all():
    for path in root.glob('*/*/*.*'):
        yield __make(path)

def update(book_id, volume, filename, position, image):
    path = Path(filename)
    name, ext = path.stem, path.suffix
    new_path = __path_for(book_id, volume) / '{0}_{1}{2}'.format(name, position, ext)
    cv2.imwrite(new_path.as_posix(), image)

def find(book_id, volume):
    for path in __path_for(book_id, volume).glob('*.*'):
        yield __make(path)
