from flask import Flask, render_template, jsonify

from utils import generate_llm_response

# Create a Flask application instance, serving static files from the 'assets' folder
app = Flask(__name__, static_folder='assets')

@app.route('/', methods=['GET'])
def index():
    """
    Route for the index page.
    Renders the 'index.html' template when accessed via a GET request.
    """
    return render_template('index.html')

@app.route('/generate', methods=['GET'])
def generate():
    """
    Route for generating a math problem response.
    Calls the generate_llm_response function to get the response, and returns it as JSON.
    If an exception occurs, returns an empty response with default values.
    """
    try:
        llm_response = generate_llm_response()
    except Exception as e:
        llm_response = {
            'question': '',
            'answer': '',
            'explanation': ''
        }
        print(str(e))
    return jsonify(llm_response)

@app.errorhandler(405)
def method_not_allowed(e):
    """
    Handles HTTP 405 Method Not Allowed errors.
    Returns a JSON response indicating that the method is not allowed.
    """
    return jsonify(error="Method Not Allowed"), 405


if __name__ == '__main__':
    app.run(debug=False)
