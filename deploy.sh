#!/bin/bash

#@Author: Kojo Ampia-Addison
#@Email: kojo.ampia@jojoaddison.net
#@Description: Bash Deployment Script
JAHOME="$(pwd)";
WWW_TARGET="$JAHOME/target/www";
GEND_TARGET="$JAHOME/target/jojoaddison.war";
DIST_TARGET="$JAHOME/dist/jojoaddison.jar";
WWW_DIST="$JAHOME/dist/www";

# Clean Build
build(){
mvn -Pprod clean package -DskipTests
rm -f $JAHOME/dist/*.jar
cp $JAHOME/target/*.war $JAHOME/dist/web.jar
rm -f $JAHOME/dist/*.tar.gz
cd $JAHOME/target/www
tar -czf $JAHOME/dist/web.tar.gz .
cd $JAHOME
}

# Deploy to test
totest(){
cd $JAHOME	
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
echo "copying $GEND_TARGET to dist...";
cp $GEND_TARGET $DIST_TARGET;
fi

if [ -d "$WWW_TARGET" ]; then
echo "copying $WWW_TARGET to dist...";
cp -r $WWW_TARGET ./dist/.
fi

echo "compressing... to $WWW_DIST"
cd $WWW_DIST
touch $JAHOME/jojoaddison.tar.gz
tar -czf $JAHOME/jojoaddison.tar.gz .
echo "finished."
cd $JAHOME/

#echo "remote copying..."
#scp jojoaddison* root@ghost.gahano.at:/var/www/vhosts/jojoaddison.net/dev/.
echo "done."
}

# Deploy to prod

toprod(){
#scp $JAHOME/dist/web* root@ghost.gahano.at:/var/www/vhosts/jojoaddison.net/.
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
