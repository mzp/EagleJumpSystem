from flask import Blueprint, render_template
import db.books
import db.panels
import db.faces
import utils
import custom_json

search = Blueprint('search', __name__)

@search.route("/")
def index():
    books = db.books.all()
    panels = custom_json.Encoder().encode(db.panels.group_by(books))
    panel_count = db.panels.count_by_books(books)
    return render_template('search/index.html', books=books, panels=panels, panel_count=panel_count)

@search.route("/search/<id>")
def show(id):
    return index()
