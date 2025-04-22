from flask import Flask
from flask import render_template

app = Flask(__name__)

# ROUTES
@app.route('/')
def homepage():
   return render_template('homepage.html')   

@app.route('/learn')
def learning_section_page():
   return render_template('learn.html')

@app.route('/quiz')
def quiz_page():
   return render_template('quiz.html')

# AJAX FUNCTIONS


if __name__ == '__main__':
   app.run(debug = True, port=5001)