#!/usr/bin/expect -f

spawn meteor login
expect "Username:\r"
send $METEOR_USER
expect "Password:\r"
send $METEOR_PASS

cd src

meteor deploy wildspot.meteor.com