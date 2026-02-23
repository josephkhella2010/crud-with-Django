#!/usr/bin/env bash
gunicorn backend_crud.wsgi:application