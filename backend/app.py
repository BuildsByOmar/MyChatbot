from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from chatbot import get_response

app = Flask(__name__)
CORS(app)  # Permet les requêtes cross-origin depuis le frontend

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "Message vide"}), 400
    
    bot_response = get_response(user_message)
    
    return jsonify({
        "message": bot_response,
        "timestamp": import_time_nowTimestamp()
    })

def import_time_nowTimestamp():
    from datetime import datetime
    return datetime.now().isoformat()

if __name__ == '__main__':
    app.run(debug=True, port=5000)