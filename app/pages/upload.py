from flask import Blueprint, render_template, redirect, url_for, request
import db.books
import commands
import commands.cut

upload = Blueprint('upload', __name__)

@upload.route("/upload")
def index():
    books = db.books.all()
    return render_template('upload/index.html', books=books)

@upload.route("/upload/<id>/create", methods=['POST'])
def create(id):
    volume = request.form['volume']
    images  = request.files.getlist('images')
    ident = commands.cut.start(id, volume, images)
    return str(ident)
