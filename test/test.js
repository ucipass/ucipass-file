var path = require("path")
var assert = require("assert")
var testfile1 = path.join(__dirname,"./test.txt")
var testfile2 = path.join(__dirname,"./test2.txt")
var msg = "abcd1234"
var File = require( "..\\file.js")


describe("Main Test" , ()=>{
    it("isFile Test",()=>{
        var file = new File(testfile1)
        return file.isFile()
        .then( isFile => { assert.ok( isFile) ;  return true } )
    })
    it("Stat Test",()=>{
        var file = new File(testfile1)
        return file.stat()
        //.then( file => { console.log("Current File",file) ;    return file; } )
        .then( file => { assert.equal( file.size , 8) ;  return file } )
    })
    it("Read Test",()=>{
        var file = new File(testfile1)
        return file.read()
        //.then( file => { console.log("Current File",file) ;    return file; } )
        .then( file => { assert.equal( file.buffer.toString('utf8') , msg) ;  return file } )
    })
    it("Write Test",()=>{
        var file = new File(testfile2)
        file.buffer = Buffer.from(msg, 'utf8');
        return file.write()
        .then(file=> file.clearBuffer())
        .then(file=> file.read())
        //.then( file => { console.log("Current File",file) ;    return file; } )
        .then( file => { assert.equal( file.buffer.toString('utf8') , msg) ;  return file } )
    })
    it("Copy Test",()=>{
        var file = new File(testfile1)
        return file.write(testfile2)
        .then(file=> file.clearBuffer())
        .then(file=> file.read())
        //.then( file => { console.log("Current File",file) ;    return file; } )
        .then( file => { assert.equal( file.buffer.toString('utf8') , msg) ;  return file } )
    })
    it("Unlink Test",()=>{
        var file = new File(testfile2)
        file.buffer = Buffer.from(msg, 'utf8');
        return file.write()
        .then(file=> file.unlink())
        .then(file=> file.isFile())
        .then( isFile => { assert.equal( isFile, false) ;  return true } )
        //.then( file => { console.log("Current File",file) ;    return file; } )
    })
    it("Hash Test",()=>{
        var file = new File(testfile1)
        return file.hashfn()
        //.then( file => { console.log("Current File",file) ;    return file; } )
        .then( file => { 
            assert.equal( file.hash, "e19d5cd5af0378da05f63f891c7467af") ;  return true 
        } )
        
    })

})
