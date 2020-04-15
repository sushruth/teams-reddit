# Reddit within teams

Attempt to create a basic reddit browser with a teams theme.

![https://treddit.now.sh](./docs/screen.png)

# How to use?

Add a website tab to any channel in Teams and use https://treddit.now.sh as the URL.

## Development setup

### System setup

1. Have [`scoop`](https://scoop.sh) installed.
2. Install git, nodejs and yarn. I prefer to do this -
   ```sh
   scoop install git
   scoop install nvm
   nvm install latest
   # this should show the installed version after install. Lets call it 13.x.x
   nvm use 13.x.x
   ```
3. Install yarn
   ```
   scoop install yarn
   ```

### Codebase setup

1. Clone the repo and prep it
   ```
   git clone git@github.com:sushruth/teams-reddit.git
   cd teams-reddit
   yarn
   ```

### Certificate setup

This following snippet (run in powershell) is going to generate a locally signed certificate and install it in `Cert:\CurrentUser\TrustedPublishers` path for windows. Other operating system instructions will be included later.

```ps
scoop install openssl

cd certs

openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -extensions EXT -config ./config

Import-Certificate -FilePath .\localhost.crt -CertStoreLocation Cert:\CurrentUser\Root\
```

### Run and test the app

1. Start it

   ```
   yarn start
   ```

2. Open any channel in teams and click on "+" icon to add a tab
3. Click on "website" app
4. Use `https://localhost:3000` as the URL

All good.
