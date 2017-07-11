# (Angular 2) Statistik-Dashbaord
The purpose of this project is to develop client front using Angular 2
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
```

### Start E2E Tests:

```javascript
npm build:e2e
```

```javascript
npm run-e2e
```


### Developer Tools For Better Understanding:
***
 * ##### For Datepicker: https://github.com/kekeh/mydatepicker
 * Normal angular2 datepicker does not allow popup yet and cannot be handled different date format.
 * In that context we have evaluated ng2-date, ng2-datetime-picker, ng2-datetime, but all of these
    does not give the option to format the date in the preference of users need.
 * In that context we have found that mydatetpicker gives the option to play with it a little bit more.
***
 * ##### For forms data passing: https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2
 * in this plunker can be found the data passing regarding encapsulated reactive forms. If forms are loaded using different component
   and different directive this plunker is a good resource to know how data can be passed from caller component to callee
   component in the loading of same reactive forms.
   
 ***
 * ##### To check ng-bootstrap datepicker issues
 * https://github.com/valor-software/ngx-bootstrap/issues/455
 * For reference of datepicker pop: https://embed.plnkr.co/2Z8ntAMAWI5vZVN08tIe/
 * Komponente auf die todo list
