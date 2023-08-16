from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/python-sellado', methods=['GET'])
def python_sellado():
    data = {
        'message': 'Response from Python app sellado route'
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
