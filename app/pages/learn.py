from flask import Blueprint, render_template, url_for, request, redirect
import commands
import commands.learn
import db.books
import db.panels

learn = Blueprint('learn', __name__)

def __panels(id):
    book = db.books.find(id)
    for vol in range(1, int(book['volume']) +1):
        for panel in db.panels.find(book['id'], vol):
            if panel.get('faces') and panel['metadata'].get('characters'):
                yield panel

@learn.route("/learn")
def index():
    books = db.books.all()
    return render_template('learn/index.html', books=books)

@learn.route("/learn/<id>")
def select(id):
    book = db.books.find(id)
    characters = {}
    for panel in __panels(id):
        for (face, character) in zip(panel['faces'], panel['metadata']['characters']):
            if character not in characters:
                characters[character] = []
            characters[character].append(face)
    return render_template('learn/select.html', book=book, characters=characters)

@learn.route("/learn/<id>/start", methods=['POST'])
def start(id):
    book = db.books.find(id)
    panels = __panels(id)
    tags = []
    for character in book['characters']:
        if request.form.get(character['tag']) == 'on':
            tags.append(character['tag'])
    ident = commands.learn.start(id, panels, tags)
    return redirect(url_for('learn.show', id=ident))

@learn.route("/learn/<id>/log")
def show(id):
    content = commands.show(id)
    return render_template('learn/show.html', content=content)
