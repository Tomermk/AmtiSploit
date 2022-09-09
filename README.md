# AmtiSploit
Amtisploit - check if your system is vunerable in the best way there is! Hack it.

Create a config folder with this config files:

db.config:
```
module.exports = {
  HOST: "localhost",
  USER: "user",
  PASSWORD: "password",
  DB: "amtisploitdb",
  MULTIPLESTATEMENT: true,
  PORT: 3306
};
```

pwd.config:
```
module.exports = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
  }
  ```
  
  pwdHistory.config:
  ```
  module.exports = {
    history:4
}
  ```
