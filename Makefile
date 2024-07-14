projectName = college-explorer-web
port= 3000

docker-build:
	docker build -t ${projectName} .

docker-run:
	docker run -d --name ${projectName} -p ${port}:${port} ${projectName}

docker-stop:
	docker stop ${projectName}