# Setting up the tracker, postbacks, macros

## Postback to collect subscriptions
When collecting subscriptions to [Feed](/en/feed) you have the option of getting post-back from the click ID in which the subscription took place to count it as a conversion in the tracker.


**What it takes:**
1. **Send the token to the URL of the page where the subscription is collected**.  The script will automatically pass the values of available tokens (```clickid, t1, t2, t3, t4, t5```) along with a successful subscription to our service. For example, if you want to pass an idi click and then get it to your tracker with the postback, you need to pass an idi click from the tracker to the token ```clickid```. As a result, the final URL where subscriptions are collected should look like this: ```https://script-domain.com/index.php?clickid=8280816987&t1=propellers&t2=dating```
1. **Place the postback URL on Pushflow**:
  - On the Feed page. Will only apply to a given Feed.
  - In global [Pushflow profile settings](https://pushflow.net/app/options). Will apply to all Feeds where no postback url is set.

  In reverse postback you can use one of the previously passed macros to return this information to your tracker: ```{clickid}, {t1}, {t2}, {t3}, {t4}, {t5}```.  For example, for a Binom tracker it would look like this: ```https://your-tracker.com/click.php?cnv_id={clickid}&t1={t1}&t2={t2}```

## Macros when sending notifications
While creating your creativity, you can add additional macros to the link, transmitting values from the Pushflow system. You can create a traffic source in your tracker with the following macros:
- ```{externalId}``` — Click ID in Pushflow
- ```{сampaignId}``` — Campaign ID in Pushflow
- ```{creativeId}``` — Creative ID in Pushflow
- ```{subscriptionId}``` — Subscription ID in Pushflow
