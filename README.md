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
{
  id: Number,
  length: Number,
  title: String,
  description: String,
  keyword: Array,
  updated: {type: Date, default: Date.now}
}
```
