FROM alpine:latest

WORKDIR /app

# Install ImageMagick
RUN apk add --no-cache imagemagick ghostscript

# Copy your conversion script
COPY convert.sh /app/

RUN chmod +x /app/convert.sh

ENTRYPOINT [ "/app/convert.sh" ]
