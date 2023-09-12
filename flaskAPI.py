# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from PIL import Image
import io
import shutil
import os
import base64
from yolov8 import CustomYOLOv8 

app = Flask(__name__, static_folder='react_front/build', static_url_path='' )
CORS(app)
model_weights_path = 'yolov8Model/best.pt'
custom_yolo = CustomYOLOv8(model_weights_path)

predicted_folder_path = 'STATIC/TEMP/'
#app.config['UPLOAD_FOLDER'] = 'STATIC/'
uploaded_folder_path = 'STATIC/UPLOADED/' # temp path to save images 

@app.route('/predict', methods=['POST','OPTIONS'])
@cross_origin()
def predict():

    try:
        # Get the uploaded image data
        filename = 'uploaded_img.jpg'
        image_data = request.files['image'] 
        img_path = uploaded_folder_path+filename
        image_data.save(img_path)
        predictions = custom_yolo.predict_image(img_path,filename)
        
        predicted_image_path = predicted_folder_path+filename
        # Read the image data
        with open(predicted_image_path, 'rb') as image_file:
            image_data = image_file.read()

        # Convert the image data to a base64-encoded string
        image_base64 = base64.b64encode(image_data).decode()
 
        # directory
        #os.remove('STATIC/PREDICTED')
        #shutil.rmtree('STATIC/PREDICTED')

        return jsonify({
            'predictions': predictions,
            'annotated_image_base64': image_base64
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html') 

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)



