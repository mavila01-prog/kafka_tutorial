# Secure Kafka Cluster Setup

This repository contains a secure Kafka cluster setup with SSL/TLS encryption and SCRAM-SHA-512 authentication.

## Prerequisites

- Docker and Docker Compose
- OpenSSL
- Java Keytool

## Setup Instructions

1. Generate SSL certificates:
   ```bash
   chmod +x generate-certs.sh
   ./generate-certs.sh
   ```

2. Start the Kafka cluster:
   ```bash
   docker-compose up -d
   ```

3. Set up ACLs:
   ```bash
   chmod +x setup-acls.sh
   ./setup-acls.sh
   ```

## Security Features

- SSL/TLS encryption for all communication
- SCRAM-SHA-512 authentication
- ACL-based authorization
- Non-root user containers
- Secure password management

## Local Development

For local development, the cluster is configured to use `localhost` as the advertised listener. The following ports are exposed:

- Kafka1: 9092 (PLAINTEXT), 9094 (SASL_SSL)
- Kafka2: 9094 (PLAINTEXT), 9095 (SASL_SSL)
- Kafka3: 9096 (PLAINTEXT), 9097 (SASL_SSL)
- Kafka UI: 8080

## Production Considerations

1. **Passwords**: Change all passwords in `kafka-jaas.config` and update them in the Docker Compose file.
2. **Certificates**: Generate new certificates with proper organization details.
3. **Network**: Configure proper network security and firewall rules.
4. **Monitoring**: Set up monitoring and alerting for the cluster.
5. **Backup**: Implement proper backup strategies.

## Environment Variables

The following environment variables can be set for the microservice:

- `KAFKA_CA_CERT`: Path to CA certificate
- `KAFKA_CLIENT_KEY`: Path to client key
- `KAFKA_CLIENT_CERT`: Path to client certificate

## Troubleshooting

1. If you encounter SSL errors, ensure the certificates are properly generated and mounted.
2. For authentication issues, verify the JAAS configuration and passwords.
3. For ACL issues, check the ACL setup script output.

## Security Notes

- This setup is suitable for both development and production environments.
- For production, ensure to:
  - Use strong, randomly generated passwords
  - Implement proper network security
  - Set up monitoring and alerting
  - Configure proper backup strategies
  - Follow security best practices for container deployment
