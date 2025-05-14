from flask import Flask
from flask import render_template, redirect, url_for, request, session, jsonify
from utils import load_data, select_ids, calculate_score
import os
import json
import urllib.parse
from datetime import timedelta


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE_QUIZ = os.path.join(BASE_DIR, "data/quiz.json")
DATA_FILE_COLOR = os.path.join(BASE_DIR, "data/color.json")
DATA_FILE_SHAPE = os.path.join(BASE_DIR, "data/shape.json")
DATA_FILE_MOTIF = os.path.join(BASE_DIR, "data/motif.json")
DATA_FILE_PREP = os.path.join(BASE_DIR, "data/quiz_prep.json")

quiz_data = load_data(DATA_FILE_QUIZ)
quiz_len = len(quiz_data)

color_data = load_data(DATA_FILE_COLOR)
shape_data = load_data(DATA_FILE_SHAPE)
motif_data = load_data(DATA_FILE_MOTIF)
prep_data = load_data(DATA_FILE_PREP)

app = Flask(__name__)
import os
app.secret_key = "BRONZECLOCKAPPSECRETKEY"

# initial settings
@app.before_request
def reset_first_visit():
   if 'first_visit' not in session:
        session['first_visit'] = True

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

@app.route('/learn/color/casting')
def learn_color_casting():
   return render_template('learn_color_casting.html')

@app.route('/learn/color/decoration')
def learn_color_decoration_start():
   return redirect(url_for('learn_color_decoration', page_num=1))

@app.route('/learn/color/decoration/<int:page_num>')
def learn_color_decoration(page_num):
   id = page_num - 1
   info = color_data[id]
   return render_template('learn_color_decoration_pages.html', page_num=page_num, info=info)

@app.route('/learn/color/patination')
def learn_color_patination():
   return render_template('learn_color_patination.html')

@app.route('/learn/motif')
def learn_motif_section_page():
   return render_template('learn_motif.html')

@app.route('/learn/motif/<int:page_num>')
def learn_motif_pages(page_num):
   id = page_num - 1
   info = motif_data[id]
   return render_template('learn_motif_pages.html', page_num=page_num, info=info)

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
    # Check if it's the user's first visit
   if session.get('first_visit', True):
      session['first_visit'] = False
      return render_template('quiz_init.html')
   else:
      # generate encoded ids for main quiz
      ids = select_ids(quiz_len, 5)
      session['scores'] = []
      session['ids'] = ids
      encoded_ids = urllib.parse.quote(json.dumps(ids))
      return render_template('quiz_start.html', encoded_ids=encoded_ids)

@app.route('/quiz/prep/<int:page_num>')
def quiz_prep(page_num):
   sections = ['color', 'motif', 'shape']
   section_name = sections[page_num - 1]
   questions = prep_data[section_name]
   # generate encoded ids for main quiz
   ids = select_ids(quiz_len, 5)
   session['scores'] = []
   session['ids'] = ids
   encoded_ids = urllib.parse.quote(json.dumps(ids))
   return render_template('quiz_prep.html', section_name=section_name, questions=questions, page_num=page_num, encoded_ids=encoded_ids)

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
   return render_template('quiz.html', info=info, ids=ids, encoded_ids=encoded_ids, page_num=page_num)

@app.route('/quiz/finish')
def finish():
   scores = session.get('scores', [])
   total_score = sum(item['score'] for item in scores)  # 计算总分
   rounds_data = [{
      "name": item["name"],
      'page_num': item['page_num'],
      'score': item['score'],
      'image_path': item['image_path'],
      'correct_year': item['correct_year'],
      'start_time': item['start_time'],
      'end_time': item['end_time'],
   } for item in scores]

   return render_template('finish.html', total_score=total_score, rounds_data=rounds_data)

# AJAX FUNCTIONS
@app.route("/quiz/score/<int:page_num>", methods=['GET', 'POST'])
def get_scores(page_num):   
   submitted_data = request.get_json()
   selected_year = submitted_data["selected_year"]
   start_time = submitted_data["start_time"]
   end_time = submitted_data["end_time"]
   correct_year = (start_time + end_time) /2

   ids = session.get("ids", [])
   quiz_id = int(ids[page_num - 1])
   info = quiz_data[quiz_id]

   score, labels = calculate_score(selected_year, start_time, end_time)

   print("Before:", session.get("scores", []))

   # save data to session
   scores = session.get("scores", [])
   current_score = {
        'page_num': page_num,
        'quiz_id': quiz_id,
        'score': score,
        'labels': labels,
        'name': info.get("name_en", ""),
        'image_path': info.get('image_path', ''),
        'correct_year': correct_year,
        'start_time': info.get('start_time', ''),
        'end_time': info.get('end_time', ''),
   }
   updated = False
   for i, record in enumerate(scores):
      if record['page_num'] == page_num:
         scores[i] = current_score
         updated = True
         break
   if not updated:
      scores.append(current_score)

   session['scores'] = scores
   session.modified = True

   print("After:", session.get("scores", []))

   return jsonify({
        "score": score,
        "labels": labels
    })


if __name__ == '__main__':
   app.run(debug = True, port=5001)