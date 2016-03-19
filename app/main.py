from flask import Flask, url_for, render_template, redirect, request
from pages.books import books
from pages.upload import upload

app = Flask(__name__)
app.config.update(DEBUG=True)
app.register_blueprint(books)
app.register_blueprint(upload)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/fonts/<path:filename>")
def fonts(filename):
    return redirect(url_for('static', filename='fonts/'+filename))

if __name__ == "__main__":
    app.run()
