#!/bin/bash

ssh-keygen -t rsa -b 4096 -m PEM -f jwtRSA.key -N ''
openssl rsa -in jwtRSA.key -pubout -outform PEM -out jwtRSA.pub

rm -rf jwtRSA.key.pub
cp .env.example .env