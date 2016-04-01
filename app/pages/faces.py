from flask import Blueprint, render_template, url_for, request, redirect
import commands
import commands.faces
import db.books
import db.panels

faces = Blueprint('faces', __name__)

@faces.route("/faces")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('faces/index.html', books=books, panel_count=panel_count)

@faces.route("/faces/<id>/<vol>")
def show(id, vol):
    return index()


@faces.route("/faces/<id>/<vol>/start")
def detect(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.faces.start(panels)
    return str(ident)
