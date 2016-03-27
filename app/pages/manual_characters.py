from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import db.faces
import utils
import custom_json

manual_characters = Blueprint('manual_characters', __name__)

@manual_characters.route("/manual/characters")
def index():
    books = db.books.all()
    panels = custom_json.Encoder().encode(db.panels.group_by(books))
    panel_count = db.panels.count_by_books(books)
    return render_template('manual_characters/index.html', books=books, panels=panels, panel_count=panel_count)

@manual_characters.route("/manual/characters/<id>/<vol>")
def edit(id, vol):
    book = db.books.find(id)
    panels = list(db.panels.find(id, vol))
    if 'path' in request.args:
        path = request.args['path']
        panel = utils.find(panels, lambda panel: panel['path'].as_posix() == path)
    else:
        panel = utils.find(panels, utils.is_empty('script'))

    character_names = {}
    for character in book['characters']:
        character_names[character['tag']] = character['name']

    return render_template('manual_characters/edit.html',
            panel=panel,
            panels=panels,
            id=id,
            vol=vol,
            book=book,
            character_names=character_names)

@manual_characters.route("/manual/characters/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.json['path']

    characters = request.json['characters']
    others = request.json['others']
    db.metadata.update(path, characters=characters, others=others)
    return 'ok'
