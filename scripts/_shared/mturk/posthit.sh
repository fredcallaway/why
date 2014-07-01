#!/usr/bin/env sh
HERE=`pwd`
cd $MTURK_CMD_HOME/bin

EXPERIMENT_FOLDER=$1
if [ ! -z $2 ]
then
	MTURK_TAG=$2
else
	MTURK_TAG=$EXPERIMENT_FOLDER
fi
label=$HERE/data/$EXPERIMENT_FOLDER/mturk/$MTURK_TAG
./loadHITs.sh -label $label -input $label.input -question $label.question -properties $label.properties -maxhits 1