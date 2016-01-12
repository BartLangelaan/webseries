#!/usr/bin/env bash

printf '$METEOR_USER\n$METEOR_PASS\n' | meteor login
cd src
meteor deploy wildspot.meteor.com