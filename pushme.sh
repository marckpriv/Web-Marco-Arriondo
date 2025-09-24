#!/bin/bash
git add .
git commit -m "${1:-Actualización rápida}"
git pull origin main --rebase
git push origin main
