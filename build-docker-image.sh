#!/bin/bash

# Get project properties from pom.xml
FINAL_NAME=$(./mvnw help:evaluate -Dexpression=project.build.finalName -q -DforceStdout)
VERSION=$(./mvnw help:evaluate -Dexpression=project.version -q -DforceStdout)

# Build the docker image using finalName and version.
# This results in an image with a redundant tag like <finalName>:<version> (e.g., jojoaddison-3.0.0:3.0.0).
echo "Building docker image: $FINAL_NAME:$VERSION"
./mvnw -Pprod compile jib:dockerBuild -Dimage="$FINAL_NAME:$VERSION"