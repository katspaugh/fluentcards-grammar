#!/bin/bash

template='bin/component-template.jsx'
defaultRoot='src/components'

name=$1
dir="${root}/${name}"

mkdir "$dir"
touch "${dir}/${name}.css"
cat "${templateDir}/component-template.jsx" | sed "s/ComponentName/${name}/g" > "${dir}/${name}.jsx"

echo "Created ${dir}/${name}.jsx"
