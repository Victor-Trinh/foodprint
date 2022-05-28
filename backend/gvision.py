from google.cloud import vision
import io

class GVisionManager:
    def __init__(self):
        self.client = vision.ImageAnnotatorClient()

    def detect_text(self, path):
        """Detects text in the file."""
        with io.open(path, 'rb') as image_file:
            content = image_file.read()

        image = vision.Image(content=content)

        response = self.client.text_detection(image=image)
        texts = response.text_annotations

        if response.error.message:
            raise Exception(
                '{}\nFor more info on error messages, check: '
                'https://cloud.google.com/apis/design/errors'.format(
                    response.error.message))

        return texts

if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()
    filepath = "/Users/victor/Desktop/Screen Shot 2022-05-28 at 12.22.49 PM.png"
    g = GVisionManager()
    f = g.detect_text(filepath)
    import os
    print(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    print([f[i].description for i in range(len(f))])