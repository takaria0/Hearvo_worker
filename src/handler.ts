import isbot from "./isbot";

const BASE_API = "https://stormy-forest-01163.herokuapp.com/api/v1.0";
const IMAGE_URL = "https://us.hearvo.com/logo512.png";


export async function handleRequest(request: Request): Promise<Response> {

  const { method, headers, url } = request;
  const userAgent = request.headers.get("user-agent")


  /*
  if the user agent is a bot and post detail page, replace meta tag !!!!
  */
  if (isbot(userAgent)) {

    const basePath = url.split('/');
    const check = basePath[basePath.length - 2];

    // check if the page is posts/:post_id
    if (check === "posts") {

      const postId = basePath[basePath.length - 1];
      const apiRes = await fetch(BASE_API + `/posts?id=${postId}`)
      const apiResBody = await apiRes.json();

      const apiTitle = apiResBody.title;
      const apiContent = apiResBody.content;
      const res = await fetch(url, {
        method,
        headers,
      });

      return new HTMLRewriter()
        .on('head > meta[property="og:title"]', {
          element(e) {
            const content = e.getAttribute("content")
            if (content) {
              e.setAttribute(
                "content",
                content.replace("____OG_PAGE_TITLE____", apiTitle),
              )
            }
          }
        })
        .on('head > meta[property="og:description"]', {
          element(e) {
            const content = e.getAttribute("content")
            if (content) {
              e.setAttribute(
                "content",
                content.replace("____OG_PAGE_DESCRIPTION____", apiContent),
              )
            }
          }
        })
        .on('head > meta[property="og:image"]', {
          element(e) {
            const content = e.getAttribute("content")
            if (content) {
              e.setAttribute(
                "content",
                content.replace("____OG_PAGE_IMAGE____", IMAGE_URL),
              )
            }
          }
        })
        .transform(res)
    }

    const res = await fetch(url, {
      method,
      headers,
    });
    return res;
  }


  return fetch(url, {
    method,
    headers,
  });

  // const body = await res.text();
  // console.log(body);
  // return new Response(body, { headers: {'content-type': 'text/html'} })

}
