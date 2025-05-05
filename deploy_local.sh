#!/bin/bash

ENV=${1:-local}

# Load configuration
if [ -f "$(dirname "$0")/.env" ]; then
    source "$(dirname "$0")/.env"
else
    echo "Error: .env file not found"
    exit 1
fi

echo "Deploying in local mode..."

# Create data directories
echo "KAFKA_ADVERTISED_HOST: $KAFKA_ADVERTISED_HOST"
echo "KAFKA_ADVERTISED_PORT_1: $KAFKA_ADVERTISED_PORT_1"
sleep 5

# Stop and clean up
docker-compose down
rm -rf ../kafka{1,2,3}/data
mkdir -p ../kafka{1,2,3}/data

# Start the cluster with explicit env file
docker-compose up -d

sleep 30
docker exec -it kafka1 kafka-topics \
    --create \
    --topic order-created \
    --bootstrap-server kafka1:9092 \
    --replication-factor 1 \
    --partitions 3


docker exec -it kafka1 kafka-topics \
    --create \
    --topic order-processed \
    --bootstrap-server kafka1:9092 \
    --replication-factor 1 \
    --partitions 3

docker exec -it kafka1 kafka-topics \
    --create \
    --topic order-failed \
    --bootstrap-server kafka1:9092 \
    --replication-factor 1 \
    --partitions 3

docker exec -it kafka1 kafka-topics \
    --create \
    --topic payment-succeed \
    --bootstrap-server kafka1:9092 \
    --replication-factor 1 \
    --partitions 3

    
docker exec -it kafka1 kafka-topics \
    --create \
    --topic payment-failed \
    --bootstrap-server kafka1:9092 \
    --replication-factor 1 \
    --partitions 3




