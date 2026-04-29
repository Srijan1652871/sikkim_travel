"""
Monastery360 — Flask Backend
Routes every navbar page through the server instead of raw .html links.
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
from datetime import datetime
import json, os

app = Flask(__name__)

# ---------------------------------------------------------------------------
# In-memory store (survives the process lifetime; replace with a DB if needed)
# ---------------------------------------------------------------------------
EVENTS = [
    {"id": 1, "event_name": "Pang Lhabsol Festival",    "monastery": "Pemayangtse Monastery", "date": "2024-08-15", "capacity": 150, "booked": 45},
    {"id": 2, "event_name": "Bhumchu Festival",          "monastery": "Tashiding Monastery",   "date": "2024-03-05", "capacity": 100, "booked": 30},
    {"id": 3, "event_name": "Kagyed Dance Festival",     "monastery": "Enchey Monastery",      "date": "2024-12-18", "capacity": 80,  "booked": 15},
    {"id": 4, "event_name": "Losar (Tibetan New Year)",  "monastery": "Rumtek Monastery",      "date": "2026-02-10", "capacity": 100, "booked": 0},
    {"id": 5, "event_name": "Saga Dawa",                 "monastery": "Tashiding Monastery",   "date": "2026-05-23", "capacity": 100, "booked": 0},
    {"id": 6, "event_name": "Guru Rinpoche Tsechu",      "monastery": "Tashiding Monastery",   "date": "2026-07-14", "capacity": 100, "booked": 0},
    {"id": 7, "event_name": "Drupka Teshi",              "monastery": "Phodong Monastery",     "date": "2026-07-31", "capacity": 100, "booked": 0},
    {"id": 8, "event_name": "Lhabab Duchen",             "monastery": "Rumtek Monastery",      "date": "2025-11-15", "capacity": 100, "booked": 0},
]

SUBSCRIBERS = []
BOOKINGS    = []

# ---------------------------------------------------------------------------
# Page routes
# ---------------------------------------------------------------------------

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/virtual-tours")
def virtual_tours():
    return render_template("m360.html")

@app.route("/map")
def district_map():
    return render_template("map.html")

@app.route("/audio-guide")
def audio_guide():
    return render_template("audguide.html")

@app.route("/narration")
def narration():
    return render_template("audio.html")

@app.route("/stories")
def stories():
    return render_template("narrative.html")

@app.route("/archives")
def archives():
    return render_template("digarc.html")

@app.route("/calendar")
def calendar():
    return render_template("cultcal.html")

@app.route("/book-events")
def book_events():
    return render_template("evbook.html")

@app.route("/district/north-sikkim")
def north_sikkim():
    return render_template("north-sikkim.html")

@app.route("/district/south-sikkim")
def south_sikkim():
    return render_template("south-sikkim.html")

@app.route("/district/east-sikkim")
def east_sikkim():
    return render_template("east-sikkim.html")

@app.route("/district/west-sikkim")
def west_sikkim():
    return render_template("west-sikkim.html")


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------

@app.route("/api/events", methods=["GET"])
def get_events():
    return jsonify(EVENTS)

@app.route("/api/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    event = next((e for e in EVENTS if e["id"] == event_id), None)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(event)

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.get_json(silent=True) or {}
    full_name  = data.get("fullName", "").strip()
    email      = data.get("email", "").strip()
    event_id   = data.get("eventId")
    num_seats  = data.get("numSeats", 1)

    errors = []
    if not full_name:
        errors.append("Full name is required.")
    if not email or "@" not in email:
        errors.append("A valid email is required.")
    if not isinstance(event_id, int):
        errors.append("A valid event must be selected.")
    if not isinstance(num_seats, int) or num_seats < 1:
        errors.append("Number of seats must be at least 1.")
    if errors:
        return jsonify({"success": False, "errors": errors}), 400

    event = next((e for e in EVENTS if e["id"] == event_id), None)
    if not event:
        return jsonify({"success": False, "errors": ["Event not found."]}), 404

    available = event["capacity"] - event["booked"]
    if num_seats > available:
        return jsonify({"success": False, "errors": [f"Only {available} seat(s) remaining for {event['event_name']}."]}), 409

    event["booked"] += num_seats
    booking = {
        "id":         len(BOOKINGS) + 1,
        "full_name":  full_name,
        "email":      email,
        "event_id":   event_id,
        "event_name": event["event_name"],
        "monastery":  event["monastery"],
        "num_seats":  num_seats,
        "booked_at":  datetime.utcnow().isoformat() + "Z",
    }
    BOOKINGS.append(booking)
    return jsonify({
        "success": True,
        "message": (f"Booking confirmed! {full_name}, you have reserved {num_seats} seat(s) "
                    f"for {event['event_name']} at {event['monastery']}. "
                    f"A confirmation will be sent to {email}."),
        "booking": booking,
    }), 201

@app.route("/api/bookings", methods=["GET"])
def list_bookings():
    return jsonify(BOOKINGS)

@app.route("/api/subscribe", methods=["POST"])
def subscribe():
    data  = request.get_json(silent=True) or {}
    email = data.get("email", "").strip()
    if not email or "@" not in email:
        return jsonify({"success": False, "error": "Please enter a valid email address."}), 400
    if any(s["email"] == email for s in SUBSCRIBERS):
        return jsonify({"success": True, "message": "You are already subscribed!"}), 200
    SUBSCRIBERS.append({"email": email, "subscribed_at": datetime.utcnow().isoformat() + "Z"})
    return jsonify({"success": True, "message": f"Thank you! {email} has been subscribed to Monastery360 updates."}), 201

@app.route("/api/geojson")
def geojson():
    geojson_path = os.path.join(app.root_path, "static", "sikkim.geojson")
    with open(geojson_path) as f:
        return app.response_class(f.read(), mimetype="application/json")

if __name__ == "__main__":
    app.run(debug=True, port=5000)
