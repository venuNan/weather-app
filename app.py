from flask import Flask, render_template, jsonify, request
import requests
import os
from variables import API_KEY

app = Flask(__name__)
api_key = API_KEY

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/search", methods=["POST"])
def search():
    try:
        data = request.get_json()
        place = data.get("place", "")

        if not place:
            return jsonify({"error": "No place provided"}), 400

        if not api_key:
            print("API_KEY not found in .env file")
            return jsonify({"error": "API key not configured"}), 500

        print(f"Using API_KEY: {api_key}")

        url = f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/{place}?unitGroup=metric&include=days,hours&key={api_key}&contentType=json"

        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for HTTP errors

        try:
            data = response.json()
        except ValueError:
            print("Response is not valid JSON")
            return jsonify({"error": "Invalid response from weather service"}), 500

        return jsonify(data)

    except requests.RequestException as e:
        print(f"RequestException: {e}")
        return jsonify({"error": "Failed to fetch weather data"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8231)
