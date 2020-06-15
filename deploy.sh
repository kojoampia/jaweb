#!/bin/bash

#@Author: Kojo Ampia-Addison
#@Email: kojo.ampia@jojoaddison.net
#@Description: Bash Deployment Script

WWW_TARGET="./target/www";
GEND_TARGET="./target/jojoaddison.war";
DIST_TARGET="./dist/jojoaddison.jar";
WWW_DIST="./dist/www";

# Clean Build
build(){
mvn -Pprod clean package -DskipTests
rm -f dist/*.jar
cp target/*.war dist/web.jar
rm -f dist/*.tar.gz
cd target/www
tar -czf ../../dist/web.tar.gz .
cd ../../
}

# Deploy to test
totest(){
echo "building package..."
./mvnw -Pdev clean verify package -DskipTests

if [ ! -d "dist" ]; then
mkdir dist;
fi

if [ -d "dist" ]; then
echo "cleaning dist..."
rm -fr dist/*
fi

if [ -f "$GEND_TARGET" ]; then
echo "moving $GEND_TARGET to dist...";
cp $GEND_TARGET $DIST_TARGET;
fi

if [ -d "$WWW_TARGET" ]; then
echo "moving $WWW_TARGET to dist...";
cp -r $WWW_TARGET ./dist/.
fi

echo "compressing..."
cd $WWW_DIST
touch ../jojoaddison.tar.gz
tar -czf ../jojoaddison.tar.gz .
cd ../

echo "remote copying..."
scp jojoaddison* root@host.gahano.at:/var/www/vhosts/jojoaddison.net/dev/.
}

# Deploy to prod

toprod(){
scp dist/web* root@host.gahano.at:/var/www/vhosts/jojoaddison.net/.
}


case "$1" in
 build)
	build
   ;;
 totest)
	totest
   ;;
 toprod)
	toprod
   ;;
 buildtest)
	totest
	;;
 buildprod)
	build
	toprod
	;;
 buildall)
	build
	totest
	toprod
	;;
 *)
   echo "Usage: deploy {biuld|buildall|buildtest|buildprod|totest|toprod}" >&2
   exit 3
   ;;
esac
