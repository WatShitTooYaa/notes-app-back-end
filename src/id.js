function generateUniqueId() {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    const uniqueId = randomNumber.toString();
    return uniqueId;
}

module.exports = {generateUniqueId}