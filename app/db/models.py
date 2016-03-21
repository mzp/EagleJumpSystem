from pathlib import Path
from tinydb import TinyDB, where

root = Path('./data/models')

def __db():
    return TinyDB('./data/models.json')

def path_for(id):
    root.mkdir(parents=True, exist_ok=True)
    return root / '{0}.ckpt'.format(id)

def update(id, tags):
    db = __db()
    if db.contains(where('id') == id):
        db.update({ 'tags': tags }, where('id') == id)
    else:
        db.insert({ 'id': id, 'tags': tags })
