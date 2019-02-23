import datetime
from uuid import uuid4

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, DateTime, String, Float


class DevConfig(object):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite://"


# Flask app config
app = Flask(__name__)
app.config.from_object(DevConfig)
db = SQLAlchemy(app)

# Initialize DB with what's defined by object mappings
Base = declarative_base()


class RouteStatus(Base):
    __tablename__ = 'route_status'
    uuid = Column('uuid', String(36), primary_key=True)
    latitude = Column('latitude', Float)
    longitude = Column('longitude', Float)


db_engine = db.get_engine()
Base.metadata.create_all(db_engine)


@app.route('/route/status', methods=['POST'])
def status_post():
    dbsession = db.session()

    payload = request.get_json()
    latitude = payload.get('latitude')
    longitude = payload.get('longitude')
    uuid = uuid4()

    new_status = RouteStatus(uuid=str(uuid), latitude=latitude, longitude=longitude)
    dbsession.add(new_status)
    dbsession.commit()

    return make_response(), 200


@app.route('/route/status', methods=['GET'])
def status_get():
    dbsession = db.session()

    status = dbsession.query(RouteStatus).first()
    response = {
        "latitude": status.latitude,
        "longitude": status.longitude
    }

    # Logic to get most recent status here
    return make_response(jsonify(response)), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
