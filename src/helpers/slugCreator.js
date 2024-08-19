

const getCreateSlug = (string)=>{
    const lowerString = string.toLowerCase()
    const array = lowerString.split(" ")
    const cleanedString = lowerString.replace(/[^a-z0-9\s]/g, '');
    const trimmedString = cleanedString.replace(/\s+/g, ' ').trim();


return    slug = trimmedString.replace(/\s+/g, '-');

}


module.exports = getCreateSlug