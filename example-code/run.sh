#!/bin/sh

python serial.py >./python-output.log 2>&1 &
node monitor.js >./node-output.log 2>&1 &
