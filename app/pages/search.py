from flask import Blueprint, render_template
import db.panels

search = Blueprint('search', __name__)

@search.route("/")
def index():
    panels = db.panels.all()
    return render_template('search/index.html', panels=panels)
