#!/bin/sh

set -e 

trap 'killall openddit' SIGINT SIGTERM

sleep 10

/ko-app/openddit migration -c /config/server.yaml run
/ko-app/openddit migration -c /config/server.yaml seed

/ko-app/openddit serve -c /config/server.yaml run &
wait $?
exit $!
