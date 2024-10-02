import requests
import json
from decouple import config
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:4200"])  # Allow only requests from Angular frontend

# Load Firebase URL from environment variables
FIREBASE_URL = config('FIREBASE_URL')

# Helper function to interact with Firebase
def firebase_request(endpoint, data=None, method="GET"):
    url = f"{FIREBASE_URL}{endpoint}.json"
    headers = {'Content-Type': 'application/json'}

    if method == "POST":
        response = requests.post(url, headers=headers, data=json.dumps(data))
    elif method == "PUT":
        response = requests.put(url, headers=headers, data=json.dumps(data))
    else:
        response = requests.get(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code}, {response.text}")
        return None

# Function to register a new user (without checking if user already exists)
@app.route('/register', methods=['POST'])
def register_user():
    user_data = request.json
    endpoint = f"/users/{user_data['username']}"

    # Directly put user data to Firebase without checking if the user already exists
    firebase_request(endpoint, user_data, method="PUT")
    return jsonify({"message": "User registered successfully!", "success": True}), 201

# Function to login a user (no validation for username/password, just returns success)
@app.route('/login', methods=['POST'])
def login_user():
    # This function accepts any username and password, without checking anything.
    return jsonify({"message": "Login successful!", "success": True}), 200

# Function to submit a reservation (for future use)
@app.route('/submit-reservation', methods=['POST'])
def submit_reservation():
    reservation_data = request.json
    endpoint = "/reservations"
    firebase_request(endpoint, reservation_data, method="POST")
    return jsonify({"message": "Reservation submitted successfully!"}), 201

# Example usage (manual testing)
if __name__ == "__main__":
    app.run(debug=True)
