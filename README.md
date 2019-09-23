# Skald

A Gaming focused wiki PWA powered by a Vue.js and Firebase.

N.B: this projec contains only the PWA part. The security rules and firestore config required are not available via the GiHub Project.

## Project setup

- _Tested 12.9.2019, and verified to work -vt._

```bash
npm install
```

## Deploy

### Setup Firebase hosting

```bash
firebase init
```

Do note: we add a custom site definition to the generated files:

```json
"site": "mekanismi",
```

### deploy to firebase

```bash
firebase deploy
```

## Other

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
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
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
