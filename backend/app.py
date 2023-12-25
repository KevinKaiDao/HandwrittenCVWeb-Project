from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
from tensorflow import keras
from keras.models import load_model
import base64

import imageio
import matplotlib.pyplot as plt


model = load_model('models\mnist.h5')  

app = Flask(__name__)
CORS(app)

@app.route('/recognize', methods=['POST'])
def recognize_number():
    data = request.get_json()
    url = data.get('image_data')
    
    # Now we must convert the data URL to NumPy array...
    encoded_data = url.split(',')[1]
    binary = base64.b64decode(encoded_data)
    nparr = np.asarray(bytearray(binary), dtype=np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
    img = np.invert(img)
    # Resize the image to 28x28 (Tensorflow model)
    img = cv2.resize(img, (28, 28))

    # Process image
    img = img.reshape(1, 28, 28, 1)
    img = img.astype('float32') / 255.0

    # Make prediction
    prediction = model.predict(img)
    prediction_digit = np.argmax(prediction)
    confidence_level = float(np.max(prediction)) * 100


    return jsonify({
        'predicted_digit': int(prediction_digit),
        'confidence_level': round(confidence_level, 2)
    })