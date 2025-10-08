from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key')

tasks = [
    {"id": 1, "title": "Learn Python", "completed": False},
    {"id": 2, "title": "Build Web App", "completed": False},
    {"id": 3, "title": "Add UI", "completed": True}
]

@app.route('/')
def index():
    return render_template('index.html', tasks=tasks)

@app.route('/api/tasks', methods=['GET', 'POST'])
def handle_tasks():
    if request.method == 'GET':
        return jsonify(tasks)
    
    data = request.json
    new_task = {"id": len(tasks) + 1, "title": data.get('title', ''), "completed": False}
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT', 'DELETE'])
def handle_task(task_id):
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    
    if request.method == 'DELETE':
        tasks = [t for t in tasks if t['id'] != task_id]
        return jsonify({'message': 'Deleted'}), 200
    
    if not task:
        return jsonify({'error': 'Not found'}), 404
    
    data = request.json
    task.update({k: v for k, v in data.items() if k in task})
    return jsonify(task)

if __name__ == '__main__':
    app.run(debug=os.environ.get('FLASK_ENV') == 'development', 
            host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))