from tinydb import TinyDB, where

def __db():
    return TinyDB('./data/panels.json')

def update(path, auto_characters=None, auto_script=None, script=None, characters=None, others=None):
    db = __db()
    if db.contains(where('path') == path):
        data = {}
        if auto_characters:
            data['auto_characters'] = auto_characters
        if auto_script:
            data['auto_script'] = auto_script
        if script:
            data['script'] = script
        if characters:
            data['characters'] = characters
        if others:
            data['others'] = others
        db.update(data, where('path') == path)
    else:
        db.insert({
            'path': path,
            'auto_characters': auto_characters,
            'auto_script': auto_script,
            'script': script,
            'characters': characters,
            'others': others
            })


def find(path):
    xs = __db().search(where('path') == path)
    if len(xs) == 0:
        return {}
    else:
        return xs[0]

def find_prefix(prefix):
    return __db().search(where('path').matches(prefix+'.*'))
