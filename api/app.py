from flask import Flask, render_template, Response, jsonify, request
import gunicorn
from camera import *
import os
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


headings = ("Name", "Album", "Artist")
df1 = music_rec()
df1 = df1.head(15)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"})

    if file and allowed_file(file.filename):
        filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(filename)
        print(f"Image received and saved: {filename}")
        image = cv2.imread(filename)
        image = cv2.resize(image, (600, 500))
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        face_rects = face_cascade.detectMultiScale(gray, 1.3, 5)
        df1 = pd.read_csv(music_dist[show_text[0]])
        df1 = df1[["Name", "Album", "Artist"]]
        df1 = df1.head(15)
        for x, y, w, h in face_rects:
            cv2.rectangle(image, (x, y - 50), (x + w, y + h + 10), (0, 255, 0), 2)
            roi_gray_frame = gray[y : y + h, x : x + w]
            cropped_img = np.expand_dims(
                np.expand_dims(cv2.resize(roi_gray_frame, (48, 48)), -1), 0
            )
            prediction = emotion_model.predict(cropped_img)
            print(prediction)
            maxindex = int(np.argmax(prediction))
            show_text[0] = maxindex
            print(emotion_dict[maxindex])
            return jsonify({"result": emotion_dict[maxindex]})

    return jsonify({"error": "Invalid file format"})


@app.route("/")
def index():
    print(df1.to_json(orient="records"))
    return render_template("index.html", headings=headings, data=df1)


def gen(camera):
    while True:
        global df1
        frame, df1 = camera.get_frame()
        yield (b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n\r\n")


@app.route("/video_feed")
def video_feed():
    return Response(
        gen(VideoCamera()), mimetype="multipart/x-mixed-replace; boundary=frame"
    )


@app.route("/t")
def gen_table():
    return df1.to_json(orient="records")


if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.debug = True
    app.run(port=5000, threaded=True)
