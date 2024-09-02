FROM python:3.12-slim

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

CMD ["gunicorn", "--workers=2", "--bind=0.0.0.0:5000", "app:app"]
