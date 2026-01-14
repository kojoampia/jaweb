#!/bin/bash

args=$#

if [ $args -le 0 ];then
    echo "version number required eg. 0.0.5"
    exit 1
fi

commitMessage="version: $1 - deploy"

if [ $args -gt 1 ];then
    commitMessage="version: $1 - $2"
    echo "working on $commitMessage..."    
fi

#echo "Synchronising with master on bitbucket"
#git commit -am "$commitMessage"
#git pull -r
#git push

# Set the version for the build and deploy
export version=$1

#git tag "v$version"

echo "Building and Deploying to JojoAddison Web version $version"

name=jaweb
folder=`pwd`

if [[ "$folder" != *"$name"* ]]; then
  folder=$folder/$name
fi

echo "$folder"
cd $folder

echo "building..."
./mvnw -Pprod clean verify jib:dockerBuild -DskipTests > build.log 
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
docker tag jaweb docker.jojoaddison.net/jaweb:$version
docker tag jaweb docker.jojoaddison.net/jaweb
docker image ls | grep 'jaweb'
echo "done."

echo "pushing..."
docker push docker.jojoaddison.net/jaweb:latest
docker push docker.jojoaddison.net/jaweb:$version
echo "done."
echo "build and deploy completed."