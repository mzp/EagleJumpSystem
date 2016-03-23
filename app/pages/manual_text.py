from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import utils

manual_text = Blueprint('manual_text', __name__)

@manual_text.route("/manual/text")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('manual_text/index.html', books=books, panel_count=panel_count)

@manual_text.route("/manual/text/<id>/<vol>")
def edit(id, vol):
    panels = list(db.panels.find(id, vol))
    if 'path' in request.args:
        path = request.args['path']
        panel = utils.find(panels, lambda panel: panel['path'].as_posix() == path)
    else:
        panel = utils.find(panels, utils.is_empty('script'))
    return render_template('manual_text/edit.html', panel=panel, panels=panels, id=id, vol=vol)

@manual_text.route("/manual/text/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.form['path']
    script = request.form['script']

    db.metadata.update(path, script=script)

    # show next page
    next_panel= utils.next(panels, lambda p: p['path'].as_posix() == path)
    return redirect(url_for('manual_text.edit', id=id, vol=vol, path=next_panel['path']))
