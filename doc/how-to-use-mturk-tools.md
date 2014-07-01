## How to use submiterator mturk tools

To post the HIT, first setup the config file.

    {
    "rewriteProperties":"yes",
    "liveHIT":"no",
    "title":"a title to show to turkers",
    "description":"a description to show to turkers",
    "nameofexperimentfiles":"test",
    "experimentURL":"https://www.stanford.edu/~you/path/to/experiment.html",
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

Then run the following commands in the terminal (from the top of the why directory):

    python scripts/_shared/submiterator.py [FOLDER_INSIDE_DATA] [MTURK_TAG*]
    sh scripts/_shared/posthit.sh [FOLDER_INSIDE_DATA] [MTURK_TAG*]

The [MTURK_TAG*] is the name of the experiment files in the config file *and* the name of the config file. You don't need this parameter if your experiment folder inside data has this name too.

And then when you want to get the results:

    sh scripts/_shared/getresults.sh [FOLDER_INSIDE_DATA] [MTURK_TAG*]
    python scripts/_shared/parsedata.py [FOLDER_INSIDE_DATA] [MTURK_TAG*]

For example:

    scripts/_shared/submiterator.py experiments/test/test.config data/test/mturk/
    scripts/_shared/posthit.sh data/test/mturk/test
    scripts/_shared/getresults.sh data/test/mturk/test
    scripts/_shared/parsedata.py data/test/mturk/test.results data/test/mturk/test.csv
