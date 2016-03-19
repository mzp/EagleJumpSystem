from flask import Flask, url_for, render_template, redirect, request

app = Flask(__name__)
app.config.update(DEBUG=True)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/input_files")
def input_files():
    return render_template('input_files.html')

@app.route("/import", methods=['POST'])
def import_files():
    return "not yet"

@app.route("/fonts/<path:filename>")
def fonts(filename):
    return redirect(url_for('static', filename='fonts/'+filename))

if __name__ == "__main__":
    app.run()
