from flask import Blueprint, render_template, redirect, url_for, request
import db.books
import commands.cut

upload = Blueprint('upload', __name__)

@upload.route("/upload")
def index():
    books = db.books.all()
    return render_template('upload/index.html', books=books)

@upload.route("/upload/<id>")
def new(id):
    book = db.books.find(id)
    return render_template('upload/new.html', book=book)

@upload.route("/upload/<id>/create", methods=['POST'])
def create(id):
    ident = commands.cut.start()
    return redirect(url_for('upload.show', id=ident))

@upload.route("/upload/<id>/log")
def show(id):
    content = commands.cut.show(id)
    return render_template('upload/show.html', content=content)
