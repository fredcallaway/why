From [here](http://www.linuxjournal.com/content/tech-tip-really-simple-http-server-python):

Open up a terminal and type:

    $ cd /home/somedir
    $ python -m SimpleHTTPServer
    
That's it! Now your http server will start in port 8000. You will get the message:

    Serving HTTP on 0.0.0.0 port 8000 ...

Now open a browser and type the following address:

    http://192.168.1.2:8000
    
You can also access it via:

    http://127.0.0.1:8000
