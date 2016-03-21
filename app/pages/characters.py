from flask import Blueprint, render_template, url_for, request, redirect
import commands
import commands.infer
import db.books
import db.panels

characters = Blueprint('characters', __name__)

@characters.route("/characters")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('characters/index.html', books=books, count=count)

@characters.route("/characters/<id>/<vol>")
def infer(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.infer.start(id, panels)
    return redirect(url_for('characters.show', id=ident))

@characters.route("/characters/<id>/log")
def show(id):
    content = commands.show(id)
    return render_template('characters/show.html', content=content)
