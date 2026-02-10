#!/bin/bash


# Get project version from pom.xml
JAWEB=$(./mvnw help:evaluate -Dexpression=project.build.finalName -q -DforceStdout)
VERSION=$(./mvnw help:evaluate -Dexpression=project.version -q -DforceStdout)


echo "Building and Deploying to JojoAddison Web Image $JAWEB:$VERSION"

echo "building..."
./mvnw -Pprod clean verify jib:dockerBuild -Dimage=$JAWEB:$VERSION -DskipTests > build.log 
echo "Checking for errors..."
error=$(cat build.log | grep 'ERROR')
if [ ! -n "$error" ]; then
echo "No errors found. Checking for failures."
error=$(cat build.log | grep 'FAILURE')
fi

if [  -n "$error" ]; then
echo "$error"
echo "build and deploy failed. See build.log"
exit 1
fi 
echo "done."

echo "tagging..."
docker tag $JAWEB:$VERSION docker.jojoaddison.net/$JAWEB:$VERSION
docker tag $JAWEB:$VERSION docker.jojoaddison.net/$JAWEB:latest
docker image ls | grep $JAWEB
echo "done."

echo "pushing..."
docker push docker.jojoaddison.net/$JAWEB:latest
docker push docker.jojoaddison.net/$JAWEB:$VERSION
echo "done."
echo "build and deploy completed."