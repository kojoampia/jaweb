#!/bin/bash

args=$#

if [ $args -le 0 ];then
    echo "version number required eg. 0.1.2"
    exit 1
fi

. ./.env

export JAWEB_VERSION=$1
echo ""
echo ""
echo "Jojo Addison Wep Application Deployment"
echo "Deploying version $JAWEB_VERSION"
echo "Deployed version $JAWEB_VERSION" > current.version
echo "JEDI PASSW: $JEDI_PASSW"
echo ""
echo "................................"
echo ""

docker-compose down
docker-compose up -d
docker-compose logs -f
