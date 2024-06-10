from flask import Flask, request, jsonify
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)

model_name = 'Helsinki-NLP/opus-mt-en-de'
tokenizer = MarianTokenizer.from_pretrained(model_name)
model = MarianMTModel.from_pretrained(model_name)

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data['text']
    translated = model.generate(**tokenizer(text, return_tensors="pt", padding=True))
    translation = tokenizer.batch_decode(translated, skip_special_tokens=True)[0]
    return jsonify({"translation": translation})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
