#!/bin/bash

args=$#

if [ $args -le 0 ];then
    echo "version number required eg. 0.0.5"
    exit 1
fi
   

# Set the version for the build and deploy
export version=$1
echo "Building and Deploying to Jojo Addison Web Application version $version"

echo "building..."
./mvnw -Pprod clean verify jib:dockerBuild -DskipTests
echo "done."

echo "tagging..."
docker tag jaweb docker.jojoaddison.net/jaweb:latest
docker tag jaweb docker.jojoaddison.net/jaweb:$version
docker image ls | grep 'jaweb'
echo "done."

echo "pushing..."
docker push docker.jojoaddison.net/jaweb:latest
docker push docker.jojoaddison.net/jaweb:$version
echo "done."
echo "build and deploy completed."
