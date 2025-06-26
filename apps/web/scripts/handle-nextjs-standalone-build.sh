#!/bin/bash

mkdir -p .next/build-start-folder

APP_ROOT=".next/build-start-folder"

# Copy contents of standalone to (app/web{.env, .next, server.js}, node_modules, package.json)
cp -r .next/standalone/* $APP_ROOT

# Remove .env from .next/apps/web/.env
rm $APP_ROOT/apps/web/.env

# Copy static to /app/.next
mkdir -p $APP_ROOT/apps/web/.next
cp -r .next/static $APP_ROOT/apps/web/.next/.

# Copy public to /app
mkdir -p $APP_ROOT/apps/web
cp -r public $APP_ROOT/apps/web/.
