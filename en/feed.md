# Creating and setting up the feed
## What is Feed
Feed - a place to store push subscriptions. Once it is created and set up, a unique JS-script will be generated for you, after placing it you will be able to collect push subscriptions in this feed.

## How to create a feed
Go to the [Feed page](https://pushflow.net/app/feed) of the main menu and click on the ["Create"](https://pushflow.net/app/feed/create) button in the upper right corner.

## Feed Properties

#### Title and description
A random name and description to help you identify the group of subscriptions within this feed. Ideas for the name: traffic source, place to collect subscriptions, or collection method. 

#### Postback URL
After a new subscription is added to this feed, our server will send a request back to the specified address. [Read more about available macros](/en/tracker)

#### Frequency
How often you can send notifications to one user. Specified in hours.

## The "Script settings" section
![Subscription request window](../img/push-message.png ':class=mw-300')

The "Script settings" section determines where redirect will take place after user interaction with the subscription window.

*Redirect when you press "Allow "*. Specify the link, which will be used as a redirect after a successful subscription of a user. (Click the "Allow" button).

*Redirect if there is an error*. Specify the link, by which redirect will be made, if an error occurs during the script execution. (For example, if the user has absolutely forbidden asking for the subscription window in his browser, or if the user's browser does not support web-bubble notification like in mobile Safari).

*Requests by clicking "Deny"* Specify one or more hostnames where the redirect will be made after clicking on the "Block" button. If you want to specify several links that will be redirected sequentially, you should specify each link from a new line. How it works, read below.
Specify only the hostname, i.e. the site address without any additional parameters, which go after the sign _?_. For example, if your site is at https://**yourdomain.org**/sub/4/index.php?search=1, then only specify the hostname **yourdomain.org** and then subdomains from the new line. In the end, you can do it in this field:

```
yourdomain.org
1.yourdomain.org
2.yourdomain.org
3.yourdomain.org
```


