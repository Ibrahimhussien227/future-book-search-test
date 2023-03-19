## Installation Docker

- Clone it `git@github.com:Ibrahimhussien227/future-book-search-test.git`
- Copy .env-prod to .env file.
- Change path tho this project root from the terminal `cd /path/to/future`
- Build new docker image `docker build . -t future`
- Start new container `docker run -p 3000:3000 -d news-react .`

At this point, you should see the application.

## Installation Manual

- Clone it `https://github.com/Ibrahimhussien227/future-book-search-test.git`
- Copy .env.example to .env file.
- Change path tho this project root from the terminal `cd /path/to/future`
- Run command `npm install`
- Run command `npm run build`
- Run command `npm run dev`

At this point, you should see the application.
