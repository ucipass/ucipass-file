var fs = require("fs")
var path = require("path")
module.exports = class{
    constructor(fpath){
        this.fpath = path.resolve(fpath)
        this.size = null
        this.mtime = null
        this.ctime = null
        this.buffer = null
    }
    name(){return path.basename(this.fpath)}
    path(){return path.dirname(this.fpath)}
    clearBuffer(){ this.buffer = null ; return(this)}
    isFile(){
        var resolve,reject
        var final = new Promise((res,rej)=>{resolve=res;reject=rej})
        fs.stat(this.fpath,(err,stat)=>{
            if(err) {
                resolve(false)
            }
            else if (stat.isFile()){
                resolve(true)
            }else{
                resolve(false)
            }
        })
        return final;
    }
    stat(){
        var resolve,reject
        var final = new Promise((res,rej)=>{resolve=res;reject=rej})
        fs.stat(this.fpath,(err,stat)=>{
            if(err) {
                reject(err)
            }
            else{
                this.size = stat.size
                this.mtime = stat.mtime
                this.ctime = stat.ctime
                resolve(this)
            }
        })
        return final;
    }
    read(){
        var resolve,reject
        var final = new Promise((res,rej)=>{resolve=res;reject=rej})
        fs.readFile(this.fpath,(err,buffer)=>{
            if(err) {
                reject(err)
            }
            else{
                this.buffer = buffer
                resolve(this)
            }
        })
        return final;
    }
    write(newFilename){
        var resolve,reject
        var final = new Promise((res,rej)=>{resolve=res;reject=rej})
        var file = newFilename ? newFilename : this.fpath
        var data = this.buffer ? this.buffer : this.fpath
        if (file == data ) {
            console.log ("Nothing to write")
            resolve(this)
        }
        else{
            fs.writeFile(file,data,(err)=>{
                if(err) {
                    reject(err)
                }
                else{
                    resolve(this)
                }
            })
        }
        return final;
    }
    unlink(newFilename){
        var resolve,reject
        var final = new Promise((res,rej)=>{resolve=res;reject=rej})
        var file = newFilename ? newFilename : this.fpath

        fs.unlink(file,(err)=>{
            if(err) {
                reject(err)
            }
            else{
                resolve(this)
            }
        })

        return final;
    }
}
