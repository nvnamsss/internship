version=0.0.9
echo "Tagging and pushing to registry with version $version"

docker tag internship-app registry.digitalocean.com/internship/internship-app:$version
docker push registry.digitalocean.com/internship/internship-app:$version