#!/bin/bash

# Concatenates Luujanko's source files into a single distributable file.

DIRECTORY="./distributable/"
FILENAME="luujanko.js"
VERSION="alpha live"

SOURCE_FILES=("./src/luujanko/luujanko.js"
              "./src/luujanko/color.js"
              "./src/luujanko/material.js"
              "./src/luujanko/matrix44.js"
              "./src/luujanko/ngon.js"
              "./src/luujanko/rasterize.js"
              "./src/luujanko/transform.js"
              "./src/luujanko/vector3.js"
              "./src/luujanko/vertex.js"
              "./src/luujanko/mesh.js"
              "./src/luujanko/render.js")

echo "// WHAT: Concatenated JavaScript source files" > "$DIRECTORY/$FILENAME"
echo "// PROGRAM: Luujanko" >> "$DIRECTORY/$FILENAME"
echo "// VERSION: $VERSION (`LC_ALL=en_US.utf8 date -u +"%d %B %Y %H:%M:%S %Z"`)" >> "$DIRECTORY/$FILENAME"
echo "// AUTHOR: Tarpeeksi Hyvae Soft" >> "$DIRECTORY/$FILENAME"
echo "// LINK: https://www.github.com/leikareipa/luujanko/" >> "$DIRECTORY/$FILENAME"
echo "// FILES:" >> "$DIRECTORY/$FILENAME"
printf "//\t%s\n" "${SOURCE_FILES[@]}" >> "$DIRECTORY/$FILENAME"
echo -e "/////////////////////////////////////////////////\n" >> "$DIRECTORY/$FILENAME"

cat ${SOURCE_FILES[@]} >> "$DIRECTORY/$FILENAME"

# Remove empty lines
sed -i '/^[[:space:]]*$/d' "$DIRECTORY/$FILENAME"

# Trim whitespace.
sed -i 's/^[[:blank:]]*//;s/[[:blank:]]*$//' "$DIRECTORY/$FILENAME"
