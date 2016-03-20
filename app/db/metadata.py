from tinydb import TinyDB, where

def __db():
    return TinyDB('./data/panels.json')

def update(path, auto_script=None, script=None):
    db = __db()
    if db.contains(where('path') == path):
        data = {}
        if auto_script:
            data['auto_script'] = auto_script
        if script:
            data['script'] = script
        db.update(data, where('path') == path)
    else:
        db.insert({ 'path': path, 'auto_script': auto_script, script: '' })

def find(path):
    xs = __db().search(where('path') == path)
    if len(xs) == 0:
        return {}
    else:
        return xs[0]
