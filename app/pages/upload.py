from flask import Blueprint, render_template, redirect, url_for, request
import db.books
import db.panels
import commands
import commands.cut

upload = Blueprint('upload', __name__)

@upload.route("/upload")
def index():
    books = db.books.all()
    panel_count = db.panels.count_by_books(books)
    return render_template('upload/index.html', books=books, panel_count=panel_count)

@upload.route("/upload/<book_id>/<volume>")
def demo(book_id, volume):
    return index()

@upload.route("/upload/<id>/create", methods=['POST'])
def create(id):
    volume = request.form['volume']
    images  = request.files.getlist('images')
    ident = commands.cut.start(id, volume, images)
    return str(ident)
