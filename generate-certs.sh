#!/bin/bash

# Create a directory for certificates
mkdir -p certs
cd certs

# Generate CA certificate
openssl req -new -x509 -keyout ca-key -out ca-cert -days 365 -subj "/CN=Kafka-CA" -passout pass:changeit

# Generate keystore for each broker
for i in 1 2 3; do
    # Generate broker keystore
    keytool -keystore kafka${i}.keystore.jks -alias kafka${i} -validity 365 -genkey -keyalg RSA \
        -storepass changeit -keypass changeit \
        -dname "CN=kafka${i},OU=Kafka,O=Company,L=City,ST=State,C=US"

    # Create certificate signing request
    keytool -keystore kafka${i}.keystore.jks -alias kafka${i} -certreq -file kafka${i}.csr \
        -storepass changeit

    # Sign the certificate with CA
    openssl x509 -req -CA ca-cert -CAkey ca-key -in kafka${i}.csr -out kafka${i}-signed.crt \
        -days 365 -CAcreateserial -passin pass:changeit

    # Import CA certificate into keystore
    keytool -keystore kafka${i}.keystore.jks -alias CARoot -import -file ca-cert \
        -storepass changeit -noprompt

    # Import signed certificate into keystore
    keytool -keystore kafka${i}.keystore.jks -alias kafka${i} -import -file kafka${i}-signed.crt \
        -storepass changeit -noprompt

    # Create truststore and import CA certificate
    keytool -keystore kafka${i}.truststore.jks -alias CARoot -import -file ca-cert \
        -storepass changeit -noprompt
done

# Generate client keystore
keytool -keystore client.keystore.jks -alias client -validity 365 -genkey -keyalg RSA \
    -storepass changeit -keypass changeit \
    -dname "CN=client,OU=Kafka,O=Company,L=City,ST=State,C=US"

# Create client certificate signing request
keytool -keystore client.keystore.jks -alias client -certreq -file client.csr \
    -storepass changeit

# Sign client certificate with CA
openssl x509 -req -CA ca-cert -CAkey ca-key -in client.csr -out client-signed.crt \
    -days 365 -CAcreateserial -passin pass:changeit

# Import CA certificate into client keystore
keytool -keystore client.keystore.jks -alias CARoot -import -file ca-cert \
    -storepass changeit -noprompt

# Import signed client certificate into keystore
keytool -keystore client.keystore.jks -alias client -import -file client-signed.crt \
    -storepass changeit -noprompt

# Create client truststore and import CA certificate
keytool -keystore client.truststore.jks -alias CARoot -import -file ca-cert \
    -storepass changeit -noprompt

echo "Certificates generated successfully!" 