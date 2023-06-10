from flask import Flask, jsonify, request
import tensorflow as tf
import numpy as np
from keras.layers import Dense
from keras.utils import load_img, img_to_array
import requests
from PIL import Image
import io

app = Flask(__name__)

def sigmoid_prediction(linear_predictions):
    sigmoid = Dense(
        1, activation="sigmoid", kernel_initializer="ones", bias_initializer="zeros"
    )
    X = np.array([[x[0][0] for x in linear_predictions]])
    return sigmoid(X)


def process_image(url, target_size=(224, 224)):
    response = requests.get(url)
    img = Image.open(io.BytesIO(response.content))
    img = img.resize(target_size)
    img = img_to_array(img) / 255
    img = np.expand_dims(img, 0)
    return img


def inference(model_paths, data_points):
    assert len(model_paths) == len(data_points), "Jumlah models dan data_points tidak sesuai"
    predictions = []
    for i, path in enumerate(model_paths):
        try:
            model = tf.keras.models.load_model(path)
            pred = model.predict(data_points[i])
            predictions.append(pred)
        except Exception as e:
            print("ERROR |", e)
    confidence = sigmoid_prediction(predictions)
    prediction = "Eligible" if confidence >= 0.5 else "Not Eligible"
    return prediction, confidence[0][0].numpy()


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    prestasi = data.get("prestasi")
    nilai_ujian = data.get("nilai_ujian")
    gaji_ortu = data.get("gaji_ortu")
    status_kip = data.get("status_kip")
    status_rumah = data.get("status_rumah")
    foto_rumah = data.get("foto_rumah")

    prediction, confidence = inference(
        ["./csv_model.h5", "./image_model.h5"],
        [
            np.array([[prestasi, nilai_ujian, gaji_ortu/1000000, status_kip, status_rumah]]),
            process_image(foto_rumah),
        ],
    )
    result = {
        "prediction": prediction,
        "confidence": round(confidence * 100, 2)
    }

    return jsonify(result)


if __name__ == '__main__':
    app.run()
