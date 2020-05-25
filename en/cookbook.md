# Useful tips and scripts
## Request a furlough subscription before we go to an offshore operation from boarding
***Scenario:*** 
The user has reached the end of your listing, clicks on the final button to go to the Offer and he will be prompted to subscribe. Regardless of which option he chooses, he will redirect to your account.

***Release:*** 
Create a Feed in Pushflow and in the section "Setting up redirections" in each field specify a link to your offline, for example, if your Binom tracker will have a view link in each field: ``http://trackdomain.com/click.php?lp=1``. We will save and integrate the generated script according to the instructions.

In ```<head></head>``` we add the following script:
```
  <script>
    function toOffer(e) {
      e.preventDefault();
      PushflowSDK.askSubscription();
    }
  </script>
  ```
Next, we find the button where your link to the offer is and add it onclick event:
  ```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="toOffer(event)">Link</a>
  ```


## Opening of an offer in a new tab, and in the old tab we make a request for a push subscription
Integrate Pushflow script [by usual instruction](/en/feed_collect). Then in ```<head></head>``` add the following script:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
    };

    window.onfocus = function() {
      if (isLeftPage) {
        setTimeout(PushflowSDK.askSubscription(), 500);
      }
    };
  </script>
```
In the script, change ```https://trackdomain.com/click.php?lp=1``` to your link to the Offer.

It is also possible that the user will forget the old tab for a long time and then the script may not work. We can set the user a cookie for 31 days. Then the final script will look like this:
```
  <script>
    // Change it to your offer link
    var offerUrl = "https://trackdomain.com/click.php?lp=1";
    var isLeftPage = false;
    
    function toOffer(e) {
      e.preventDefault();
      var win = window.open(offerUrl, '_blank');
      if (win) {
          win.focus();
      } else {
          location.href = offerUrl;
      }
      isLeftPage = true;
      document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
    };

    window.onfocus = function() {
      if (getCookie('isLeftPage') == 1 || isLeftPage) {
        setTimeout(PushflowSDK.askSubscription(), 500);
      }
    };

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };
  </script>
```

The other option to request a subscription is to download a ready-made HTML template from the Feed page (a template with a captcha will do well), place it on your web server and redirect your user to this page after he opened the old tab. To do this, replace part of the script above ```window.onfocus = function() {}``` with the next one:
```
  window.onfocus = function() {
    if (isLeftPage) {
      location.href = "https://link.com/index.php";
    }
  };
```
Where ```https://link.com/index.php``` should be replaced with a link to the page where you collect subscriptions.



## Subscribe non-unique users
***Scenario:*** 
If a user has already visited your site, they are immediately prompted to subscribe.

***Realization:*** 
Create Feed in Pushflow. If you want to leave all fields in the redirection section empty after the action with the subscription window. Integrate the Pushflow script [following the usual instructions](/en/feed_collect).

If you want to ask for a subscription from users who have left your publishing to the offshore and not just visited the page, add the following script to ```<head></head>`:
```
<script>
  function setPushflowCookie() {
    document.cookie = "isLeftPage=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };

  window.addEventListener(
    "load",
    function() {
      if (getCookie('isLeftPage') == 1) {
        setTimeout(PushflowSDK.askSubscription(), 1500);
      }
    },
    true
  );

  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
Find the button, where your link to the operator or tracker is and add it to the onclick event:
```
  <a href="http://trackdomain.com/click.php?lp=1" onclick="setPushflowCookie()">Link</a>
```

If you want to ask for a subscription from all users who have logged in to your site and spent more than 3 seconds there, the script will look like this:
```
<script>
  window.addEventListener(
    "load",
    function() {
      setTimeout(setNonUniqCookeie(), 3000);

      if (getCookie('isNonUniq') == 1) {
        setTimeout(PushflowSDK.askSubscription(), 1500);
      }
    },
    true
  );

  function setNonUniqCookeie() {
    document.cookie = "isNonUniq=1; max-age=" + 60 * 60 * 24 * 31 + " ; path=/";
  };


  function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  };
</script>
```
In this case, no additional scripts should be added to the button to go to the offshore.
<!-- 

## Subscription if URL parameter is present
***Scenario:*** 
We want the subscription script to trigger only if there is some key in the URL of the page, for example ```&p=1```. This can be useful during tests with and without a subscription, just take a double of the link in the tracker and add ```&p=1``` to it. Now you will see a subscription window in this branding and not a keyless one.

***Realization:*** 
Integrate the Pushflow script [following the usual instructions](/en/feed_collect). Next, in the integrated script we find the line ``` function PushflowSDK.askSubscription() {``` and below it we add the following condition ```if (window.location.href.indexOf('&p=1') < 0) return;```. As a result, we get the script of the view:
```
  ...
  function PushflowSDK.askSubscription() {
    if (window.location.href.indexOf('&p=1') < 0) return;
  ....
```
That's it.
## Параллельный сбор своей пуш-базы с другими сервисами пуш-подписок -->
