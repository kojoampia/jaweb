#!/bin/sh

echo "The application will start in ${JHIPSTER_SLEEP}s..." && sleep ${JHIPSTER_SLEEP}
exec java -javaagent:/app/opentelemetry-javaagent.jar ${JAVA_OPTS} -Djava.security.egd=file:/dev/./urandom -cp /app/resources/:/app/classes/:/app/libs/* "io.jojoaddison.JojoaddisonApp"  "$@" --content_directory=/app/resources/static/content
