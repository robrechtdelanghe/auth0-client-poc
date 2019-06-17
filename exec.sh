#!/usr/bin/env bash
docker build -t auth0-poc .
docker run -p 3000:3000 -it auth0-poc
