#!/bin/bash

# Hide cursor
echo -e '\033[?17;0;0c' > /dev/tty1
# Erase screen
echo -e '\033[2J' > /dev/tty1
# Turn off sleep mode for screen
echo -e '\033[9;0]' > /dev/tty1

while true
do
  node /usr/src/app/index.js
done
