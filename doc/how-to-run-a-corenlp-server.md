## NLP Server Setup

1. get access to a server with at least 3GB of ram and permissions for http requests

1. ssh onto this server

        ssh username@server-address

1. install some dependencies (if necessary)

        sudo apt-get install git python-pexpect python-unidecode

    **NB** `python-unidecode` is not necessary. If (you're on AFS, which doesn't already have unidecode installed, and) you don't have sudo privileges, make the following changes:

    * comment out line 24

        	from unidecode import unidecode

    * change line 68 to

        	for line in text.split("\n"):

1. download [dasmith's stanford-corenlp-python wrapper](https://github.com/dasmith/stanford-corenlp-python)

        git clone git://github.com/dasmith/stanford-corenlp-python.git

1. download [stanford's core nlp tools](http://nlp.stanford.edu/software/corenlp.shtml) INSIDE the dasmith folder

        cd stanford-corenlp-python
        wget http://nlp.stanford.edu/software/stanford-corenlp-2012-07-09.tgz
        tar xvfz stanford-corenlp-2012-07-09.tgz

1. start the python nlp wrapper server on your server (here's a fun fact for those of you who, like me, don't know much about servers. "server" apparently means two things: 1. a computer you can access via the internet and 2. a program running on such a computer that handles requests)

        python corenlp.py -H 0.0.0.0 -p 12345

1. in any file that calls the nlp server you've just set up, change the host to the address of your server (or use mine if mine is set up)

**NB** If you're using my server (or probably any other server on Stanford's network), you will ONLY be able to connect to the server when you're on Stanford's VPN