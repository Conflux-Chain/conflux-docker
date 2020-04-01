
# entry the docker
docker exec -it conflux-chain  /bin/sh

curl -X POST -H  "Content-Type: application/json" http://127.0.0.1:19629/ --data-binary '{"jsonrpc":"2.0","method":"generateoneblock","params":[1,3000000],"id":1}'



curl -X POST -H "Content-Type: application/json" http://127.0.0.1:12537/ --data-binary '{"jsonrpc":"2.0","method":"cfx_getBlockByHash","params":["0x0567614b10dd01915b073a82db409259e9edd66f8dc0c470ee43d4bee51e7e1f", false],"id":1}'

#{"jsonrpc":"2.0","result":null,"id":1}



curl -X POST -H  "Content-Type: application/json" http://127.0.0.1:12537/ --data-binary '{"jsonrpc":"2.0","method":"generateoneblock","params":[1,3000000],"id":1}'


#{"jsonrpc":"2.0","result":"0x68f3101436070086d61248b3783ff58808f8fb64c451151fe6a672e19e24dbac","id":1}
