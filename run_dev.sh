#!/bin/bash

# Set environment variables for development
export FLASK_ENV=development
export PORT=5000

# Install dependencies if not already installed
pip install -r requirements.txt

# Run the application
python app.py