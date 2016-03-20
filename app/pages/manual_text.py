from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels

manual_text = Blueprint('manual_text', __name__)

@manual_text.route("/manual/text")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('manual_text/index.html', books=books, count=count)

def __find(xs, f):
    for x in xs:
        if f(x):
            return x
    return None

def __next(xs, f):
    ys = xs[1:]
    for (x,y) in zip(xs,ys):
        if f(x):
            return y
    return None

@manual_text.route("/manual/text/<id>/<vol>")
def edit(id, vol):
    panels = list(db.panels.find(id, vol))
    if 'path' in request.args:
        path = request.args['path']
        panel = __find(panels, lambda panel: panel['path'].as_posix() == path)
    else:
        panel = __find(panels,
                lambda panel: 'script' not in panel['metadata'] or panel['metadata']['script'] == '')
    return render_template('manual_text/edit.html', panel=panel, panels=panels, id=id, vol=vol)

@manual_text.route("/manual/text/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.form['path']
    script = request.form['script']

    db.metadata.update(path, script=script)

    # show next page
    next_panel= __next(panels, lambda p: p['path'].as_posix() == path)
    return redirect(url_for('manual_text.edit', id=id, vol=vol, path=next_panel['path']))
