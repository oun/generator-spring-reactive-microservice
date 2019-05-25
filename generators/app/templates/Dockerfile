FROM adoptopenjdk/openjdk11:latest

VOLUME /tmp

EXPOSE 8080

ARG JAR_FILE=<%= appname %>-<%= version %>.jar

ADD build/libs/${JAR_FILE} app.jar

ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app.jar"]