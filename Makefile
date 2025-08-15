dev:
    npm run dev

build:
    npm run build

preview:
    npm run preview

tailwind:
    npx tailwindcss -i ./src/style.css -o ./src/style.css --watch

clean:
    rm -rf dist

deploy: build
    # Example: copy dist to server (edit as needed)
    # scp -r dist/* user@yourserver:/var/www/html/
    echo "Deploy step: please customize for your hosting."