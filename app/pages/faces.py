from flask import Blueprint, render_template, url_for, request, redirect
import commands
import commands.faces
import db.books
import db.panels

faces = Blueprint('faces', __name__)

@faces.route("/faces")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('faces/index.html', books=books, count=count)

@faces.route("/faces/<id>/<vol>")
def detect(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.faces.start(panels)
    return redirect(url_for('faces.show', id=ident))

@faces.route("/faces/<id>/log")
def show(id):
    content = commands.show(id)
    return render_template('faces/show.html', content=content)
