import serial
import sys

reload(sys)  
ser = serial.Serial('/dev/ttyACM0')

while True:
    f = open('./door-sensor.txt', 'w')
    f.write(ser.readline())