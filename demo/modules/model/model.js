/**
 * Every Js files has a Node.Js wrapper function with the following properties
 * ->require = to import files into a module
 * ->exports = to export an object,function,class or module to other modules
 * ->modules = reference to the current module
 * ->__dirname = the directory name of the current module
 * ->__filename = the file name of the current module
 */

let names = ['Jill','Lynn','Mike'];
let scores = [100,90,95];
let data =[1,2,3]

module.exports = {names:names, scores:scores,data:data};
