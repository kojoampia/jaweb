#!/bin/bash

#@Author: Kojo Ampia-Addison
#@Email: kojo.ampia@jojoaddison.net
#@Description: Bash Deployment Script

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
./mvnw -Pdev clean package -DskipTests
cp target/jojoaddison.war dist/jojoaddison.jar
cd target/www
tar -czf ../../dist/jojoaddison.tar.gz .
cd ../../
scp dist/jojoaddison* root@host.gahano.at:/var/www/vhosts/jojoaddison.net/dev.jojoaddison.net/.
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
