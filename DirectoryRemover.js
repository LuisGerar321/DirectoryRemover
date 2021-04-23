// Write a Node.Js program to remove a specific directory:
const fs = require('fs');
const readline =  require("readline-sync");
var number_files= 0;
var number_folders = 0;

const  directoryRemover = (path) =>{
        
        try{
                if(fs.existsSync(path)){
                        try{
                                
                                const files = fs.readdirSync(path);
                                number_folders  = number_folders + 1;
                                if( files.length>0){  //folder is not empty
                                        const answer = readline.question("The directory is not empty, are you sure? yes/no\n");
                                        if(answer == "yes"){

                                                files.forEach(file => {
                                                        const c_path = path + "/" + file;

                                                        if(fs.lstatSync(c_path).isDirectory()) {
                                                                
                                                                directoryRemover(c_path)
                                                        }else{
                                                                number_files+=1;
                                                                fs.unlinkSync(c_path);
                                                                
                                                        }
                                                        
                                                });
                                                fs.rmdirSync(path);

                                        
                                        }else{
                                                console.log("element canceled");
                                        }
                                        
                                }else if(files.length==0) {
                                        fs.rmdirSync(path);
                                }       
                        }catch{

                                fs.unlinkSync(path);
                                number_files+=1;
                        }
                        

                }else{
                        throw new Error("The path doesn not exist!!");
                }
        }catch(error){
                console.log(error);
        }

}

try{
        console.log("Path to remove: ",`${process.argv[2]}`);
        directoryRemover(`${process.argv[2]}`);
        console.log(`Files delated: ${number_files}, Folders delated: ${number_folders}`);
}catch{
        console.log("Error");
}



