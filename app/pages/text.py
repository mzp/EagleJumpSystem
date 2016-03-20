from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import commands
import commands.text

text = Blueprint('text', __name__)

@text.route("/text")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('text/index.html', books=books, count=count)

@text.route("/text/<id>/<vol>")
def detect(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.text.start(panels)
    return redirect(url_for('text.show', id=ident))

@text.route("/text/<id>/log")
def show(id):
    content = commands.show(id)
    return render_template('text/show.html', content=content)
