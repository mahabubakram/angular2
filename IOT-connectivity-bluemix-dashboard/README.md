# (Angular 2) Client Dashboard
The purpose of this project is to develop client front using Angular 2 for Hilscher IOT Device

### How to deploy to cloud Foundary:

####Step1:
```javascript
Go to client > src > core > services > rest.service.ts 
Then make   
private restHost = '';
```
####Step2:
```javascript
gulp client-default
env: build_env=env
```
####Step3:
```text
copy assets folder from client>src>app
create a folder inside dist/client and name it 'app'
Then paste the copied assets folder in the dist > client > app
```

### Prerequisites:
```javascript
npm install -g @angular/cli
```
```javascript
npm install
```
```javascript
ng build // generates dist folder
```


### Start Server:

```javascript
gulp client-watch
```
Open app in browser: http://localhost:3000


### Start Default Deploy Build:

```javascript
gulp client-default
env: build_env=env
```

### Start E2E Tests:

```javascript
npm build:e2e
```

```javascript
npm run-e2e
```


### Use Developer Tools:
