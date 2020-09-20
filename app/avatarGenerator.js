var avatars = require('avatars');

/**
 * avatarGenerator
 * @param {*} username 
 * @param {*} filename 
 * @param {*} path 
 * @param {*} size 
 * @param {*} fullPath 
 */
async function avatarGenerator(username, filename, path, size, fullPath) {
    var result = false;
    var params = {
        seed: username, // can be username, login, id etc
        width: size,
        height: size,
        pwidth: 15,
        pheight: 15,
        filename: path + filename + '.png'
    };
    await avatars(params)
        .then(image => {
            if (fullPath)
                result = path + filename + '.png';
            else
                result = filename + '.png';
        })
        .catch(e => {
            console.error(e);
        });
    return result;

}

module.exports = avatarGenerator;