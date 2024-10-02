import requests
import json
from decouple import config

# Load Firebase URL from environment variable
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

# Function to register a new user
def register_user(user_data):
    endpoint = f"/users/{user_data['username']}"
    existing_user = firebase_request(endpoint)

    if existing_user:
        return "User already exists!"
    else:
        firebase_request(endpoint, user_data, method="PUT")
        return "User registered successfully!"

# Function to handle user login
def login_user(username, password):
    # Construct the Firebase endpoint for this specific user
    endpoint = f"/users/{username}"

    # Fetch user data from Firebase
    user_data = firebase_request(endpoint)

    if user_data is None:
        return "User does not exist!"

    # Check if the provided password matches the stored password
    if user_data['password'] == password:
        return "Login successful!"
    else:
        return "Invalid username or password!"

# Function to submit a reservation
def submit_reservation(reservation_data):
    endpoint = "/reservations"
    firebase_request(endpoint, reservation_data, method="POST")
    return "Reservation submitted!"

# Example usage:
if __name__ == "__main__":
    # Register user
    user_data = {
        "username": "john_doe",
        "phoneNumber": "+1234567890",
        "email": "john@example.com",
        "password": "securepassword"
    }
    print(register_user(user_data))

    # Login user (Check if username and password are correct)
    print(login_user("john_doe", "securepassword"))

    # Submit reservation
    reservation_data = {
        "username": "john_doe",
        "checkInDate": "2023-09-01",
        "checkOutDate": "2023-09-05",
        "adultCount": 2,
        "childrenCount": 1,
        "roomType": "deluxe-double-room"
    }
    print(submit_reservation(reservation_data))
