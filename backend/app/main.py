import datetime
from uuid import uuid4

from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import desc, Column, DateTime, String, Float, Integer


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
    isPanicking = Column('isPanicking', Integer)
    timestamp = Column('timestamp', DateTime, default=datetime.datetime.utcnow)


class Routes(Base):
    __tablename__ = 'routes'
    uuid = Column('uuid', Integer, primary_key=True)
    latitude = Column('latitude', Float)
    longitude = Column('longitude', Float)


db_engine = db.get_engine()
Base.metadata.create_all(db_engine)


@app.route('/', methods=['GET'])
def index():
    return "I'm working!"


@app.route('/route/status', methods=['POST'])
def status_post():
    dbsession = db.session()

    payload = request.get_json()
    latitude = payload.get('latitude')
    longitude = payload.get('longitude')
    isPanicking = payload.get('isPanicking')
    uuid = uuid4()

    new_status = RouteStatus(uuid=str(uuid), latitude=latitude, longitude=longitude, isPanicking=isPanicking)
    dbsession.add(new_status)
    dbsession.commit()

    return make_response(), 201


@app.route('/route/status', methods=['GET'])
def status_get():
    dbsession = db.session()

    status = dbsession.query(RouteStatus).order_by(desc(RouteStatus.timestamp)).first()
    response = {
        "latitude": status.latitude,
        "longitude": status.longitude,
        "isPanicking": status.isPanicking,
        "timestamp": status.timestamp
    }

    # Logic to get most recent status here
    return make_response(jsonify(response)), 200


@app.route('/routes', methods=['POST'])
def create_routes():
    """
    Sample body:
    {
        "waypoints": [
            {"lat": -1.4,  "lon":  80.0},
            {"lat": -1.4,  "lon":  80.1}
        ]
    }
    """
    dbsession = db.session()
    waypoints = request.get_json().get("waypoints")
    for i, waypoint in enumerate(waypoints):
        new_route = Routes(
            uuid=i,
            latitude=waypoint.get('lat'),
            longitude=waypoint.get('lng')
        )
        dbsession.add(new_route)

    dbsession.commit()

    return make_response(), 201


# Test util
@app.route('/routes', methods=['GET'])
def get_routes():
    dbsession = db.session()

    for waypoint in dbsession.query(Routes):
        print(waypoint.latitude, waypoint.longitude)

    return make_response(), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
