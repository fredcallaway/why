### WhyBot: The Automated 3-year-old

The whybot asks participants to explain one of several seeds, then asks them to explain their explanation, etc.. We elicit many Q&A pairs, e.g. "Amy ate a sandwich because Amy was hungry." "Amy was hungry because Amy hadn't eaten in several hours."

current seeds:

* John went to the store
* Jane went to the post office
* Alex did the dishes
* Tom cooked dinner
* Maya drove to work
* Amy ate a sandwich
* Jack read a book about gardening
* Meg bought a new computer
* Sam repaired his bicycle

TODO: make an elicitation.js containing common code that all bots use.

TODO: make a whybot of the same form as above, but ask people to tell us something they know a lot about and explain that.

## Cavemanese

We translate the natural-language whybot results to a simplified, structured form.

    python scripts/whybot/reformat-whybot.py data/whybot/mturk/whybot.results data/whybot/whybot.tsv
    python scripts/whybot/pronoun-resolution.py data/whybot/whybot.tsv data/whybot/pronoun-resolved.tsv
    python scripts/whybot/dependency-parse.py data/whybot/pronoun-resolved.tsv data/whybot/dependency-parsed.tsv
