from flask import Flask, render_template, jsonify
import pandas as pd

app = Flask(__name__)

# Charger les données CSV
def charger_donnees():
    df = pd.read_csv("base_de_donnees.csv", sep=";")
    return df.to_dict(orient="records")

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/donnees")
def api_donnees():
    donnees = charger_donnees()
    return jsonify(donnees)

if __name__ == "__main__":
    app.run(debug=True)
