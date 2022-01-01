.PHONY: init db-recreate tests loadmock build-front deploy

version = latest

init: node_modules
	pip install -r requirements.txt
	cp shop/dev.txt shop/dev.py
	$(MAKE) db-recreate

node_modules:
	npm ci --no-optional

db-recreate:
	-rm ./db.sqlite3
	python manage.py makemigrations web
	python manage.py migrate
	python manage.py createsuperuser --username admin --email admin@mailinator.com

tests:
	python manage.py test api.tests

loadmock:
	python manage.py loaddata test-purchase-order.json

build-front:
	export NODE_ENV=production; \
	sh ./.bin/copy-assets.sh && \
	./node_modules/.bin/stylus --compress ./assets/css/*-page.styl --out ./public/css/. && \
	./node_modules/.bin/webpack --progress --colors --env.mode=production

deploy:
	docker build -t "aether7/shop:v$(version)" .
	docker push "aether7/shop:v$(version)"
	git tag $(version)
	git push --tags
