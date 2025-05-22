from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)  # This allows your frontend to make requests to this backend

# File to store click data
DATA_FILE = 'clicks.json'

def load_clicks():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            return json.load(f)
    return {"clicks": 0}

def save_clicks(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f)

@app.route('/clicks', methods=['GET'])
def get_clicks():
    data = load_clicks()
    return jsonify(data)

@app.route('/clicks/increment', methods=['POST'])
def increment_clicks():
    data = load_clicks()
    data["clicks"] += 1
    save_clicks(data)
    return jsonify(data)

@app.route('/clicks/reset', methods=['POST'])
def reset_clicks():
    data = {"clicks": 0}
    save_clicks(data)
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)