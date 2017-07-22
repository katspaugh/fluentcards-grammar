#!/bin/bash

template='bin/component-template.jsx'
path=$1
name=$(echo "${path}" | rev | cut -d '/' -f1 | rev)

mkdir "$path"
touch "${path}/${name}.css"
cat "${templateDir}/component-template.jsx" | sed "s/ComponentName/${name}/g" > "${path}/${name}.jsx"

echo "Created ${path}/${name}.jsx"
