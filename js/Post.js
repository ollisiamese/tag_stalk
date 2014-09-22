(function(somenamespace) {
  'use strict';
  
  function Post(data) {
    var self = this;
    self.blog_name = data.blog_name;
    self.post_url = data.post_url;
    self.type = data.type;
    self.date = data.date;
    self.timestamp = data.timestamp;
    self.state = data.state;
    self.tags = data.tags;
    self.short_url = data.short_url;
    self.note_count = data.note_count;
    self.caption = ko.observable(data.caption);
    self.isManyPics = false;

    //PHOTO
    self.isPhoto = false;
    
    if (self.type == "photo") {
      self.isPhoto = true;
      self.photos = data.photos;

      //if multiple photo post
      if (self.photos.length > 1) {
        self.isManyPics = true;
      }
 
      if (data.photos.caption) {
        self.caption = data.photos.caption;
      } else {
        self.caption = "";
      }  
    }


    //VIDEO
    self.isVideo = false;
    self.videos = null;

    if (self.type == "video") {
      self.isVideo = true;
      
      if (data.player) {
        self.videos = data.player[2].embed_code;
      } else {
        self.videos = "h";
      }     
    }


    //LINK
    self.isLink = false;

    if (self.type == "link") {
      self.isLink = true;
      self.url = data.url;
      
      if (data.description) {
        self.description = data.description;
      } else {
        self.description = "";
      } 
      
      self.linkTitle = data.title;
    }


    //AUDIO
    self.isAudio = false;
    if (self.type == "audio") {
      self.isAudio = true; 
      self.audioplayer = data.embed;
      
      if (data.caption) {
        //self.caption is a ko.observable, unlike the rest of the Post's properties,
        //because it is used with an "if" data binding in the html view
        //(either the caption is shown, or the title+artist for the audio file, but not both)
        self.caption(data.caption); 
      } else {
        self.caption(" ");
      }
      
      if (data.artist) {
        self.artist = data.artist;
      } else {
        self.artist = "";
      }
   
      if (data.track_name) {
        self.track_name = data.track_name;
      } else {
        self.track_name = " ";
      }   
    }

    //TEXT
    self.isText = false;
    
    if (self.type == "text") {
      self.isText = true;
      self.title = data.title;
      
      if (data.body != "") {
        self.body = data.body;
      } else {
        self.body = null;
      }      
    }

    //QUOTE
    self.isQuote = false;
    if (self.type == "quote") {
      self.isQuote = true;
      self.text = data.text;
      self.source = data.source;
    }

    //CHAT
    self.isChat = false;
    if (self.type == "chat") {
      self.isChat = true;
      
      if (data.title) {
        self.title = data.title;
      } else {
        self.title = " ";
      }
      
      self.body = data.body;
      self.dialogue = data.dialogue; 
    }

    //ANSWER
    self.isAnswer = false;
    if (self.type == "answer") {
      self.isAnswer = true;
      self.question = data.question;
      self.answer = data.aswer;
    }
  }

  //get public access
  somenamespace.Post = Post; 

})(window.mainNameSpace = window.mainNameSpace || {});