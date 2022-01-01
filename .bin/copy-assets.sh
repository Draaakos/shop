#!/bin/bash

if [[ -d public ]]
then
    echo "removing public directory"
    rm -rf public
fi

mkdir -p public/images
mkdir -p public/css
mkdir -p public/fonts

cp -rvf assets/images/* public/images/
cp -rvf assets/css/*.css public/css/
cp -rvf assets/fonts/* public/fonts/
