## Anglular CLI Evaluation

### Prerequisites
Both the CLI and generated project have dependencies that require **Node 6.9.0 or higher**, together
with **NPM 3 or higher**.

### Generating Components, Directives, Pipes and Services
You can find all possible blueprints in the table below:

Scaffold  | Usage
---       | ---
Component | `ng g component my-new-component`
Directive | `ng g directive my-new-directive`
Pipe      | `ng g pipe my-new-pipe`
Service   | `ng g service my-new-service`
Class     | `ng g class my-new-class`
Guard     | `ng g guard my-new-guard`
Interface | `ng g interface my-new-interface`
Enum      | `ng g enum my-new-enum`
Module    | `ng g module my-module`


### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Features
* **ng build**: Use uglifying and tree-shaking functionality by using `ng build --prod`
* **ng test**: Two test modes are available (`--watch=true` or `--watch=false`)
* **generate**: This command has options ([example](https://github.com/angular/angular-cli/wiki/generate-component))
* **webpack**: No official way to configure webpack.configure.js ([read further](http://stackoverflow.com/questions/39187556/angular-cli-where-is-webpack-config-js-file-new-2017-feb-ng-eject?rq=1)). Use `ng eject` to eject current webpack.configure.js file.
* **ng xi18n**

### Further reading
* [The Ultimate Angular CLI Reference Guide](https://www.sitepoint.com/ultimate-angular-cli-reference)