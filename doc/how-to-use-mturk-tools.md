## How to use submiterator mturk tools

To post the HIT, first setup the config file.

    {
    "rewriteProperties":"yes",
    "liveHIT":"no",
    "title":"a title to show to turkers",
    "description":"a description to show to turkers",
    "nameofexperimentfiles":"test",
    "experimentURL":"http://www.stanford.edu/~you/path/to/experiment.html",
    "keywords":"language research stanford fun cognitive science university explanations",
    "USonly?":"yes",
    "minPercentPreviousHITsApproved":"95",
    "frameheight":"650",
    "reward":"0.00",
    "numberofassignments":"1",
    "assignmentduration":"1800",
    "hitlifetime":"2592000",
    "autoapprovaldelay":"60000",
    "conditions":"cond"
    }

Then run the following commands in the terminal:

    scripts/_shared/submiterator.py [PATH_TO_CONFIG_FILE] [PATH_TO_OUTPUT_DIRECTORY]
    scripts/_shared/posthit.sh [PATH_TO_MTURK_FILES_WITH_LABEL]

And then when you want to get the results:

    scripts/_shared/getresults.sh [PATH_TO_MTURK_FILES_WITH_LABEL]
    scripts/_shared/parsedata.py [PATH_TO_RESULTS_FILE] [PATH_TO_OUTPUT_FILE]

For example:

    scripts/_shared/submiterator.py experiments/test/test.config data/test/mturk/
    scripts/_shared/posthit.sh data/test/mturk/test
    scripts/_shared/getresults.sh data/test/mturk/test
    scripts/_shared/parsedata.py data/test/mturk/test.results data/test/mturk/test.csv
