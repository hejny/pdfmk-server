# PDF Maker

## Endpoints
- `GET /html/pdf`
- Parameters:
  - `url` URL string, can be encoded (for URLs with query parameters)
  - `nocache` Whether to serve cached PDF
  - `renderOnCallback` Whether should SlimerJS wait for [`window.callPhantom()`](https://docs.slimerjs.org/current/api/webpage.html#oncallback)

/*
## todo

- installation


    - 2x firefox
    - fonts

    dnf install http://avi.alkalay.net/software/webcore-fonts/webcore-fonts-3.0-1.noarch.rpm

- urls and running instances
- usage
- env sample


https://s3.console.aws.amazon.com/s3/buckets/
https://console.aws.amazon.com/iam/home#/security_credentials
*/