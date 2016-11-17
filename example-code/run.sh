#!/bin/sh

cd ..; python ./serial.py >./python-output.log 2>&1 &
cd ..; node ./monitor.js >./node-output.log 2>&1 &
