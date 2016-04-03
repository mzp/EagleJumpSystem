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

def __find(path, xs):
    for x in xs:
        if x['path'] == path:
            return x
    return None

def __make(path, table):
    metadata = __find(path.as_posix(), table)
    (book_id, volume, name) = __info(path)
    (detect, faces) = db.faces.find( { 'book_id': book_id, 'volume': volume, 'name': name })
    return { 'path': path, 'metadata': metadata, 'book_id': book_id, 'volume': volume, 'name': name, 'detect': detect, 'faces': faces }

def group_by(books, f=None):
    info = {}
    for book in books:
        info[book['id']] = {}

        for vol in range(1, 1 + int(book['volume'])):
            panels = list(db.panels.find(book['id'], vol))

            if f:
                info[book['id']][vol] = f(panels)
            else:
                info[book['id']][vol] = panels
    return info

def count_by_books(books):
    return group_by(books, len)

def update(book_id, volume, filename, position, image):
    path = Path(filename)
    name, ext = path.stem, path.suffix
    new_path = __path_for(book_id, volume) / '{0}_{1}{2}'.format(name, position, ext)
    cv2.imwrite(new_path.as_posix(), image)

def find(book_id, volume):
    prefix = root / book_id / 'vol{0}'.format(volume)
    metadata = list(db.metadata.find_prefix(prefix.as_posix()))
    for path in __path_for(book_id, volume).glob('*.*'):
        yield __make(path, metadata)
