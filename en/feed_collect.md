# Collecting feed subscriptions

## 1. Installing Service Worker
First of all, regardless of the integration method you choose, you need to download the Service Worker file from the Fida page and upload it to the root directory of your web server where you plan to collect subscriptions. 


## 2. Choosing the integration method
### Javascript integration 
Suitable for integration into an existing website. You need to copy the generated code and paste it into the ```<head></head>``` tag of your web page where you intend to collect the subscription. In this case, the generated script must be wrapped in ```<script></script>``` tag (see below).

#### Settings {docsify-ignore}
- ***Turn the code into ```<script></script>```*** - turns the generated code into ``<script></script>`` tag. It is necessary to remove this checkbox if you insert the generated code or in the already valid JS code wrapped in ```<script></script>```, or if you insert in a separate file with extension ```.js```.
- ***Subscribe when page is loaded*** - subscription request will be made in 2 seconds after the page is loaded.

#### Starting the script {docsify-ignore}
If you want to run the script by some action, for example, by clicking on some button, then after the script integration you need to call JS-function ```pushflowSubscription()```, after that the user will see the window of asking for the user to subscribe.

For example, if you want to call the subscription window by clicking on a button, you can add the function call to the ```onclick``` event:
``` 
<div onclick="pushflowSubscription()">Subscribe</div>
```

or, if you integrate into an already existing JS code, the function call may look like this:
```
function cta() {
  <!-- Some code goes here -->
  pushflowSubscription();
}
```




### Ready HTML templates
Simply download the template and host it on your web server.
