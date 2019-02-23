FROM tiangolo/uwsgi-nginx-flask:python3.6

ENV LISTEN_PORT 8080
ENV UWSGI_INI /app/uwsgi.ini

COPY ./app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080 443
