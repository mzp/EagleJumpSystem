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

def __group_by(books):
    characters = {}
    for book in books:
        characters[book['id']] = {}
        for panel in __panels(book['id']):
            for (face, character) in zip(panel['faces'], panel['metadata']['characters']):
                if character not in characters[book['id']]:
                    characters[book['id']][character] = { 'faces': [] }
                characters[book['id']][character]['faces'].append(face.as_posix())
    return characters

@learn.route("/learn")
def index():
    books = db.books.all()
    characters = __group_by(books)
    return render_template('learn/index.html', books=books, characters=characters)

@learn.route("/learn/<id>/start", methods=['POST'])
def start(id):
    book = db.books.find(id)
    panels = __panels(id)
    tags = request.json['tags']
    ident = commands.learn.start(id, panels, tags)
    return str(ident)
