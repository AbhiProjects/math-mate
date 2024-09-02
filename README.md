# MathMate

MathMate is a revolutionary AI-powered math tutor designed to make learning math engaging and enjoyable for young students. MathMate is here to transform the way children approach math, turning complex problems into fun, interactive challenges. It uses a chat-based interface to present math problems, encouraging students to think critically and solve problems step-by-step.

One will have to provide the Open API Key in environment variable `OPEN_API_KEY` to use the Bot Application

* Python Version: `3.12`

* AI Model: [gpt-4o-mini](https://platform.openai.com/docs/models/gpt-4o-mini)

* Install Requirements: `pip install -r requirements.txt`

* Run Application: `gunicorn --workers=2 --bind=127.0.0.1:5000 app:app`

* Chat Home Page: `http://127.0.0.1:5000`

* Build Docker Image: `docker build --platform linux/amd64 -t mathmateai/math-mate:latest -f Dockerfile .`

* Run Docker Image: `docker run -e OPEN_API_KEY='' -p 5000:5000 --name math-mate -d math-mate`

* Docker Compose: `docker compose --project-name math-mate -f docker-compose.yml up --force-recreate --build -d`

## Demo

![](./demo/demo.gif)