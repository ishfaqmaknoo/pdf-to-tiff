#!/bin/sh
# convert.sh - ImageMagick conversion wrapper

INPUT_FILE=$1
OUTPUT_FILE=$2
DENSITY=${3:-300} # Default 300 DPI


convert "$INPUT_FILE" -density "$DENSITY" "$OUTPUT_FILE"
