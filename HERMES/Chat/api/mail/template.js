module.exports = ({ sujet, message }) => {
    const mail = `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
        <html xmlns:v="urn:schemas-microsoft-com:vml ">
          <head>
            <meta 
              http-equiv="content-type" 
              content="text/html; charset=utf-8" 
            />
            <meta
              name="viewport"
              content="width=device-width; initial-scale=1.0; maximum-scale=1.0"
            />
            <link 
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap" 
              type='text/css'
            />
          </head>
          <body 
            leftmargin="0" 
            topmargin="0" 
            marginwith="0" 
            marginheight="0" 
            style="
              font-family: 'Roboto Condensed', sans-serif; 
              font-size: 16px;
              width:100%;
              max-width: 800px;
            "
          >
            <table 
              style="
                border: 0; 
                border-top: 20px solid #dc554f; 
                background-color: #f05d58;
                width: 100%;
                height: auto;
                padding: 20px;
              "
              cellpadding="0" 
              cellspacing="0"
            >
              <tbody
                style="text-align: center;" 
              >
                <tr> 
                  <td> 
                    <a 
                      href="https://rosebud.website"
                      target="_blank"
                    >
                      <img 
                        style="width: 100%; max-width: 240px;"
                        src="https://i.ibb.co/zHTd7QL/logo.png" 
                        alt="logo" 
                        border="0"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table 
              style="
                border: 0; 
                border-top: 20px solid #d1d1c2; 
                background-color: #DDDDCD;
                width:100%;
                height: auto;
                padding: 40px;
              " 
              cellpadding="0" 
              cellspacing="0"
            >
            </table>
            <h1>${sujet}</h1>
            <h2>${message}</h2>
            <table 
              style="
              border: 0; 
              border-top: 20px solid #3f3f3e; 
              background-color: #363635;
              width:100%;
              height: auto;
              padding: 20px 40px;
            " 
              cellpadding="0" 
              cellspacing="0"
            >
              <tbody
                style="text-align: center"
              >
                <tr>  
                  <td
                  >
                    <a 
                      href="https://ciclic.fr/" 
                      target="_blank"
                    >
                      <img 
                        height="40px" 
                        width="auto" 
                        alt="Ciclic" 
                        src="https://ciclic.fr/sites/all/themes/tssks/img/logo-footer.png"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>`;
    return mail;
};
