const xhr = new XMLHttpRequest();
xhr.open("GET", "resourceList.json", false)
xhr.send(null)
const resourceList = JSON.parse(xhr.responseText)

const getDirPath = (path) => {
    var splittedPath = path.split("/");
    splittedPath.splice(splittedPath.length - 1, 1);
    return splittedPath.join("/")
}

const getBasename = (path) => {
    var splittedPath = path.split("/");
    return splittedPath[splittedPath.length - 1];
}

const makedirs = (dirpath) => {
    if (FS.analyzePath(dirpath).exists) {
        return;
    }
    const splittedPath = dirpath.split("/");
    const parentDir = splittedPath.slice(0, splittedPath.length - 1).join("/");
    if (!FS.analyzePath(parentDir).exists) {
        makedirs(parentDir);
    }
    FS.mkdir(dirpath);
}

Module['preRun'] = () => {
    resourceList.forEach((resourceEntry, index) => {
        const dirPath = "/" + getDirPath(resourceEntry);
        const fileName = getBasename(resourceEntry);
        makedirs(dirPath)
        FS.createPreloadedFile(
            dirPath,
            fileName,
            resourceEntry,
            true,
            true
        );
        console.log(`[${index+1}/${resourceList.length}]`, resourceEntry, "preloaded");
    })
}