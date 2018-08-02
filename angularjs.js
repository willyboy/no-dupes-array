angular.module('utilities',[])
.factory("NoDupesArray",function(){
  //i'm sure this already exists in Angular because of how ngRepeat works 
  //so if someone is looking at it and knows how to access, feel free to change
  function NoDupesArray(vals){
    angular.forEach(vals,function(val){
      this.push(val);
    }.bind(this));
  }
  NoDupesArray.prototype=Object.create(Array.prototype);
  NoDupesArray.prototype.push=function(item,objKey){
    if(objKey){
      item = this.find(item[objKey], objKey)||item;
    }
    if(this.indexOf(item)==-1){
      Array.prototype.push.call(this,item);
    }
    return this;
  }
  NoDupesArray.prototype.unshift = function(item, objKey){
    if(objKey){
      item = this.find(item[objKey], objKey)||item;
    }
    if(this.indexOf(item) == -1){
      Array.prototype.unshift.call(this,item);
    }
    return this;
  }
  NoDupesArray.prototype.togglePush = function(item,objKey){
    if(objKey){
      item = this.find(item[objKey],objKey)||item;
    }
    if(this.indexOf(item)==-1){
      this.push(item);
      return true;
    }
    else{
      this.removeItem(item);
      return false;
    }
  }
  NoDupesArray.prototype.find = function(objVal,objKey){
    var found=false;
    angular.forEach(this,function(el){
      if(el[objKey] == objVal){
        found = el;
      }
    });
    return found;
  }
  NoDupesArray.prototype.removeItem=function(item,objKey){
    if(objKey){
      item = this.find(item,objKey)||item;
    }
    var loc=this.indexOf(item);
    if(loc!=-1){
      this.splice(loc,1);
    }
  }
  NoDupesArray.prototype.concat = function(){
    //get all the arrays passed in
    //append their items
    for(var i in arguments){
      angular.forEach(arguments[i],function(el){
        this.push(el);
      }.bind(this));
    }
  }
  NoDupesArray.prototype.toJSON = function(){
    return this.slice();
  }
  NoDupesArray.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  };
  NoDupesArray.prototype.merge = function(mergeWith, objKey){
   mergeWith.forEach(function(item){
    this.push(item, objKey);
   }.bind(this));
   return this;
  }
  NoDupesArray.prototype.resetAndMerge = function(mergeWith, objKey){
    this.length = 0;
    return this.merge(mergeWith, objKey);
  }
  return NoDupesArray;
  //could be fancy and have a no dupes matrix of nodupesarrays so 
  //ids only ever appear once in the matrix but i dun wanna do that 
  //right now
})
