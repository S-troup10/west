import json
import os
import sqlite3
import hashlib
from pathlib import Path
from flask import Flask, request, jsonify, g, abort, make_response

DB_PATH = os.environ.get("SITE_DB", "site-data.db")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "west123")
TOKEN_SECRET = os.environ.get("TOKEN_SECRET", "dev-secret")
TABLE_SQL = """
CREATE TABLE IF NOT EXISTS content (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    payload TEXT NOT NULL
);
"""
DEFAULT_CONTENT_PATH = Path("site-data.json")

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.execute(TABLE_SQL)
        g.db.commit()
    return g.db

def close_db(e=None):
    db = g.pop("db", None)
    if db is not None:
        db.close()


def load_default_payload():
    if DEFAULT_CONTENT_PATH.exists():
        try:
            return json.loads(DEFAULT_CONTENT_PATH.read_text())
        except Exception:
            pass
    return {}


def ensure_seed():
    db = get_db()
    cur = db.execute("SELECT payload FROM content WHERE id = 1")
    row = cur.fetchone()
    if row is None:
        payload = load_default_payload()
        db.execute("INSERT INTO content (id, payload) VALUES (1, ?)", (json.dumps(payload),))
        db.commit()


def make_token(password: str) -> str:
    return hashlib.sha256(f"{password}:{TOKEN_SECRET}".encode()).hexdigest()


def require_auth():
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.lower().startswith("bearer "):
        abort(make_response(jsonify({"error": "missing token"}), 401))
    token = auth_header.split(None, 1)[1].strip()
    if token != make_token(ADMIN_PASSWORD):
        abort(make_response(jsonify({"error": "invalid token"}), 401))


app = Flask(__name__)
app.teardown_appcontext(close_db)

@app.after_request
def add_cors(resp):
    resp.headers.setdefault("Access-Control-Allow-Origin", "*")
    resp.headers.setdefault("Access-Control-Allow-Headers", "Authorization, Content-Type")
    resp.headers.setdefault("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return resp

@app.route("/api/login", methods=["POST"])
def login():
    body = request.get_json(silent=True) or {}
    password = body.get("password", "")
    if password != ADMIN_PASSWORD:
        return jsonify({"error": "invalid credentials"}), 401
    return jsonify({"token": make_token(password)})

@app.route("/api/content", methods=["GET", "POST", "OPTIONS"])
def content():
    ensure_seed()
    if request.method == "GET":
        db = get_db()
        row = db.execute("SELECT payload FROM content WHERE id = 1").fetchone()
        payload = json.loads(row[0]) if row else {}
        return jsonify(payload)

    if request.method == "OPTIONS":
        return ("", 204)

    require_auth()
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({"error": "invalid json"}), 400
    db = get_db()
    db.execute("UPDATE content SET payload = ? WHERE id = 1", (json.dumps(body),))
    db.commit()
    return jsonify({"status": "ok"})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Serving on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port)
