#!/bin/bash

# Wait for Kafka to be ready
echo "Waiting for Kafka to be ready..."
sleep 30

# Create ACLs for the client user
docker exec kafka1 kafka-acls --bootstrap-server kafka1:9094 --command-config /etc/kafka/client.properties \
    --add --allow-principal User:client --operation All --topic '*' --group '*'

# Create ACLs for the admin user
docker exec kafka1 kafka-acls --bootstrap-server kafka1:9094 --command-config /etc/kafka/client.properties \
    --add --allow-principal User:admin --operation All --topic '*' --group '*' --cluster

echo "ACLs set up successfully!" 