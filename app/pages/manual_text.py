from flask import Blueprint, render_template, url_for, request, redirect
import db.books
import db.panels
import utils
import custom_json

manual_text = Blueprint('manual_text', __name__)

@manual_text.route("/manual/text")
def index():
    books = db.books.all()
    panels = custom_json.Encoder().encode(db.panels.group_by(books))
    panel_count = db.panels.count_by_books(books)
    return render_template('manual_text/index.html', books=books, panel_count=panel_count, panels=panels)

@manual_text.route("/manual/text/<id>/<vol>")
def panel_index(id, vol):
    return index()

@manual_text.route("/manual/text/<id>/<vol>/form")
def form(id, vol):
    return index()

@manual_text.route("/manual/text/<id>/<vol>/update", methods=['POST'])
def update(id, vol):
    panels = list(db.panels.find(id, vol))
    path = request.json['path']
    script = request.json['script']

    db.metadata.update(path, script=script)

    return 'ok'
