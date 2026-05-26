from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()

    text = data.get("text")
    dest = data.get("dest")

    try:
        translated = GoogleTranslator(
            source="auto",
            target=dest
        ).translate(text)

        return jsonify({
            "translated_text": translated
        })

    except Exception as e:
        return jsonify({
            "translated_text": f"Error: {str(e)}"
        })


if __name__ == "__main__":
    app.run(debug=True)