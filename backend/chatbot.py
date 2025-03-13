import json
import re
import random
import os

# Charger les réponses depuis le fichier JSON
def load_responses():
    try:
        with open('responses.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Erreur lors du chargement des réponses: {e}")
        return {"fallback": ["Je ne suis pas sûr de comprendre. Pourriez-vous reformuler votre question ?"]}

responses_data = load_responses()

def get_response(message):
    message = message.lower()
    
    # Parcourir toutes les catégories de réponses
    for category, keywords in responses_data.items():
        if category == "fallback":
            continue
            
        # Vérifier si un des mots-clés est présent dans le message
        for keyword in keywords["keywords"]:
            if re.search(r'\b' + re.escape(keyword) + r'\b', message):
                # Retourner une réponse aléatoire de cette catégorie
                return random.choice(keywords["responses"])
    
    # Si aucun mot-clé n'est trouvé, utiliser la réponse par défaut
    return random.choice(responses_data["fallback"])