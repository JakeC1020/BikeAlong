import datetime
from math import sin, cos, sqrt, atan2, radians
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
    isOffPath = Column('isOffPath', Integer)
    timestamp = Column('timestamp', DateTime, default=datetime.datetime.utcnow)


class Routes(Base):
    __tablename__ = 'routes'
    uuid = Column('uuid', Integer, primary_key=True)
    latitude = Column('latitude', Float)
    longitude = Column('longitude', Float)

class GoogleRoutes(Base):
    __tablename__ = 'google_routes'
    uuid = Column('uuid', String(32), primary_key=True)
    data = Column('data', String())

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

    new_status = RouteStatus(uuid=str(uuid), latitude=latitude, longitude=longitude,
                             isPanicking=isPanicking, isOffPath=is_off_path(latitude, longitude))
    dbsession.add(new_status)
    dbsession.commit()

    return make_response(), 201


@app.route('/route/status', methods=['GET'])
def status_get():
    dbsession = db.session()

    status = dbsession.query(RouteStatus).order_by(desc(RouteStatus.timestamp)).first()
    if not status:
        response = {
            "error": "POST a route first!"
        }
        return make_response(jsonify(response)), 400

    response = {
        "latitude": status.latitude,
        "longitude": status.longitude,
        "isPanicking": status.isPanicking,
        "isOffPath": status.isOffPath,
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
            {"lat": -1.4,  "lng":  80.0},
            {"lat": -1.4,  "lng":  80.1}
        ]
    }
    """
    dbsession = db.session()
    dbsession.query(Routes).delete()
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

@app.route('/routes', methods=['GET'])
def get_routes():
    dbsession = db.session()

    return_waypoints = {'waypoints': []}
    for waypoint in dbsession.query(Routes):
        print(waypoint.latitude, waypoint.longitude)
        return_waypoints['waypoints'].append({'lat': waypoint.latitude, 'lon': waypoint.longitude})

    return make_response(jsonify(return_waypoints)), 200


@app.route('/googleroute', methods=['POST'])
def create_google_route():
    dbsession = db.session()
    dbsession.query(GoogleRoutes).delete()

    data = request.get_json().get("data")
    new_google_route = GoogleRoutes(uuid=1, data=data)
    dbsession.add(new_google_route)

    dbsession.commit()

    return make_response(), 201

@app.route('/googleroute', methods=['GET'])
def get_google_route():
    dbsession = db.session()

    route = dbsession.query(GoogleRoutes).filter(GoogleRoutes.uuid == 1).first()
    return_object = {"data": route.data}

    return make_response(jsonify(return_object)), 200

# Source: https://stackoverflow.com/questions/19412462/getting-distance-between-two-points-based-on-latitude-longitude # noqa
def is_off_path(latitude, longitude):
    dbsession = db.session()
    EARTH_RADIUS = 6373  # kilometers
    threshold = 1  # kilometers

    waypoints = dbsession.query(Routes)
    for waypoint in dbsession.query(Routes):
        delta_lat = waypoint.latitude - latitude
        delta_lng = waypoint.longitude - longitude
        a = sin(delta_lat / 2)**2 + cos(waypoint.latitude) * cos(latitude) * sin(delta_lng / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))
        distance = EARTH_RADIUS * c
        print(distance)

        if distance < threshold:
            return False

    return True


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
