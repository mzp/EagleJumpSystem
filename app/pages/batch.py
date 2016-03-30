from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels

batch = Blueprint('batch', __name__)

@batch.route("/batch")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('batch/index.html', books=books, panel_count=panel_count)

@batch.route("/batch/<id>")
def show(id):
    return index()
