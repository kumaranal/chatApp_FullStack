to ru the file in docker


docker build -t chatapp-image .    
docker run --rm -p 8000:8000 -v $(pwd):/app  --name conti chatapp-image