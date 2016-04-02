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
def panel_index(id, vol):
    return index()

@manual_characters.route("/manual/characters/<id>/<vol>/form")
def form(id, vol):
    return index()

@manual_characters.route("/manual/characters/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.json['path']

    characters = request.json['characters']
    others = request.json['others']
    db.metadata.update(path, characters=characters, others=others)
    return 'ok'
