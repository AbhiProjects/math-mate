# MathMate

## 1. Solution Description

**MathMate** is an AI-powered math tutor designed to make learning math engaging and enjoyable for young students. The application transforms complex math problems into fun, interactive challenges using a chat-based interface. It encourages students to think critically and solve problems step-by-step.

### Purpose
MathMate helps students practice math by generating basic math problems, providing solutions, and offering explanations in an easy-to-understand format.

### Functionalities
- **Generate Math Problems:** Creates basic math problems with answers and explanations.
- **API Integration:** Allows for easy integration and use of the math problem generator through a web API.

## 2. API User Guide

### Base URL
```
http://127.0.0.1:5000
```

### Endpoints

#### 1. **GET /**

**Description:** 
Renders the main page of the MathMate application.

**Request Example:**
```
GET / HTTP/1.1
Host: 127.0.0.1:5000
```

**Response Example:**
- Status: 200 OK
- Content-Type: text/html

**Response Body:**
The HTML content of the main page.

#### 2. **GET /generate**

**Description:**
Generates a math problem along with the solution and explanation using the AI model.

**Request Example:**
```
GET /generate HTTP/1.1
Host: 127.0.0.1:5000
```

**Response Example:**
- Status: 200 OK
- Content-Type: application/json

**Response Body:**
```json
{
  "question": "What is 7 + 5?",
  "answer": "12",
  "explanation": "To solve 7 + 5, add the two numbers together to get 12."
}
```

**Error Response:**
- **405 Method Not Allowed** for unsupported HTTP methods
  ```json
  {
    "error": "Method Not Allowed"
  }
  ```

## 3. Input/Output Details

### Input Data
- **GET /** and **GET /generate** do not require any input data.

### Output Data

#### GET /
- **Output:** HTML content of the main page.

#### GET /generate
- **Output:** JSON object containing a math problem, its answer, and an explanation.

### Example Output
```json
{
  "question": "What is 9 - 4?",
  "answer": "5",
  "explanation": "To solve 9 - 4, subtract 4 from 9 to get 5."
}
```

## 4. Setup Instructions

### Dependencies
- **Python Version:** 3.12
- **Required Python Packages:** Listed in `requirements.txt`

### Steps to Set Up Locally

1. **Install Dependencies:**
   ```sh
   pip install -r requirements.txt
   ```

2. **Set Environment Variable:**
   Ensure the `OPEN_API_KEY` environment variable is set with your OpenAI API key.
   ```sh
   export OPEN_API_KEY='your_open_api_key_here'
   ```

3. **Run Application:**
   ```sh
   gunicorn --workers=2 --bind=127.0.0.1:5000 app:app
   ```

4. **Access Application:**
   Open your browser and navigate to `http://127.0.0.1:5000` to view the application.

### Docker Instructions

1. **Build Docker Image:**
   ```sh
   docker build --platform linux/amd64 -t mathmateai/math-mate:latest -f Dockerfile .
   ```

2. **Run Docker Container:**
   ```sh
   docker run -e OPEN_API_KEY='your_open_api_key_here' -p 5000:5000 --name math-mate -d math-mate
   ```

3. **Docker Compose:**
   ```sh
   docker compose --project-name math-mate -f docker-compose.yml up --force-recreate --build -d
   ```