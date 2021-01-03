const ipc = require("electron").ipcRenderer
let textarea 
ipc.on("open-file",  (event, data) => {
        textarea = document.getElementById("codeing")
        textarea.value = data
});
ipc.on("save-file",(event,data)=>{
    textarea = document.getElementById("codeing").value
    ipc.send("synSave",textarea)
})
