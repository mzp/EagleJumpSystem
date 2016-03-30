from flask import Flask, url_for, redirect, send_from_directory
from pages.batch import batch
from pages.books import books
from pages.characters import characters
from pages.demo import demo
from pages.faces import faces
from pages.search import search
from pages.text import text
from pages.upload import upload
from pages.learn import learn
from pages.manual_characters import manual_characters
from pages.manual_text import manual_text
from pathlib import Path
import commands

app = Flask(__name__)
app.config.update(DEBUG=True)
app.register_blueprint(batch)
app.register_blueprint(books)
app.register_blueprint(characters)
app.register_blueprint(demo)
app.register_blueprint(faces)
app.register_blueprint(learn)
app.register_blueprint(manual_characters)
app.register_blueprint(manual_text)
app.register_blueprint(search)
app.register_blueprint(text)
app.register_blueprint(upload)

@app.route("/fonts/<path:filename>")
def fonts(filename):
    return redirect(url_for('static', filename='fonts/'+filename))

@app.route('/data/<path:filename>')
def data(filename):
    root = Path('./data').resolve()
    return send_from_directory(root.as_posix(), filename)

@app.route('/tmp/<path:filename>')
def tmp(filename):
    root = Path('./tmp').resolve()
    return send_from_directory(root.as_posix(), filename)

@app.route("/log/<id>")
def log(id):
    return commands.show(id)

if __name__ == "__main__":
    app.run()
