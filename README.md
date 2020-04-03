# Skald

_A Firebase Powered wiki PWA for Role Playing Games._

A Live Example of the app can be seen at <https://mekanismi.web.app>
n
Please note: this GitHub repository does not include the security rules, and firebase config required to run the Wiki. An example of Firebase condig required can be found below. An example Firestore ruleset available upon request.

## Project setup

Clone the repo, and run:

```bash
npm install
```

Create the Firebase project in the Firebase console, and use the Firebase CLI to initialize your App. Rest of this readme expexts you to add Firebase hosting to your app.

```bash
firebase init
```

### Compiles and hot-reloads for development
ß
```bash
npm run serve
```

### Compiles and minifies for production

```bash
npm run build
```

## Deploy

```bash
firebase deploy
```

## Other usefull commands

### Lints and fixes files

```bash
npm run lint
```

### Run your end-to-end tests

You need to add a cypress.env.json file to project root with username and password to test the features that require login.

### Example of the cypress.env.json file

```json
{
  "TEST_USER_EMAIL": "an.email@address.com",
  "TEST_USER_PASSWORD": "theP4ssw0rd"
}

```

```bash
npm run test:e2e
```

### Run your unit tests

```bash
npm run test:unit
```
