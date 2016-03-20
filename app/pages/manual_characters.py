from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import db.faces
import utils

manual_characters = Blueprint('manual_characters', __name__)

@manual_characters.route("/manual/characters")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('manual_characters/index.html', books=books, count=count)

@manual_characters.route("/manual/characters/<id>/<vol>")
def edit(id, vol):
    book = db.books.find(id)
    panels = list(db.panels.find(id, vol))
    if 'path' in request.args:
        path = request.args['path']
        panel = utils.find(panels, lambda panel: panel['path'].as_posix() == path)
    else:
        panel = utils.find(panels, utils.is_empty('script'))
    return render_template('manual_characters/edit.html', panel=panel, panels=panels, id=id, vol=vol, book=book)

@manual_characters.route("/manual/characters/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.form['path']

    characters = [
        request.form['character[%d]' % i]
        for i in range(10) if ('character[%d]' % i) in request.form
    ]
    others = [
        request.form['other[%d]' % i]
        for i in range(5) if request.form['other[%d]' % i]
    ]
    db.metadata.update(path, characters=characters, others=others)

    # show next page
    next_panel= utils.next(panels, lambda p: p['path'].as_posix() == path)
    return redirect(url_for('manual_characters.edit', id=id, vol=vol, path=next_panel['path']))
