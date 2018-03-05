import face_recognition
import cv2
from os import walk

known_people_path = "/home/daniel/face_recognition/recognition/known_people/"
files = []
for (dirpath, dirnames, filenames) in walk(known_people_path):
    files.extend(filenames)
    break
print(files)

peoples_names = []
for names in files:
    peoples_names.append(names.split(".j")[0])
print(peoples_names)

# This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
# other example, but it includes some basic performance tweaks to make things run a lot faster:
#   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
#   2. Only detect faces in every other frame of video.

# PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
# OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
# specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.

# Get a reference to webcam #0 (the default one)
#video_capture = cv2.VideoCapture(0)

# Load a sample picture and learn how to recognize it.
images = []
for filename in files:
    images.append(face_recognition.load_image_file("/home/daniel/face_recognition/recognition/known_people/" + filename))
face_encodings_array = []
for image in images:
    face_encodings_array.append(face_recognition.face_encodings(image)[0])

def find():
    # Initialize some variables
    face_locations = []
    face_encodings = []
    face_names = []

    # This is a demo of running face recognition on live video from your webcam. It's a little more complicated than the
    # other example, but it includes some basic performance tweaks to make things run a lot faster:
    #   1. Process each video frame at 1/4 resolution (though still display it at full resolution)
    #   2. Only detect faces in every other frame of video.

    # PLEASE NOTE: This example requires OpenCV (the `cv2` library) to be installed only to read from your webcam.
    # OpenCV is *not* required to use the face_recognition library. It's only required if you want to run this
    # specific demo. If you have trouble installing it, try any of the other demos that don't require it instead.

    # Get a reference to webcam #0 (the default one)


    process_this_frame = True
    video_capture = cv2.VideoCapture(1)

    # Grab a single frame of video
    try:
        ret, frame = video_capture.read()
    except Exception as e:
        return e
    # Resize frame of video to 1/4 size for faster face recognition processing
    try:
        if not frame:
            video_capture.release
            #return False
    except ValueError:
        small_frame = frame
    try:
        cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
    except Exception as e:
        return e
    # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]
    # Only process every other frame of video to save time
    if process_this_frame:
        # Find all the faces and face encodings in the current frame of video
        face_locations = face_recognition.face_locations(rgb_small_frame)
        face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)
        face_names = []
        if len(face_locations) == 0:
            return "NoOne"
        for face_encoding in face_encodings:
            # See if the face is a match for the known face(s)
            name = "Unknown"
            i = 0
            for encoding in face_encodings_array:
                match = face_recognition.compare_faces([encoding], face_encoding, tolerance=0.5)
                if match[0]:
                    name = peoples_names[i]
                    return name
                    break
                else:
                    i += 1
            face_names.append(name)
    process_this_frame = not process_this_frame
    return name
