#/bin/bash
name=$1
if [ -z "$name" ]
then
    name=internship-app
fi
echo "STOP RUNNING CONTAINER"
docker stop -t 30 ${name}
docker rm -f ${name}
echo "DONE STOPPING"
echo "STARTING RUNNING CONTAINER"
docker run --name ${name} -d \
    --network common-net \
    -p 3000:3000 \
    --restart always \
    internship-app:latest