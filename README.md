# Python Web App - Task Manager

A modern, responsive web application built with Python Flask and featuring a clean, intuitive user interface for task management.

## Features

- ✨ **Modern UI**: Clean, responsive design with glassmorphism effects
- 📱 **Mobile-Friendly**: Works seamlessly across all devices
- 🎯 **Task Management**: Create, update, complete, and delete tasks
- 🚀 **RESTful API**: Complete API for task operations
- 🎨 **Beautiful Design**: Modern CSS with Font Awesome icons
- 💫 **Interactive**: Real-time updates and smooth animations

## Technology Stack

- **Backend**: Python, Flask
- **Frontend**: HTML5, CSS3, JavaScript
- **Icons**: Font Awesome
- **Architecture**: MVC Pattern

## Project Structure

```
new-mit-project/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/            # HTML templates
│   ├── index.html        # Main page
│   └── about.html        # About page
└── static/              # Static assets
    ├── css/
    │   └── style.css     # Main stylesheet
    └── js/
        └── app.js        # JavaScript functionality
```

## Installation & Setup

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/atul/Downloads/new-mit-project
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**:
   ```bash
   python app.py
   ```

5. **Open your browser** and navigate to:
   ```
   http://localhost:5000
   ```

## API Endpoints

The application provides a RESTful API for task management:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Example API Usage

**Create a new task:**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New Task", "description": "Task description"}'
```

**Get all tasks:**
```bash
curl http://localhost:5000/api/tasks
```

## Features Overview

### Task Management
- Add new tasks with title and description
- Mark tasks as completed/pending
- Delete tasks with confirmation
- Real-time UI updates

### User Interface
- Modern glassmorphism design
- Responsive grid layout
- Interactive buttons with hover effects
- Toast notifications for user feedback
- Empty state handling

### Navigation
- Clean navigation bar
- About page with project information
- Responsive design for mobile devices

## Customization

### Adding New Features
1. **Backend**: Add new routes in `app.py`
2. **Frontend**: Update templates in `templates/`
3. **Styling**: Modify `static/css/style.css`
4. **JavaScript**: Enhance functionality in `static/js/app.js`

### Database Integration
Currently uses in-memory storage. To add database support:
1. Choose a database (SQLite, PostgreSQL, etc.)
2. Add database dependencies to `requirements.txt`
3. Update `app.py` with database models and connections

## Browser Support

- Chrome (recommended)
- Firefox
- Safari (with webkit prefixes for backdrop-filter)
- Edge

## Development

The application runs in debug mode by default, which provides:
- Automatic reloading on file changes
- Detailed error messages
- Debug toolbar (if installed)

## License

This project is open source and available under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ using Python Flask**