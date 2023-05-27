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
export const checkLinkValidity = (link) => {
   const valid = isLink(link);
   console.log('valid:', valid);
   if (valid === false) {
     console.log('Link is invalid!');
     return Promise.resolve({ validUrl: null });
   } else {
     return fetch(link)
       .then((response) => {
         console.log(response);
         if (response?.ok === true) {
           console.log('Return True');
           return { validUrl: response?.url };
         } else {
           console.log('Link is broken!');
           return { validUrl: null };
         }
       })
       .catch((error) => {
         console.log('Error:', error);
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