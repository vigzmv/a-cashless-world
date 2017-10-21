# A Cashless World

As India is transitioning to a cashless economy, a plethora of cashless payment options have come up. However, a problem which arises out of this is that the customers are not aware of what cashless payment methods are accepted by the different vendors. One can't go shop by shop to ask if they have any cashless payment method available for use. This is where Wally comes in. Wally helps you find and use your favorite payment options supported by the vendors in your locality to help you in times of need!

Go cashless, because you will always find a spot where you can use your cashless payment method.


<hr/>

## Screenshots

![Screen 1](/frontend/img/screen1.png "Screen 1")
![Screen 2](/frontend/img/screen2.png "Screen 2")


<hr/>

## Setup

### Backend

Makemigrations, migrate and start the django server

```sh

# Start the server

$ ./manage.py makemigrations
$ ./manage.py migrate
$ ./manage.py runserver


# Create a Superuser to login to the dashbaord

$ ./manage.py createsuperuser
$ ./manage.py runserver

# Now navigate to http://localhost:8000/admin/
```

### Frontend

Start a simple http server.


```sh
# Install and start http-server

$ sudo yarn global add http-server || sudo npm i -g http-server

$ http-server

# Open the shown url
```