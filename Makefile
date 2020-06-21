clean-up:
	docker-compose down
	docker system prune -f
	docker-compose up -d --build