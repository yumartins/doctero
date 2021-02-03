#!/bin/bash

WORKSPACE=$1
shift;

PACKAGES=$1;
shift;

COMMAND=$1;
shift;

if [[ -z "$COMMAND" ]]; then
  COMMAND=$PACKAGES
  PACKAGES=""
fi

IFS=', ' read -r -a PARSED <<< "$PACKAGES"

if [[ -z "$PACKAGES" ]] || [[ ${#PARSED[@]} -gt 1 ]]; then
  if [[ -z "$PACKAGES" ]]; then
    eval "yarn lerna run $COMMAND --scope=@$WORKSPACE/* --parallel $@"
  else
    eval "yarn lerna run $COMMAND --scope=@$WORKSPACE/*{$PACKAGES} --parallel $@"
  fi
else
  eval "yarn workspace @$WORKSPACE/$PACKAGES run $COMMAND $@"
fi
