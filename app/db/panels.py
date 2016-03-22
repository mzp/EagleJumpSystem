import cv2
import db.metadata
from pathlib import Path

root = Path('./data/panel')

def __path_for(book_id, volume):
    path = root / book_id / 'vol{0}'.format(volume)
    path.mkdir(parents=True, exist_ok=True)
    return path

def __info(path):
    (_, _, book_id, volume, name) = path.parts
    return (book_id, volume, name)

def __make(path):
    metadata = db.metadata.find(path.as_posix())
    (book_id, volume, name) = __info(path)
    (detect, faces) = db.faces.find( { 'book_id': book_id, 'volume': volume, 'name': name })
    return { 'path': path, 'metadata': metadata, 'book_id': book_id, 'volume': volume, 'name': name, 'detect': detect, 'faces': faces }

def all():
    for path in root.glob('*/*/*.*'):
        yield __make(path)

def count_by_books(books):
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))

    info = {}
    for book in books:
        info[book['id']] = {}

        for vol in range(1, 1 + int(book['volume'])):
            info[book['id']][vol] = count(book['id'], vol)
    return info

def update(book_id, volume, filename, position, image):
    path = Path(filename)
    name, ext = path.stem, path.suffix
    new_path = __path_for(book_id, volume) / '{0}_{1}{2}'.format(name, position, ext)
    cv2.imwrite(new_path.as_posix(), image)

def find(book_id, volume):
    for path in __path_for(book_id, volume).glob('*.*'):
        yield __make(path)
