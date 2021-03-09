const userAgents = [
  "googlebot",
  "Yahoo! Slurp",
  "bingbot",
  "yandex",
  "baiduspider",
  "facebookexternalhit",
  "twitterbot",
  "rogerbot",
  "linkedinbot",
  "embedly",
  "quora link preview",
  "showyoubot",
  "outbrain",
  "pinterest/0.",
  "developers.google.com/+/web/snippet",
  "slackbot",
  "vkShare",
  "W3C_Validator",
  "redditbot",
  "Applebot",
  "WhatsApp",
  "flipboard",
  "tumblr",
  "bitlybot",
  "SkypeUriPreview",
  "nuzzel",
  "Discordbot",
  "Google Page Speed",
  "Qwantify",
  "pinterestbot",
  "Bitrix link preview",
  "XING-contenttabreceiver",
  "Chrome-Lighthouse",
];

/**
 * Detect whether the user agent string matches that of a known bot
 * @param {string} userAgent
 */
export default (userAgent: any) => {
  return userAgents.some(
    (crawlerUserAgent) =>
      userAgent.toLowerCase().indexOf(crawlerUserAgent.toLowerCase()) !== -1
  );
};