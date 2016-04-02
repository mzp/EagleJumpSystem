from flask import Blueprint, render_template, url_for, request, redirect
import commands
import commands.infer
import db.books
import db.panels

characters = Blueprint('characters', __name__)

@characters.route("/characters")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('characters/index.html', books=books, panel_count=panel_count)

@characters.route("/characters/<id>/<vol>")
def show(id, vol):
    return index()

@characters.route("/characters/<id>/<vol>/start")
def infer(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.infer.start(id, panels)
    return str(ident)
