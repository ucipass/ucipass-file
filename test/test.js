var path = require("path")
var fs = require("fs")
var assert = require("assert")
var testfile1 = path.join(__dirname,"./test1.txt")
var testfile2 = path.join(__dirname,"./test2.txt")
var msg = "abcd1234"
var File = require( "..\\file.js")


describe("Main Test" , ()=>{
    beforeEach("Setup Test Testfile",()=>{
        fs.writeFileSync(testfile1, Buffer.from(msg, 'utf8'))
    })
    afterEach("Setup Test",()=>{
        try{ fs.unlinkSync(testfile1)}catch(err){}
        try{ fs.unlinkSync(testfile2)}catch(err){}
        try{ fs.unlinkSync(testfile3)}catch(err){}
    })
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
    it("Read String Test",()=>{
        return new File(testfile1).readString()
        .then( text => { assert.equal( text, msg) ;  return true } )
    })
    it("Write Test",()=>{
        var file = new File(testfile2)
        file.buffer = Buffer.from(msg, 'utf8');
        return file.write()
        .then(file=> file.clearBuffer())
        .then(file=> file.read())
        .then( file => { assert.equal( file.buffer.toString('utf8') , msg) ;  return file } )
    })
    it("Write String Test",()=>{
        return new File(testfile2).writeString("12345")
        .then(()=> new File(testfile2).readString() )
        .then( text => { assert.equal( text, "12345") ;  return true } )
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
        var file = new File(testfile1)
        return file.unlink()
        .then(file=> file.isFile())
        .then( isFile => { assert.equal( isFile, false) ;  return true } )
        //.then( file => { console.log("Current File",file) ;    return file; } )
    })
    it("Rename Test",()=>{
        var file1 = new File(testfile1)
        var file2 = new File(testfile2)
        return Promise.all([file1.isFile(),file2.isFile()])
        .then(result => { assert.deepEqual(result, [true,false],"file1 exists, file2 NOT exists!") })
        .then(() => file1.rename(testfile2) )
        .then(() => Promise.all([file1.isFile(),file2.isFile()]) )
        .then(result => { assert.deepEqual(result, [false,true],"file1 NOT exists, file2 exists!") })
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
