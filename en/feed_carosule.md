# Setting up a carousel of redirections
#### What is this?
After clicking on the "Block" button in the subscription request window, the user will see the notification subscription window again.

#### How it works
After clicking on the "Block" button, a redirect to the exact same page on another domain or subdomain where a new subscription request is made.

#### How to set it up

1. **Customize your domain:** In your domain's DNS records, create a series of subdomains pointing to the same IP address. For example, if your primary domain is _yourdomain.org_, then create subdomains: _1.yourdomain.org_, _2.yourdomain.org_, _3.yourdomain.org_ pointing to exactly the same IP address as _yourdomain.org_. Make sure that subdomains work and open exactly the same site as _yourdomain.org_'s primary domain.
2. **Feed Setup:** On the Feed Page, fill in the _«Block» button URL redirects loop_ field with all the domains above and subdomains. Each from the new line.
3. **Download the script to the server:** Download one of the HTML templates or place the code from the Feed page on your website. (If you use a plain Javascript script, make sure the subscription request is ticked when loading the page).

That's all, now the user clicking "Block" will be redirected to the subdomain and there will be a subscription request again. When all domains expire, a redirect from the *Redirect on error* field will be triggered.
