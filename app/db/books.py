from tinydb import TinyDB, where

def __db():
    return TinyDB('./data/books.json')

def all():
    return __db().all()

def find(id):
    return __db().search(where('id') == id)[0]

def create(id, title, volume, characters):
    __db().insert({ 'id': id, 'title': title, 'volume': volume, 'characters': characters })

def update(id, title, volume, characters):
    __db().update({
        'title': title,
        'volume': volume,
        'characters': characters
        }, where('id') == id)

def create_or_update(id, title, volume, characters):
    db = __db()
    if db.contains(where('id') == id):
        update(id, title, volume, characters)
    else:
        create(id, title, volume, characters)
