from flask import Flask, url_for, redirect, send_from_directory
from pages.books import books
from pages.search import search
from pages.upload import upload
from pathlib import Path

app = Flask(__name__)
app.config.update(DEBUG=True)
app.register_blueprint(books)
app.register_blueprint(search)
app.register_blueprint(upload)

@app.route("/fonts/<path:filename>")
def fonts(filename):
    return redirect(url_for('static', filename='fonts/'+filename))

@app.route('/data/<path:filename>')
def data(filename):
    root = Path('./data').resolve()
    return send_from_directory(root.as_posix(), filename)

if __name__ == "__main__":
    app.run()
