from flask import Blueprint, render_template, url_for, request
import db.books
import db.panels

text = Blueprint('text', __name__)

@text.route("/text")
def index():
    def count(id, vol):
        return len(list(db.panels.find(id, vol)))
    books = db.books.all()
    return render_template('text/index.html', books=books, count=count)
