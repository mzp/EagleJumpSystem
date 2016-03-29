from flask import Blueprint, render_template, redirect, url_for, request
import db.books

books = Blueprint('books', __name__)

@books.route("/books")
def index():
    books = db.books.all()
    return render_template('books/index.html', books=books)

@books.route("/books/<id>")
def show(id):
    books = db.books.all()
    return render_template('books/index.html', books=books)

@books.route("/books/save", methods=['POST'])
def save():
    db.books.create_or_update(
            request.json['id'],
            request.json['title'],
            request.json['volume'],
            request.json['characters'])
    return 'ok'
