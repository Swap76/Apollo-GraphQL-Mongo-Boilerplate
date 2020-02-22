## Compatibility

MongoDB above 4.0

## Mongo dump for dumping full database and forming a gz file
```
mongodump --host <Mongo Host Url> --authenticationDatabase admin --archive=test.gz --gzip --db test
```

## Mongo restore for restoring files in case of emergency
```
mongorestore --host <Mongo Host Url> --authenticationDatabase admin --gzip --archive=test.gz --db test
```