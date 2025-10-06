from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__)

# Sample data for demonstration
tasks = [
    {"id": 1, "title": "Learn Python", "description": "Complete Python tutorial", "completed": False},
    {"id": 2, "title": "Build Web App", "description": "Create a Flask application", "completed": False},
    {"id": 3, "title": "Add UI", "description": "Design user interface", "completed": True}
]

@app.route('/')
def index():
    """Main page showing all tasks"""
    return render_template('index.html', tasks=tasks)

@app.route('/about')
def about():
    """About page"""
    return render_template('about.html')

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """API endpoint to get all tasks"""
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def add_task():
    """API endpoint to add a new task"""
    data = request.json
    new_task = {
        "id": len(tasks) + 1,
        "title": data.get('title', ''),
        "description": data.get('description', ''),
        "completed": False
    }
    tasks.append(new_task)
    return jsonify(new_task), 201

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """API endpoint to update a task"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.json
    task['title'] = data.get('title', task['title'])
    task['description'] = data.get('description', task['description'])
    task['completed'] = data.get('completed', task['completed'])
    
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """API endpoint to delete a task"""
    global tasks
    tasks = [t for t in tasks if t['id'] != task_id]
    return jsonify({'message': 'Task deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)