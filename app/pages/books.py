from flask import Blueprint, render_template, redirect, url_for, request
import db.books

books = Blueprint('books', __name__)

def __parse(data):
    id = data['id']
    title = data['title']
    volume = data['volume']
    characters = [
        {
            'name': data['name[%d]' % i],
            'color': data['color[%d]' % i]
        }
        for i in range(10) if data['name[%d]' % i]
    ]
    return {
        'id': id,
        'title': title,
        'volume': volume,
        'characters': characters
    }

@books.route("/books")
def index():
    books = db.books.all()
    return render_template('books/index.html', books=books)

@books.route("/books/new")
def new():
    url = url_for('books.create')
    return render_template('books/form.html', url=url)

@books.route("/books/create", methods=['POST'])
def create():
    db.books.create(**__parse(request.form))
    return redirect(url_for('books.index'))

@books.route("/books/<id>/edit")
def edit(id):
    book = db.books.find(id)
    url = url_for('books.update', id=id)
    return render_template('books/form.html', url=url, readonly=True, **book)

@books.route("/books/<id>/update", methods=['POST'])
def update(id):
    db.books.update(**__parse(request.form))
    return redirect(url_for('books.edit', id=id))
