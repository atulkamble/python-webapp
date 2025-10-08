#!/bin/bash

# Set environment variables for production
export FLASK_ENV=production
export PORT=${PORT:-8080}

# Install dependencies
pip install -r requirements.txt

# Run with gunicorn for production
gunicorn --bind 0.0.0.0:$PORT --workers 4 app:app