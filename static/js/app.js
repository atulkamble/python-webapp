// Task management functionality
let tasks = [];

// DOM elements
const taskForm = document.getElementById('taskForm');
const taskTitle = document.getElementById('taskTitle');
const taskDescription = document.getElementById('taskDescription');
const tasksContainer = document.getElementById('tasksContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Add form submit handler
    if (taskForm) {
        taskForm.addEventListener('submit', handleAddTask);
    }
    
    // Load tasks from server
    loadTasks();
});

// Handle adding new task
async function handleAddTask(e) {
    e.preventDefault();
    
    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    
    if (!title) {
        alert('Please enter a task title');
        return;
    }
    
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
        
        if (response.ok) {
            const newTask = await response.json();
            tasks.push(newTask);
            renderTasks();
            
            // Reset form
            taskForm.reset();
            
            // Show success message
            showNotification('Task added successfully!', 'success');
        } else {
            throw new Error('Failed to add task');
        }
    } catch (error) {
        console.error('Error adding task:', error);
        showNotification('Error adding task. Please try again.', 'error');
    }
}

// Load tasks from server
async function loadTasks() {
    try {
        const response = await fetch('/api/tasks');
        if (response.ok) {
            tasks = await response.json();
            renderTasks();
        } else {
            throw new Error('Failed to load tasks');
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
        showNotification('Error loading tasks.', 'error');
    }
}

// Render tasks in the UI
function renderTasks() {
    if (!tasksContainer) return;
    
    tasksContainer.innerHTML = '';
    
    if (tasks.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-clipboard-list"></i>
                <h3>No tasks yet</h3>
                <p>Add your first task using the form above!</p>
            </div>
        `;
        return;
    }
    
    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        tasksContainer.appendChild(taskCard);
    });
}

// Create task card element
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.className = `task-card ${task.completed ? 'completed' : ''}`;
    taskCard.setAttribute('data-task-id', task.id);
    
    taskCard.innerHTML = `
        <div class="task-header">
            <h4>${escapeHtml(task.title)}</h4>
            <div class="task-actions">
                <button class="btn-icon toggle-btn" onclick="toggleTask(${task.id})" title="Toggle completion">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-icon delete-btn" onclick="deleteTask(${task.id})" title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
        <p class="task-description">${escapeHtml(task.description)}</p>
        <div class="task-status">
            <span class="status-badge ${task.completed ? 'status-completed' : 'status-pending'}">
                ${task.completed ? 'Completed' : 'Pending'}
            </span>
        </div>
    `;
    
    return taskCard;
}

// Toggle task completion status
async function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...task,
                completed: !task.completed
            })
        });
        
        if (response.ok) {
            const updatedTask = await response.json();
            const taskIndex = tasks.findIndex(t => t.id === taskId);
            tasks[taskIndex] = updatedTask;
            renderTasks();
            
            const status = updatedTask.completed ? 'completed' : 'marked as pending';
            showNotification(`Task ${status}!`, 'success');
        } else {
            throw new Error('Failed to update task');
        }
    } catch (error) {
        console.error('Error updating task:', error);
        showNotification('Error updating task. Please try again.', 'error');
    }
}

// Delete a task
async function deleteTask(taskId) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/tasks/${taskId}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            tasks = tasks.filter(t => t.id !== taskId);
            renderTasks();
            showNotification('Task deleted successfully!', 'success');
        } else {
            throw new Error('Failed to delete task');
        }
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Error deleting task. Please try again.', 'error');
    }
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${escapeHtml(message)}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 8px;
        padding: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 1000;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 0.25rem;
                margin-left: auto;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            .notification-close:hover {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add CSS for empty state
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#empty-state-styles')) {
        const style = document.createElement('style');
        style.id = 'empty-state-styles';
        style.textContent = `
            .empty-state {
                text-align: center;
                padding: 3rem;
                color: #666;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border-radius: 15px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            }
            .empty-state i {
                font-size: 4rem;
                color: #667eea;
                margin-bottom: 1rem;
            }
            .empty-state h3 {
                margin-bottom: 0.5rem;
                font-size: 1.5rem;
            }
        `;
        document.head.appendChild(style);
    }
});