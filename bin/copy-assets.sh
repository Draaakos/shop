#!/bin/bash

echo "removing static files"
rm -rf static
rm -rfv static
rm -rfv static/*

echo "creating hash code"
node bin/create-hash.js
HASH_FOLDER=$(cat bin/hash.txt)

mkdir -p static/$HASH_FOLDER
mkdir -p static/$HASH_FOLDER/css
mkdir -p static/$HASH_FOLDER/js
mkdir -p static/$HASH_FOLDER/js/vendor
mkdir -p static/$HASH_FOLDER/fonts
mkdir -p static/$HASH_FOLDER/images


cp -rvf assets/images/* static/$HASH_FOLDER/images/
cp -rvf assets/css/*.css static/$HASH_FOLDER/css/
cp -rvf assets/fonts/* static/$HASH_FOLDER/fonts/
