 2382  
 2383  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
 
 2395  
 2396  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
 2397  sudo docker logs node-docker_node-app_1 -f
 2399  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
 2402  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
 2403  sudo docker logs node-docker_node-app_1 -f
 2404  
 2405  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
 2406  sudo docker logs node-docker_node-app_1 -f
 2408  sudo docker exec -it node-docker_mongo_1 mongosh -u "sanjeev" -p "mypassword"
 2409  sudo docker logs node-docker_node-app_1 -f
 2410  sudo docker exec -it node-docker_mongo_1 mongosh -u "sanjeev" -p "mypassword"
 2411  sudo docker logs node-docker_node-app_1 -f
 2412  sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml down
