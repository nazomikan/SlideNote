SlideNote
=========
##Set Up

###Installing Imagemagick
This project is dependent on `node-imagemagick`.

You need to install the `imagemagick`, `Xquarts`, `Ghostscript`  due to its convenience.

Please have the installation refer to the following.

#### Xquarts

getting Xquarts and install.

[XQuarts Download](https://xquartz.macosforge.org/landing/)

#### imagemagick
```
brew install imagemagick
```

#### Ghostscript
```
brew install ghostscript
```

###Resolve npm dependency

```
npm install
```

###Resolve bower dependency

```
bower install
```

### DB
This application adopts the mongodb as a data store.

So installation of mongodb is required.

Please set up by reference to the following page.

[mongodb install](http://docs.mongodb.org/manual/installation/)

####Schema
db
```
mongodb://localhost/slide_note
```

slide shema will be as follows.
```
Schema = new mongoose.Schema({
  id:          {type: Number, required: true},
  length:      {type: Number, required: true},
  title:       {type: String, required:true, trim: true},
  author:      {type: String, trim: true},
  description: {type: String, trim: true},
  tag:         [{type: String}],
  slides:      [{type: String}],
  updated:     {type: Date, default: Date.now}
});
```

### ElasticSearch
install
```
brew install elasticsearch
```

plugin install for connect mongodb
```
plugin -install elasticsearch/elasticsearch-mapper-attachments/1.8.0
```

```
plugin -i com.github.richardwilly98.elasticsearch/elasticsearch-river-mongodb/1.7.0
```

setting for connecting mongodb and ElasticSearch
```
sudo mkdir -p /data/mongo
```

```
sudo chmod 777 /data/mongo
```

```
mkdir -p /data/mongo/rs0
```

```
mkdir -p /data/mongo/log/
```

```
mongod --replSet repslide --port 27017 --dbpath /data/mongo/rs0 --logpath /data/mongo/log/rs0.log &
```

```
mongo localhost:27017/slide_note
 > config = {_id: 'repslide', members: [{_id: 0, host: 'localhost:27017'}]};
 > rs.initiate( config );
 > rs.status();
```

```
./batches/connectMongoAndEs
```
