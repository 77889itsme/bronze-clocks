from flask import Flask
from flask import render_template, redirect, url_for, request
from utils import load_data, select_ids
import os
import json
import urllib.parse


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE_QUIZ = os.path.join(BASE_DIR, "data/quiz.json")
DATA_FILE_SHAPE =  os.path.join(BASE_DIR, "data/shape.json")

quiz_data = load_data(DATA_FILE_QUIZ)
quiz_len = len(quiz_data)

shape_data = load_data(DATA_FILE_SHAPE)

app = Flask(__name__)

# ROUTES
@app.route('/')
def homepage():
   return render_template('homepage.html')   

@app.route('/learn')
def learning_section_page():
   return render_template('learn.html')

@app.route('/learn/color')
def learn_color_section_page():
   return render_template('learn_color.html')

@app.route('/learn/motif')
def learn_motif_section_page():
   return render_template('learn_motif.html')

@app.route('/learn/motif/<int:page_num>')
def learn_motif_pages(page_num):
   return render_template('learn_motif_pages.html')

@app.route('/learn/shape')
def learn_shape_section_page():
   return render_template('learn_shape.html')

@app.route('/learn/shape/<int:page_num>')
def learn_shape_pages(page_num):
   id = page_num - 1
   info = shape_data[id]
   return render_template('learn_shape_pages.html', page_num=page_num, info=info)

@app.route('/quiz')
def quiz_start():
    ids = select_ids(quiz_len, 5)
    encoded_ids = urllib.parse.quote(json.dumps(ids))
    return redirect(url_for('quiz_page', page_num=1, ids=encoded_ids))

@app.route('/quiz/<int:page_num>')
def quiz_page(page_num):
    encoded_ids = request.args.get('ids')
    if not encoded_ids:
        return "Missing quiz ID list", 400
    try:
        import json, urllib.parse
        ids = json.loads(urllib.parse.unquote(encoded_ids))
    except Exception:
        return "Invalid ID format", 400
    if page_num < 1 or page_num > len(ids):
        return "Invalid quiz page", 404
    quiz_id = ids[page_num - 1]
    info = quiz_data[quiz_id]
    return render_template('quiz.html', info=info, encoded_ids=encoded_ids, page_num=page_num)

# AJAX FUNCTIONS


if __name__ == '__main__':
   app.run(debug = True, port=5001)