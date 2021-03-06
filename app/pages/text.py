from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import commands
import commands.text

text = Blueprint('text', __name__)

@text.route("/text")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('text/index.html', books=books, panel_count=panel_count)

@text.route("/text/<id>/<vol>")
def show(id, vol):
    return index()

@text.route("/text/<id>/<vol>/start")
def detect(id, vol):
    panels = db.panels.find(id, vol)
    ident = commands.text.start(panels)
    return str(ident)
