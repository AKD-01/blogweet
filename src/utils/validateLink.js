export const isLink = (link) => {
  const linkRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?/;
  return linkRegex.test(link);
};

export const findLinks = (caption) => {
  const linkRegex = /(?:^|\s)(https?:\/\/(?:www\.)?[^\s]+)/gi;
  const links = caption.match(linkRegex)

  if (links && links.length > 0) {
    console.log("Links found:", links);
    // Extract and process the links
    const extractedLinks = links.map((link) => link.trim());
    console.log("Extracted links:", extractedLinks);
  } else {
    console.log("No links found in the paragraph.");
  }
}

// Function to validate a link
export const checkLinkValidity = async (link) => {
  const valid = isLink(link);
  if (valid === false) {
    return Promise.resolve({ validUrl: null });
  } else {
    return fetch(link)
      .then((response) => {
        if (response?.ok === true) {
          return { validUrl: response?.url };
        } else {
          return { validUrl: null };
        }
      })
      .catch((error) => {
        return { validUrl: null };
      });
  }
};

//  const handleImageUpload = (e) => {
//    const link = e.target.value;
//    checkLinkValidity(link)
//      .then((validUrl) => {
//        console.log('Check:', validUrl);
//        // link validation
//        if (validUrl.validUrl !== null) {
//          setImage(link);
//        }
//      })
//      .catch((error) => {
//        console.log('Error:', error);
//      });
//  };